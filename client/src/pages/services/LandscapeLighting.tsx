import { Button } from "@/components/ui/button";
import {
  Lightbulb,
  Zap,
  Shield,
  Leaf,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import { useLocation } from "wouter";

export default function LandscapeLighting() {
  const [, navigate] = useLocation();

  const handleNavigation = (path: string) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  const features = [
    {
      icon: Lightbulb,
      title: "Accent Lighting",
      description:
        "Highlight architectural features and landscape elements with warm, directional lighting that creates visual interest and depth.",
    },
    {
      icon: Zap,
      title: "Energy Efficient",
      description:
        "LED technology reduces energy consumption by up to 80% compared to traditional outdoor lighting while providing superior brightness.",
    },
    {
      icon: Shield,
      title: "Security Lighting",
      description:
        "Motion-activated and strategically placed lights enhance property security while maintaining aesthetic appeal.",
    },
    {
      icon: Leaf,
      title: "Landscape Enhancement",
      description:
        "Illuminate trees, shrubs, and garden features to create stunning nighttime landscapes that increase property value.",
    },
  ];

  const services = [
    {
      title: "Pathway Lighting",
      description:
        "Safe, elegant lighting along walkways and driveways using low-voltage LED fixtures that guide visitors while adding ambiance.",
    },
    {
      title: "Tree & Shrub Uplighting",
      description:
        "Professional uplighting techniques that showcase mature trees and landscaping features with warm, natural-looking illumination.",
    },
    {
      title: "Deck & Patio Lighting",
      description:
        "Integrated lighting solutions for outdoor entertainment spaces, including post lights, deck boards, and overhead fixtures.",
    },
    {
      title: "Water Feature Lighting",
      description:
        "Specialized lighting for fountains, ponds, and water features that creates dramatic visual effects and enhances outdoor spaces.",
    },
    {
      title: "Commercial Landscape Lighting",
      description:
        "Professional-grade systems for commercial properties, parking lots, and building facades with smart controls and energy management.",
    },
    {
      title: "Smart Lighting Integration",
      description:
        "Voice-controlled and app-managed landscape lighting that adjusts color temperature and brightness based on time of day.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/LnTadohNeulVPyBf.png"
                alt="All Things Automated Logo"
                className="h-8"
              />
            </button>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => handleNavigation("/")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("/about")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => handleNavigation("/services")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => handleNavigation("/contact")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Contact
              </button>
              <button
                onClick={() => handleNavigation("/pricing")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Pricing
              </button>
              <button
                onClick={() => handleNavigation("/blog")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Blog
              </button>
            </div>
            <Button className="bg-gray-900 text-white hover:bg-gray-800">
              Book Now
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Landscape Lighting
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your outdoor spaces into stunning nighttime landscapes
              with professional lighting design and installation.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90"
                onClick={() => handleNavigation("/contact")}
              >
                Get a Free Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleNavigation("/quote-builder")}
              >
                Build a Quote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Why Choose Our Landscape Lighting?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg hover:shadow-lg transition-shadow"
                >
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blueprints Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Design Examples
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Residential Blueprint */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src="https://private-us-east-1.manuscdn.com/sessionFile/G41wwZxJTdeFqWuVf8Z88y/sandbox/F8vxulPcxdhQDZxeORmVzm-img-1_1772081243000_na1fn_bGFuZHNjYXBlLWxpZ2h0aW5nLWJsdWVwcmludC1yZXNpZGVudGlhbA.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRzQxd3daeEpUZGVGcVd1VmY4Wjg4eS9zYW5kYm94L0Y4dnh1bFBjeGRoUURaeGVPUm1Wem0taW1nLTFfMTc3MjA4MTI0MzAwMF9uYTFmbl9iR0Z1WkhOallYQmxMV3hwWjJoMGFXNW5MV0pzZFdWd2NtbHVkQzF5WlhOcFpHVnVkR2xoYkEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=JQ56wiJ76MZcMUbpgrYuCJzmLS1sgUqCPjJpGcGb3vkVmET5aBqrfvOnMJSYRrevuiZ6SvoWww8CXgKq34R~hsPUUK~h2GPfGKpqrwyopX1vdJyoZKHb~MYilg0NDqoKm~GPuQhTgNvoGOHzGzMfR-hD3mPUvIgXXvlvLAGtCWRuZV0G-Wr4LhgvPToZ05KATMGgRIga86zSr2i9mX6LF9avJaDjeGK9tjjeI0bjvwCXqkTfMDuwQEbbm97RsPAXj42CMZ10N-sKPNwjfMpaPpYLdqF79JZRaQZi~DQl6ilJpO1tWpEbgrzdZPe6iVt88qNMkL9LZMe0pMCkIykuLw__"
                  alt="Residential Landscape Lighting Blueprint"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Residential Design
                </h3>
                <p className="text-gray-600 mb-4">
                  Our residential landscape lighting designs feature strategic
                  placement of pathway lights, accent uplighting on trees and
                  shrubs, facade lighting to highlight architectural features,
                  and ambient deck lighting. This comprehensive approach creates
                  a warm, inviting outdoor environment while enhancing security
                  and property value. Each design is customized to your home's
                  unique layout and landscaping.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Pathway and driveway lighting</li>
                  <li>✓ Tree and shrub uplighting</li>
                  <li>✓ Facade accent lighting</li>
                  <li>✓ Deck and patio illumination</li>
                  <li>✓ Garden bed lighting</li>
                </ul>
              </div>
            </div>

            {/* Commercial Blueprint */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-video bg-gray-200 overflow-hidden">
                <img
                  src="https://private-us-east-1.manuscdn.com/sessionFile/G41wwZxJTdeFqWuVf8Z88y/sandbox/F8vxulPcxdhQDZxeORmVzm-img-2_1772081251000_na1fn_bGFuZHNjYXBlLWxpZ2h0aW5nLWJsdWVwcmludC1jb21tZXJjaWFs.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRzQxd3daeEpUZGVGcVd1VmY4Wjg4eS9zYW5kYm94L0Y4dnh1bFBjeGRoUURaeGVPUm1Wem0taW1nLTJfMTc3MjA4MTI1MTAwMF9uYTFmbl9iR0Z1WkhOallYQmxMV3hwWjJoMGFXNW5MV0pzZFdWd2NtbHVkQzFqYjIxdFpYSmphV0ZzLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=k3tiys0lbck7zL0QHn5~-P18FI6~PlPctB7oZs9A4ydRzS9Qw316bfrs7LVGwjtaDl6PVgJNSge5OKQngHdoOOl8eiTyvS8FWKNZxq3QM-RM38zF2~8HcaN7Pv5WUWYHge7Z9aBy8asH5qZxmqaLCZC938yHsWZ0x0poE3dRLPKTgHLbiFKFDM7oTcegdJ5TREc0mn8uF1dA1XA77VHxDAcmy4cAmKiqYCBQDdfgxhIi3evIUdJa0uIDHx6TROCvrxbz6Yfx8xFkOUfD4eTUR6pSDXDwUz9z-aZseWxJ9V8kiUM4Kq8IGx6PZS2Bu5QqhCOOu3gmQk75mRvSF9kdHQ__"
                  alt="Commercial Landscape Lighting Blueprint"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Commercial Design
                </h3>
                <p className="text-gray-600 mb-4">
                  Our commercial landscape lighting systems are engineered for
                  large-scale properties, parking lots, and office buildings.
                  We provide high-performance LED pole lighting, building accent
                  systems, security lighting, and smart controls for efficient
                  energy management. These systems enhance safety, security, and
                  curb appeal while reducing operational costs.
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Parking lot lighting</li>
                  <li>✓ Building facade accent lighting</li>
                  <li>✓ Security and perimeter lighting</li>
                  <li>✓ Landscape feature uplighting</li>
                  <li>✓ Smart control systems</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Offered */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">
            Services We Provide
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-accent py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Illuminate Your Outdoor Space?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let our expert team design and install the perfect landscape
            lighting solution for your property.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
              onClick={() => handleNavigation("/contact")}
            >
              Schedule Consultation
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => handleNavigation("/quote-builder")}
            >
              Get a Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* NAVIGATE */}
            <div>
              <h4 className="font-semibold mb-4">NAVIGATE</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => handleNavigation("/")}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/about")}
                    className="hover:text-white transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/services")}
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/blog")}
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="font-semibold mb-4">SERVICES</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Smart Lighting</li>
                <li>Home Security</li>
                <li>Climate Control</li>
                <li>Voice Control</li>
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="font-semibold mb-4">CONTACT</h4>
              <p className="text-gray-400">(941) 263-5325</p>
            </div>

            {/* SOCIAL */}
            <div>
              <h4 className="font-semibold mb-4">FOLLOW US</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-gray-400 text-center">
              © 2026 All Things Automated. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
