import { db } from "../index";
import { users } from "../schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import "dotenv/config";

const DEMO_USER = {
    email: "demo@smellsmith.com",
    name: "Demo User",
    password: "demo123",
};

async function seedDemoUser() {
    try {
        console.log("🌱 Seeding demo user...");

        // Check if demo user already exists
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.email, DEMO_USER.email))
            .limit(1);

        if (existingUser.length > 0) {
            console.log("Demo user already exists, skipping...");
            return;
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(DEMO_USER.password, 12);

        // Insert demo user
        await db.insert(users).values({
            email: DEMO_USER.email,
            name: DEMO_USER.name,
            password: hashedPassword,
        });

        console.log("✅ Demo user seeded successfully");
        console.log(`Email: ${DEMO_USER.email}`);
        console.log(`Password: ${DEMO_USER.password}`);
    } catch (error) {
        console.error("❌ Error seeding demo user:", error);
        throw error;
    }
}

if (require.main === module) {
    seedDemoUser()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

export { seedDemoUser };