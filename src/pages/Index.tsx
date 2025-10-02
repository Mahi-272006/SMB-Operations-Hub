import DashboardLayout from "@/components/DashboardLayout";
import MetricCard from "@/components/MetricCard";
import SalesChart from "@/components/SalesChart";
import RecentOrders from "@/components/RecentOrders";
import InventoryAlerts from "@/components/InventoryAlerts";
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Revenue"
            value="$12,543"
            change="+12.5% from last week"
            changeType="positive"
            icon={DollarSign}
          />
          <MetricCard
            title="Total Orders"
            value="248"
            change="+8.2% from last week"
            changeType="positive"
            icon={ShoppingCart}
          />
          <MetricCard
            title="Inventory Items"
            value="145"
            change="3 items low stock"
            changeType="negative"
            icon={Package}
          />
          <MetricCard
            title="Growth Rate"
            value="23.5%"
            change="+4.3% from last month"
            changeType="positive"
            icon={TrendingUp}
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart />
          </div>
          <div>
            <InventoryAlerts />
          </div>
        </div>

        {/* Recent Orders */}
        <RecentOrders />
      </div>
    </DashboardLayout>
  );
};

export default Index;
