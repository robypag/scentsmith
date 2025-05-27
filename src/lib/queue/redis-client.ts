import Redis from "ioredis";

let redis: Redis | null = null;

export function getRedisClient(): Redis {
    if (!redis) {
        redis = new Redis({
            host: process.env.REDIS_HOST || "localhost",
            port: parseInt(process.env.REDIS_PORT || "6379"),
            connectTimeout: 10000,
            lazyConnect: true,
            maxRetriesPerRequest: null,
            enableAutoPipelining: true,
            keepAlive: 30000,
        });

        redis.on("error", (error) => {
            console.error("Redis connection error:", error);
        });

        redis.on("connect", () => {
            console.log("Connected to Redis");
        });

        redis.on("ready", () => {
            console.log("Redis client ready");
        });

        redis.on("close", () => {
            console.log("Redis connection closed");
        });
    }

    return redis;
}

export async function closeRedisConnection(): Promise<void> {
    if (redis) {
        const client = redis;
        redis = null;
        await client.quit();
    }
}
