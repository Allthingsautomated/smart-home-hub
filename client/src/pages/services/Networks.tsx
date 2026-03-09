import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import { useLocation } from "wouter";
import ServicePageHeader from "@/components/ServicePageHeader";
import ServiceHeroImage from "@/components/ServiceHeroImage";
import PageFooter from "@/components/PageFooter";

export default function Networks() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <ServicePageHeader />

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
              Enterprise-grade networking with Ubiquiti for reliable
              connectivity.
            </p>
          </div>
        </div>
      </section>

      <ServiceHeroImage
        src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80"
        alt="Ubiquiti UniFi network rack with structured wiring"
      />

      {/* Main Content */}
      <section className="py-40 bg-background">
        <div className="container">
          {/* Overview */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-8">What We Offer</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We design and install professional networking infrastructure using
              Ubiquiti equipment. From WiFi coverage to network security, we
              ensure your smart home has a rock-solid foundation.
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
            <h2 className="text-3xl font-bold mb-6">
              Build Your Network Foundation
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let our networking experts design a reliable, secure
              infrastructure for your smart home.
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

      <PageFooter />
    </div>
  );
}
