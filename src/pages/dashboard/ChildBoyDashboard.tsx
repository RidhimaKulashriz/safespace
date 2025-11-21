import { Shield, MessageSquare, Search, Star, Heart, Award, Sparkles, Gamepad } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Link } from "react-router-dom";

const ChildBoyDashboard = () => {
  const userName = "Jake";
  const safetyStars = 38;
  const level = 4;

  const badges = [
    { icon: Shield, name: "Safety Hero", earned: true },
    { icon: Star, name: "Smart Surfer", earned: true },
    { icon: Gamepad, name: "Game Master", earned: true },
    { icon: Heart, name: "Kind Friend", earned: false },
    { icon: Award, name: "Champion", earned: false },
  ];

  const funActivities = [
    { icon: MessageSquare, label: "Check Messages", color: "bg-blue-500/10 text-blue-500", path: "/scanner/message" },
    { icon: Search, label: "Safe Website Check", color: "bg-green-500/10 text-green-500", path: "/scanner/url" },
    { icon: Gamepad, label: "Safety Games", color: "bg-purple-500/10 text-purple-500", path: "/resources" },
    { icon: Sparkles, label: "Learn & Play", color: "bg-amber-500/10 text-amber-500", path: "/resources" },
  ];

  const dailyTips = [
    "Keep your passwords super secret! 🔐",
    "Be a good friend online and offline 🤝",
    "Ask a parent before sharing photos 📸",
  ];

  return (
    <DashboardLayout theme="child-boy">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in" style={{ fontSize: "1.1rem" }}>
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-3xl p-8 border-2 border-blue-500/30">
          <div className="flex items-center gap-4 mb-3">
            <div className="text-6xl animate-float">🚀</div>
            <div>
              <h1 className="text-4xl font-heading font-bold text-blue-600 dark:text-blue-400">
                Hey {userName}! 👋
              </h1>
              <p className="text-xl text-muted-foreground">
                You're awesome! Let's stay safe online together! 💪
              </p>
            </div>
          </div>
        </div>

        {/* Safety Stars & Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-8 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-heading font-bold">Safety Stars</h3>
                <p className="text-muted-foreground">Keep collecting stars!</p>
              </div>
              <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Star className="h-12 w-12 fill-blue-600 dark:fill-blue-400 text-blue-600 dark:text-blue-400" />
                {safetyStars}
              </div>
            </div>
            <Progress value={(safetyStars / 50) * 100} className="h-4" />
            <p className="text-sm text-muted-foreground mt-3">
              Only {50 - safetyStars} more stars to reach level {level + 1}! 🎉
            </p>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-2 border-green-500/30">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-heading font-bold">Your Level</h3>
                <p className="text-muted-foreground">Safety Champion!</p>
              </div>
              <div className="text-5xl font-bold text-green-600 dark:text-green-400">
                {level}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-10 w-10 text-green-600 dark:text-green-400" />
              <p className="text-lg font-semibold">Internet Safety Pro</p>
            </div>
          </Card>
        </div>

        {/* Badges Collection */}
        <Card className="p-8 border-2 border-blue-500/30">
          <h2 className="text-3xl font-heading font-bold mb-6 text-blue-600 dark:text-blue-400">
            My Badge Collection 🏆
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {badges.map((badge, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl text-center transition-all ${
                  badge.earned
                    ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/50 hover:scale-105"
                    : "bg-muted/50 opacity-50 grayscale"
                }`}
              >
                <badge.icon className="h-12 w-12 mx-auto mb-3 text-blue-600 dark:text-blue-400" />
                <p className="font-bold text-sm">{badge.name}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Fun Activities */}
        <div>
          <h2 className="text-3xl font-heading font-bold mb-6 text-blue-600 dark:text-blue-400">
            What do you want to do? 🎮
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {funActivities.map((activity, index) => (
              <Link key={index} to={activity.path}>
                <Card className="p-8 hover-glow cursor-pointer transition-all h-full border-2 hover:border-blue-500/50">
                  <div className={`p-6 rounded-2xl w-fit mb-4 ${activity.color}`}>
                    <activity.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-xl">{activity.label}</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Safety Tips */}
        <Card className="p-8 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-2 border-amber-500/30">
          <h2 className="text-3xl font-heading font-bold mb-6 text-amber-600 dark:text-amber-400">
            Today's Safety Tips 💡
          </h2>
          <div className="space-y-4">
            {dailyTips.map((tip, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-background/80 backdrop-blur border-2 border-border"
              >
                <p className="text-xl font-medium">{tip}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Parental Controls Notice */}
        <Card className="p-6 bg-blue-500/10 border-2 border-blue-500/30">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-blue-500" />
            <div>
              <p className="font-semibold text-lg">Protected by Parents</p>
              <p className="text-muted-foreground">Your parents can see your activity to keep you safe</p>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ChildBoyDashboard;