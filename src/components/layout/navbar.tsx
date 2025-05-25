"use client"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { MobileNav } from "./mobile-nav"
import { useLeftSidebar, useRightSidebar } from "@/hooks/use-sidebar-states"
import { headerNavigationItems } from "@/lib/mock-data/navigation"
import { User, LogOut, Menu, MessageSquare } from "lucide-react"
import Link from "next/link"

export function Navbar() {
  const { toggle: toggleLeftSidebar } = useLeftSidebar()
  const { toggle: toggleRightSidebar } = useRightSidebar()

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
              SmellSmith
            </h1>
          </div>
          <div className="block md:hidden">
            <h1 className="text-lg font-semibold bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent tracking-wide">
              SmellSmith
            </h1>
          </div>
        </div>

        {/* Center section - Navigation links */}
        <nav className="hidden lg:flex items-center space-x-6 mx-6">
          {headerNavigationItems.map((item) => (
            <Link
              key={item.title}
              href={item.url}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-all duration-300 hover:drop-shadow-sm relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-yellow-500 after:to-amber-500 hover:after:w-full after:transition-all after:duration-300"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Right section - Theme toggle, AI toggle and user menu */}
        <div className="flex items-center space-x-2 ml-auto">
          <ThemeToggle />
          
          <div className="w-px h-6 bg-yellow-300 dark:bg-yellow-600 mx-2" />
          
          <Button 
            variant="luxury-ghost" 
            size="icon"
            onClick={toggleRightSidebar}
            className="hidden md:flex hover:shadow-md"
          >
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Toggle AI assistant</span>
          </Button>
          
          <Button variant="luxury-ghost" size="icon" className="hover:shadow-md hover:shadow-yellow-500/20 hover:bg-yellow-50 dark:hover:bg-yellow-900/20">
            <User className="h-4 w-4" />
            <span className="sr-only">User menu</span>
          </Button>
          
          <Button variant="luxury-ghost" size="icon" className="hover:shadow-md hover:shadow-red-500/20 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400">
            <LogOut className="h-4 w-4" />
            <span className="sr-only">Sign out</span>
          </Button>
        </div>
      </div>
    </header>
  )
}