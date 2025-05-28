"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useRightSidebar } from "@/hooks/use-sidebar-states";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, MessageSquare } from "lucide-react";
import { ContextPanel } from "@/components/ai/context-panel";

export function RightSidebar() {
    const { isOpen, setIsOpen } = useRightSidebar();

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="luxury-ghost" size="icon" className="hidden md:flex hover:shadow-md">
                    <MessageSquare className="h-96 w-96" />
                    <span className="sr-only">Toggle AI assistant</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="min-w-96 sm:min-w-[540px] p-0">
                <SheetHeader className="border border-1">
                    <SheetTitle className="flex items-center gap-2">
                        <Bot className="h-5 w-5 text-sidebar-primary" />
                        AI Assistant
                    </SheetTitle>
                    <SheetDescription asChild></SheetDescription>
                </SheetHeader>

                <hr />

                <div className="flex flex-col h-full">
                    {/* Context and Quick Actions Panel */}
                    <div className="p-4">
                        <ContextPanel />
                        {/*<QuickActions />*/}
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 p-4 overflow-y-auto bg-sidebar">
                        <div className="space-y-4">
                            {/* Welcome Message */}
                            <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="h-4 w-4 text-sidebar-primary-foreground" />
                                </div>
                                <div className="bg-sidebar-accent rounded-lg p-3 w-full">
                                    <p className="text-sm text-sidebar-accent-foreground">
                                        Hello! I&apos;m your AI fragrance assistant. I can help you analyze perfumes,
                                        find recommendations, and answer questions about fragrances. Add context using
                                        the &quot;Ask AI&quot; buttons on formula cards!
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
                            <p className="text-xs text-sidebar-foreground/50 mt-1">
                                Use the quick actions above or add context to get started
                            </p>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
