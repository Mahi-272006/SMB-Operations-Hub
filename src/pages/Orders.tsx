import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Download } from "lucide-react";
import { useState } from "react";

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "completed" | "pending" | "processing" | "cancelled";
  date: string;
}

const Orders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [orders] = useState<Order[]>([
    { id: "#ORD-001", customer: "Sarah Johnson", product: "Chocolate Cupcakes", amount: 45.00, status: "completed", date: "2025-10-02" },
    { id: "#ORD-002", customer: "Mike Davis", product: "Vanilla Brownies", amount: 32.00, status: "pending", date: "2025-10-02" },
    { id: "#ORD-003", customer: "Emily Chen", product: "Red Velvet Cake", amount: 78.00, status: "completed", date: "2025-10-01" },
    { id: "#ORD-004", customer: "John Smith", product: "Cookies Assorted", amount: 25.00, status: "processing", date: "2025-10-01" },
    { id: "#ORD-005", customer: "Lisa Anderson", product: "Lemon Tart", amount: 42.00, status: "completed", date: "2025-09-30" },
    { id: "#ORD-006", customer: "David Lee", product: "Strawberry Cake", amount: 65.00, status: "cancelled", date: "2025-09-30" },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success text-success-foreground";
      case "pending":
        return "bg-warning text-warning-foreground";
      case "processing":
        return "bg-primary text-primary-foreground";
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredOrders = orders.filter(
    order =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Orders</h1>
            <p className="text-muted-foreground">Manage and track all your orders</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Order
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by ID, customer, or product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </Card>

        {/* Orders Table */}
        <Card className="p-6">
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-6 gap-4 pb-4 border-b border-border font-semibold text-muted-foreground text-sm">
              <div>Order ID</div>
              <div>Customer</div>
              <div>Product</div>
              <div>Amount</div>
              <div>Status</div>
              <div>Date</div>
            </div>

            {/* Table Body */}
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="grid grid-cols-6 gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors items-center"
              >
                <div className="font-semibold text-foreground">{order.id}</div>
                <div className="text-foreground">{order.customer}</div>
                <div className="text-muted-foreground">{order.product}</div>
                <div className="font-semibold text-foreground">${order.amount.toFixed(2)}</div>
                <div>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <div className="text-muted-foreground">{order.date}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
