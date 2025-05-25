"use client"

import { Button } from "@/components/ui/button"
import { MobileNav } from "./mobile-nav"
import { useLeftSidebar, useRightSidebar } from "@/hooks/use-sidebar-states"
import { headerNavigationItems } from "@/lib/mock-data/navigation"
import { User, LogOut, Menu, MessageSquare } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  const { toggle: toggleLeftSidebar } = useLeftSidebar()
  const { toggle: toggleRightSidebar } = useRightSidebar()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full flex h-16 items-center px-4">
        {/* Left section - Sidebar toggle and logo */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleLeftSidebar}
            className="hidden md:flex"
          >
            <Menu className="h-4 w-4" />
            <span className="sr-only">Toggle left sidebar</span>
          </Button>
          
          <MobileNav />
          
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-foreground">SmellSmith</h1>
          </div>
          <div className="block md:hidden">
            <h1 className="text-lg font-semibold text-foreground">SmellSmith</h1>
          </div>
        </div>

        {/* Center section - Navigation links */}
        <nav className="hidden lg:flex items-center space-x-6 mx-6">
          {headerNavigationItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right section - AI toggle and user menu */}
        <div className="flex items-center space-x-2 ml-auto">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={toggleRightSidebar}
            className="hidden md:flex"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Toggle AI assistant</span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="h-4 w-4" />
            <span className="sr-only">User menu</span>
          </Button>
          
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Sign out</span>
          </Button>
        </div>
      </div>
    </header>
  )
}