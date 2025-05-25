import { dashboardStats } from "@/lib/mock-data/navigation"

export default function Dashboard() {
  return (
    <div className="space-y-8 py-4">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Overview of your fragrance analytics and insights
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <div key={stat.id} className="rounded-lg border border-border bg-card text-card-foreground shadow-sm p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
            <div className="flex flex-row items-center justify-between space-y-0 pb-3">
              <h3 className="tracking-tight text-sm font-medium text-card-foreground">{stat.title}</h3>
            </div>
            <div className="text-3xl font-bold text-card-foreground mb-2">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.change && <span className="font-medium text-primary">{stat.change} </span>}
              {stat.changeDescription}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}