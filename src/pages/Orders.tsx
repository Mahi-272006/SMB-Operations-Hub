import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Download } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: "completed" | "pending" | "processing" | "cancelled";
  date: string;
}

const Orders = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [orders, setOrders] = useState<Order[]>([
    { id: "#ORD-001", customer: "Sarah Johnson", product: "Chocolate Cupcakes", amount: 45.00, status: "completed", date: "2025-10-02" },
    { id: "#ORD-002", customer: "Mike Davis", product: "Vanilla Brownies", amount: 32.00, status: "pending", date: "2025-10-02" },
    { id: "#ORD-003", customer: "Emily Chen", product: "Red Velvet Cake", amount: 78.00, status: "completed", date: "2025-10-01" },
    { id: "#ORD-004", customer: "John Smith", product: "Cookies Assorted", amount: 25.00, status: "processing", date: "2025-10-01" },
    { id: "#ORD-005", customer: "Lisa Anderson", product: "Lemon Tart", amount: 42.00, status: "completed", date: "2025-09-30" },
    { id: "#ORD-006", customer: "David Lee", product: "Strawberry Cake", amount: 65.00, status: "cancelled", date: "2025-09-30" },
  ]);
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: "",
    product: "",
    amount: "",
    quantity: "",
    status: "pending" as Order["status"],
    date: new Date().toISOString().split('T')[0],
  });

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

  const handleAddOrder = () => {
    if (!newOrder.customer || !newOrder.product || !newOrder.amount || !newOrder.quantity) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const orderNumber = orders.length + 1;
    const totalAmount = parseFloat(newOrder.amount) * parseInt(newOrder.quantity);
    
    const order: Order = {
      id: `#ORD-${String(orderNumber).padStart(3, '0')}`,
      customer: newOrder.customer,
      product: newOrder.product,
      amount: totalAmount,
      status: newOrder.status,
      date: newOrder.date,
    };

    setOrders([order, ...orders]);
    setNewOrder({
      customer: "",
      product: "",
      amount: "",
      quantity: "",
      status: "pending",
      date: new Date().toISOString().split('T')[0],
    });
    setDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Order added successfully",
    });
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
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Order
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Order</DialogTitle>
                  <DialogDescription>
                    Fill in the order details. Total amount will be calculated automatically.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="customer">Customer Name</Label>
                    <Input
                      id="customer"
                      value={newOrder.customer}
                      onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                      placeholder="Enter customer name"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product">Product Name</Label>
                    <Input
                      id="product"
                      value={newOrder.product}
                      onChange={(e) => setNewOrder({ ...newOrder, product: e.target.value })}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="amount">Price per Unit ($)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={newOrder.amount}
                        onChange={(e) => setNewOrder({ ...newOrder, amount: e.target.value })}
                        placeholder="0.00"
                        min="0"
                        step="0.01"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        type="number"
                        value={newOrder.quantity}
                        onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                        placeholder="0"
                        min="1"
                      />
                    </div>
                  </div>
                  {newOrder.amount && newOrder.quantity && (
                    <div className="p-3 bg-secondary rounded-lg">
                      <p className="text-sm text-muted-foreground">Total Amount</p>
                      <p className="text-2xl font-bold text-foreground">
                        ${(parseFloat(newOrder.amount) * parseInt(newOrder.quantity)).toFixed(2)}
                      </p>
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={newOrder.status} onValueChange={(value: Order["status"]) => setNewOrder({ ...newOrder, status: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="date">Order Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newOrder.date}
                      onChange={(e) => setNewOrder({ ...newOrder, date: e.target.value })}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddOrder}>Add Order</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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

