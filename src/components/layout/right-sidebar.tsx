"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useRightSidebar } from "@/hooks/use-sidebar-states";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Sparkles, MessageSquare, Send, User, StopCircle, RotateCcw } from "lucide-react";
import { ContextPanel } from "@/components/ai/context-panel";
import { useChat } from "@ai-sdk/react";
import { AIContextItem, useAIContextStore, AIContextEntity } from "@/stores/ai-context";
import { MemoizedReactMarkdown } from "../ui/markdown";
import Link from "next/link";

const groupContextItemsByType = (items: AIContextItem[]): Record<AIContextEntity["type"], string[]> => {
    return items.reduce(
        (acc, item) => {
            const { type, id } = item.entity;
            if (!acc[type]) {
                acc[type] = [];
            }
            acc[type].push(id);
            return acc;
        },
        {} as Record<AIContextEntity["type"], string[]>,
    );
};

export function RightSidebar() {
    const { isOpen, setIsOpen } = useRightSidebar();
    const { items: contextItems } = useAIContextStore();

    const {
        messages,
        input,
        handleInputChange,
        handleSubmit: originalHandleSubmit,
        status,
        setMessages,
    } = useChat({
        api: "/api/chat",
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Include context items in the message if any exist
        const additionalContext = contextItems.length > 0 ? groupContextItemsByType(contextItems) : [];
        originalHandleSubmit(e, {
            body: {
                context: additionalContext,
            },
        });
    };

    const handleResetChat = () => {
        setMessages([]);
    };

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

                <div className="flex flex-col h-full max-h-[calc(100vh-120px)]">
                    {/* Context and Quick Actions Panel */}
                    <div className="flex-shrink-0 p-4 border-b border-sidebar-border">
                        <ContextPanel />
                        {/*<QuickActions />*/}
                    </div>

                    {/* Chat Area */}
                    <div className="flex-1 min-h-0 overflow-y-auto bg-sidebar">
                        <div className="p-4">
                            <div className="space-y-4">
                                {/* Welcome Message */}
                                {messages.length === 0 && (
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center flex-shrink-0">
                                            <Sparkles className="h-4 w-4 text-sidebar-primary-foreground" />
                                        </div>
                                        <div className="bg-sidebar-accent rounded-lg p-3 w-full">
                                            <p className="text-sm text-sidebar-accent-foreground">
                                                Hello! I&apos;m your AI fragrance assistant. I can help you analyze
                                                perfumes, find recommendations, and answer questions about fragrances.
                                                Add context using the &quot;Ask AI&quot; buttons on formula cards!
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Chat Messages */}
                                {messages.map((message) => (
                                    <div key={message.id} className="flex items-start space-x-3">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                                message.role === "user" ? "bg-sidebar-accent" : "bg-sidebar-primary"
                                            }`}
                                        >
                                            {message.role === "user" ? (
                                                <User className="h-4 w-4 text-sidebar-accent-foreground" />
                                            ) : (
                                                <Bot className="h-4 w-4 text-sidebar-primary-foreground" />
                                            )}
                                        </div>
                                        <div
                                            className={`rounded-lg p-3 w-full ${
                                                message.role === "user" ? "bg-sidebar-muted" : "bg-sidebar-accent"
                                            } text-sm whitespace-normal`}
                                        >
                                            <MemoizedReactMarkdown
                                                components={{
                                                    a: ({ children, ...props }) => {
                                                        return (
                                                            <Link
                                                                href={props.href as string}
                                                                className="text-crimson-60 font-semibold"
                                                            >
                                                                {children}
                                                            </Link>
                                                        );
                                                    },
                                                    p: ({ children, ...props }) => {
                                                        return (
                                                            <p className="text-sm whitespace-pre-wrap" {...props}>
                                                                {children}
                                                            </p>
                                                        );
                                                    },
                                                }}
                                            >
                                                {message.content as string}
                                            </MemoizedReactMarkdown>
                                            {/*<p className="text-sm whitespace-pre-wrap">{message.content}</p>*/}
                                        </div>
                                    </div>
                                ))}

                                {/* Loading indicator */}
                                {status === "submitted" && (
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center flex-shrink-0">
                                            <Bot className="h-4 w-4 text-sidebar-primary-foreground animate-pulse" />
                                        </div>
                                        <div className="bg-sidebar-accent rounded-lg p-3 w-full">
                                            <p className="text-sm text-sidebar-accent-foreground animate-pulse">
                                                Thinking...
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {/* Empty state when no messages */}
                                {messages.length === 0 && (
                                    <div className="text-center text-sidebar-foreground/50 text-sm py-8">
                                        <Bot className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                        <p>Start a conversation with your AI assistant</p>
                                        <p className="text-xs mt-1">
                                            Ask about fragrances, get recommendations, or analyze compositions
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Chat Input Area */}
                    <div className="flex-shrink-0 border-t border-sidebar-border p-4 bg-sidebar">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="relative">
                                <Textarea
                                    name="prompt"
                                    placeholder="Ask about fragrances, get recommendations, or analyze compositions..."
                                    value={input}
                                    onChange={handleInputChange}
                                    disabled={status === "submitted" || status === "streaming"}
                                    className="min-h-[80px] resize-none pr-20 bg-sidebar-accent/50 border-sidebar-border focus:bg-sidebar-accent"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            //@ts-expect-error: Ignore unrelevant type error
                                            handleSubmit(e);
                                        }
                                    }}
                                />
                                <div className="absolute bottom-2 right-2 flex gap-1">
                                    {messages.length > 0 && (
                                        <Button
                                            type="button"
                                            size="icon"
                                            onClick={handleResetChat}
                                            className="h-8 w-8"
                                            variant="ghost"
                                            title="Reset chat"
                                        >
                                            <RotateCcw className="h-4 w-4" />
                                            <span className="sr-only">Reset chat</span>
                                        </Button>
                                    )}
                                    <Button
                                        type="submit"
                                        size="icon"
                                        disabled={status !== "ready" || !input.trim()}
                                        className="h-8 w-8"
                                        variant="outline"
                                    >
                                        <Send className="h-4 w-4" />
                                        <span className="sr-only">Send message</span>
                                    </Button>
                                    {(status === "submitted" || status === "streaming") && (
                                        <Button type="button" size="icon" className="h-8 w-8" variant="outline">
                                            <StopCircle className="h-4 w-4" />
                                            <span className="sr-only">Stop</span>
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <p className="text-xs text-sidebar-foreground/50 text-center">
                                Press Enter to send, Shift+Enter for new line
                            </p>
                        </form>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
