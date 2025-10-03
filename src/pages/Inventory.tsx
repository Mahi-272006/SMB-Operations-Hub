import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, AlertTriangle, Package } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
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
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<InventoryItem[]>([
    { id: "INV-001", name: "Chocolate Cupcakes", category: "Baked Goods", stock: 12, threshold: 20, unit: "units", lastUpdated: "2025-10-02" },
    { id: "INV-002", name: "Vanilla Extract", category: "Ingredients", stock: 3, threshold: 10, unit: "bottles", lastUpdated: "2025-10-01" },
    { id: "INV-003", name: "Butter (500g)", category: "Ingredients", stock: 8, threshold: 15, unit: "packs", lastUpdated: "2025-10-02" },
    { id: "INV-004", name: "Red Velvet Cake", category: "Baked Goods", stock: 25, threshold: 15, unit: "units", lastUpdated: "2025-10-02" },
    { id: "INV-005", name: "Flour (1kg)", category: "Ingredients", stock: 45, threshold: 30, unit: "bags", lastUpdated: "2025-10-01" },
    { id: "INV-006", name: "Sugar (1kg)", category: "Ingredients", stock: 5, threshold: 20, unit: "bags", lastUpdated: "2025-09-30" },
  ]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    stock: "",
    threshold: "",
    unit: "units",
  });

  const getStockStatus = (stock: number, threshold: number) => {
    const percentage = (stock / threshold) * 100;
    if (percentage <= 30) return { label: "Critical", color: "text-destructive" };
    if (percentage <= 60) return { label: "Low", color: "text-warning" };
    return { label: "Good", color: "text-success" };
  };

  const getStockPercentage = (stock: number, threshold: number) => {
    return Math.min((stock / threshold) * 100, 100);
  };

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !newItem.stock || !newItem.threshold) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const itemNumber = items.length + 1;
    const today = new Date().toISOString().split('T')[0];
    
    const item: InventoryItem = {
      id: `INV-${String(itemNumber).padStart(3, '0')}`,
      name: newItem.name,
      category: newItem.category,
      stock: parseInt(newItem.stock),
      threshold: parseInt(newItem.threshold),
      unit: newItem.unit,
      lastUpdated: today,
    };

    setItems([...items, item]);
    setNewItem({
      name: "",
      category: "",
      stock: "",
      threshold: "",
      unit: "units",
    });
    setDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Item added successfully",
    });
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
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New Item</DialogTitle>
                <DialogDescription>
                  Add a new item to your inventory. Stock status will be calculated automatically.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    placeholder="Enter product name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    placeholder="e.g., Baked Goods, Ingredients"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="stock">Current Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={newItem.stock}
                      onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="threshold">Stock Threshold</Label>
                    <Input
                      id="threshold"
                      type="number"
                      value={newItem.threshold}
                      onChange={(e) => setNewItem({ ...newItem, threshold: e.target.value })}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    placeholder="e.g., units, bags, bottles"
                  />
                </div>
                {newItem.stock && newItem.threshold && (
                  <div className="p-3 bg-secondary rounded-lg space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">Stock Status</p>
                      <Badge variant="outline" className={
                        parseInt(newItem.stock) <= parseInt(newItem.threshold) * 0.3 
                          ? "text-destructive" 
                          : parseInt(newItem.stock) <= parseInt(newItem.threshold) * 0.6 
                          ? "text-warning" 
                          : "text-success"
                      }>
                        {parseInt(newItem.stock) <= parseInt(newItem.threshold) * 0.3 
                          ? "Critical" 
                          : parseInt(newItem.stock) <= parseInt(newItem.threshold) * 0.6 
                          ? "Low" 
                          : "Good"}
                      </Badge>
                    </div>
                    <Progress 
                      value={Math.min((parseInt(newItem.stock) / parseInt(newItem.threshold)) * 100, 100)} 
                      className="h-2" 
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddItem}>Add Item</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
