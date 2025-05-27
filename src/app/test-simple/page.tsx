"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestSimplePage() {
    const [messages, setMessages] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const eventSourceRef = useRef<EventSource | null>(null);

    const connect = () => {
        if (eventSourceRef.current) {
            return;
        }

        const testUserId = "test-user-123";
        console.log("Connecting to SSE for test user:", testUserId);
        addMessage(`Connecting to SSE for user: ${testUserId}`);

        const es = new EventSource(`/api/events-test/${testUserId}`);
        eventSourceRef.current = es;

        es.onopen = () => {
            console.log("SSE connection opened");
            setIsConnected(true);
            addMessage("✅ Connected to SSE");
        };

        es.onmessage = (event) => {
            console.log("[CLIENT] SSE received:", event.data);
            try {
                const data = JSON.parse(event.data);
                addMessage(`📨 [${data.type}] ${JSON.stringify(data, null, 2)}`);
            } catch (err) {
                console.log("[CLIENT] SSE Error", err);
                addMessage(`📨 Raw: ${event.data}`);
            }
        };

        es.onerror = (error) => {
            console.error("SSE connection error:", error);
            setIsConnected(false);
            addMessage("❌ SSE connection error");
        };
    };

    const disconnect = () => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
            setIsConnected(false);
            addMessage("📡 Disconnected from SSE");
        }
    };

    const sendTestMessage = async () => {
        try {
            addMessage("🚀 Sending test message...");
            const response = await fetch("/api/test-simple", { method: "POST" });
            const result = await response.json();

            if (result.success) {
                addMessage(`✅ Test message sent! Subscribers: ${result.subscriberCount}`);
                addMessage(`📋 Channel: ${result.channel}`);
            } else {
                addMessage(`❌ Test failed: ${result.error}`);
            }
        } catch (error) {
            addMessage(`❌ Request failed: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
    };

    const addMessage = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setMessages((prev) => [...prev, `[${timestamp}] ${message}`]);
    };

    const clearMessages = () => {
        setMessages([]);
    };

    useEffect(() => {
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
            }
        };
    }, []);

    return (
        <div className="container mx-auto p-6 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Simple SSE & Queue Test (No Auth Required)</CardTitle>
                    <CardDescription>Test the SSE pipeline with a hardcoded test user</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
                        <span>{isConnected ? "Connected" : "Disconnected"}</span>
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={connect} disabled={isConnected}>
                            Connect SSE
                        </Button>
                        <Button onClick={disconnect} disabled={!isConnected} variant="outline">
                            Disconnect
                        </Button>
                        <Button onClick={sendTestMessage} variant="secondary">
                            Send Test Message
                        </Button>
                        <Button onClick={clearMessages} variant="ghost">
                            Clear
                        </Button>
                    </div>

                    <div className="text-sm text-gray-600">
                        <p>
                            <strong>Test Steps:</strong>
                        </p>
                        <ol className="list-decimal list-inside space-y-1">
                            <li>Click &quot;Connect SSE&quot; - should see connection message</li>
                            <li>Click &quot;Send Test Message&quot; - should see message appear in real-time</li>
                            <li>Check browser console for detailed logging</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Messages ({messages.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg max-h-96 overflow-y-auto">
                        {messages.length === 0 ? (
                            <p className="text-gray-500">No messages yet...</p>
                        ) : (
                            messages.map((message, index) => (
                                <div key={index} className="text-sm font-mono mb-1 whitespace-pre-wrap">
                                    {message}
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
