import { Shield, MessageSquare, Search, AlertTriangle, Briefcase, TrendingUp, MapPin, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Link } from "react-router-dom";
import { LocationTracker } from "@/components/LocationTracker";
import { FakeCall } from "@/components/FakeCall";

const AdultManDashboard = () => {
  const userName = "David";
  const securityScore = 88;

  const quickActions = [
    { icon: MessageSquare, label: "Scan Message", path: "/scanner/message", color: "bg-blue-600/10 text-blue-600" },
    { icon: Search, label: "Scan URL", path: "/scanner/url", color: "bg-gray-600/10 text-gray-600" },
    { icon: Shield, label: "Privacy Check", path: "/privacy", color: "bg-green-600/10 text-green-600" },
    { icon: AlertTriangle, label: "Report Issue", path: "/report", color: "bg-amber-600/10 text-amber-600" },
  ];

  const recentActivity = [
    { type: "scan", message: "Scanned phishing email", time: "1 hour ago", status: "warning" },
    { type: "privacy", message: "Privacy health check", time: "Today", status: "safe" },
    { type: "url", message: "Verified 5 links", time: "Yesterday", status: "safe" },
  ];

  return (
    <DashboardLayout theme="adult-man">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-gray-600/20 via-gray-700/20 to-gray-600/20 rounded-2xl p-8 border border-gray-600/20">
          <div className="flex items-center gap-4">
            <Briefcase className="h-12 w-12 text-gray-600" />
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                Welcome, {userName}
              </h1>
              <p className="text-muted-foreground text-lg">
                Your digital security is in good hands
              </p>
            </div>
          </div>
        </div>

        {/* Security Score */}
        <Card className="p-6 bg-gradient-to-br from-card to-gray-600/5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-heading font-semibold">Security Score</h3>
              <p className="text-muted-foreground text-sm">Overall digital security rating</p>
            </div>
            <div className="text-4xl font-bold text-gray-600">{securityScore}%</div>
          </div>
          <Progress value={securityScore} className="h-3" />
          <p className="text-sm text-muted-foreground mt-3">
            Excellent! Your security practices are solid.
          </p>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-heading font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.path}>
                <Card className="p-6 hover-glow cursor-pointer transition-all h-full">
                  <div className={`p-4 rounded-xl w-fit mb-4 ${action.color}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{action.label}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Location Tracker & Fake Call */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <LocationTracker />
          <FakeCall />
        </div>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-2xl font-heading font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    activity.status === "safe" ? "bg-green-500/10 text-green-500" :
                    activity.status === "warning" ? "bg-amber-500/10 text-amber-500" :
                    "bg-red-500/10 text-red-500"
                  }`}>
                    {activity.type === "scan" ? <MessageSquare className="h-5 w-5" /> :
                     activity.type === "url" ? <Search className="h-5 w-5" /> :
                     <Shield className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.message}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                  activity.status === "safe" ? "bg-green-500/10 text-green-500" :
                  activity.status === "warning" ? "bg-amber-500/10 text-amber-500" :
                  "bg-red-500/10 text-red-500"
                }`}>
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Privacy Tools */}
        <Card className="p-6 bg-gradient-to-br from-blue-600/10 to-gray-600/10 border-blue-600/20">
          <h2 className="text-2xl font-heading font-semibold mb-4">Privacy & Security</h2>
          <p className="text-muted-foreground mb-6">
            Take control of your digital footprint and protect your data
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-full">Data Checkup</Button>
            <Button variant="outline" className="rounded-full">Password Manager</Button>
            <Button variant="outline" className="rounded-full">2FA Setup</Button>
            <Button variant="outline" className="rounded-full">VPN Guide</Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdultManDashboard;