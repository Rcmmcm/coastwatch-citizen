import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { MapPin, Camera, CheckCircle, AlertTriangle, Waves, Shield, Users, Eye } from "lucide-react";

const Index = () => {
  const steps = [
    {
      icon: AlertTriangle,
      title: "Tap a Hazard",
      description: "Select the type of ocean hazard you've spotted from our quick-select grid."
    },
    {
      icon: Camera,
      title: "Take a Photo",
      description: "Capture visual evidence with your device's camera to help authorities respond."
    },
    {
      icon: CheckCircle,
      title: "Submit Report",
      description: "We automatically capture your location and timestamp. Your report helps protect our coasts."
    }
  ];

  const features = [
    {
      icon: Eye,
      title: "Real-time Visibility",
      description: "See live hazard reports from coastal communities across the region."
    },
    {
      icon: Shield,
      title: "Trusted Network", 
      description: "User verification system ensures reliable, actionable intelligence."
    },
    {
      icon: Users,
      title: "Community Powered",
      description: "Join thousands of coastal citizens keeping our waters safe."
    }
  ];

  return (
    <div className="min-h-screen surface-gradient">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 ocean-gradient opacity-90" />
        <div className="relative container py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="mb-6">
              <div className="inline-flex items-center space-x-2 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
                <Waves className="h-4 w-4" />
                <span className="text-sm font-medium">Protecting Our Coasts Together</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              See Something,{" "}
              <span className="text-primary-glow">Say Something.</span><br />
              Protect Our Coasts.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Report ocean hazards instantly with automated location capture. 
              Join a trusted network of coastal communities keeping our waters safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/map">
                <Button size="lg" variant="outline" className="bg-white/20 border-white/30 text-primary-foreground hover:bg-white/30 backdrop-blur-sm">
                  <MapPin className="mr-2 h-5 w-5" />
                  View Live Map
                </Button>
              </Link>
              <Link to="/report">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-floating">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Report a Hazard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to help protect our coastal waters and communities
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <Card key={index} className="text-center shadow-surface hover:shadow-floating transition-smooth">
                <CardContent className="pt-8">
                  <div className="mb-4">
                    <div className="w-16 h-16 ocean-gradient rounded-full flex items-center justify-center mx-auto shadow-ocean">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Coastal Sentinel?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for coastal communities, by coastal communities
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-surface">
                <CardContent className="pt-8">
                  <div className="mb-4">
                    <feature.icon className="h-12 w-12 text-primary mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <Card className="shadow-floating ocean-gradient">
            <CardContent className="py-16 text-center text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
                Join thousands of coastal citizens helping keep our waters safe. 
                Every report matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/report">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-floating">
                    Start Reporting
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="border-white/30 text-primary-foreground hover:bg-white/10">
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 ocean-gradient rounded flex items-center justify-center">
                <Waves className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Coastal Sentinel</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                About
              </Link>
              <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Privacy Policy
              </Link>
              <Link to="/alerts" className="text-sm text-muted-foreground hover:text-primary transition-smooth">
                Alerts
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;