import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, FileText } from "lucide-react";
import { getRegionBadge } from "@/lib/utils/compliance-badges";

interface ComplianceRule {
  id: string;
  ingredientId: string;
  regulation: string;
  region: string;
  restrictions: string;
  maxConcentration: number;
  effectiveDate: Date;
}

interface Ingredient {
  id: string;
  name: string;
}

interface ComplianceRegulationsTabProps {
  filteredRules: ComplianceRule[];
  ingredients: Ingredient[];
  searchTerm: string;
  regionFilter: string;
  onSearchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
}

export function ComplianceRegulationsTab({
  filteredRules,
  ingredients,
  searchTerm,
  regionFilter,
  onSearchChange,
  onRegionChange
}: ComplianceRegulationsTabProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search-regulations">Search Regulations</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search-regulations"
                  placeholder="Search by ingredient or regulation..."
                  className="pl-10 border-gold/30 focus-visible:ring-gold/30"
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Label htmlFor="region-filter">Region Filter</Label>
              <select
                id="region-filter"
                className="w-full h-10 px-3 py-2 bg-background border border-gold/30 rounded-md text-sm"
                value={regionFilter}
                onChange={(e) => onRegionChange(e.target.value)}
              >
                <option value="all">All Regions</option>
                <option value="EU">European Union</option>
                <option value="US">United States</option>
                <option value="Global">Global</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Regulations</CardTitle>
          <CardDescription>Current regulatory restrictions and guidelines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRules.map((rule) => {
              const ingredient = ingredients.find((ing) => ing.id === rule.ingredientId);
              return (
                <div key={rule.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium">{ingredient?.name}</h4>
                        {getRegionBadge(rule.region)}
                        <Badge variant="outline">{rule.regulation}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rule.restrictions}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Max Concentration: {rule.maxConcentration}%</span>
                        <span>
                          Effective: {new Date(rule.effectiveDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <FileText className="w-3 h-3 mr-1" />
                      View Document
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}