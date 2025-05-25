import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ComplianceReportsTab() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Compliance Reports</CardTitle>
          <CardDescription>
            Generate and view compliance reports for different markets
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">EU Market Report</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Compliance status for European Union regulations
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Compliant Formulae</span>
                  <span className="text-green-600 font-medium">85%</span>
                </div>
                <div className="flex justify-between">
                  <span>Non-Compliant</span>
                  <span className="text-red-600 font-medium">15%</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Generate Full Report
              </Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">IFRA Global Report</h4>
              <p className="text-sm text-muted-foreground mb-3">
                International Fragrance Association compliance
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Compliant Formulae</span>
                  <span className="text-green-600 font-medium">92%</span>
                </div>
                <div className="flex justify-between">
                  <span>Non-Compliant</span>
                  <span className="text-red-600 font-medium">8%</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full mt-3">
                Generate Full Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}