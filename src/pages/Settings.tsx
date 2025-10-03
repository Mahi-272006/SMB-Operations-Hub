import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your application preferences</p>
        </div>

        {/* Business Information */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Business Information</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="business-name">Business Name</Label>
                <Input id="business-name" placeholder="Your Business Name" defaultValue="BizOps Bakery" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-email">Email</Label>
                <Input id="business-email" type="email" placeholder="business@example.com" defaultValue="contact@bizops.com" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" defaultValue="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Business Address" defaultValue="123 Main St, City" />
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Low Stock Alerts</Label>
                <p className="text-sm text-muted-foreground">Receive notifications when inventory is low</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Order Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about new and updated orders</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Performance Reports</Label>
                <p className="text-sm text-muted-foreground">Weekly business performance summaries</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Inventory Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Inventory Settings</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="default-threshold">Default Stock Threshold (%)</Label>
                <Input id="default-threshold" type="number" defaultValue="30" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="critical-level">Critical Stock Level (%)</Label>
                <Input id="critical-level" type="number" defaultValue="15" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-update on Orders</Label>
                <p className="text-sm text-muted-foreground">Automatically reduce stock when orders are placed</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Integrations */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Integrations</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center text-white font-bold">
                  G
                </div>
                <div>
                  <p className="font-semibold text-foreground">Google Sheets</p>
                  <p className="text-sm text-muted-foreground">Connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                  W
                </div>
                <div>
                  <p className="font-semibold text-foreground">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button size="sm">Connect</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div>
                  <p className="font-semibold text-foreground">Razorpay</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button size="sm">Connect</Button>
            </div>
            <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div>
                  <p className="font-semibold text-foreground">Shopify</p>
                  <p className="text-sm text-muted-foreground">Not connected</p>
                </div>
              </div>
              <Button size="sm">Connect</Button>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

