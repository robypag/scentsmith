"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestSSEPage() {
    const [messages, setMessages] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState<string | null>(null);
    const eventSourceRef = useRef<EventSource | null>(null);

    const connect = () => {
        if (eventSourceRef.current) {
            console.log("Already connected");
            return;
        }

        console.log("Connecting to SSE test endpoint...");
        const es = new EventSource("/api/test-sse");
        eventSourceRef.current = es;

        es.onopen = () => {
            console.log("SSE test connection opened");
            setIsConnected(true);
            setConnectionError(null);
            addMessage("Connected to SSE test endpoint");
        };

        es.onmessage = (event) => {
            console.log("SSE test received:", event.data);
            try {
                const data = JSON.parse(event.data);
                addMessage(`[${data.type}] ${data.message || JSON.stringify(data)}`);
            } catch (err) {
                console.log("[CLIENT] SSE Error", err);
                addMessage(`Raw message: ${event.data}`);
            }
        };

        es.onerror = (error) => {
            console.error("SSE test connection error:", error);
            setIsConnected(false);
            setConnectionError("Connection error occurred");
            addMessage("Connection error occurred");
        };
    };

    const disconnect = () => {
        if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
            setIsConnected(false);
            addMessage("Disconnected from SSE");
        }
    };

    const addMessage = (message: string) => {
        const timestamp = new Date().toLocaleTimeString();
        setMessages((prev) => [...prev, `[${timestamp}] ${message}`]);
    };

    const testRedisPublish = async () => {
        try {
            const response = await fetch("/api/test-redis");
            const result = await response.json();
            addMessage(`Redis test: ${result.success ? "SUCCESS" : "FAILED"}`);
            if (!result.success) {
                addMessage(`Error: ${result.error}`);
            }
        } catch (error) {
            addMessage(`Redis test failed: ${error instanceof Error ? error.message : "Unknown error"}`);
        }
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
                    <CardTitle>SSE & Redis Test</CardTitle>
                    <CardDescription>Test Server-Sent Events and Redis connectivity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <div className={`h-3 w-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
                        <span>{isConnected ? "Connected" : "Disconnected"}</span>
                        {connectionError && <span className="text-red-500 text-sm">({connectionError})</span>}
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={connect} disabled={isConnected}>
                            Connect SSE
                        </Button>
                        <Button onClick={disconnect} disabled={!isConnected} variant="outline">
                            Disconnect
                        </Button>
                        <Button onClick={testRedisPublish} variant="secondary">
                            Test Redis
                        </Button>
                        <Button onClick={clearMessages} variant="ghost">
                            Clear Messages
                        </Button>
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
                                <div key={index} className="text-sm font-mono mb-1">
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
