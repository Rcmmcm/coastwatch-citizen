import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { Waves, Shield, Users, Eye, MapPin, Camera, AlertTriangle, Heart, Mail, ExternalLink } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Eye,
      title: "Real-time Visibility",
      description: "Live hazard map showing community-reported incidents across coastal areas."
    },
    {
      icon: Camera,
      title: "Visual Evidence",
      description: "Photo-based reporting system for accurate hazard documentation."
    },
    {
      icon: MapPin,
      title: "Automated Location",
      description: "GPS-based location capture ensures precise hazard positioning."
    },
    {
      icon: Shield,
      title: "Trusted Network",
      description: "Community verification system builds credibility and trust."
    }
  ];

  const partners = [
    { name: "NOAA - National Weather Service", role: "Weather & Ocean Data" },
    { name: "US Coast Guard", role: "Emergency Response" },
    { name: "EPA - Environmental Protection", role: "Pollution Monitoring" },
    { name: "Local Marine Authorities", role: "Regional Response" }
  ];

  const team = [
    {
      name: "Marine Safety Coalition",
      role: "Project Leadership",
      description: "Dedicated to protecting coastal communities and marine ecosystems."
    },
    {
      name: "Coastal Technology Partners",
      role: "Technical Development",
      description: "Building the tools that keep our oceans safe and monitored."
    }
  ];

  return (
    <div className="min-h-screen surface-gradient">
      <Navigation />
      
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <div className="w-20 h-20 ocean-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-floating">
                <Waves className="h-12 w-12 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Coastal Sentinel</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Coastal Sentinel is a community-powered platform that enables rapid reporting and 
              real-time awareness of ocean hazards, helping protect our coasts and the people who depend on them.
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="shadow-floating ocean-gradient mb-16">
            <CardContent className="py-12 text-center text-primary-foreground">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-primary-foreground/90 max-w-4xl mx-auto leading-relaxed">
                To create a trusted, real-time network of coastal observers who can quickly identify and 
                report ocean hazards, enabling faster emergency response and better protection of our marine environment.
              </p>
            </CardContent>
          </Card>

          {/* How It Works */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How Coastal Sentinel Works</h2>
              <p className="text-xl text-muted-foreground">
                Simple, fast, and effective hazard reporting for coastal communities
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="shadow-surface text-center">
                  <CardContent className="pt-8">
                    <div className="w-16 h-16 ocean-gradient rounded-full flex items-center justify-center mx-auto mb-4 shadow-surface">
                      <feature.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why It Matters */}
          <Card className="shadow-surface mb-16">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Why Ocean Hazard Reporting Matters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <AlertTriangle className="h-8 w-8 text-destructive mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Faster Response Times</h4>
                  <p className="text-sm text-muted-foreground">
                    Community reporting enables emergency responders to act quickly on oil spills, 
                    debris, and other marine hazards before they spread.
                  </p>
                </div>
                <div className="text-center">
                  <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Community Safety</h4>
                  <p className="text-sm text-muted-foreground">
                    Real-time hazard awareness helps keep fishermen, surfers, sailors, 
                    and coastal visitors safe from dangerous conditions.
                  </p>
                </div>
                <div className="text-center">
                  <Heart className="h-8 w-8 text-hazard-animal mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Environmental Protection</h4>
                  <p className="text-sm text-muted-foreground">
                    Early detection and reporting of pollution helps protect marine ecosystems 
                    and preserve coastal environments for future generations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Partners */}
          <Card className="shadow-surface mb-16">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Our Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {partners.map((partner, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <Shield className="h-6 w-6 text-primary flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">{partner.name}</h4>
                      <p className="text-sm text-muted-foreground">{partner.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team */}
          <Card className="shadow-surface mb-16">
            <CardHeader>
              <CardTitle className="text-center text-2xl">Behind the Project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {team.map((member, index) => (
                  <div key={index} className="text-center">
                    <h4 className="font-semibold text-lg mb-2">{member.name}</h4>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">
                      {member.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Get Involved */}
          <Card className="shadow-floating ocean-gradient">
            <CardContent className="py-12 text-center text-primary-foreground">
              <h2 className="text-3xl font-bold mb-6">Get Involved</h2>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Join thousands of coastal citizens helping to keep our waters safe. 
                Every report makes a difference.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/report">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-floating">
                    Start Reporting
                  </Button>
                </Link>
                <Link to="/map">
                  <Button size="lg" variant="outline" className="border-white/30 text-primary-foreground hover:bg-white/10">
                    View Live Map
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold mb-4">Questions or Feedback?</h3>
            <p className="text-muted-foreground mb-6">
              We'd love to hear from you. Reach out to our team with any questions or suggestions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Contact Us
              </Button>
              <Link to="/privacy">
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;