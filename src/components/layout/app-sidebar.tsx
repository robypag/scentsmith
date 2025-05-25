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
                "flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out relative shadow-lg",
                isOpen ? "w-64" : "w-16",
                "md:relative md:translate-x-0",
                !isOpen && "absolute -translate-x-full md:translate-x-0",
            )}
        >
            {/* User Header */}
            <div
                className={cn(
                    "flex items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800",
                    !isOpen && "justify-center p-2",
                )}
            >
                {isOpen ? (
                    <div className="flex items-center space-x-3 min-w-0">
                        <Avatar fallback={mockUser.initials} size="md" />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{mockUser.name}</p>
                            <p className="text-xs text-yellow-600 dark:text-yellow-400 truncate">{mockUser.email}</p>
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
                                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                                isActive
                                    ? "bg-yellow-500 text-white shadow-md border border-yellow-600"
                                    : "text-gray-700 dark:text-gray-200 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:shadow-sm border border-transparent",
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
            <div className="p-4 space-y-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                {settingsNavigationItems.map((item) => {
                    const isActive = pathname === item.url;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.title}
                            href={item.url}
                            className={cn(
                                "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group",
                                isActive
                                    ? "bg-amber-600 text-white shadow-md border border-amber-700"
                                    : "text-gray-700 dark:text-gray-200 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:shadow-sm border border-transparent",
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
            <div className={cn("p-4 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-50 dark:from-yellow-900/20 dark:via-amber-900/20 dark:to-yellow-900/20", !isOpen && "p-2")}>
                {isOpen ? (
                    <div className="flex items-center justify-between">
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 font-medium tracking-wide">Perfume Analysis Platform</p>
                        <Button
                            variant="luxury-ghost"
                            size="icon"
                            onClick={toggle}
                            className="h-6 w-6 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
                        >
                            <ChevronLeft className="h-3 w-3" />
                        </Button>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <Button
                            variant="luxury-ghost"
                            size="icon"
                            onClick={toggle}
                            className="h-6 w-6 text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"
                        >
                            <ChevronRight className="h-3 w-3" />
                        </Button>
                    </div>
                )}
            </div>
        </aside>
    );
}
