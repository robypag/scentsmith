import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Shield } from "lucide-react";
import { getSeverityBadge, getComplianceStatus } from "@/lib/utils/compliance-badges";

interface ComplianceAlert {
  formula: string;
  issue: string;
  severity: string;
}

interface Formula {
  id: string;
  name: string;
  isCompliant: boolean;
  lastComplianceCheck?: Date;
}

interface ComplianceAlertsTabProps {
  complianceAlerts: ComplianceAlert[];
  formulae: Formula[];
}

export function ComplianceAlertsTab({ complianceAlerts, formulae }: ComplianceAlertsTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Active Compliance Alerts</CardTitle>
          <CardDescription>
            Formulae requiring immediate attention for compliance issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceAlerts.map((alert, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg ${
                  alert.severity === "high"
                    ? "bg-red-50 border-red-200"
                    : alert.severity === "medium"
                      ? "bg-yellow-50 border-yellow-200"
                      : "bg-blue-50 border-blue-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <AlertTriangle
                        className={`w-4 h-4 ${
                          alert.severity === "high"
                            ? "text-red-500"
                            : alert.severity === "medium"
                              ? "text-yellow-500"
                              : "text-blue-500"
                        }`}
                      />
                      <h4 className="font-medium">{alert.formula}</h4>
                      {getSeverityBadge(alert.severity)}
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.issue}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Review
                    </Button>
                    <Button variant="outline" size="sm">
                      Fix
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Formula Compliance Status</CardTitle>
          <CardDescription>Overview of all formulae and their compliance status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {formulae.map((formula) => (
              <div
                key={formula.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="space-y-1">
                  <h4 className="font-medium">{formula.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Last checked:{" "}
                    {formula.lastComplianceCheck
                      ? new Date(formula.lastComplianceCheck).toLocaleDateString()
                      : "Never"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getComplianceStatus(formula.isCompliant)}
                  <Button variant="outline" size="sm">
                    <Shield className="w-3 h-3 mr-1" />
                    Check Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}