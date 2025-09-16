import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import Navigation from "@/components/Navigation";
import { Bell, MapPin, Mail, Smartphone, Droplets, Waves, Wind, Fish, AlertTriangle, HelpCircle } from "lucide-react";

const hazardTypes = [
  { id: "oil", label: "Oil Spills", icon: Droplets, color: "text-hazard-oil" },
  { id: "debris", label: "Marine Debris", icon: Waves, color: "text-hazard-debris" },
  { id: "storm", label: "Storm/Waves", icon: Wind, color: "text-hazard-storm" },
  { id: "animal", label: "Marine Life", icon: Fish, color: "text-hazard-animal" },
  { id: "water", label: "Water Quality", icon: AlertTriangle, color: "text-hazard-water" },
  { id: "other", label: "Other", icon: HelpCircle, color: "text-hazard-other" }
];

const Alerts = () => {
  const [alertsEnabled, setAlertsEnabled] = useState(false);
  const [selectedHazards, setSelectedHazards] = useState<string[]>([]);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [radius, setRadius] = useState(10);
  const [location, setLocation] = useState("");

  const handleHazardToggle = (hazardId: string, checked: boolean) => {
    if (checked) {
      setSelectedHazards([...selectedHazards, hazardId]);
    } else {
      setSelectedHazards(selectedHazards.filter(id => id !== hazardId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const alertConfig = {
      enabled: alertsEnabled,
      hazardTypes: selectedHazards,
      location,
      radius,
      notifications: {
        email: emailNotifications ? email : null,
        sms: smsNotifications ? phone : null
      }
    };

    console.log("Alert configuration:", alertConfig);
    
    // Here you would save the configuration to your backend
    alert("Alert preferences saved successfully!");
  };

  return (
    <div className="min-h-screen surface-gradient">
      <Navigation />
      
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Alert Subscriptions</h1>
            <p className="text-xl text-muted-foreground">
              Stay informed about ocean hazards in your area
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Enable Alerts */}
            <Card className="shadow-surface">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Alert Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable Alert Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when hazards are reported in your selected area
                    </p>
                  </div>
                  <Switch
                    checked={alertsEnabled}
                    onCheckedChange={setAlertsEnabled}
                  />
                </div>

                {alertsEnabled && (
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <p className="text-sm text-primary font-medium">
                      🔔 Alerts are enabled! Configure your preferences below.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Location Selection */}
            {alertsEnabled && (
              <Card className="shadow-surface">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Alert Area
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter city, zip code, or address..."
                        className="mt-2"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        We'll alert you to hazards within your specified radius of this location
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="radius">Alert Radius: {radius} miles</Label>
                      <Input
                        id="radius"
                        type="range"
                        min="5"
                        max="50"
                        value={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground mt-1">
                        <span>5 miles</span>
                        <span>50 miles</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Hazard Types */}
            {alertsEnabled && (
              <Card className="shadow-surface">
                <CardHeader>
                  <CardTitle>Hazard Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Select which types of hazards you want to be alerted about:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {hazardTypes.map((hazard) => (
                        <div key={hazard.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                          <Checkbox
                            id={hazard.id}
                            checked={selectedHazards.includes(hazard.id)}
                            onCheckedChange={(checked) => 
                              handleHazardToggle(hazard.id, checked as boolean)
                            }
                          />
                          <hazard.icon className={`h-5 w-5 ${hazard.color}`} />
                          <label htmlFor={hazard.id} className="font-medium cursor-pointer flex-1">
                            {hazard.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Notification Methods */}
            {alertsEnabled && (
              <Card className="shadow-surface">
                <CardHeader>
                  <CardTitle>Notification Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Email Notifications */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive detailed alert emails with hazard information
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>

                  {emailNotifications && (
                    <div className="ml-8">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your-email@example.com"
                        className="mt-2"
                        required={emailNotifications}
                      />
                    </div>
                  )}

                  {/* SMS Notifications */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium">SMS Notifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Receive urgent alerts via text message
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={smsNotifications}
                      onCheckedChange={setSmsNotifications}
                    />
                  </div>

                  {smsNotifications && (
                    <div className="ml-8">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="(555) 123-4567"
                        className="mt-2"
                        required={smsNotifications}
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        Standard messaging rates may apply
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                size="lg" 
                className="ocean-gradient shadow-floating"
                disabled={!alertsEnabled}
              >
                Save Alert Preferences
              </Button>
            </div>
          </form>

          {/* Current Alerts */}
          <Card className="mt-8 shadow-surface">
            <CardHeader>
              <CardTitle>Recent Alerts in Your Area</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No recent alerts in your configured area.</p>
                <p className="text-sm mt-2">
                  Set up your alert preferences above to start receiving notifications.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Alerts;