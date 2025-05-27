"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Activity, CheckCircle, Clock } from "lucide-react";
import { useJobEvents } from "@/hooks/use-job-events";
import { cn } from "@/lib/utils";

interface ActivityIndicatorProps {
    className?: string;
    compact?: boolean;
}

export function ActivityIndicator({ className, compact = false }: ActivityIndicatorProps) {
    const { activeJobs, completedJobs, isConnected } = useJobEvents();

    const totalActiveJobs = activeJobs.length;
    const hasActivity = totalActiveJobs > 0;

    // Calculate overall progress for active jobs
    const overallProgress =
        totalActiveJobs > 0 ? activeJobs.reduce((sum, job) => sum + job.progress, 0) / totalActiveJobs : 0;

    if (!hasActivity && completedJobs.length === 0) {
        return null;
    }

    if (compact) {
        return (
            <div className={cn("flex items-center gap-2", className)}>
                {hasActivity && (
                    <>
                        <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-blue-500 animate-pulse" />
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                                {totalActiveJobs}
                            </Badge>
                        </div>
                        <div
                            className={cn(
                                "h-1 w-8 rounded-full bg-muted overflow-hidden",
                                !isConnected && "opacity-50",
                            )}
                        >
                            <div
                                className="h-full bg-blue-500 transition-all duration-300"
                                style={{ width: `${overallProgress}%` }}
                            />
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <Card className={cn("w-full max-w-sm", className)}>
            <CardContent className="p-3">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                        {hasActivity ? (
                            <Activity className="h-4 w-4 text-blue-500 animate-pulse" />
                        ) : (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                        )}

                        <div className="flex flex-col">
                            <span className="text-sm font-medium">
                                {hasActivity ? `${totalActiveJobs} Active` : "All Complete"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                {isConnected ? "Live updates" : "Disconnected"}
                            </span>
                        </div>
                    </div>

                    {hasActivity && (
                        <div className="flex-1 space-y-1">
                            <Progress value={overallProgress} className="h-1" />
                            <div className="text-xs text-muted-foreground text-right">
                                {Math.round(overallProgress)}%
                            </div>
                        </div>
                    )}
                </div>

                {/* Latest active job message */}
                {hasActivity && activeJobs[0] && (
                    <div className="mt-2 text-xs text-muted-foreground truncate">{activeJobs[0].message}</div>
                )}
            </CardContent>
        </Card>
    );
}
