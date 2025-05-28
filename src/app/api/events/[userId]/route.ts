import { NextRequest } from "next/server";
import { auth } from "@/auth";
import Redis from "ioredis";

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
    try {
        const session = await auth();
        const { userId } = await params;

        // Verify user is authenticated
        if (!session?.user?.email) {
            console.log("[SSE API] No authenticated session");
            return new Response("Unauthorized", { status: 401 });
        }

        console.log("[SSE API] SSE request for userId:", userId);
        console.log("[SSE API] Session user:", session?.user?.id);
        console.log("[SSE API] Session email:", session?.user?.email);
        console.log("[SSE API] Starting SSE stream for user UUID:", session?.user?.id);

        const user = session.user;

        // Get the actual user UUID from the database --> not needed anymore, user ID is the UUID now
        /**
        const [user] = await db.select().from(users).where(eq(users.email, session.user.email));
        if (!user) {
            console.log("[SSE API] User not found in database");
            return new Response("User not found", { status: 404 });
        }
        */

        // Create SSE response stream
        const stream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                let subscriber: Redis | null = null;
                let heartbeatInterval: NodeJS.Timeout | null = null;
                let streamClosed = false;

                const cleanup = async () => {
                    if (heartbeatInterval) clearInterval(heartbeatInterval);
                    if (subscriber) {
                        try {
                            await subscriber.unsubscribe();
                            await subscriber.quit();
                        } catch (e) {
                            console.error("[SSE API] Error during Redis cleanup:", e);
                        }
                    }
                    if (!streamClosed) {
                        try {
                            controller.close();
                            streamClosed = true;
                        } catch (err) {
                            console.error("[SSE API] Controller already closed:", err);
                        }
                    }
                };

                try {
                    console.log("[SSE API] Sending connection confirmation");
                    // Send initial flush to start stream immediately
                    controller.enqueue(encoder.encode(":\n\n"));
                    controller.enqueue(
                        encoder.encode(
                            `event: connected\ndata: ${JSON.stringify({
                                type: "connected",
                                timestamp: new Date().toISOString(),
                            })}\n\n`,
                        ),
                    );

                    // Create Redis subscriber
                    console.log("[SSE API] Creating Redis subscriber");
                    subscriber = new Redis({
                        host: process.env.REDIS_HOST || "localhost",
                        port: parseInt(process.env.REDIS_PORT || "6379"),
                    });

                    // Subscribe to user's job progress channel using the actual user UUID
                    const channel = `job_progress:${user.id}`;
                    console.log("[SSE API] Subscribing to channel:", channel);
                    await subscriber.subscribe(channel);
                    console.log("[SSE API] Successfully subscribed to channel:", channel);

                    // Handle incoming job progress messages
                    subscriber.on("message", (receivedChannel, message) => {
                        console.log("[SSE API] Received message on channel:", receivedChannel, message);
                        try {
                            const data = JSON.parse(message);
                            const sseMessage = {
                                type: "job_progress",
                                ...data,
                                timestamp: new Date().toISOString(),
                            };
                            console.log("[SSE API] Sending SSE message:", sseMessage);
                            controller.enqueue(encoder.encode(`data: ${JSON.stringify(sseMessage)}\n\n`));
                        } catch (err) {
                            console.error("[SSE API] Error processing job progress message:", err);
                        }
                    });

                    // Handle errors gracefully:
                    subscriber.on("error", (err) => {
                        console.error("[SSE API] Redis subscriber error:", err);
                        cleanup();
                    });

                    // Heartbeat to keep connection alive
                    heartbeatInterval = setInterval(() => {
                        if (streamClosed) return;
                        try {
                            controller.enqueue(
                                encoder.encode(
                                    `event: heartbeat\ndata: ${JSON.stringify({
                                        type: "heartbeat",
                                        timestamp: new Date().toISOString(),
                                    })}\n\n`,
                                ),
                            );
                        } catch (err) {
                            console.error("[SSE API] Heartbeat error:", err);
                            cleanup();
                        }
                    }, 30000);

                    // Cleanup on disconnect
                    request.signal.addEventListener("abort", () => {
                        console.log("[SSE API] Client disconnected");
                        cleanup();
                    });
                } catch (err) {
                    console.error("Error setting up SSE:", err);
                    cleanup();
                }
            },
        });

        return new Response(stream, {
            headers: {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache, no-transform",
                Connection: "keep-alive",
                "X-Accel-Buffering": "no",
            },
        });
    } catch (err) {
        console.error("SSE endpoint error:", err);
        return new Response("Internal Server Error", { status: 500 });
    }
}
