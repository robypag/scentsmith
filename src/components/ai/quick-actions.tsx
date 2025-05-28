"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAIContextStore } from "@/stores/ai-context";
import { Bot, Search, BarChart3, Shield, Lightbulb, Zap } from "lucide-react";

export function QuickActions() {
    const { items, getContextSummary } = useAIContextStore();

    const handleQuickAction = (prompt: string) => {
        // TODO: Implement actual chat functionality
        console.log("Quick action:", prompt);
        console.log("Context items:", items);
    };

    const getContextualActions = () => {
        if (items.length === 0) {
            return [
                {
                    icon: <Search className="h-4 w-4" />,
                    title: "Explore Formulae",
                    description: "Browse and analyze existing formulae",
                    prompt: "Show me interesting formulae to explore",
                },
                {
                    icon: <Lightbulb className="h-4 w-4" />,
                    title: "Get Started",
                    description: "Learn about perfume formulation",
                    prompt: "How do I get started with perfume formulation?",
                },
            ];
        }

        const hasFormulae = items.some((item) => item.entity.type === "formula");
        const hasIngredients = items.some((item) => item.entity.type === "ingredient");

        const actions = [];

        if (hasFormulae) {
            actions.push(
                {
                    icon: <BarChart3 className="h-4 w-4" />,
                    title: "Analyze Formulae",
                    description: "Get insights about the selected formulae",
                    prompt: "Analyze these formulae and provide insights about their composition and characteristics",
                },
                {
                    icon: <Shield className="h-4 w-4" />,
                    title: "Safety Check",
                    description: "Review safety and compliance",
                    prompt: "Review the safety and regulatory compliance of these formulae",
                },
            );
        }

        if (hasIngredients) {
            actions.push({
                icon: <Zap className="h-4 w-4" />,
                title: "Ingredient Properties",
                description: "Learn about ingredient properties",
                prompt: "Tell me about the properties and characteristics of these ingredients",
            });
        }

        actions.push({
            icon: <Lightbulb className="h-4 w-4" />,
            title: "Suggest Improvements",
            description: "Get optimization suggestions",
            prompt: "Suggest improvements or optimizations for these items",
        });

        return actions;
    };

    const actions = getContextualActions();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                    <Bot className="h-5 w-5" />
                    <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>
                    {items.length > 0
                        ? `Ask about your selected context: ${getContextSummary()}`
                        : "Get AI assistance with common tasks"}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-3">
                    {actions.map((action, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            className="justify-start h-auto p-4 text-left"
                            onClick={() => handleQuickAction(action.prompt)}
                        >
                            <div className="flex items-start space-x-3 w-full">
                                <div className="flex-shrink-0 mt-0.5">{action.icon}</div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-medium text-sm mb-1">{action.title}</div>
                                    <div className="text-xs text-muted-foreground">{action.description}</div>
                                </div>
                            </div>
                        </Button>
                    ))}
                </div>

                {items.length > 0 && (
                    <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Context ready</span>
                            <Badge variant="outline" className="text-xs">
                                {items.length} item{items.length !== 1 ? "s" : ""}
                            </Badge>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
