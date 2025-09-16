import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, MapPin, Camera, Lock, Users } from "lucide-react";

const Privacy = () => {
  const lastUpdated = "December 15, 2024";

  return (
    <div className="min-h-screen surface-gradient">
      <Navigation />
      
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              How we protect and use your information
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Introduction */}
          <Card className="shadow-surface mb-8">
            <CardContent className="py-8">
              <h2 className="text-2xl font-bold mb-4">Our Commitment to Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Coastal Sentinel is committed to protecting your privacy and ensuring the security 
                of your personal information. This privacy policy explains how we collect, use, 
                and protect information when you use our ocean hazard reporting platform.
              </p>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="shadow-surface mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Location Data
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  When you submit a hazard report, we automatically capture your GPS coordinates 
                  to accurately pinpoint the hazard location. This location data is essential for 
                  emergency responders and is shared publicly on our hazard map. We do not track 
                  your location when you're not actively submitting a report.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Camera className="h-4 w-4 text-primary" />
                  Photos and Media
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Photos you submit as part of hazard reports are stored securely and may be 
                  shared with emergency responders and relevant authorities. Photos are displayed 
                  publicly on the hazard map to help others assess the situation.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  Account Information
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  When you create an account, we collect your email address, display name, 
                  and authentication information. This helps us maintain your trust score, 
                  track your contributions, and send you relevant notifications if you opt in.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Usage Analytics</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We collect anonymous usage statistics to improve the platform, including 
                  which features are used most frequently and general geographic usage patterns. 
                  This data is aggregated and cannot be linked to individual users.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card className="shadow-surface mb-8">
            <CardHeader>
              <CardTitle>How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Emergency Response</h4>
                  <p className="text-muted-foreground text-sm">
                    Hazard reports and location data are immediately shared with relevant 
                    emergency response agencies to enable rapid response to ocean hazards.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Public Safety</h4>
                  <p className="text-muted-foreground text-sm">
                    Reports are displayed publicly on our map to warn others about hazards 
                    and promote coastal safety awareness.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Platform Improvement</h4>
                  <p className="text-muted-foreground text-sm">
                    Anonymous usage data helps us improve the platform and develop new 
                    features that better serve coastal communities.
                  </p>
                </div>

                <div className="border-l-4 border-primary pl-4">
                  <h4 className="font-semibold">Communication</h4>
                  <p className="text-muted-foreground text-sm">
                    We may use your contact information to send important updates about 
                    hazards in your area (if you've opted in) or critical platform updates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card className="shadow-surface mb-8">
            <CardHeader>
              <CardTitle>Who We Share Information With</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Emergency Response Agencies</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Hazard reports are automatically shared with Coast Guard, EPA, NOAA, 
                  local marine authorities, and other relevant emergency response organizations 
                  to enable rapid response to ocean hazards.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Public Display</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Hazard locations, descriptions, and photos are displayed publicly on our 
                  map to promote community awareness and safety. Personal information like 
                  your name or contact details are not displayed publicly.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Research Partners</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Anonymized, aggregated data may be shared with marine research organizations 
                  and academic institutions to support ocean conservation and safety research.
                </p>
              </div>

              <div className="bg-destructive/10 p-4 rounded-lg">
                <h4 className="font-semibold mb-2 text-destructive">We Never Sell Your Data</h4>
                <p className="text-sm text-destructive/80">
                  We never sell, rent, or trade your personal information to third parties 
                  for commercial purposes. Your data is used solely to protect coastal safety.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card className="shadow-surface mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Data Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We implement industry-standard security measures to protect your information:
              </p>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  Encrypted data transmission (HTTPS/SSL)
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  Secure data storage with encrypted databases
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  Regular security audits and monitoring
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  Access controls and authentication systems
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  Data backup and recovery procedures
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Your Rights */}
          <Card className="shadow-surface mb-8">
            <CardHeader>
              <CardTitle>Your Rights and Choices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Access and Correction</h4>
                <p className="text-muted-foreground text-sm">
                  You can view and update your account information through your dashboard. 
                  Contact us if you need help accessing or correcting your data.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Data Deletion</h4>
                <p className="text-muted-foreground text-sm">
                  You can request deletion of your account and personal data. Note that 
                  anonymized hazard reports may remain for safety and research purposes.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Notification Preferences</h4>
                <p className="text-muted-foreground text-sm">
                  You can control email and SMS notifications through your alert settings 
                  and can opt out at any time.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card className="shadow-surface">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                If you have questions about this privacy policy or your data, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> privacy@coastalsentinel.org</p>
                <p><strong>Address:</strong> Coastal Sentinel Privacy Team<br />
                   [Address would be inserted here]</p>
              </div>
              <p className="text-muted-foreground text-sm mt-4">
                We will respond to privacy-related inquiries within 30 days.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Privacy;