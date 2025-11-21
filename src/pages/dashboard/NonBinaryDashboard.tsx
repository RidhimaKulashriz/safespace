import { Shield, MessageSquare, Search, Heart, Sparkles, Users, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Link } from "react-router-dom";

const NonBinaryDashboard = () => {
  const userName = "Alex";
  const wellnessScore = 82;

  const quickActions = [
    { icon: MessageSquare, label: "Scan Message", path: "/scanner/message", color: "bg-purple-500/10 text-purple-500" },
    { icon: Search, label: "Scan URL", path: "/scanner/url", color: "bg-pink-500/10 text-pink-500" },
    { icon: Heart, label: "Wellness Check", path: "/wellness", color: "bg-rose-500/10 text-rose-500" },
    { icon: Users, label: "Community", path: "/community", color: "bg-blue-500/10 text-blue-500" },
  ];

  const recentActivity = [
    { type: "scan", message: "Scanned 2 messages", time: "Today", status: "safe" },
    { type: "community", message: "Posted in support group", time: "Yesterday", status: "safe" },
    { type: "wellness", message: "Completed wellness check", time: "2 days ago", status: "safe" },
  ];

  return (
    <DashboardLayout theme="nonbinary">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl p-8 border border-purple-500/20">
          <div className="flex items-center gap-4">
            <Sparkles className="h-12 w-12 text-purple-500" />
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                Welcome back, {userName}!
              </h1>
              <p className="text-muted-foreground text-lg">
                Your safe space for authentic digital wellbeing
              </p>
            </div>
          </div>
        </div>

        {/* Wellness Score */}
        <Card className="p-6 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-blue-500/10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xl font-heading font-semibold">Wellness Score</h3>
              <p className="text-muted-foreground text-sm">Your holistic digital wellbeing</p>
            </div>
            <div className="text-4xl font-bold text-purple-500">{wellnessScore}%</div>
          </div>
          <Progress value={wellnessScore} className="h-3" />
          <p className="text-sm text-muted-foreground mt-3">
            You're doing great! Keep prioritizing your wellbeing.
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

        {/* Inclusive Resources */}
        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="h-8 w-8 text-purple-500" />
            <h2 className="text-2xl font-heading font-semibold">Inclusive Support</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Access resources designed for your authentic self
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-xl bg-background/50 border border-border">
              <h3 className="font-semibold mb-2">LGBTQ+ Support</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Connect with affirming resources and communities
              </p>
              <Button variant="outline" size="sm" className="rounded-full">
                Learn More
              </Button>
            </div>
            <div className="p-6 rounded-xl bg-background/50 border border-border">
              <h3 className="font-semibold mb-2">Mental Health</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Culturally competent mental health support
              </p>
              <Button variant="outline" size="sm" className="rounded-full">
                Get Help
              </Button>
            </div>
            <div className="p-6 rounded-xl bg-background/50 border border-border">
              <h3 className="font-semibold mb-2">Identity Safety</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Protect your identity and privacy online
              </p>
              <Button variant="outline" size="sm" className="rounded-full">
                Privacy Guide
              </Button>
            </div>
            <div className="p-6 rounded-xl bg-background/50 border border-border">
              <h3 className="font-semibold mb-2">Community Forums</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Connect with supportive community members
              </p>
              <Button variant="outline" size="sm" className="rounded-full">
                Join Now
              </Button>
            </div>
          </div>
        </Card>

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
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
                    {activity.type === "scan" ? <MessageSquare className="h-5 w-5" /> :
                     activity.type === "community" ? <Users className="h-5 w-5" /> :
                     <Heart className="h-5 w-5" />}
                  </div>
                  <div>
                    <p className="font-medium">{activity.message}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-green-500/10 text-green-500">
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Affirmation Card */}
        <Card className="p-8 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 border-purple-500/30 text-center">
          <Sparkles className="h-12 w-12 mx-auto mb-4 text-purple-500" />
          <h3 className="text-2xl font-heading font-bold mb-3">
            You Are Valid
          </h3>
          <p className="text-lg text-muted-foreground">
            Your identity is real, your experiences matter, and you deserve safety and respect in all spaces—digital and physical.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NonBinaryDashboard;