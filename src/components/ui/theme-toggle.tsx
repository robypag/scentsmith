"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="h-9 w-9">
                <Sun className="h-4 w-4" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
                "h-9 w-9 relative transition-all duration-300",
                "hover:bg-yellow-100 dark:hover:bg-yellow-900/30",
                "border border-transparent hover:border-yellow-200 dark:hover:border-yellow-700",
            )}
        >
            <Sun
                className={cn(
                    "h-4 w-4 transition-all duration-300 text-yellow-600 dark:text-yellow-400",
                    isDark ? "rotate-90 scale-0" : "rotate-0 scale-100",
                )}
            />
            <Moon
                className={cn(
                    "absolute h-4 w-4 transition-all duration-300 text-yellow-600 dark:text-yellow-400",
                    isDark ? "rotate-0 scale-100" : "-rotate-90 scale-0",
                )}
            />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
