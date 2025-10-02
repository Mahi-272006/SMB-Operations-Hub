import { Card } from "@/components/ui/card";
import { AlertTriangle, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const alerts = [
  { item: "Chocolate Cupcakes", stock: 12, threshold: 20, severity: "warning" },
  { item: "Vanilla Extract", stock: 3, threshold: 10, severity: "critical" },
  { item: "Butter (500g)", stock: 8, threshold: 15, severity: "warning" },
];

const InventoryAlerts = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Inventory Alerts</h3>
        <Package className="h-5 w-5 text-primary" />
      </div>
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border hover:border-primary transition-colors"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle 
                className={`h-5 w-5 ${
                  alert.severity === "critical" ? "text-destructive" : "text-warning"
                }`} 
              />
              <div>
                <p className="font-medium text-foreground">{alert.item}</p>
                <p className="text-sm text-muted-foreground">
                  {alert.stock} units remaining
                </p>
              </div>
            </div>
            <Badge
              variant={alert.severity === "critical" ? "destructive" : "secondary"}
              className={alert.severity === "warning" ? "bg-warning text-warning-foreground" : ""}
            >
              Low Stock
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default InventoryAlerts;
