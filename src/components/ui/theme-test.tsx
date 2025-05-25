"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Sun, Moon, Monitor } from "lucide-react"

export function ThemeTest() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading theme test...</div>
  }

  return (
    <div className="space-y-6 p-6">
      <Card className="bg-white dark:bg-gray-900 border border-yellow-200 dark:border-yellow-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Theme Test Component</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300">
              Current Theme: {theme}
            </Badge>
            <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              System Theme: {systemTheme}
            </Badge>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme("light")}
              className={theme === "light" ? "bg-yellow-100 border-yellow-300" : ""}
            >
              <Sun className="h-4 w-4 mr-2" />
              Light
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme("dark")}
              className={theme === "dark" ? "bg-yellow-100 border-yellow-300" : ""}
            >
              <Moon className="h-4 w-4 mr-2" />
              Dark
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme("system")}
              className={theme === "system" ? "bg-yellow-100 border-yellow-300" : ""}
            >
              <Monitor className="h-4 w-4 mr-2" />
              System
            </Button>
          </div>

          <div className="border-t pt-4">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Theme Toggle Component:</p>
            <ThemeToggle />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-white">Light Theme Colors</h3>
              <div className="space-y-1">
                <div className="h-8 bg-white border border-gray-200 rounded flex items-center px-2 text-sm">Background</div>
                <div className="h-8 bg-yellow-500 text-white rounded flex items-center px-2 text-sm">Gold Primary</div>
                <div className="h-8 bg-yellow-100 text-yellow-700 rounded flex items-center px-2 text-sm">Gold Light</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-gray-900 dark:text-white">Dark Theme Colors</h3>
              <div className="space-y-1">
                <div className="h-8 bg-gray-900 border border-gray-700 text-white rounded flex items-center px-2 text-sm">Background</div>
                <div className="h-8 bg-yellow-600 text-white rounded flex items-center px-2 text-sm">Gold Primary</div>
                <div className="h-8 bg-yellow-900/30 text-yellow-400 rounded flex items-center px-2 text-sm">Gold Muted</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}