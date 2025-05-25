"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

// Left Sidebar Context
type LeftSidebarContextProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  toggle: () => void
}

const LeftSidebarContext = createContext<LeftSidebarContextProps | null>(null)

export function useLeftSidebar() {
  const context = useContext(LeftSidebarContext)
  if (!context) {
    throw new Error("useLeftSidebar must be used within a LeftSidebarProvider")
  }
  return context
}

export function LeftSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  // Responsive behavior - close on mobile by default
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      
      if (mobile) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <LeftSidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </LeftSidebarContext.Provider>
  )
}

// Right Sidebar Context
type RightSidebarContextProps = {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  toggle: () => void
}

const RightSidebarContext = createContext<RightSidebarContextProps | null>(null)

export function useRightSidebar() {
  const context = useContext(RightSidebarContext)
  if (!context) {
    throw new Error("useRightSidebar must be used within a RightSidebarProvider")
  }
  return context
}

export function RightSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  return (
    <RightSidebarContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </RightSidebarContext.Provider>
  )
}

// Combined Provider
export function SidebarProviders({ children }: { children: React.ReactNode }) {
  return (
    <LeftSidebarProvider>
      <RightSidebarProvider>
        {children}
      </RightSidebarProvider>
    </LeftSidebarProvider>
  )
}