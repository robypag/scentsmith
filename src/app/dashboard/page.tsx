import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChartCard, TopExpensiveIngredients } from "@/components/analytics";

import { Star, Award } from "lucide-react";
import { getIngredientCountWithChange } from "@/lib/actions/ingredients";
import { DashboardStat } from "@/types/dashboard-stat";
import { getFormulaeCountWithDrafts } from "@/lib/actions/formulae";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const getStatistics = async (): Promise<DashboardStat[]> => {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);
    const [ingredientsStat, formulaStat] = await Promise.all([
        getIngredientCountWithChange(lastMonth),
        getFormulaeCountWithDrafts(),
    ]);
    return [
        {
            id: "ingredients-stock",
            title: "Ingredients in Stock",
            change: ingredientsStat.data?.change || "No change",
            value: ingredientsStat.data?.value || 0,
            changeDescription: "From last month",
            icon: <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />,
        },
        {
            id: "formula-draft",
            title: "Total Formulae",
            change: formulaStat.data?.change || "No change",
            value: formulaStat.data?.value || 0,
            changeDescription: "to Approve",
            icon: <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />,
        },
    ];
};

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect("/auth/signin");
    }

    const stats = await getStatistics();
    return (
        <div className="space-y-8 py-4">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <Card key={stat.id} className="group hover:scale-[1.02] transition-all duration-300">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                            <CardTitle className="tracking-tight text-sm font-semibold text-gray-900 dark:text-white">
                                {stat.title}
                            </CardTitle>
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900/30 dark:to-amber-900/30 flex items-center justify-center">
                                {stat.icon}
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
                    </Card>
                ))}
            </div>

            {/* Analytics Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Analytics</h2>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                    <ChartCard
                        title="Top 10 Most Expensive Ingredients"
                        description="Ingredient cost analysis for formula optimization"
                        className="lg:col-span-2"
                    >
                        <TopExpensiveIngredients />
                    </ChartCard>
                </div>
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
