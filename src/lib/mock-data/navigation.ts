import { Home, Settings, User, Database, Brain, Search, Heart, BarChart3 } from "lucide-react"

export const mainNavigationItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Database,
  },
  {
    title: "AI Assistant",
    url: "/assistant",
    icon: Brain,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
  {
    title: "Collections",
    url: "/collections",
    icon: Heart,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export const headerNavigationItems = [
  {
    title: "Discover",
    url: "/discover",
  },
  {
    title: "Compare",
    url: "/compare",
  },
  {
    title: "Trending",
    url: "/trending",
  },
  {
    title: "Community",
    url: "/community",
  },
]

export const dashboardStats = [
  {
    id: "total-fragrances",
    title: "Total Fragrances",
    value: 124,
    change: "+20%",
    changeDescription: "from last month",
  },
  {
    id: "ai-analyses", 
    title: "AI Analyses",
    value: 89,
    change: "+15%",
    changeDescription: "from last month",
  },
  {
    id: "collections",
    title: "Collections", 
    value: 12,
    change: "+2",
    changeDescription: "new this week",
  },
  {
    id: "recommendations",
    title: "Recommendations",
    value: 47,
    change: "",
    changeDescription: "Based on your preferences",
  },
]

export const featureCards = [
  {
    id: "fragrance-analysis",
    title: "Fragrance Analysis",
    description: "Analyze perfume compositions with AI-powered insights",
    content: "Get detailed breakdowns of notes, longevity, and projection for any fragrance.",
    href: "/analyze",
  },
  {
    id: "collection-management",
    title: "Collection Management", 
    description: "Organize and track your perfume collection",
    content: "Keep detailed records of your fragrances with photos, notes, and ratings.",
    href: "/collections",
  },
  {
    id: "ai-recommendations",
    title: "AI Recommendations",
    description: "Discover new fragrances based on your preferences", 
    content: "Get personalized recommendations using advanced vector similarity search.",
    href: "/recommendations",
  },
]

export const mockUser = {
  id: "1",
  name: "Alex Johnson",
  email: "demo@smellsmith.com",
  avatar: "/avatar-placeholder.png", // Local fallback instead of external URL
  initials: "AJ",
  role: "Premium User",
  joinedAt: "2024-01-15",
  preferences: {
    theme: "light",
    notifications: true,
    language: "en",
  },
}