import { dashboardStats } from "@/lib/mock-data/navigation";
import { LuxuryCard, PremiumCard, Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Sparkles, TrendingUp, Star, Award, Crown, Gem } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="space-y-8 py-4">
            {/* Hero Section */}
            <div className="relative space-y-4 p-8 rounded-2xl bg-gradient-to-br from-white via-yellow-50 to-amber-50 dark:from-gray-900 dark:via-yellow-900/20 dark:to-amber-900/20 border border-yellow-200 dark:border-yellow-700 shadow-xl shadow-yellow-500/10 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/50 via-transparent to-yellow-100/50 dark:from-yellow-900/30 dark:via-transparent dark:to-yellow-900/30 opacity-50" />
                <div className="relative z-10">
                    <div className="flex items-center space-x-3 mb-4">
                        <Crown className="h-8 w-8 text-yellow-600 dark:text-yellow-400 animate-pulse" />
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-yellow-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent">
                            Master Perfumer Dashboard
                        </h1>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
                        Welcome to your professional fragrance development platform. Manage formulae, track compliance,
                        and optimize your perfume creations.
                    </p>
                    <div className="flex items-center space-x-4 mt-6">
                        <Button
                            variant="luxury"
                            className="shadow-lg shadow-yellow-500/20 hover:shadow-xl hover:shadow-yellow-500/30"
                        >
                            <Sparkles className="h-4 w-4 mr-2" />
                            Create New Formula
                        </Button>
                        <Button variant="luxury-outline">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            View Analytics
                        </Button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {dashboardStats.map((stat, index) => (
                    <LuxuryCard key={stat.id} className="group hover:scale-[1.02] transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="tracking-tight text-sm font-semibold text-gray-900 dark:text-white">
                                {stat.title}
                            </CardTitle>
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 flex items-center justify-center">
                                {index === 0 && <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />}
                                {index === 1 && <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />}
                                {index === 2 && <Gem className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />}
                                {index === 3 && <Crown className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300">
                                {stat.value}
                            </div>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                {stat.change && (
                                    <Badge
                                        variant="secondary"
                                        className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700 mr-2"
                                    >
                                        {stat.change}
                                    </Badge>
                                )}
                                {stat.changeDescription}
                            </p>
                        </CardContent>
                    </LuxuryCard>
                ))}
            </div>

            {/* Premium Features Section */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <PremiumCard className="group">
                    <CardHeader>
                        <div className="flex items-center space-x-3">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 flex items-center justify-center">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Formula Development
                                </CardTitle>
                                <p className="text-sm text-gray-600 dark:text-gray-400">AI-powered creation</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Create sophisticated formulae with AI assistance for ingredient optimization, cost analysis,
                            and compliance checking.
                        </p>
                        <Button variant="luxury-outline" size="sm" className="w-full">
                            Create Formula
                        </Button>
                    </CardContent>
                </PremiumCard>

                <PremiumCard className="group">
                    <CardHeader>
                        <div className="flex items-center space-x-3">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-rose-500 to-orange-600 flex items-center justify-center">
                                <TrendingUp className="h-6 w-6 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Compliance Monitoring
                                </CardTitle>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Regulatory tracking</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Ensure all formulae meet IFRA standards and regional regulations with automated compliance
                            checking and alerts.
                        </p>
                        <Button variant="luxury-outline" size="sm" className="w-full">
                            View Compliance
                        </Button>
                    </CardContent>
                </PremiumCard>

                <PremiumCard className="group">
                    <CardHeader>
                        <div className="flex items-center space-x-3">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-gray-400 to-yellow-300 flex items-center justify-center">
                                <Award className="h-6 w-6 text-gray-900" />
                            </div>
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Ingredient Analytics
                                </CardTitle>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Usage insights & trends</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Track ingredient usage patterns, cost optimization opportunities, and discover trending
                            materials in perfumery.
                        </p>
                        <Button variant="luxury-outline" size="sm" className="w-full">
                            View Analytics
                        </Button>
                    </CardContent>
                </PremiumCard>
            </div>

            {/* Recent Activity */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Recent Activity</h2>
                <Card className="border-yellow-200 dark:border-yellow-700 bg-gradient-to-r from-white via-yellow-50/20 to-white dark:from-gray-900 dark:via-yellow-900/10 dark:to-gray-900">
                    <CardContent className="p-6">
                        <div className="space-y-4">
                            {[
                                {
                                    action: "Formula approved",
                                    item: "Citrus Marine Accord v2.1",
                                    time: "2 hours ago",
                                    type: "analysis",
                                },
                                {
                                    action: "Compliance check completed",
                                    item: "Woody Amber Complex",
                                    time: "5 hours ago",
                                    type: "collection",
                                },
                                {
                                    action: "Ingredient alert",
                                    item: "Rose oxide price increase",
                                    time: "1 day ago",
                                    type: "trend",
                                },
                                {
                                    action: "AI suggestion",
                                    item: "Formula optimization opportunity",
                                    time: "2 days ago",
                                    type: "ai",
                                },
                            ].map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-yellow-100 dark:border-yellow-800 hover:border-yellow-200 dark:hover:border-yellow-700 transition-colors"
                                >
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`h-2 w-2 rounded-full ${
                                                activity.type === "analysis"
                                                    ? "bg-yellow-500"
                                                    : activity.type === "collection"
                                                      ? "bg-rose-500"
                                                      : activity.type === "trend"
                                                        ? "bg-orange-600"
                                                        : "bg-gray-400"
                                            }`}
                                        />
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {activity.action}
                                            </p>
                                            <p className="text-xs text-yellow-600 dark:text-yellow-400">
                                                {activity.item}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
