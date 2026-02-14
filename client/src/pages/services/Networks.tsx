import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import { useLocation } from "wouter";

export default function Networks() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/UgZHwSmgWWJSnIDw.png"
                alt="All Things Automated Logo"
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold">All Things Automated</span>
            </button>
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate("/")}
                className="hover:text-primary transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/services")}
                className="hover:text-primary transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="hover:text-primary transition-colors"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-32 bg-background">
        <div className="container">
          <button
            onClick={() => navigate("/services")}
            className="flex items-center text-primary hover:opacity-80 mb-8 transition-opacity"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Services
          </button>
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-8 leading-tight">Networks</h1>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              Enterprise-grade networking with Ubiquiti for reliable connectivity.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-40 bg-background">
        <div className="container">
          {/* Overview */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-8">What We Offer</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We design and install professional networking infrastructure using Ubiquiti equipment. From WiFi coverage to network security, we ensure your smart home has a rock-solid foundation.
            </p>
          </div>

          {/* Network Solutions */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12">Network Solutions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">WiFi Coverage</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>UniFi WiFi 6 access points</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Whole-home coverage</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Mesh networking</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Guest network support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Network Security</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>UniFi Dream Machine</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Advanced firewall protection</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Threat detection and prevention</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>VPN and remote access</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12">Network Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Performance</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• WiFi 6 speeds</li>
                    <li>• Low latency</li>
                    <li>• High throughput</li>
                    <li>• Stable connections</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Management</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Cloud management</li>
                    <li>• Remote monitoring</li>
                    <li>• Real-time analytics</li>
                    <li>• Device management</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Integration</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Smart home compatible</li>
                    <li>• Camera system support</li>
                    <li>• IoT device support</li>
                    <li>• Scalable architecture</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary/5 p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-6">Build Your Network Foundation</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let our networking experts design a reliable, secure infrastructure for your smart home.
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg"
              onClick={() => navigate("/contact")}
            >
              Plan Your Network
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 mt-auto">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/UgZHwSmgWWJSnIDw.png"
                  alt="All Things Automated Logo"
                  className="h-10 w-auto"
                />
                <span className="text-lg font-bold">All Things Automated</span>
              </div>
              <p className="text-sm opacity-80">
                Intelligent automation for modern homes.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Navigate</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="hover:opacity-100"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/services")}
                    className="hover:opacity-100"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/contact")}
                    className="hover:opacity-100"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Smart Lighting</li>
                <li>Home Security</li>
                <li>Climate Control</li>
                <li>Voice Control</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>(555) 123-4567</li>
                <li>info@allthingsautomated.com</li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80">
            <p>© 2026 All Things Automated. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
