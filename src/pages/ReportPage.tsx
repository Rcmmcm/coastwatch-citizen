import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { MapPin, Loader2, Waves, Droplets, Wind, Fish, AlertTriangle, HelpCircle } from "lucide-react";

const hazardTypes = [
  {
    id: "oil-spill",
    title: "Oil Spill",
    description: "Oil slicks, sheens, or petroleum products in water",
    icon: Droplets,
    color: "bg-hazard-oil",
    examples: "Black slicks, rainbow sheens, petroleum odor"
  },
  {
    id: "marine-debris", 
    title: "Marine Debris",
    description: "Floating trash, plastic, or other pollutants",
    icon: Waves,
    color: "bg-hazard-debris", 
    examples: "Plastic bottles, fishing nets, large debris fields"
  },
  {
    id: "storm-waves",
    title: "Storm / Waves",
    description: "Dangerous wave conditions or storm damage",
    icon: Wind,
    color: "bg-hazard-storm",
    examples: "High waves, storm surge, dangerous currents"
  },
  {
    id: "injured-animal",
    title: "Injured Marine Life",
    description: "Distressed, injured, or dead marine animals",
    icon: Fish,
    color: "bg-hazard-animal",
    examples: "Beached whales, injured seals, fish kills"
  },
  {
    id: "water-quality",
    title: "Water Quality",
    description: "Discolored water, algae blooms, or contamination",
    icon: AlertTriangle,
    color: "bg-hazard-water",
    examples: "Red tide, sewage discharge, unusual water color"
  },
  {
    id: "other",
    title: "Other Hazard",
    description: "Any other ocean or coastal safety concern",
    icon: HelpCircle,
    color: "bg-hazard-other",
    examples: "Unusual phenomena, safety hazards, navigation issues"
  }
];

const ReportPage = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationName, setLocationName] = useState<string>("");
  const [locationStatus, setLocationStatus] = useState<"loading" | "success" | "error">("loading");
  const navigate = useNavigate();

  useEffect(() => {
    const getLocation = () => {
      setLocationStatus("loading");
      
      if (!navigator.geolocation) {
        setLocationStatus("error");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          
          // Reverse geocoding to get location name
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=12`
            );
            const data = await response.json();
            
            const city = data.address?.city || data.address?.town || data.address?.village;
            const state = data.address?.state;
            const locationStr = city && state ? `${city}, ${state}` : "Your Location";
            
            setLocationName(locationStr);
            setLocationStatus("success");
          } catch (error) {
            setLocationName("Location Acquired");
            setLocationStatus("success");
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLocationStatus("error");
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    };

    getLocation();
  }, []);

  const handleHazardSelect = (hazardId: string) => {
    if (locationStatus === "success") {
      navigate(`/report/${hazardId}`, { 
        state: { location, locationName }
      });
    }
  };

  const LocationBadge = () => {
    if (locationStatus === "loading") {
      return (
        <Badge variant="outline" className="bg-muted/50">
          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
          Acquiring your location...
        </Badge>
      );
    }
    
    if (locationStatus === "error") {
      return (
        <Badge variant="destructive">
          <MapPin className="h-3 w-3 mr-1" />
          Location access denied
        </Badge>
      );
    }

    return (
      <Badge className="bg-primary shadow-surface">
        <MapPin className="h-3 w-3 mr-1" />
        Location: {locationName}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen surface-gradient">
      <Navigation />
      
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Report a Hazard</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Select the type of ocean hazard you've observed. 
              We'll guide you through the reporting process.
            </p>
            
            {/* Location Status */}
            <div className="flex justify-center mb-6">
              <LocationBadge />
            </div>
            
            {locationStatus === "error" && (
              <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-6 max-w-md mx-auto">
                Please enable location access to continue. Reports require location data to be useful for emergency responders.
              </div>
            )}
          </div>

          {/* Hazard Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hazardTypes.map((hazard) => (
              <Card
                key={hazard.id}
                className={`cursor-pointer shadow-surface hover:shadow-floating transition-smooth transform hover:scale-[1.02] ${
                  locationStatus !== "success" ? "opacity-50 pointer-events-none" : ""
                }`}
                onClick={() => handleHazardSelect(hazard.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4">
                    <div className={`w-16 h-16 ${hazard.color} rounded-full flex items-center justify-center shadow-surface`}>
                      <hazard.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg">{hazard.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    {hazard.description}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <strong>Examples:</strong> {hazard.examples}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Help Section */}
          <Card className="mt-12 shadow-surface">
            <CardContent className="py-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Need Help Identifying a Hazard?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Not sure what you're seeing? Our community of experts can help identify and categorize your observation.
                  When in doubt, select "Other Hazard" and provide a detailed description.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/about">
                    <Button variant="outline">
                      Learn More About Hazards
                    </Button>
                  </Link>
                  <Link to="/map">
                    <Button variant="outline">
                      View Recent Reports
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;