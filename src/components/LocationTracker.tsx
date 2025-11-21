import { useState, useEffect } from "react";
import { MapPin, Send, Shield, AlertTriangle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

export const LocationTracker = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [trustedContacts, setTrustedContacts] = useState<string[]>([
    "Mom (555-0123)",
    "Dad (555-0124)",
  ]);
  const [newContact, setNewContact] = useState("");
  const { toast } = useToast();

  const getCurrentLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
          toast({
            title: "Location Retrieved",
            description: "Your current location has been captured.",
          });
        },
        (error) => {
          setLoading(false);
          toast({
            title: "Location Error",
            description: "Unable to retrieve your location. Please check permissions.",
            variant: "destructive",
          });
          console.error("Location error:", error);
        }
      );
    } else {
      setLoading(false);
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };

  const shareLocation = (contact: string) => {
    if (!location) {
      toast({
        title: "No Location",
        description: "Please get your location first.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send the location via SMS or messaging API
    toast({
      title: "Location Shared",
      description: `Your location has been shared with ${contact}`,
    });
  };

  const addTrustedContact = () => {
    if (newContact.trim()) {
      setTrustedContacts([...trustedContacts, newContact]);
      setNewContact("");
      toast({
        title: "Contact Added",
        description: "New trusted contact has been added.",
      });
    }
  };

  return (
    <Card className="p-6 border-blue-500/20 bg-blue-500/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-xl bg-blue-500/10">
          <MapPin className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-semibold">Location Tracker</h2>
          <p className="text-sm text-muted-foreground">
            Share your location with trusted contacts in emergencies
          </p>
        </div>
      </div>

      {/* Get Location */}
      <div className="mb-6">
        <Button
          onClick={getCurrentLocation}
          disabled={loading}
          className="w-full mb-4"
          variant="outline"
        >
          <MapPin className="mr-2 h-5 w-5" />
          {loading ? "Getting Location..." : "Get Current Location"}
        </Button>

        {location && (
          <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-5 w-5 text-green-500" />
              <span className="font-semibold text-green-500">Location Captured</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
            </p>
            <a
              href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-500 hover:underline mt-2 inline-block"
            >
              View on Google Maps
            </a>
          </div>
        )}
      </div>

      {/* Trusted Contacts */}
      <div className="mb-6">
        <h3 className="font-semibold mb-3">Trusted Contacts</h3>
        <div className="space-y-2 mb-4">
          {trustedContacts.map((contact, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
            >
              <span className="font-medium">{contact}</span>
              <Button
                size="sm"
                onClick={() => shareLocation(contact)}
                disabled={!location}
                className="rounded-full"
              >
                <Send className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          ))}
        </div>

        {/* Add Contact */}
        <div className="flex gap-2">
          <Input
            placeholder="Name (Phone Number)"
            value={newContact}
            onChange={(e) => setNewContact(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTrustedContact()}
          />
          <Button onClick={addTrustedContact} size="sm" className="rounded-full">
            Add
          </Button>
        </div>
      </div>

      {/* Safety Note */}
      <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
        <div className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            <strong>Privacy Note:</strong> Your location is only shared when you
            explicitly click "Share". No automatic tracking occurs.
          </p>
        </div>
      </div>
    </Card>
  );
};
