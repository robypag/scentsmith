import { Settings, Brain, TextSearchIcon, TestTube, Beaker, BarChart3, Shield } from "lucide-react";

export const mainNavigationItems = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: BarChart3,
    },
    {
        title: "Formulae",
        url: "/formulae",
        icon: TestTube,
    },
    {
        title: "Ingredients",
        url: "/ingredients",
        icon: Beaker,
    },
    {
        title: "AI Assistant",
        url: "/assistant",
        icon: Brain,
    },
    {
        title: "Documents",
        url: "/documents",
        icon: TextSearchIcon,
    },
    {
        title: "Compliance",
        url: "/compliance",
        icon: Shield,
    },
];

export const settingsNavigationItems = [
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];

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
];

export const dashboardStats = [
    {
        id: "active-formulae",
        title: "Active Formulae",
        value: 124,
        change: "+8",
        changeDescription: "new this month",
    },
    {
        id: "ingredients-stock",
        title: "Ingredients in Stock",
        value: 347,
        change: "+23",
        changeDescription: "from last month",
    },
    {
        id: "compliance-alerts",
        title: "Compliance Alerts",
        value: 3,
        change: "-5",
        changeDescription: "resolved this week",
    },
    {
        id: "expiring-formulae",
        title: "Expiring Soon",
        value: 12,
        change: "",
        changeDescription: "Next 30 days",
    },
];

export const featureCards = [
    {
        id: "formula-development",
        title: "Formula Development",
        description: "Create and manage perfume formulae with precision",
        content: "Build complex formulae with ingredient tracking, percentage calculations, and compliance checks.",
        href: "/formulae",
    },
    {
        id: "compliance-monitoring",
        title: "Compliance Monitoring",
        description: "Ensure regulatory compliance across all markets",
        content: "AI-powered compliance checking against IFRA standards and regional regulations.",
        href: "/compliance",
    },
    {
        id: "ingredient-insights",
        title: "Ingredient Insights",
        description: "Advanced analytics on ingredient usage and trends",
        content: "Track ingredient costs, usage patterns, and discover optimization opportunities.",
        href: "/ingredients",
    },
];

export const mockUser = {
    id: "1",
    name: "Dr. Alex Johnson",
    email: "demo@smellsmith.com",
    avatar: "/avatar-placeholder.png", // Local fallback instead of external URL
    initials: "AJ",
    role: "Master Perfumer",
    joinedAt: "2024-01-15",
    preferences: {
        theme: "light",
        notifications: true,
        language: "en",
    },
};
