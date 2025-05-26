import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";
import * as path from "path";
import "dotenv/config";

const runMigrate = async () => {
    const databaseUrl = process.env.DATABASE_URL || "postgresql://admin:supersecret@localhost:5432/scentsmith";

    const client = new Client({
        connectionString: databaseUrl,
    });

    try {
        await client.connect();
        const db = drizzle(client);

        console.log("⏳ Running migrations...");

        const start = Date.now();

        await migrate(db, {
            migrationsFolder: path.resolve("src/lib/db/migrations"),
        });

        const end = Date.now();
        console.log("✅ Migrations completed in", end - start, "ms");
    } catch (err) {
        console.error("❌ Migration failed");
        console.error(err);
        process.exit(1);
    } finally {
        await client.end();
        process.exit(0);
    }
};

runMigrate();
