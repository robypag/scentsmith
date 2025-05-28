"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TopExpensiveIngredientsChartProps {
    data: Array<{
        id: string;
        name: string;
        cost: number;
        supplier: string | null;
        volatility: string | null;
    }>;
}

export function TopExpensiveIngredientsChart({ data }: TopExpensiveIngredientsChartProps) {
    if (!data || data.length === 0) {
        return (
            <div className="flex items-center justify-center h-[300px] text-gray-500 dark:text-gray-400">
                <p>No ingredient data available</p>
            </div>
        );
    }

    const chartData = data.map((ingredient) => ({
        name: ingredient.name.length > 15 ? `${ingredient.name.substring(0, 15)}...` : ingredient.name,
        fullName: ingredient.name,
        cost: ingredient.cost,
        supplier: ingredient.supplier || "Unknown",
        volatility: ingredient.volatility || "Unknown",
    }));

    const CustomTooltip = ({
        active,
        payload,
    }: {
        active?: boolean;
        payload?: Array<{
            payload: {
                fullName: string;
                cost: number;
                supplier: string;
                volatility: string;
            };
        }>;
        label?: string;
    }) => {
        if (active && payload && payload.length) {
            const data = payload[0].payload;
            return (
                <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-yellow-200 dark:border-yellow-700">
                    <p className="font-semibold text-gray-900 dark:text-white">{data.fullName}</p>
                    <p className="text-yellow-600 dark:text-yellow-400">Cost: ${data.cost.toFixed(2)}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Supplier: {data.supplier}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Volatility: {data.volatility}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis
                        dataKey="name"
                        className="text-gray-600 dark:text-gray-400"
                        angle={-45}
                        textAnchor="end"
                        height={60}
                        fontSize={12}
                    />
                    <YAxis
                        className="text-gray-600 dark:text-gray-400"
                        fontSize={12}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                        dataKey="cost"
                        fill="url(#goldGradient)"
                        radius={[4, 4, 0, 0]}
                        className="hover:opacity-80 transition-opacity"
                    />
                    <defs>
                        <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fbbf24" />
                            <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                    </defs>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
