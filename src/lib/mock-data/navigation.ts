import { Settings, TextSearchIcon, TestTube, Beaker, BarChart3, Shield } from "lucide-react";

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
