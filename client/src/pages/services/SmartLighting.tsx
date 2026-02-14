import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import { useLocation } from "wouter";

export default function SmartLighting() {
  const [, navigate] = useLocation();

  const lutronSystems = [
    {
      name: "Caséta",
      description: "Wireless, budget-friendly, DIY-ready",
      features: [
        "Wireless dimmer switches",
        "Remote control included",
        "Easy installation",
        "Smartphone app control",
        "Scheduling capabilities",
      ],
    },
    {
      name: "RA3",
      description: "Professional mesh network, highly reliable",
      features: [
        "Advanced mesh networking",
        "Multiple keypads and remotes",
        "Scene creation",
        "Integration with other systems",
        "Professional installation recommended",
      ],
    },
    {
      name: "HomeWorks",
      description: "Enterprise luxury, fully customizable",
      features: [
        "Complete home automation",
        "Advanced programming",
        "Multi-zone control",
        "Integration with all systems",
        "Professional design consultation",
      ],
    },
  ];

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
            <h1 className="text-6xl font-bold mb-8 leading-tight">Smart Lighting</h1>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              Professional Lutron lighting automation systems for complete control and ambiance.
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
              We specialize in Lutron lighting control systems, the industry standard for professional smart home automation. Whether you're looking for a simple wireless solution or a comprehensive whole-home system, we have the perfect option for your needs.
            </p>
          </div>

          {/* Lutron Systems */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12">Lutron Systems</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {lutronSystems.map((system, index) => (
                <Card key={index} className="border-none shadow-sm">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{system.name}</h3>
                    <p className="text-muted-foreground mb-8">{system.description}</p>
                    <div className="space-y-3">
                      {system.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start">
                          <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Capabilities */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12">What You Can Control</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Lighting Control</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Dimming and brightness adjustment</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Scene creation and presets</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Scheduling and automation</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Mobile app control</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Advanced Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Occupancy sensors</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Daylight harvesting</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Energy monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Integration with other systems</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary/5 p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Lighting?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule a consultation with our experts to discuss the perfect Lutron system for your home.
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg"
              onClick={() => navigate("/contact")}
            >
              Get Your Free Consultation
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
