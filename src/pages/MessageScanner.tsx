import { useState } from "react";
import { MessageSquare, Upload, AlertTriangle, CheckCircle, XCircle, Image as ImageIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const MessageScanner = () => {
  const [scanMode, setScanMode] = useState<"text" | "image">("text");
  const [inputText, setInputText] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleScan = async () => {
    if (!inputText && !uploadedImage) {
      toast({
        title: "No input",
        description: "Please provide text or upload an image to scan.",
        variant: "destructive",
      });
      return;
    }

    setScanning(true);
    setResult(null);
    setScanProgress(0);
    
    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 300);
    
    try {
      const { data, error } = await supabase.functions.invoke('analyze-message', {
        body: { 
          text: inputText || undefined,
          imageBase64: uploadedImage || undefined 
        }
      });

      clearInterval(progressInterval);
      setScanProgress(100);

      if (error) {
        console.error('Analysis error:', error);
        toast({
          title: "Analysis Failed",
          description: error.message || "Unable to analyze message. Please try again.",
          variant: "destructive",
        });
        setScanning(false);
        return;
      }

      console.log('Analysis result:', data);

      const categoryMap: Record<string, any> = {
        SAFE: {
          icon: CheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          severity: "low",
        },
        TOXIC: {
          icon: XCircle,
          color: "text-red-500",
          bgColor: "bg-red-500/10",
          severity: "high",
        },
        HARASSMENT: {
          icon: AlertTriangle,
          color: "text-red-500",
          bgColor: "bg-red-500/10",
          severity: "high",
        },
        GROOMING: {
          icon: AlertTriangle,
          color: "text-red-500",
          bgColor: "bg-red-500/10",
          severity: "high",
        },
        SCAM: {
          icon: AlertTriangle,
          color: "text-amber-500",
          bgColor: "bg-amber-500/10",
          severity: "medium",
        },
        SUSPICIOUS: {
          icon: AlertTriangle,
          color: "text-amber-500",
          bgColor: "bg-amber-500/10",
          severity: "medium",
        },
      };

      const categoryData = categoryMap[data.category] || categoryMap.SUSPICIOUS;

      setResult({
        category: data.category,
        severity: categoryData.severity,
        message: data.message,
        icon: categoryData.icon,
        color: categoryData.color,
        bgColor: categoryData.bgColor,
        confidence: data.confidence,
        recommendations: data.recommendations,
        detectedPatterns: data.detectedPatterns || [],
        riskFactors: data.riskFactors || [],
      });

    } catch (error) {
      console.error('Scan error:', error);
      clearInterval(progressInterval);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
      setScanProgress(0);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setUploadedImage(base64);
        toast({
          title: "Image Uploaded",
          description: "Click 'Scan Message' to analyze the screenshot.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-heading font-bold mb-4 flex items-center gap-3">
            <MessageSquare className="h-10 w-10 text-primary" />
            Message Scanner
          </h1>
          <p className="text-xl text-muted-foreground">
            Scan messages and screenshots for toxic content, harassment, scams, and more
          </p>
        </div>

        {/* Mode Selection */}
        <Card className="p-6">
          <div className="flex gap-4 mb-6">
            <Button
              variant={scanMode === "text" ? "default" : "outline"}
              onClick={() => setScanMode("text")}
              className="flex-1 rounded-full"
            >
              <MessageSquare className="mr-2 h-5 w-5" />
              Paste Text
            </Button>
            <Button
              variant={scanMode === "image" ? "default" : "outline"}
              onClick={() => setScanMode("image")}
              className="flex-1 rounded-full"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Screenshot
            </Button>
          </div>

          {/* Text Input Mode */}
          {scanMode === "text" && (
            <div className="space-y-4">
              <Label htmlFor="message-input">Paste the message you want to scan</Label>
              <Textarea
                id="message-input"
                placeholder="Paste the message here..."
                className="min-h-[200px] text-lg"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <Button
                onClick={handleScan}
                disabled={!inputText || scanning}
                className="w-full btn-hero"
              >
                {scanning ? "Scanning..." : "Scan Message"}
              </Button>
            </div>
          )}

          {/* Image Upload Mode */}
          {scanMode === "image" && (
            <div className="space-y-4">
              <Label htmlFor="image-upload">Upload a screenshot of the message</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  {uploadedImage ? (
                    <>
                      <img src={uploadedImage} alt="Uploaded" className="max-w-full max-h-64 mx-auto mb-4 rounded-lg" />
                      <p className="text-lg font-medium mb-2">Image uploaded ✓</p>
                      <p className="text-sm text-muted-foreground">
                        Click to upload a different image
                      </p>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium mb-2">Click to upload screenshot</p>
                      <p className="text-sm text-muted-foreground">
                        Supports JPG, PNG, or any image format
                      </p>
                    </>
                  )}
                </label>
              </div>
              <Button
                onClick={handleScan}
                disabled={!uploadedImage || scanning}
                className="w-full btn-hero"
              >
                {scanning ? "Scanning..." : "Scan Message"}
              </Button>
            </div>
          )}
        </Card>

        {/* Scanning Animation */}
        {scanning && (
          <Card className="p-8 text-center">
            <div className="animate-spin h-16 w-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-lg font-medium">Analyzing message...</p>
            <p className="text-muted-foreground mb-4">AI is examining content for threats</p>
            <div className="max-w-md mx-auto">
              <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${scanProgress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{scanProgress}% complete</p>
            </div>
          </Card>
        )}

        {/* Results */}
        {result && !scanning && (
          <Card className={`p-8 border-2 ${result.bgColor} ${result.color.replace("text-", "border-")}`}>
            <div className="flex items-start gap-4 mb-6">
              <div className={`p-4 rounded-2xl ${result.bgColor}`}>
                <result.icon className={`h-10 w-10 ${result.color}`} />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-heading font-bold mb-2">
                  {result.category} Detected
                </h2>
                <p className="text-lg text-muted-foreground">{result.message}</p>
              </div>
            </div>

            {/* Confidence Score */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Confidence Score</span>
                <span className="text-sm font-bold">{result.confidence}%</span>
              </div>
              <div className="h-3 bg-background/50 rounded-full overflow-hidden">
                <div
                  className={`h-full ${result.color.replace("text-", "bg-")} transition-all duration-1000`}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>

            {/* Detected Patterns */}
            {result.detectedPatterns && result.detectedPatterns.length > 0 && (
              <div className="bg-background/60 rounded-xl p-6 mb-4">
                <h3 className="font-heading font-semibold text-lg mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Detected Patterns
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.detectedPatterns.map((pattern: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-background rounded-full text-sm border border-border">
                      {pattern}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Risk Factors */}
            {result.riskFactors && result.riskFactors.length > 0 && (
              <div className="bg-background/60 rounded-xl p-6 mb-4">
                <h3 className="font-heading font-semibold text-lg mb-3 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Risk Factors
                </h3>
                <ul className="space-y-2">
                  {result.riskFactors.map((risk: string, index: number) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-red-500 mt-0.5">•</span>
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendations */}
            {result.severity !== "low" && result.recommendations && (
              <div className="bg-background/80 rounded-xl p-6">
                <h3 className="font-heading font-semibold text-xl mb-4">
                  What should you do?
                </h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex gap-3 flex-wrap">
                  <Button variant="outline" className="rounded-full">
                    Get Support
                  </Button>
                  <Button variant="outline" className="rounded-full">
                    Report This
                  </Button>
                  <Button 
                    variant="outline" 
                    className="rounded-full"
                    onClick={() => {
                      setResult(null);
                      setInputText("");
                      setUploadedImage(null);
                    }}
                  >
                    Scan Another Message
                  </Button>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Info Card */}
        <Card className="p-6 bg-blue-500/10 border-blue-500/20">
          <h3 className="font-heading font-semibold text-lg mb-3 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            How does this work?
          </h3>
          <p className="text-muted-foreground mb-3">
            Our AI-powered scanner analyzes messages for:
          </p>
          <ul className="text-muted-foreground space-y-2 list-disc list-inside">
            <li>Toxic and aggressive language</li>
            <li>Harassment and bullying patterns</li>
            <li>Potential grooming behavior</li>
            <li>Scam and phishing attempts</li>
            <li>Suspicious or manipulative content</li>
          </ul>
          <p className="text-muted-foreground mt-3">
            All scans are private and encrypted. We never store your messages.
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MessageScanner;
