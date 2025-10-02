import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, AlertTriangle, Package } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  threshold: number;
  unit: string;
  lastUpdated: string;
}

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [items] = useState<InventoryItem[]>([
    { id: "INV-001", name: "Chocolate Cupcakes", category: "Baked Goods", stock: 12, threshold: 20, unit: "units", lastUpdated: "2025-10-02" },
    { id: "INV-002", name: "Vanilla Extract", category: "Ingredients", stock: 3, threshold: 10, unit: "bottles", lastUpdated: "2025-10-01" },
    { id: "INV-003", name: "Butter (500g)", category: "Ingredients", stock: 8, threshold: 15, unit: "packs", lastUpdated: "2025-10-02" },
    { id: "INV-004", name: "Red Velvet Cake", category: "Baked Goods", stock: 25, threshold: 15, unit: "units", lastUpdated: "2025-10-02" },
    { id: "INV-005", name: "Flour (1kg)", category: "Ingredients", stock: 45, threshold: 30, unit: "bags", lastUpdated: "2025-10-01" },
    { id: "INV-006", name: "Sugar (1kg)", category: "Ingredients", stock: 5, threshold: 20, unit: "bags", lastUpdated: "2025-09-30" },
  ]);

  const getStockStatus = (stock: number, threshold: number) => {
    const percentage = (stock / threshold) * 100;
    if (percentage <= 30) return { label: "Critical", color: "text-destructive" };
    if (percentage <= 60) return { label: "Low", color: "text-warning" };
    return { label: "Good", color: "text-success" };
  };

  const getStockPercentage = (stock: number, threshold: number) => {
    return Math.min((stock / threshold) * 100, 100);
  };

  const filteredItems = items.filter(
    item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Inventory</h1>
            <p className="text-muted-foreground">Track and manage your stock levels</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Item
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Items</p>
                <p className="text-2xl font-bold text-foreground">{items.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Low Stock</p>
                <p className="text-2xl font-bold text-warning">
                  {items.filter(item => item.stock <= item.threshold * 0.6).length}
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
                <p className="text-sm text-muted-foreground mb-1">Critical</p>
                <p className="text-2xl font-bold text-destructive">
                  {items.filter(item => item.stock <= item.threshold * 0.3).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search inventory by name or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Inventory Table */}
        <Card className="p-6">
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-7 gap-4 pb-4 border-b border-border font-semibold text-muted-foreground text-sm">
              <div>Item ID</div>
              <div>Name</div>
              <div>Category</div>
              <div>Stock</div>
              <div>Stock Level</div>
              <div>Status</div>
              <div>Last Updated</div>
            </div>

            {/* Table Body */}
            {filteredItems.map((item) => {
              const status = getStockStatus(item.stock, item.threshold);
              const percentage = getStockPercentage(item.stock, item.threshold);
              
              return (
                <div
                  key={item.id}
                  className="grid grid-cols-7 gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors items-center"
                >
                  <div className="font-semibold text-foreground">{item.id}</div>
                  <div className="text-foreground">{item.name}</div>
                  <div className="text-muted-foreground">{item.category}</div>
                  <div className="text-foreground">
                    {item.stock} {item.unit}
                  </div>
                  <div className="space-y-1">
                    <Progress value={percentage} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {Math.round(percentage)}% of threshold
                    </p>
                  </div>
                  <div>
                    <Badge variant="outline" className={status.color}>
                      {status.label}
                    </Badge>
                  </div>
                  <div className="text-muted-foreground text-sm">{item.lastUpdated}</div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Inventory;
