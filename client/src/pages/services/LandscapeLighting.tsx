import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import { useLocation } from "wouter";
import ServicePageHeader from "@/components/ServicePageHeader";
import ServiceHeroImage from "@/components/ServiceHeroImage";
import PageFooter from "@/components/PageFooter";

export default function LandscapeLighting() {
  const [, navigate] = useLocation();

  const solutions = [
    {
      name: "Pathway & Driveway",
      description: "Guiding lighting along walkways using low-voltage LED fixtures",
      features: [
        "Low-voltage LED path lights",
        "Driveway border lighting",
        "Step and riser lighting",
        "Solar or wired options",
        "Warm white tones",
      ],
    },
    {
      name: "Tree & Shrub Uplighting",
      description: "Professional uplighting that showcases mature trees and landscaping",
      features: [
        "In-ground directional fixtures",
        "Moonlighting from tree canopies",
        "Adjustable beam angles",
        "Weatherproof IP67 rated",
        "Natural warm illumination",
      ],
    },
    {
      name: "Smart Controls",
      description: "App and voice-managed landscape lighting with scheduling",
      features: [
        "Sunrise/sunset auto scheduling",
        "Color temperature control",
        "Alexa & Google compatible",
        "Zone-based control",
        "Energy usage monitoring",
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
              Landscape Lighting
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              Transform your outdoor spaces into stunning nighttime landscapes
              with professional design and precision installation.
            </p>
          </div>
        </div>
      </section>

      <ServiceHeroImage
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80"
        alt="Elegant landscape lighting illuminating a luxury home at night"
      />

      {/* Main Content */}
      <section className="py-40 bg-background">
        <div className="container">
          {/* Overview */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-8">What We Offer</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our landscape lighting team designs and installs custom outdoor
              lighting systems that enhance your property's beauty, security, and
              value. From pathway lights to dramatic tree uplighting, every design
              is tailored to your home's unique architecture and landscaping.
            </p>
          </div>

          {/* Solutions */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12">Lighting Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {solutions.map((item, index) => (
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

          {/* Why Choose Us */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12">Why Choose Our Team?</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Design & Installation</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Custom lighting design plans</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Licensed, insured electricians</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Commercial-grade LED fixtures</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Clean buried wire runs</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Long-Term Value</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Up to 80% energy savings vs traditional</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>50,000+ hour LED lifespan</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Increases property value</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Annual maintenance plans available</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary/5 p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Illuminate Your Property?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let our team design the perfect outdoor lighting solution for your home or business.
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg"
              onClick={() => navigate("/contact")}
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
