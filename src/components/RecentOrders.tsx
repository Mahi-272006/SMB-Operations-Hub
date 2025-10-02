import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const orders = [
  { id: "#ORD-001", customer: "Sarah Johnson", product: "Chocolate Cupcakes", amount: "$45.00", status: "completed" },
  { id: "#ORD-002", customer: "Mike Davis", product: "Vanilla Brownies", amount: "$32.00", status: "pending" },
  { id: "#ORD-003", customer: "Emily Chen", product: "Red Velvet Cake", amount: "$78.00", status: "completed" },
  { id: "#ORD-004", customer: "John Smith", product: "Cookies Assorted", amount: "$25.00", status: "processing" },
];

const RecentOrders = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "processing":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h3>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
          >
            <div className="flex-1">
              <p className="font-semibold text-foreground">{order.id}</p>
              <p className="text-sm text-muted-foreground">{order.customer}</p>
            </div>
            <div className="flex-1 text-center">
              <p className="text-sm font-medium text-foreground">{order.product}</p>
            </div>
            <div className="flex items-center gap-4">
              <p className="font-semibold text-foreground">{order.amount}</p>
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentOrders;
