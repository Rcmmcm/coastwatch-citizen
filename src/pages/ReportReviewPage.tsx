import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { MapPin, Clock, Camera, ArrowLeft, Send, Edit } from "lucide-react";

const ReportReviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const reportData = location.state;

  if (!reportData) {
    navigate("/report");
    return null;
  }

  const handleSubmit = async () => {
    // Here you would typically send the report to your backend
    console.log("Submitting report:", reportData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    navigate("/report/thank-you");
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const hazardTypeLabels: Record<string, string> = {
    "oil-spill": "Oil Spill",
    "marine-debris": "Marine Debris",
    "storm-waves": "Storm/Waves", 
    "injured-animal": "Injured Marine Life",
    "water-quality": "Water Quality Issue",
    "other": "Other Hazard"
  };

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
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Review Your Report</h1>
              <p className="text-muted-foreground">Please verify all information before submitting</p>
            </div>
          </div>

          {/* Review Card */}
          <Card className="shadow-floating mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Report Summary</span>
                <Badge className="bg-primary">
                  {hazardTypeLabels[reportData.hazardType] || reportData.hazardType}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Photo */}
              {reportData.photo && (
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Photo Evidence
                  </h4>
                  <img
                    src={reportData.photo}
                    alt="Hazard evidence"
                    className="w-full max-w-md h-48 object-cover rounded-lg shadow-surface"
                  />
                </div>
              )}

              {/* Location */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </h4>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-medium">{reportData.locationName}</p>
                  <p className="text-sm text-muted-foreground">
                    {reportData.location.lat.toFixed(6)}, {reportData.location.lng.toFixed(6)}
                  </p>
                </div>
              </div>

              {/* Timestamp */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Timestamp
                </h4>
                <p className="text-muted-foreground">
                  {formatTimestamp(reportData.timestamp)}
                </p>
              </div>

              {/* Form Data */}
              {Object.keys(reportData.formData).length > 0 && (
                <div>
                  <h4 className="font-medium mb-3">Hazard Details</h4>
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    {Object.entries(reportData.formData).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="capitalize text-muted-foreground">
                          {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                        </span>
                        <span className="font-medium">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {reportData.description && (
                <div>
                  <h4 className="font-medium mb-3">Additional Description</h4>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-muted-foreground">{reportData.description}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex-1"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Details
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 ocean-gradient shadow-floating"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit Report
            </Button>
          </div>

          {/* Privacy Notice */}
          <Card className="mt-8 bg-muted/30">
            <CardContent className="py-6">
              <div className="text-center">
                <h4 className="font-medium mb-2">Privacy & Data Use</h4>
                <p className="text-sm text-muted-foreground">
                  Your report will be shared with relevant authorities and emergency responders. 
                  Location data is used only for response purposes. 
                  <a href="/privacy" className="text-primary hover:underline ml-1">
                    Learn more about our privacy policy.
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportReviewPage;