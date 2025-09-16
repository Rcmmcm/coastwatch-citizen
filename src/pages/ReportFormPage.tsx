import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { Camera, MapPin, RotateCcw, ArrowLeft, ArrowRight, Droplets, Waves, Wind, Fish, AlertTriangle, HelpCircle } from "lucide-react";

const hazardConfig = {
  "oil-spill": {
    title: "Oil Spill Report",
    icon: Droplets,
    color: "bg-hazard-oil",
    fields: {
      size: {
        label: "Size of Oil Spill",
        type: "slider",
        options: ["Sheen", "Small Slick", "Large Patch", "Major Spill"],
        min: 0,
        max: 3
      },
      color: {
        label: "Oil Color",
        type: "buttons",
        options: ["Rainbow", "Black", "Brown", "Silver/Gray"]
      }
    }
  },
  "marine-debris": {
    title: "Marine Debris Report", 
    icon: Waves,
    color: "bg-hazard-debris",
    fields: {
      type: {
        label: "Debris Type",
        type: "buttons",
        options: ["Plastic Bottles", "Fishing Gear", "Large Objects", "Debris Field"]
      },
      amount: {
        label: "Amount of Debris",
        type: "slider", 
        options: ["Few Items", "Multiple Items", "Large Amount", "Massive Field"],
        min: 0,
        max: 3
      }
    }
  },
  "storm-waves": {
    title: "Storm/Wave Report",
    icon: Wind, 
    color: "bg-hazard-storm",
    fields: {
      severity: {
        label: "Wave Severity",
        type: "slider",
        options: ["Moderate", "High", "Dangerous", "Extreme"],
        min: 0,
        max: 3
      },
      conditions: {
        label: "Conditions",
        type: "buttons",
        options: ["Strong Winds", "Large Swells", "Storm Surge", "Dangerous Currents"]
      }
    }
  },
  "injured-animal": {
    title: "Marine Life Report",
    icon: Fish,
    color: "bg-hazard-animal", 
    fields: {
      animalType: {
        label: "Animal Type",
        type: "buttons",
        options: ["Seal/Sea Lion", "Whale/Dolphin", "Sea Bird", "Fish/Other"]
      },
      condition: {
        label: "Condition",
        type: "buttons",
        options: ["Injured", "Entangled", "Stranded", "Dead"]
      }
    }
  },
  "water-quality": {
    title: "Water Quality Report",
    icon: AlertTriangle,
    color: "bg-hazard-water",
    fields: {
      issue: {
        label: "Water Quality Issue", 
        type: "buttons",
        options: ["Discoloration", "Algae Bloom", "Foam/Scum", "Strong Odor"]
      },
      severity: {
        label: "Severity",
        type: "slider",
        options: ["Mild", "Moderate", "Severe", "Extreme"],
        min: 0,
        max: 3
      }
    }
  },
  "other": {
    title: "Other Hazard Report",
    icon: HelpCircle,
    color: "bg-hazard-other",
    fields: {
      category: {
        label: "General Category",
        type: "buttons", 
        options: ["Navigation Hazard", "Pollution", "Safety Concern", "Unknown"]
      }
    }
  }
};

const ReportFormPage = () => {
  const { hazardType } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [photo, setPhoto] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [description, setDescription] = useState("");
  
  const config = hazardConfig[hazardType as keyof typeof hazardConfig];
  const locationData = location.state;

  useEffect(() => {
    if (!config || !locationData) {
      navigate("/report");
    }
  }, [config, locationData, navigate]);

  if (!config || !locationData) {
    return null;
  }

  const handlePhotoCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerCamera = () => {
    fileInputRef.current?.click();
  };

  const retakePhoto = () => {
    setPhoto(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleNext = () => {
    const reportData = {
      hazardType,
      location: locationData.location,
      locationName: locationData.locationName,
      photo,
      formData,
      description,
      timestamp: new Date().toISOString()
    };

    navigate("/report/review", { state: reportData });
  };

  const renderField = (fieldName: string, field: any) => {
    if (field.type === "slider") {
      return (
        <div key={fieldName} className="space-y-4">
          <Label className="text-base font-medium">{field.label}</Label>
          <div className="px-2">
            <Slider
              value={[formData[fieldName] || 0]}
              onValueChange={(value) => handleFieldChange(fieldName, value[0])}
              max={field.max}
              min={field.min}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              {field.options.map((option: string, index: number) => (
                <span
                  key={index}
                  className={`text-center ${
                    (formData[fieldName] || 0) === index ? "text-primary font-medium" : ""
                  }`}
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
          {formData[fieldName] !== undefined && (
            <Badge className="bg-primary/10 text-primary">
              Selected: {field.options[formData[fieldName]]}
            </Badge>
          )}
        </div>
      );
    }

    if (field.type === "buttons") {
      return (
        <div key={fieldName} className="space-y-4">
          <Label className="text-base font-medium">{field.label}</Label>
          <div className="grid grid-cols-2 gap-3">
            {field.options.map((option: string, index: number) => (
              <Button
                key={option}
                variant={formData[fieldName] === option ? "default" : "outline"}
                onClick={() => handleFieldChange(fieldName, option)}
                className="h-auto py-3 text-sm"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  const Icon = config.icon;

  return (
    <div className="min-h-screen surface-gradient">
      <Navigation />
      
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/report")}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 ${config.color} rounded-full flex items-center justify-center shadow-surface`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{config.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {locationData.locationName}
                </div>
              </div>
            </div>
          </div>

          {/* Photo Capture Section */}
          <Card className="shadow-surface mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5" />
                Photo Evidence
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!photo ? (
                <div className="text-center">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 mb-4">
                    <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Take a photo to help authorities assess the situation
                    </p>
                    <Button onClick={triggerCamera} className="shadow-surface">
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={photo}
                    alt="Captured hazard"
                    className="max-w-full h-48 object-cover rounded-lg mx-auto mb-4 shadow-surface"
                  />
                  <Button
                    variant="outline"
                    onClick={retakePhoto}
                    className="mr-2"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Retake
                  </Button>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoCapture}
                className="hidden"
              />
            </CardContent>
          </Card>

          {/* Hazard-Specific Fields */}
          <Card className="shadow-surface mb-8">
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {Object.entries(config.fields).map(([fieldName, field]) =>
                renderField(fieldName, field)
              )}
              
              <div className="space-y-4">
                <Label htmlFor="description" className="text-base font-medium">
                  Additional Description (Optional)
                </Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide any additional details that might help emergency responders..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          {/* Next Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleNext}
              size="lg"
              className="shadow-surface"
              disabled={!photo}
            >
              Review Report
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportFormPage;