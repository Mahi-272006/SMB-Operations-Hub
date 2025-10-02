import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const salesData = [
  { name: "Mon", sales: 4000, orders: 24 },
  { name: "Tue", sales: 3000, orders: 18 },
  { name: "Wed", sales: 5000, orders: 32 },
  { name: "Thu", sales: 4500, orders: 28 },
  { name: "Fri", sales: 6000, orders: 38 },
  { name: "Sat", sales: 5500, orders: 35 },
  { name: "Sun", sales: 4800, orders: 30 },
];

const productData = [
  { name: "Cupcakes", value: 400, color: "hsl(var(--chart-1))" },
  { name: "Brownies", value: 300, color: "hsl(var(--chart-2))" },
  { name: "Cakes", value: 300, color: "hsl(var(--chart-3))" },
  { name: "Cookies", value: 200, color: "hsl(var(--chart-4))" },
];

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 16000 },
  { month: "May", revenue: 22000 },
  { month: "Jun", revenue: 25000 },
];

const Analytics = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics</h1>
          <p className="text-muted-foreground">Detailed insights into your business performance</p>
        </div>

        {/* Sales Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Weekly Sales Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: "hsl(var(--primary))", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Product Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => entry.name}
                  outerRadius={100}
                  fill="hsl(var(--primary))"
                  dataKey="value"
                >
                  {productData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Revenue Chart */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="revenue" fill="hsl(var(--accent))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Insights Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Top Selling Product</h4>
            <p className="text-2xl font-bold text-foreground mb-1">Cupcakes</p>
            <p className="text-sm text-success">+32% vs last week</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Avg Order Value</h4>
            <p className="text-2xl font-bold text-foreground mb-1">$48.50</p>
            <p className="text-sm text-success">+8% vs last week</p>
          </Card>
          <Card className="p-6 bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
            <h4 className="text-sm font-medium text-muted-foreground mb-2">Customer Retention</h4>
            <p className="text-2xl font-bold text-foreground mb-1">76%</p>
            <p className="text-sm text-success">+4% vs last month</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
