"use client";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Bell, BellRing, CheckCircle, Clock } from "lucide-react";
import { useJobEvents } from "@/hooks/use-job-events";
import { cn } from "@/lib/utils";

interface NotificationCenterProps {
    className?: string;
}

export function NotificationCenter({ className }: NotificationCenterProps) {
    const { isConnected, activeJobs, completedJobs } = useJobEvents();

    const hasNotifications = activeJobs.length > 0 || completedJobs.length > 0;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="luxury-ghost" size="sm" className={cn("relative", className)}>
                    {hasNotifications ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
                    {activeJobs.length > 0 && (
                        <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
                        >
                            {activeJobs.length}
                        </Badge>
                    )}
                    <span className="sr-only">Toggle Notification Center</span>
                </Button>
            </SheetTrigger>

            <SheetContent side="right" className="min-w-96 sm:min-w-[540px] p-0">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5 text-sidebar-primary" />
                        Activity Center
                    </SheetTitle>
                    <SheetDescription asChild>
                        <div className="flex items-center gap-2 ml-2">
                            <div className={cn("h-2 w-2 rounded-full", isConnected ? "bg-green-500" : "bg-red-500")} />
                            <span className="text-xs">{isConnected ? "Connected" : "Disconnected"}</span>
                        </div>
                    </SheetDescription>
                </SheetHeader>

                <hr />

                <div className="mt-6 space-y-4 px-2">
                    {/* Active Jobs */}
                    {activeJobs.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-sm flex items-center gap-2">
                                <Clock className="h-4 w-4 text-blue-500" />
                                Active Jobs ({activeJobs.length})
                            </h3>

                            <ScrollArea className="max-h-[300px]">
                                <div className="space-y-3">
                                    {activeJobs.map((job) => (
                                        <div key={job.jobId} className="p-3 rounded-lg border bg-card">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium">Job {job.jobId.slice(-6)}</span>
                                                <Badge variant="secondary">{job.progress}%</Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mb-2">{job.message}</p>
                                            <Progress value={job.progress} className="h-2" />
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    )}

                    {/* Separator */}
                    {activeJobs.length > 0 && completedJobs.length > 0 && <Separator />}

                    {/* Completed Jobs */}
                    {completedJobs.length > 0 && (
                        <div className="space-y-3">
                            <h3 className="font-semibold text-sm flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                Completed ({completedJobs.length})
                            </h3>

                            <ScrollArea className="max-h-[200px]">
                                <div className="space-y-2">
                                    {completedJobs.map((job) => (
                                        <div key={job.jobId} className="p-2 rounded border bg-muted/50">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm">Job {job.jobId.slice(-6)}</span>
                                                <Badge variant="outline" className="text-green-600">
                                                    Done
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1">{job.message}</p>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    )}

                    {/* Empty State */}
                    {!hasNotifications && (
                        <div className="flex flex-col items-center justify-center py-8 text-center">
                            <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                            <h3 className="font-semibold text-sm">No Activity</h3>
                            <p className="text-xs text-muted-foreground">Background jobs will appear here</p>
                        </div>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    );
}
