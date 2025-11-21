import { Shield, MessageSquare, Search, TrendingUp, Heart, Users, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Link } from "react-router-dom";

const TeenDashboard = () => {
  const userName = "Alex";
  const wellnessScore = 78;
  const streak = 12;

  const quickActions = [
    { icon: MessageSquare, label: "Check Message", path: "/scanner/message", color: "bg-green-500/10 text-green-500" },
    { icon: Search, label: "Scan Link", path: "/scanner/url", color: "bg-blue-500/10 text-blue-500" },
    { icon: Heart, label: "Mood Check", path: "/wellness", color: "bg-pink-500/10 text-pink-500" },
    { icon: Users, label: "Connect", path: "/community", color: "bg-purple-500/10 text-purple-500" },
  ];

  const todaysTip = "Remember to take breaks from social media. Your mental health matters! 💚";

  const recentAlerts = [
    { type: "warning", message: "Suspicious link detected in DM", time: "1 hour ago" },
    { type: "safe", message: "All recent scans came back safe", time: "Today" },
  ];

  const challenges = [
    { name: "7-Day Safety Streak", progress: 85, icon: "🔥" },
    { name: "Share 3 Safety Tips", progress: 66, icon: "📚" },
    { name: "Help 5 Community Members", progress: 40, icon: "🤝" },
  ];

  return (
    <DashboardLayout theme="teen">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-teal-500/20 rounded-2xl p-8 border border-green-500/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                Hey {userName}! 🌟
              </h1>
              <p className="text-muted-foreground text-lg">
                You're on a {streak}-day safety streak! Keep it up!
              </p>
            </div>
            <div className="hidden md:block text-6xl animate-float">
              🎯
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-8 w-8 text-green-500" />
              <div>
                <h3 className="text-2xl font-bold">{streak} Days</h3>
                <p className="text-sm text-muted-foreground">Safety Streak</p>
              </div>
            </div>
            <div className="text-4xl">🔥</div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-blue-500" />
              <div>
                <h3 className="text-2xl font-bold">{wellnessScore}%</h3>
                <p className="text-sm text-muted-foreground">Wellness Score</p>
              </div>
            </div>
            <Progress value={wellnessScore} className="h-2" />
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="h-8 w-8 text-purple-500" />
              <div>
                <h3 className="text-2xl font-bold">24</h3>
                <p className="text-sm text-muted-foreground">Scans This Week</p>
              </div>
            </div>
            <div className="text-4xl">📊</div>
          </Card>
        </div>

        {/* Today's Tip */}
        <Card className="p-6 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-emerald-500/30">
          <h2 className="text-xl font-heading font-semibold mb-3">💡 Today's Wellness Tip</h2>
          <p className="text-lg">{todaysTip}</p>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-heading font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.path}>
                <Card className="p-6 hover-glow cursor-pointer transition-all h-full text-center">
                  <div className={`p-4 rounded-xl w-fit mx-auto mb-3 ${action.color}`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{action.label}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <Card className="p-6">
          <h2 className="text-2xl font-heading font-semibold mb-6">Your Challenges</h2>
          <div className="space-y-6">
            {challenges.map((challenge, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{challenge.icon}</span>
                    <span className="font-semibold">{challenge.name}</span>
                  </div>
                  <span className="text-sm font-medium text-green-500">
                    {challenge.progress}%
                  </span>
                </div>
                <Progress value={challenge.progress} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Alerts */}
        <Card className="p-6">
          <h2 className="text-2xl font-heading font-semibold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg bg-muted/50"
              >
                <div className={`p-2 rounded-lg ${
                  alert.type === "safe" ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"
                }`}>
                  {alert.type === "safe" ? <Shield className="h-5 w-5" /> : <MessageSquare className="h-5 w-5" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{alert.message}</p>
                  <p className="text-sm text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Mental Health Resources */}
        <Card className="p-6 bg-gradient-to-br from-pink-500/10 to-purple-500/10 border-pink-500/20">
          <h2 className="text-2xl font-heading font-semibold mb-4">Mental Health Support</h2>
          <p className="text-muted-foreground mb-6">
            Feeling stressed or overwhelmed? We're here to help.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="rounded-full">Crisis Hotline</Button>
            <Button variant="outline" className="rounded-full">Talk to Someone</Button>
            <Button variant="outline" className="rounded-full">Relaxation Exercises</Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeenDashboard;
