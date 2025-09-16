import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import { User, Award, Clock, MapPin, AlertTriangle, CheckCircle, Eye, Trophy, Star } from "lucide-react";

// Mock user data - in a real app this would come from your backend/auth
const userData = {
  name: "Ocean Guardian",
  email: "guardian@example.com",
  joinedDate: "2024-01-15",
  trustScore: 85,
  level: "Steward Level 3",
  totalReports: 12,
  verifiedReports: 8,
  badges: ["First Report!", "Oil Spotter", "Community Helper", "Trusted Reporter"]
};

// Mock reports data
const userReports = [
  {
    id: "1",
    type: "oil-spill", 
    title: "Oil Slick Near Marina",
    location: "Santa Monica Bay",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    status: "verified",
    verifications: 3
  },
  {
    id: "2",
    type: "marine-debris",
    title: "Plastic Debris Field", 
    location: "Venice Beach",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    status: "pending",
    verifications: 1
  },
  {
    id: "3",
    type: "water-quality",
    title: "Red Tide Spotted",
    location: "Malibu Coast",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: "verified",
    verifications: 5
  }
];

const achievements = [
  { name: "First Report!", description: "Submitted your first hazard report", earned: true },
  { name: "Oil Spotter", description: "Reported 5 oil-related incidents", earned: true },
  { name: "Community Helper", description: "Verified 10 other user reports", earned: true },
  { name: "Trusted Reporter", description: "Achieved 80% verification rate", earned: true },
  { name: "Coastal Guardian", description: "Report 25 hazards (12/25)", earned: false },
  { name: "Expert Verifier", description: "Verify 50 reports (28/50)", earned: false }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("reports");

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const getStatusColor = (status: string) => {
    return status === "verified" ? "bg-primary" : "bg-muted";
  };

  const getStatusIcon = (status: string) => {
    return status === "verified" ? CheckCircle : Clock;
  };

  return (
    <div className="min-h-screen surface-gradient">
      <Navigation />
      
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Track your reports and contributions to coastal safety</p>
          </div>

          {/* User Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-surface">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Reports</p>
                    <p className="text-2xl font-bold">{userData.totalReports}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-surface">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Verified Reports</p>
                    <p className="text-2xl font-bold">{userData.verifiedReports}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-surface">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Trust Score</p>
                    <p className="text-2xl font-bold">{userData.trustScore}</p>
                  </div>
                  <Star className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-surface">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Current Level</p>
                    <p className="text-lg font-bold">{userData.level}</p>
                  </div>
                  <Trophy className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="reports">My Reports</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>

            {/* Reports Tab */}
            <TabsContent value="reports" className="space-y-6">
              <Card className="shadow-surface">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Your Reports</CardTitle>
                  <Link to="/report">
                    <Button className="shadow-surface">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      New Report
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userReports.map((report) => {
                      const StatusIcon = getStatusIcon(report.status);
                      return (
                        <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <StatusIcon className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <h4 className="font-medium">{report.title}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3" />
                                {report.location}
                                <span>•</span>
                                {formatDate(report.timestamp)}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getStatusColor(report.status)}>
                              {report.status}
                            </Badge>
                            <Button variant="outline" size="sm">
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-6">
              <Card className="shadow-surface">
                <CardHeader>
                  <CardTitle>Trust Score Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Current Level: {userData.level}</span>
                      <span className="text-sm text-muted-foreground">{userData.trustScore}/100</span>
                    </div>
                    <Progress value={userData.trustScore} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      Keep reporting and verifying to increase your trust score and unlock new levels!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-surface">
                <CardHeader>
                  <CardTitle>Achievements & Badges</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <div 
                        key={index}
                        className={`p-4 border rounded-lg ${achievement.earned ? 'bg-primary/5 border-primary/20' : 'bg-muted/30'}`}
                      >
                        <div className="flex items-center gap-3">
                          <Award className={`h-6 w-6 ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`} />
                          <div className="flex-1">
                            <h4 className={`font-medium ${achievement.earned ? 'text-primary' : 'text-muted-foreground'}`}>
                              {achievement.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {achievement.description}
                            </p>
                          </div>
                          {achievement.earned && (
                            <CheckCircle className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="shadow-surface">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Display Name</label>
                      <p className="text-base">{userData.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-base">{userData.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Member Since</label>
                      <p className="text-base">{new Date(userData.joinedDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Trust Level</label>
                      <p className="text-base">{userData.level}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-surface">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive updates about your reports</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Privacy Settings</h4>
                      <p className="text-sm text-muted-foreground">Control what information is shared</p>
                    </div>
                    <Link to="/privacy">
                      <Button variant="outline" size="sm">View Policy</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;