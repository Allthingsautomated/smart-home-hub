import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import ServicePageHeader from "@/components/ServicePageHeader";
import PageFooter from "@/components/PageFooter";
import { Upload, Phone, CheckCircle, Lightbulb, ShieldCheck, Thermometer, Mic } from "lucide-react";

export default function QuoteBuilder() {
  const [, navigate] = useLocation();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    serviceType: "smart-home",
    videoFile: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) {
        alert("Video file must be less than 500MB");
        return;
      }
      if (!["video/mp4", "video/quicktime", "video/x-msvideo"].includes(file.type)) {
        alert("Please upload an MP4, MOV, or AVI video file");
        return;
      }
      setFormData(prev => ({ ...prev, videoFile: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.email || !formData.address) {
      alert("Please fill in all required fields");
      return;
    }

    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + Math.random() * 30;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      const submissions = JSON.parse(localStorage.getItem("videoSubmissions") || "[]");
      const newSubmission = {
        id: Date.now(),
        ...formData,
        videoFile: formData.videoFile?.name,
        submittedAt: new Date().toISOString(),
        status: "pending",
      };
      submissions.push(newSubmission);
      localStorage.setItem("videoSubmissions", JSON.stringify(submissions));

      setSubmitted(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }, 2000);
  };

  const handleScheduleCall = () => {
    window.open("https://calendly.com", "_blank");
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <ServicePageHeader />

        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-2">Thank You!</h2>
            <p className="text-muted-foreground mb-4">Your project has been submitted successfully.</p>
            <p className="text-muted-foreground">We'll analyze your video and send you an estimate within 24 hours.</p>
          </div>
        </div>

        <PageFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <ServicePageHeader />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl mb-4" style={{fontFamily: '"Bebas Neue", sans-serif', fontWeight: '400'}}>GET YOUR FREE ESTIMATE IN 24 HOURS</h1>
          <p className="text-xl text-primary-foreground/80">Show us your project with a quick video. We'll analyze it and send you a detailed estimate — no service call needed.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form Section */}
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-8">SUBMIT YOUR PROJECT</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-card"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="(941) 263-5325"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-card"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-card"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Project Address *</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="123 Main St, Tampa, FL 33602"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-card"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Service Type *</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent bg-card"
                  >
                    <option value="smart-home">Smart Home Automation</option>
                    <option value="audio-video">Audio/Video Systems</option>
                    <option value="security">Security Systems</option>
                    <option value="electrical">Electrical Work</option>
                    <option value="landscape">Landscape Lighting</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Upload Project Video (Optional)</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors bg-muted/30">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground mb-2">Click to upload or drag and drop</p>
                    <p className="text-sm text-muted-foreground mb-4">MP4, MOV, or AVI (max 500MB)</p>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      {formData.videoFile ? (
                        <span className="text-green-600 font-semibold">{formData.videoFile.name}</span>
                      ) : (
                        <span className="text-muted-foreground">Choose file</span>
                      )}
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full py-3 rounded-lg font-semibold"
                  disabled={uploadProgress > 0 && uploadProgress < 100}
                >
                  {uploadProgress > 0 && uploadProgress < 100
                    ? `Uploading... ${Math.round(uploadProgress)}%`
                    : "Submit Project"}
                </Button>
              </form>
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              <div>
                <h3 className="text-4xl text-foreground mb-4" style={{fontFamily: '"Bebas Neue", sans-serif', fontWeight: '300'}}>HOW IT WORKS</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-accent text-accent-foreground font-bold">1</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground" style={{fontFamily: '"Bebas Neue", sans-serif', fontWeight: '400'}}>FILL OUT YOUR INFO</h4>
                      <p className="text-muted-foreground">Tell us about your project and location</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-accent text-accent-foreground font-bold">2</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground" style={{fontFamily: '"Bebas Neue", sans-serif', fontWeight: '400'}}>UPLOAD YOUR VIDEO</h4>
                      <p className="text-muted-foreground">Show us the area that needs work (2-5 minutes)</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-accent text-accent-foreground font-bold">3</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground" style={{fontFamily: '"Bebas Neue", sans-serif', fontWeight: '400'}}>GET YOUR ESTIMATE</h4>
                      <p className="text-muted-foreground">Receive a detailed estimate within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">OR SCHEDULE A LIVE CALL</h3>
                <p className="text-muted-foreground mb-4">Prefer to show us your project in real-time? Schedule a video walkthrough with our team.</p>
                <Button
                  onClick={handleScheduleCall}
                  className="w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Schedule Video Call
                </Button>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">WHY CHOOSE US?</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-foreground">Expert Smart Home Solutions</span>
                  </li>
                  <li className="flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-foreground">Licensed & Insured</span>
                  </li>
                  <li className="flex gap-3">
                    <Thermometer className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-foreground">Fast, Accurate Estimates</span>
                  </li>
                  <li className="flex gap-3">
                    <Mic className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-foreground">24/7 Customer Support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
