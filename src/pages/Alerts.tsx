import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TrendingUp, Package, Clock } from "lucide-react";

interface Alert {
  id: string;
  type: "warning" | "info" | "critical";
  title: string;
  message: string;
  time: string;
  icon: any;
}

const Alerts = () => {
  const alerts: Alert[] = [
    {
      id: "1",
      type: "critical",
      title: "Critical Stock Level",
      message: "Vanilla Extract is critically low (3 units remaining). Restock immediately.",
      time: "5 minutes ago",
      icon: AlertTriangle,
    },
    {
      id: "2",
      type: "warning",
      title: "Low Stock Alert",
      message: "Chocolate Cupcakes stock is below threshold (12/20 units).",
      time: "1 hour ago",
      icon: Package,
    },
    {
      id: "3",
      type: "info",
      title: "Sales Milestone",
      message: "Congratulations! You've reached $12,500 in sales this week.",
      time: "2 hours ago",
      icon: TrendingUp,
    },
    {
      id: "4",
      type: "warning",
      title: "Pending Orders",
      message: "5 orders are awaiting processing for more than 24 hours.",
      time: "3 hours ago",
      icon: Clock,
    },
    {
      id: "5",
      type: "critical",
      title: "Stock Alert",
      message: "Sugar (1kg) is critically low (5/20 bags remaining).",
      time: "5 hours ago",
      icon: AlertTriangle,
    },
    {
      id: "6",
      type: "info",
      title: "Performance Update",
      message: "Brownies outsold cupcakes by 30% this week.",
      time: "1 day ago",
      icon: TrendingUp,
    },
  ];

  const getAlertStyle = (type: string) => {
    switch (type) {
      case "critical":
        return {
          border: "border-destructive/50",
          bg: "bg-destructive/5",
          badge: "bg-destructive text-destructive-foreground",
          icon: "text-destructive",
        };
      case "warning":
        return {
          border: "border-warning/50",
          bg: "bg-warning/5",
          badge: "bg-warning text-warning-foreground",
          icon: "text-warning",
        };
      case "info":
        return {
          border: "border-primary/50",
          bg: "bg-primary/5",
          badge: "bg-primary text-primary-foreground",
          icon: "text-primary",
        };
      default:
        return {
          border: "border-border",
          bg: "bg-secondary",
          badge: "bg-secondary text-secondary-foreground",
          icon: "text-muted-foreground",
        };
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Alerts & Notifications</h1>
            <p className="text-muted-foreground">Stay informed about important business events</p>
          </div>
          <Button variant="outline">Mark All as Read</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Critical Alerts</p>
                <p className="text-2xl font-bold text-destructive">
                  {alerts.filter(a => a.type === "critical").length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Warnings</p>
                <p className="text-2xl font-bold text-warning">
                  {alerts.filter(a => a.type === "warning").length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-warning/10">
                <AlertTriangle className="h-6 w-6 text-warning" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Info</p>
                <p className="text-2xl font-bold text-primary">
                  {alerts.filter(a => a.type === "info").length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {alerts.map((alert) => {
            const styles = getAlertStyle(alert.type);
            const Icon = alert.icon;
            
            return (
              <Card
                key={alert.id}
                className={`p-6 ${styles.border} ${styles.bg} hover:shadow-md transition-all`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-background`}>
                    <Icon className={`h-6 w-6 ${styles.icon}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{alert.title}</h3>
                      <Badge className={styles.badge}>
                        {alert.type}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{alert.message}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">{alert.time}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Dismiss</Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
