"use client";

import { useSession } from "next-auth/react";
import { SidebarProviders, useRightSidebar } from "@/hooks/use-sidebar-states";
import { AppSidebar } from "./app-sidebar";
import { RightSidebar } from "./right-sidebar";
import { Navbar } from "./navbar";

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
}

function AuthenticatedLayoutContent({ children }: AuthenticatedLayoutProps) {
    const { data: session, status } = useSession();
    const { isOpen: isRightSidebarOpen, toggle: toggleRightSidebar } = useRightSidebar();

    if (status === "loading") {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
            </div>
        );
    }

    if (!session) {
        return <>{children}</>;
    }

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

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    return (
        <SidebarProviders>
            <AuthenticatedLayoutContent>{children}</AuthenticatedLayoutContent>
        </SidebarProviders>
    );
}
