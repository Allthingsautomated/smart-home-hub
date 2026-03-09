import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import { useLocation } from "wouter";
import ServicePageHeader from "@/components/ServicePageHeader";
import ServiceHeroImage from "@/components/ServiceHeroImage";
import PageFooter from "@/components/PageFooter";

export default function TeslaPanels() {
  const [, navigate] = useLocation();

  const features = [
    {
      name: "Tesla Wall Connector",
      description: "Level 2 home EV charger — up to 44 miles of range per hour",
      features: [
        "Up to 48A / 11.5kW output",
        "Wi-Fi connected with OTA updates",
        "Works with all Tesla vehicles",
        "Sleek flush-mount wall design",
        "Scheduling via Tesla app",
      ],
    },
    {
      name: "Tesla Powerwall",
      description: "Whole-home battery backup — energy independence on demand",
      features: [
        "13.5 kWh usable capacity",
        "Seamless grid outage detection",
        "Solar and grid charging",
        "Real-time energy monitoring",
        "Stacks up to 10 units",
      ],
    },
    {
      name: "Panel Upgrades",
      description: "Modern electrical panels to support today's smart home loads",
      features: [
        "200–400A service upgrades",
        "EV-ready circuit installation",
        "Code-compliant permitting",
        "Whole-home surge protection",
        "Smart circuit monitoring",
      ],
    },
  ];

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
            <h1 className="text-6xl font-bold mb-8 leading-tight">
              Tesla Electrical Panels
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              Tesla Wall Connectors, Powerwall battery backup, and full electrical
              panel upgrades for the modern home.
            </p>
          </div>
        </div>
      </section>

      <ServiceHeroImage
        src="https://images.unsplash.com/photo-1593941707882-a5bac6861d75?auto=format&fit=crop&w=1400&q=80"
        alt="Tesla Wall Connector mounted on a home garage wall"
      />

      {/* Main Content */}
      <section className="py-40 bg-background">
        <div className="container">
          {/* Overview */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-8">What We Offer</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We are certified Tesla installers specializing in Wall Connector installations,
              Powerwall battery systems, and electrical panel upgrades. From EV charging to
              whole-home energy independence, we deliver clean, professional installs with
              proper permitting and inspection.
            </p>
          </div>

          {/* Solutions */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12">Tesla Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((item, index) => (
                <Card key={index} className="border-none shadow-sm">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                    <p className="text-muted-foreground mb-8">{item.description}</p>
                    <div className="space-y-3">
                      {item.features.map((feature, idx) => (
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

          {/* Why Tesla */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12">Why Choose Tesla Energy?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Energy Management</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Automated self-powered mode</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Time-of-use rate optimization</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Solar charging integration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Real-time app monitoring</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Installation & Support</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Licensed, permitted, and inspected</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Certified Tesla installer</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Clean cable management</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>24/7 post-install support</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary/5 p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Upgrade Your Electrical System?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Schedule a consultation and we'll design the perfect Tesla energy solution
              for your home or business.
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

      <PageFooter />
    </div>
  );
}
