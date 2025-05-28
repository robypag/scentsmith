"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { MobileNav } from "./mobile-nav";
import { useLeftSidebar } from "@/hooks/use-sidebar-states";
import { LogOut, Menu, Plus, FileText, FolderOpen } from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { NotificationCenter } from "@/components/notifications";
import { RightSidebar } from "./right-sidebar";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function Navbar() {
    const { toggle: toggleLeftSidebar } = useLeftSidebar();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-yellow-200 dark:border-yellow-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 shadow-lg shadow-yellow-500/10">
            <div className="w-full flex h-16 items-center px-4">
                {/* Left section - Sidebar toggle and logo */}
                <div className="flex items-center space-x-4">
                    <Button
                        variant="luxury-ghost"
                        size="icon"
                        onClick={toggleLeftSidebar}
                        className="hidden md:flex hover:shadow-md hover:shadow-yellow-500/20 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 animate-pulse"
                    >
                        <Menu className="h-4 w-4" />
                        <span className="sr-only">Toggle left sidebar</span>
                    </Button>

                    <MobileNav />

                    <div className="hidden md:block">
                        <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent tracking-wide">
                            ScentSmith
                        </h1>
                    </div>
                    <div className="block md:hidden">
                        <h1 className="text-lg font-semibold bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent tracking-wide">
                            ScentSmith
                        </h1>
                    </div>
                </div>

                {/* Center section - Quick Actions */}
                <div className="hidden lg:flex items-center mx-6">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all duration-300">
                                    Inventory
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <div className="grid gap-3 p-4 w-[300px]">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="/ingredients/create"
                                                className="flex items-center gap-3 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-600 dark:hover:text-yellow-400 rounded-md p-3 transition-colors"
                                            >
                                                <Plus className="h-4 w-4" />
                                                <div>
                                                    <div className="text-sm font-medium">Add Ingredient</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Add new ingredient to inventory
                                                    </div>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="/formulae/create"
                                                className="flex items-center gap-3 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-600 dark:hover:text-yellow-400 rounded-md p-3 transition-colors"
                                            >
                                                <FileText className="h-4 w-4" />
                                                <div>
                                                    <div className="text-sm font-medium">Add Formula</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Create new fragrance formula
                                                    </div>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href="/documents"
                                                className="flex items-center gap-3 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:text-yellow-600 dark:hover:text-yellow-400 rounded-md p-3 transition-colors"
                                            >
                                                <FolderOpen className="h-4 w-4" />
                                                <div>
                                                    <div className="text-sm font-medium">Go To Document Management</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        Manage your documents and files
                                                    </div>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Right section - Theme toggle, AI toggle and user menu */}
                <div className="flex items-center space-x-2 ml-auto">
                    <NotificationCenter className="hover:shadow-md hover:shadow-yellow-500/20 hover:bg-yellow-50 dark:hover:bg-yellow-900/20" />
                    <div className="w-px h-6 bg-yellow-300 dark:bg-yellow-600 mx-2" />
                    <ThemeToggle />
                    <RightSidebar />
                    <Button
                        variant="luxury-ghost"
                        size="icon"
                        className="hover:shadow-md hover:shadow-red-500/20 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400"
                        onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="sr-only">Sign out</span>
                    </Button>
                </div>
            </div>
        </header>
    );
}
