import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check } from "lucide-react";
import { useLocation } from "wouter";
import ServicePageHeader from "@/components/ServicePageHeader";
import ServiceHeroImage from "@/components/ServiceHeroImage";
import PageFooter from "@/components/PageFooter";

export default function HomeAudio() {
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
            <h1 className="text-6xl font-bold mb-8 leading-tight">
              Home Audio
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              Premium audio systems with Sonos and professional TV
              installations.
            </p>
          </div>
        </div>
      </section>

      <ServiceHeroImage
        src="data:image/jpeg;base64,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"
        alt="Sonos speaker — The Home Sound System"
      />

      {/* Main Content */}
      <section className="py-40 bg-background">
        <div className="container">
          {/* Overview */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-8">What We Offer</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We design and install premium home audio systems featuring Sonos
              speakers and professional TV installations. From whole-home audio
              to dedicated home theater, we create immersive entertainment
              experiences.
            </p>
          </div>

          {/* Audio Solutions */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12">Audio Solutions</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">Sonos Systems</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Wireless multi-room audio</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Streaming service integration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Voice control compatible</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>App-based control</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold mb-6">TV Systems</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Professional installation</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Cable management and mounting</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Surround sound integration</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                      <span>Smart home integration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features */}
          <div className="mb-20">
            <h2 className="text-4xl font-bold mb-12">Audio Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Whole-Home Audio</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Multi-room playback</li>
                    <li>• Independent volume control</li>
                    <li>• Synchronized playback</li>
                    <li>• Zone management</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Streaming Services</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Spotify integration</li>
                    <li>• Apple Music support</li>
                    <li>• Amazon Music compatible</li>
                    <li>• Tidal and more</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4">Control Options</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Mobile app control</li>
                    <li>• Voice commands</li>
                    <li>• Physical remotes</li>
                    <li>• Wall keypads</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-primary/5 p-12 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-6">
              Create Your Entertainment Space
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Let our audio experts design the perfect system for your home
              entertainment needs.
            </p>
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg"
              onClick={() => navigate("/contact")}
            >
              Design Your Audio System
            </Button>
          </div>
        </div>
      </section>

      <PageFooter />
    </div>
  );
}
