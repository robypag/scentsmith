import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "*.{js,ts,jsx,tsx,mdx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1rem" }],
                sm: ["0.875rem", { lineHeight: "1.25rem" }],
                base: ["0.9375rem", { lineHeight: "1.5rem" }],
                lg: ["1.0625rem", { lineHeight: "1.75rem" }],
                xl: ["1.25rem", { lineHeight: "1.75rem" }],
                "2xl": ["1.5rem", { lineHeight: "2rem" }],
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)", ...defaultTheme.fontFamily.sans],
                mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
            },
            colors: {
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                sidebar: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                    primary: "hsl(var(--primary))",
                    "primary-foreground": "hsl(var(--primary-foreground))",
                    accent: "hsl(var(--accent))",
                    "accent-foreground": "hsl(var(--accent-foreground))",
                    border: "hsl(var(--border))",
                },
                gold: {
                    DEFAULT: "hsl(var(--gold))",
                    foreground: "hsl(var(--gold-foreground))",
                    muted: "hsl(var(--gold-muted))",
                    dark: "hsl(var(--gold-dark))",
                    light: "hsl(var(--gold-light))",
                },
                champagne: "hsl(var(--champagne))",
                bronze: "hsl(var(--bronze))",
                "rose-gold": "hsl(var(--rose-gold))",
                platinum: "hsl(var(--platinum))",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "luxury-pulse": "luxury-pulse 3s ease-in-out infinite",
                "gold-shimmer": "gold-shimmer 3s ease-in-out infinite",
                "elegant-fade-in": "elegant-fade-in 0.6s ease-out forwards",
            },
            boxShadow: {
                "gold": "0 0 20px hsl(var(--shadow-gold)), 0 4px 12px hsl(var(--shadow-warm))",
                "gold-subtle": "0 0 8px hsl(var(--shadow-gold)), 0 2px 6px hsl(var(--shadow-warm))",
                "luxury": "0 10px 40px hsl(var(--shadow-warm)), 0 4px 16px hsl(var(--shadow-gold))",
            },
            backgroundImage: {
                "gradient-luxury": "linear-gradient(135deg, hsl(var(--background)) 0%, hsl(var(--card)) 25%, hsl(var(--champagne)) 75%, hsl(var(--gold-light)) 100%)",
                "gradient-gold": "linear-gradient(135deg, hsl(var(--gold-dark)) 0%, hsl(var(--gold)) 50%, hsl(var(--gold-light)) 100%)",
                "shimmer": "linear-gradient(90deg, hsl(var(--gold)) 0%, hsl(var(--gold-light)) 50%, hsl(var(--gold)) 100%)",
            },
        },
    },
    plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
