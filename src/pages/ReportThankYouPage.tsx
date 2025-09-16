import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { CheckCircle, MapPin, AlertTriangle, Home } from "lucide-react";

const ReportThankYouPage = () => {
  return (
    <div className="min-h-screen surface-gradient">
      <Navigation />
      
      <div className="container py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-floating">
              <CheckCircle className="h-12 w-12 text-primary-foreground" />
            </div>
          </div>

          {/* Success Message */}
          <Card className="shadow-floating ocean-gradient mb-8">
            <CardContent className="py-12 text-primary-foreground">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Thank You!
              </h1>
              <p className="text-xl mb-6 text-primary-foreground/90">
                Your report has been submitted and will help keep our coasts safe.
              </p>
              <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-sm font-medium">
                  Report ID: #CS-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* What Happens Next */}
          <Card className="shadow-surface mb-8 text-left">
            <CardContent className="py-8">
              <h3 className="text-xl font-semibold mb-4 text-center">What Happens Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Community Verification</h4>
                    <p className="text-sm text-muted-foreground">
                      Other users in the area may verify your report to increase its credibility.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Authority Notification</h4>
                    <p className="text-sm text-muted-foreground">
                      Relevant agencies and emergency responders are automatically alerted.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Response & Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      You'll receive updates on the status of your report through the dashboard.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/map">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <MapPin className="h-4 w-4 mr-2" />
                View it on the Map
              </Button>
            </Link>
            <Link to="/report">
              <Button size="lg" className="ocean-gradient shadow-floating w-full sm:w-auto">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Report Another Hazard
              </Button>
            </Link>
          </div>

          {/* Additional Actions */}
          <Card className="mt-8 bg-muted/30">
            <CardContent className="py-6">
              <h4 className="font-medium mb-4">Stay Engaged</h4>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/dashboard">
                  <Button variant="outline" size="sm">
                    View Your Reports
                  </Button>
                </Link>
                <Link to="/alerts">
                  <Button variant="outline" size="sm">
                    Set Up Alerts
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" size="sm">
                    <Home className="h-4 w-4 mr-2" />
                    Return Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReportThankYouPage;