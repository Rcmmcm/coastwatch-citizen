import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Navigation from "@/components/Navigation";
import { Filter, MapPin, Clock, User, AlertTriangle } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Sample hazard data
const hazardData = [
  {
    id: "1",
    type: "oil",
    title: "Oil Slick Reported",
    description: "Large black oil slick spotted near Santa Monica Pier",
    coordinates: [34.0085, -118.4965],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    status: "verified",
    reporter: "CoastalWatcher42",
    confidence: 3
  },
  {
    id: "2", 
    type: "debris",
    title: "Marine Debris",
    description: "Large plastic debris field floating offshore",
    coordinates: [34.0205, -118.4895],
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    status: "reported",
    reporter: "OceanGuard",
    confidence: 2
  },
  {
    id: "3",
    type: "storm",
    title: "Rough Seas Warning",
    description: "Dangerous wave conditions, multiple vessels affected",
    coordinates: [34.0125, -118.5065],
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    status: "verified", 
    reporter: "SafeHarborWatch",
    confidence: 5
  }
];

const hazardTypes = [
  { id: "oil", label: "Oil Spills", color: "bg-hazard-oil" },
  { id: "debris", label: "Marine Debris", color: "bg-hazard-debris" },
  { id: "storm", label: "Storm/Waves", color: "bg-hazard-storm" },
  { id: "animal", label: "Marine Life", color: "bg-hazard-animal" },
  { id: "water", label: "Water Quality", color: "bg-hazard-water" },
  { id: "other", label: "Other", color: "bg-hazard-other" }
];

const createCustomIcon = (type: string) => {
  const colors = {
    oil: "#ea580c",
    debris: "#22c55e", 
    storm: "#3b82f6",
    animal: "#ec4899",
    water: "#06b6d4",
    other: "#6b7280"
  };
  
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        background-color: ${colors[type as keyof typeof colors] || colors.other};
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
};

const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 12);
  }, [map, center]);

  return null;
};

const MapPage = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(hazardTypes.map(t => t.id));
  const [timeFilter, setTimeFilter] = useState("all");
  const mapRef = useRef<L.Map | null>(null);
  
  // Default location: Santa Monica, CA
  const defaultCenter: [number, number] = [34.0194, -118.4912];

  const filteredHazards = hazardData.filter(hazard => {
    const typeMatch = selectedTypes.includes(hazard.type);
    let timeMatch = true;
    
    if (timeFilter === "24h") {
      timeMatch = Date.now() - hazard.timestamp.getTime() < 24 * 60 * 60 * 1000;
    } else if (timeFilter === "week") {
      timeMatch = Date.now() - hazard.timestamp.getTime() < 7 * 24 * 60 * 60 * 1000;
    }
    
    return typeMatch && timeMatch;
  });

  const formatTimeAgo = (timestamp: Date) => {
    const diff = Date.now() - timestamp.getTime();
    const hours = Math.floor(diff / (60 * 60 * 1000));
    const minutes = Math.floor(diff / (60 * 1000));
    
    if (hours > 0) return `${hours}h ago`;
    return `${minutes}m ago`;
  };

  const FilterPanel = ({ mobile = false }) => (
    <Card className={`${mobile ? "w-full" : "w-80"} shadow-surface`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Map Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Time Filter */}
        <div>
          <h4 className="font-medium mb-3">Time Period</h4>
          <div className="space-y-2">
            {[
              { value: "all", label: "All Reports" },
              { value: "24h", label: "Last 24 Hours" },
              { value: "week", label: "Last Week" }
            ].map(option => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="timeFilter"
                  value={option.value}
                  checked={timeFilter === option.value}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="text-primary"
                />
                <span className="text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Hazard Types */}
        <div>
          <h4 className="font-medium mb-3">Hazard Types</h4>
          <div className="space-y-3">
            {hazardTypes.map(type => (
              <div key={type.id} className="flex items-center space-x-3">
                <Checkbox
                  id={type.id}
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedTypes([...selectedTypes, type.id]);
                    } else {
                      setSelectedTypes(selectedTypes.filter(t => t !== type.id));
                    }
                  }}
                />
                <div className="flex items-center space-x-2 flex-1">
                  <div className={`w-3 h-3 rounded-full ${type.color}`} />
                  <label htmlFor={type.id} className="text-sm cursor-pointer">
                    {type.label}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div>
          <h4 className="font-medium mb-3">Legend</h4>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>🔴 Verified by community</div>
            <div>🟡 Pending verification</div>
            <div>📍 Click markers for details</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container-fluid p-0">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Desktop Filter Panel */}
          <div className="hidden lg:block">
            <div className="h-full p-4 border-r bg-muted/30">
              <FilterPanel />
            </div>
          </div>

          {/* Map Container */}
          <div className="flex-1 relative">
            <MapContainer
              center={defaultCenter}
              zoom={12}
              className="w-full h-full"
              ref={mapRef}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <MapController center={defaultCenter} />

              {filteredHazards.map(hazard => (
                <Marker
                  key={hazard.id}
                  position={hazard.coordinates as [number, number]}
                  icon={createCustomIcon(hazard.type)}
                >
                  <Popup className="custom-popup">
                    <div className="p-2 min-w-[200px]">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-sm">{hazard.title}</h3>
                        <Badge 
                          variant={hazard.status === "verified" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {hazard.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        {hazard.description}
                      </p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(hazard.timestamp)}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Reported by {hazard.reporter}
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          Confidence: {hazard.confidence}/5 users
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Mobile Filter Button */}
            <div className="absolute top-4 right-4 z-[1000] lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="sm" className="shadow-floating">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <div className="p-4">
                    <FilterPanel mobile />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Map Info */}
            <div className="absolute bottom-4 left-4 z-[1000]">
              <Card className="shadow-floating bg-background/95 backdrop-blur">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="font-medium">
                      {filteredHazards.length} active reports
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;