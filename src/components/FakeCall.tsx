import { useState, useEffect } from "react";
import { Phone, PhoneOff, Volume2, VolumeX } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export const FakeCall = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callerName, setCallerName] = useState("Mom");
  const [delay, setDelay] = useState("0");
  const [muted, setMuted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let timer: number;
    if (isCallActive) {
      // Vibrate if supported
      if ("vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isCallActive]);

  const triggerFakeCall = () => {
    const delayMs = parseInt(delay) * 1000;
    
    toast({
      title: "Fake Call Scheduled",
      description: `You'll receive a call from "${callerName}" in ${delay} seconds.`,
    });

    setTimeout(() => {
      setIsCallActive(true);
      
      // Play ringtone sound
      if (!muted) {
        const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiQ1/LMeSsFI3fH8OGQQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSwFJHfH8N2RQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSsFI3fH8OGQQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSwFJHfH8N2RQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSsFI3fH8OGQQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSwFJHfH8N2RQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSsFI3fH8OGQQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSwFJHfH8N2RQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSsFI3fH8OGQQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSwFJHfH8N2RQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSsFI3fH8OGQQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSwFJHfH8N2RQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSsFI3fH8OGQQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSwFJHfH8N2RQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSwFJHfH8N2RQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSsFI3fH8OGQQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSwFJHfH8N2RQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSsFI3fH8OGQQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSwFJHfH8N2RQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSsFI3fH8OGQQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSwFJHfH8N2RQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSsFI3fH8OGQQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSwFJHfH8N2RQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSsFI3fH8OGQQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSwFJHfH8N2RQAoVXrTp66hVFApGn+DyvmwhBjiQ1/LMeSsFI3fH8OGQQAoVXrTp66hVFA==");
        audio.loop = true;
        audio.play().catch(console.error);
        
        // Stop after 10 seconds
        setTimeout(() => {
          audio.pause();
          if (isCallActive) {
            setIsCallActive(false);
          }
        }, 10000);
      }
    }, delayMs);
  };

  const endCall = () => {
    setIsCallActive(false);
    toast({
      title: "Call Ended",
      description: "The fake call has been ended.",
    });
  };

  if (isCallActive) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center p-4 animate-fade-in">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
              <Phone className="h-16 w-16 text-primary" />
            </div>
            <h2 className="text-3xl font-heading font-bold mb-2">{callerName}</h2>
            <p className="text-xl text-muted-foreground">Calling...</p>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              variant="destructive"
              className="rounded-full h-16 w-16"
              onClick={endCall}
            >
              <PhoneOff className="h-6 w-6" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-16 w-16"
              onClick={() => setMuted(!muted)}
            >
              {muted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <Card className="p-6 border-green-500/20 bg-green-500/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-green-500/10">
          <Phone className="h-6 w-6 text-green-500" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-semibold">Fake Call</h2>
          <p className="text-sm text-muted-foreground">
            Get a fake emergency call to leave uncomfortable situations
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="caller-name">Caller Name</Label>
          <Input
            id="caller-name"
            value={callerName}
            onChange={(e) => setCallerName(e.target.value)}
            placeholder="Mom, Dad, Friend..."
          />
        </div>

        <div>
          <Label htmlFor="delay">Delay (seconds)</Label>
          <Select value={delay} onValueChange={setDelay}>
            <SelectTrigger id="delay">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Immediately</SelectItem>
              <SelectItem value="5">5 seconds</SelectItem>
              <SelectItem value="10">10 seconds</SelectItem>
              <SelectItem value="30">30 seconds</SelectItem>
              <SelectItem value="60">1 minute</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={triggerFakeCall}
          className="w-full btn-hero"
          size="lg"
        >
          <Phone className="mr-2 h-5 w-5" />
          Trigger Fake Call
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          This will display a realistic incoming call screen and vibrate your device
        </p>
      </div>
    </Card>
  );
};
