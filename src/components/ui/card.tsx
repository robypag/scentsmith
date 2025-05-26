import * as React from "react";

import { cn } from "@/lib/utils";

function Card({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card"
            className={cn(
                "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
                className,
            )}
            {...props}
        />
    );
}

function LuxuryCard({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="luxury-card"
            className={cn(
                "bg-gradient-to-br from-card via-card to-champagne/20 text-card-foreground flex flex-col gap-6 rounded-xl border border-gold/20 py-6 shadow-gold-subtle hover:shadow-gold transition-all duration-300 backdrop-blur-sm",
                className,
            )}
            {...props}
        />
    );
}

function PremiumCard({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="premium-card"
            className={cn(
                "bg-gradient-to-br from-card via-card to-champagne/20 text-card-foreground flex flex-col gap-6 rounded-xl border-2 border-gold/30 py-6 shadow-luxury hover:border-gold/50 transition-all duration-500 relative overflow-hidden",
                "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-gold/5 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000",
                className,
            )}
            {...props}
        />
    );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-header"
            className={cn(
                "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
                className,
            )}
            {...props}
        />
    );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
    return <div data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
    return <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="card-action"
            className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
            {...props}
        />
    );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
    return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div data-slot="card-footer" className={cn("flex items-center px-6 [.border-t]:pt-6", className)} {...props} />
    );
}

export { Card, LuxuryCard, PremiumCard, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
