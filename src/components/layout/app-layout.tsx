"use client";

import { SidebarProviders } from "@/hooks/use-sidebar-states";
import { AppSidebar } from "./app-sidebar";
import { Navbar } from "./navbar";

interface AppLayoutProps {
    children: React.ReactNode;
}

function AppLayoutContent({ children }: AppLayoutProps) {
    return (
        <div className="h-screen w-full flex flex-col overflow-hidden">
            <Navbar />
            <div className="flex flex-1 overflow-hidden relative">
                <AppSidebar />
                <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900">
                    <div className="container mx-auto p-6 max-w-7xl">{children}</div>
                </main>

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
