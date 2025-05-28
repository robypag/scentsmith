"use client";

import { SidebarProviders } from "@/hooks/use-sidebar-states";
import { AppSidebar } from "./app-sidebar";
import { Navbar } from "./navbar";

interface AppLayoutProps {
    children: React.ReactNode;
}

function AppLayoutContent({ children }: AppLayoutProps) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Navbar />
                <main className="flex-1 overflow-auto p-6">{children}</main>
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
