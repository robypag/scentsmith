"use client";

import { useRightSidebar } from "@/hooks/use-sidebar-states";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { X, Bot, Sparkles } from "lucide-react";

export function RightSidebar() {
    const { isOpen, toggle } = useRightSidebar();

    return (
        <aside
            className={cn(
                "flex flex-col h-full w-96 bg-sidebar border-l border-sidebar-border transition-all duration-200 ease-in-out shadow-lg",
                isOpen ? "translate-x-0" : "translate-x-full",
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border bg-sidebar">
                <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5 text-sidebar-primary" />
                    <h3 className="text-lg font-semibold text-sidebar-foreground">AI Assistant</h3>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggle}
                    className="text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close AI assistant</span>
                </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-sidebar">
                <div className="space-y-4">
                    {/* Welcome Message */}
                    <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Sparkles className="h-4 w-4 text-sidebar-primary-foreground" />
                        </div>
                        <div className="bg-sidebar-accent rounded-lg p-3 max-w-[240px]">
                            <p className="text-sm text-sidebar-accent-foreground">
                                Hello! I&apos;m your AI fragrance assistant. I can help you analyze perfumes, find
                                recommendations, and answer questions about fragrances. How can I assist you today?
                            </p>
                        </div>
                    </div>

                    {/* Placeholder for future chat messages */}
                    <div className="text-center text-sidebar-foreground/50 text-sm py-8">
                        <Bot className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>Start a conversation with your AI assistant</p>
                        <p className="text-xs mt-1">
                            Ask about fragrances, get recommendations, or analyze compositions
                        </p>
                    </div>
                </div>
            </div>

            {/* Input Area - Placeholder for future implementation */}
            <div className="border-t border-sidebar-border p-4 bg-sidebar">
                <div className="bg-sidebar-accent/50 rounded-lg p-3 text-center">
                    <p className="text-sm text-sidebar-foreground/70">Chat interface coming soon...</p>
                </div>
            </div>
        </aside>
    );
}
