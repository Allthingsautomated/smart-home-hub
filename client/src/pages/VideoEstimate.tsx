import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Upload, Phone, CheckCircle, ArrowRight, Lightbulb, ShieldCheck, Thermometer, Mic } from "lucide-react";

export default function VideoEstimate() {
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
      // Validate file size (max 500MB)
      if (file.size > 500 * 1024 * 1024) {
        alert("Video file must be less than 500MB");
        return;
      }
      // Validate file type
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

    // Simulate upload progress
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

    // Simulate API call
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      // Store submission in localStorage
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
      <div className="min-h-screen flex flex-col bg-white">
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
              >
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/LnTadohNeulVPyBf.png"
                  alt="All Things Automated Logo"
                  className="h-10 w-auto"
                />
                <span className="font-bold text-lg hidden sm:inline">All Things Automated</span>
              </button>
              <div className="flex items-center space-x-6">
                <button onClick={() => navigate("/")} className="text-gray-700 hover:text-gray-900">Home</button>
                <button onClick={() => navigate("/about")} className="text-gray-700 hover:text-gray-900">About</button>
                <button onClick={() => navigate("/services")} className="text-gray-700 hover:text-gray-900">Services</button>
                <button onClick={() => navigate("/contact")} className="text-gray-700 hover:text-gray-900">Contact</button>
                <button onClick={() => navigate("/blog")} className="text-gray-700 hover:text-gray-900">Blog</button>
                <button
                  onClick={() => navigate("/video-estimate")}
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
                >
                  Get Estimate
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center px-4 py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="text-center max-w-2xl">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Thank You! 🎉
            </h1>
            <p className="text-xl text-gray-700 mb-4">
              Your video has been received successfully!
            </p>
            <p className="text-gray-600 mb-8">
              We'll review your job site video and send you a detailed estimate within 24 hours.
            </p>
            <p className="text-sm text-gray-500 mb-8">
              A confirmation email has been sent to <strong>{formData.email}</strong>
            </p>
            <Button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Return to Home
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-lg mb-4">NAVIGATE</h3>
                <ul className="space-y-2">
                  <li><button onClick={() => navigate("/")} className="hover:text-blue-400">Home</button></li>
                  <li><button onClick={() => navigate("/about")} className="hover:text-blue-400">About</button></li>
                  <li><button onClick={() => navigate("/services")} className="hover:text-blue-400">Services</button></li>
                  <li><button onClick={() => navigate("/contact")} className="hover:text-blue-400">Contact Us</button></li>
                  <li><button onClick={() => navigate("/blog")} className="hover:text-blue-400">Blog</button></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">SERVICES</h3>
                <ul className="space-y-2">
                  <li><button onClick={() => navigate("/services")} className="hover:text-blue-400">Smart Lighting</button></li>
                  <li><button onClick={() => navigate("/services")} className="hover:text-blue-400">Home Security</button></li>
                  <li><button onClick={() => navigate("/services")} className="hover:text-blue-400">Climate Control</button></li>
                  <li><button onClick={() => navigate("/services")} className="hover:text-blue-400">Voice Control</button></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">CONTACT</h3>
                <p className="text-gray-400 mb-2">
                  <a href="tel:(941) 263-5325" className="hover:text-blue-400">(941) 263-5325</a>
                </p>
                <p className="text-gray-400">Available 24/7</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">FOLLOW US</h3>
                <div className="flex space-x-4">
                  <a href="https://www.instagram.com/allthingsautomated8/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                    </svg>
                  </a>
                  <a href="https://www.tiktok.com/@allthingsautomated?_r=1&_t=ZT-94GKcCmT0rW" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 5.1-1.82V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.96-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-center text-gray-400">© 2026 All Things Automated. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/LnTadohNeulVPyBf.png"
                alt="All Things Automated Logo"
                className="h-10 w-auto"
              />
              <span className="font-bold text-lg hidden sm:inline">All Things Automated</span>
            </button>
            <div className="flex items-center space-x-6">
              <button onClick={() => navigate("/")} className="text-gray-700 hover:text-gray-900">Home</button>
              <button onClick={() => navigate("/about")} className="text-gray-700 hover:text-gray-900">About</button>
              <button onClick={() => navigate("/services")} className="text-gray-700 hover:text-gray-900">Services</button>
              <button onClick={() => navigate("/contact")} className="text-gray-700 hover:text-gray-900">Contact</button>
              <button onClick={() => navigate("/blog")} className="text-gray-700 hover:text-gray-900">Blog</button>
              <button
                onClick={() => navigate("/video-estimate")}
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Get Estimate
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold mb-4">Get Your Free Estimate in 24 Hours</h1>
          <p className="text-xl text-blue-100 mb-8">
            Show us your project with a quick video. We'll analyze it and send you a detailed estimate — no service call needed.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="flex-1 py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Project</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Smith"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(941) 263-5325"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main St, Tampa, FL 33602"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="smart-home">Smart Home Automation</option>
                    <option value="av">Audio/Video Systems</option>
                    <option value="security">Security Systems</option>
                    <option value="electrical">Electrical Work</option>
                    <option value="lighting">Landscape Lighting</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Project Video (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
                    <input
                      type="file"
                      accept="video/mp4,video/quicktime,video/x-msvideo"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {formData.videoFile ? formData.videoFile.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">MP4, MOV, or AVI (max 500MB)</p>
                    </label>
                  </div>
                </div>

                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
                >
                  Submit Project <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {/* Info Section */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">How It Works</h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white font-bold">1</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Fill Out Your Info</h4>
                      <p className="text-gray-600">Tell us about your project and location</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white font-bold">2</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Upload Your Video</h4>
                      <p className="text-gray-600">Show us the area that needs work (2-5 minutes)</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-600 text-white font-bold">3</div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Get Your Estimate</h4>
                      <p className="text-gray-600">Receive a detailed estimate within 24 hours</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Or Schedule a Live Call</h3>
                <p className="text-gray-600 mb-4">
                  Prefer to show us your project in real-time? Schedule a video walkthrough with our team.
                </p>
                <Button
                  onClick={handleScheduleCall}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Schedule Video Call
                </Button>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Expert Smart Home Solutions</span>
                  </li>
                  <li className="flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Licensed & Insured</span>
                  </li>
                  <li className="flex gap-3">
                    <Thermometer className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">Fast, Accurate Estimates</span>
                  </li>
                  <li className="flex gap-3">
                    <Mic className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">24/7 Customer Support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">NAVIGATE</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigate("/")} className="hover:text-blue-400">Home</button></li>
                <li><button onClick={() => navigate("/about")} className="hover:text-blue-400">About</button></li>
                <li><button onClick={() => navigate("/services")} className="hover:text-blue-400">Services</button></li>
                <li><button onClick={() => navigate("/contact")} className="hover:text-blue-400">Contact Us</button></li>
                <li><button onClick={() => navigate("/blog")} className="hover:text-blue-400">Blog</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">SERVICES</h3>
              <ul className="space-y-2">
                <li><button onClick={() => navigate("/services")} className="hover:text-blue-400">Smart Lighting</button></li>
                <li><button onClick={() => navigate("/services")} className="hover:text-blue-400">Home Security</button></li>
                <li><button onClick={() => navigate("/services")} className="hover:text-blue-400">Climate Control</button></li>
                <li><button onClick={() => navigate("/services")} className="hover:text-blue-400">Voice Control</button></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">CONTACT</h3>
              <p className="text-gray-400 mb-2">
                <a href="tel:(941) 263-5325" className="hover:text-blue-400">(941) 263-5325</a>
              </p>
              <p className="text-gray-400">Available 24/7</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">FOLLOW US</h3>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/allthingsautomated8/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z"/>
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@allthingsautomated?_r=1&_t=ZT-94GKcCmT0rW" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 5.1-1.82V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.96-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400">© 2026 All Things Automated. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
