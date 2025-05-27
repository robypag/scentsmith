import { startAllWorkers, stopAllWorkers } from "@/server/workers";
import "dotenv/config";

console.log("[Worker Runner] Bootstrapping all workers...");
startAllWorkers();

process.on("SIGINT", async () => {
    console.log("\n[Worker Runner] Caught SIGINT, shutting down workers...");
    try {
        await stopAllWorkers();
        console.log("[Worker Runner] Workers shut down gracefully");
    } catch (error) {
        console.error("[Worker Runner] Error during shutdown:", error);
    }
    process.exit(0);
});

process.on("SIGTERM", async () => {
    console.log("\n[Worker Runner] Caught SIGTERM, shutting down workers...");
    try {
        await stopAllWorkers();
        console.log("[Worker Runner] Workers shut down gracefully");
    } catch (error) {
        console.error("[Worker Runner] Error during shutdown:", error);
    }
    process.exit(0);
});
