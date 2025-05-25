import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { featureCards } from "@/lib/mock-data/navigation";
import Link from "next/link";

export default function Home() {
    return (
        <div className="space-y-8 py-4">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                    Welcome to SmellSmith
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
                    Your AI-powered perfume analysis and fragrance discovery platform
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featureCards.map((feature) => (
                    <Link key={feature.id} href={feature.href} className="group">
                        <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer border-border bg-card">
                            <CardHeader>
                                <CardTitle className="text-card-foreground group-hover:text-primary transition-colors">
                                    {feature.title}
                                </CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    {feature.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {feature.content}
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}