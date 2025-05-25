"use client";

import { useLeftSidebar } from "@/hooks/use-sidebar-states";
import { mainNavigationItems, settingsNavigationItems, mockUser } from "@/lib/mock-data/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppSidebar() {
    const { isOpen, toggle } = useLeftSidebar();
    const pathname = usePathname();

    return (
        <aside
            className={cn(
                "flex flex-col h-full bg-sidebar border-r border-sidebar-border transition-all duration-200 ease-in-out relative",
                isOpen ? "w-64" : "w-16",
                "md:relative md:translate-x-0",
                !isOpen && "absolute -translate-x-full md:translate-x-0",
            )}
        >
            {/* User Header */}
            <div
                className={cn(
                    "flex items-center p-4 border-b border-sidebar-border bg-sidebar",
                    !isOpen && "justify-center p-2",
                )}
            >
                {isOpen ? (
                    <div className="flex items-center space-x-3 min-w-0">
                        <Avatar fallback={mockUser.initials} size="md" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-sidebar-foreground truncate">{mockUser.name}</p>
                            <p className="text-xs text-sidebar-foreground/70 truncate">{mockUser.email}</p>
                        </div>
                    </div>
                ) : (
                    <Avatar fallback={mockUser.initials} size="sm" />
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {mainNavigationItems.map((item) => {
                    const isActive = pathname === item.url;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.title}
                            href={item.url}
                            className={cn(
                                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                    : "text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent",
                                !isOpen && "justify-center space-x-0",
                            )}
                            title={!isOpen ? item.title : undefined}
                        >
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            {isOpen && <span className="truncate">{item.title}</span>}
                        </Link>
                    );
                })}
            </nav>

            {/* Settings Navigation */}
            <div className="p-4 space-y-2 border-t border-sidebar-border">
                {settingsNavigationItems.map((item) => {
                    const isActive = pathname === item.url;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.title}
                            href={item.url}
                            className={cn(
                                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                    : "text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent",
                                !isOpen && "justify-center space-x-0",
                            )}
                            title={!isOpen ? item.title : undefined}
                        >
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            {isOpen && <span className="truncate">{item.title}</span>}
                        </Link>
                    );
                })}
            </div>

            {/* Footer / Collapse Toggle */}
            <div className={cn("p-4 border-t border-sidebar-border", !isOpen && "p-2")}>
                {isOpen ? (
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-sidebar-foreground/70">Perfume Analysis Platform</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggle}
                            className="h-6 w-6 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                        >
                            <ChevronLeft className="h-3 w-3" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggle}
                            className="h-6 w-6 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
                        >
                            <ChevronRight className="h-3 w-3" />
                        </Button>
                    </div>
                )}
            </div>
        </aside>
    );
}
