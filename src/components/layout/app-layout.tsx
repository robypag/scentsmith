"use client";

import { SidebarProviders, useRightSidebar } from "@/hooks/use-sidebar-states";
import { AppSidebar } from "./app-sidebar";
import { RightSidebar } from "./right-sidebar";
import { Navbar } from "./navbar";

interface AppLayoutProps {
    children: React.ReactNode;
}

function AppLayoutContent({ children }: AppLayoutProps) {
    const { isOpen: isRightSidebarOpen, toggle: toggleRightSidebar } = useRightSidebar();

    return (
        <div className="h-screen w-full flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 overflow-hidden relative">
                <AppSidebar />
                <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto p-6 max-w-7xl">{children}</div>
                </main>

                {/* Backdrop overlay */}
                {isRightSidebarOpen && (
                    <div
                        className="absolute inset-0 bg-black/20 z-40 transition-opacity duration-200"
                        onClick={toggleRightSidebar}
                    />
                )}

                {/* Right sidebar */}
                <div className="absolute top-0 right-0 h-full z-50">
                    <RightSidebar />
                </div>
            </div>
        </div>
    );
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <SidebarProviders>
            <AppLayoutContent>{children}</AppLayoutContent>
        </SidebarProviders>
    );
}
