"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { mainNavigationItems, settingsNavigationItems, mockUser } from "@/lib/mock-data/navigation"
import { Avatar } from "@/components/ui/avatar"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-sidebar">
        <SheetHeader className="border-b border-sidebar-border pb-4">
          <SheetTitle className="text-sidebar-foreground">SmellSmith</SheetTitle>
          <div className="flex items-center space-x-3 pt-2">
            <Avatar
              fallback={mockUser.initials}
              size="md"
            />
            <div className="flex-1 min-w-0 text-left">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {mockUser.name}
              </p>
              <p className="text-xs text-sidebar-foreground/70 truncate">
                {mockUser.email}
              </p>
            </div>
          </div>
        </SheetHeader>
        <nav className="flex flex-col space-y-2 mt-6 flex-1">
          {mainNavigationItems.map((item) => {
            const isActive = pathname === item.url
            const Icon = item.icon
            
            return (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "flex items-center space-x-3 text-sm font-medium transition-colors p-3 rounded-lg",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent"
                )}
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </nav>
        
        {/* Settings Navigation */}
        <div className="border-t border-sidebar-border pt-4 mt-4">
          {settingsNavigationItems.map((item) => {
            const isActive = pathname === item.url
            const Icon = item.icon
            
            return (
              <Link
                key={item.title}
                href={item.url}
                className={cn(
                  "flex items-center space-x-3 text-sm font-medium transition-colors p-3 rounded-lg",
                  isActive 
                    ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                    : "text-sidebar-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent"
                )}
                onClick={() => setOpen(false)}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{item.title}</span>
              </Link>
            )
          })}
        </div>
      </SheetContent>
    </Sheet>
  )
}