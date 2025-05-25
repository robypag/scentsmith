"use client"

import { SidebarProviders } from "@/hooks/use-sidebar-states"
import { AppSidebar } from "./app-sidebar"
import { RightSidebar } from "./right-sidebar"
import { Navbar } from "./navbar"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProviders>
      <div className="h-screen w-full flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-auto bg-background">
            <div className="container mx-auto p-6 max-w-7xl">
              {children}
            </div>
          </main>
          <RightSidebar />
        </div>
      </div>
    </SidebarProviders>
  )
}