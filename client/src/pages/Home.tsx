/*
Design Philosophy: Premium Minimalism
- Serif headings (Cormorant Garamond) for luxury feel
- Minimal text, maximum impact
- Generous whitespace and breathing room
- Large, bold typography hierarchy
- Clean layouts with strategic use of color
*/

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Lightbulb,
  ShieldCheck,
  Thermometer,
  Mic,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";

export default function Home() {
  const [, navigate] = useLocation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      text: "Transformed our home into an intelligent living space. The team was professional and the installation seamless.",
      author: "Sarah Johnson",
      role: "Homeowner",
    },
    {
      text: "Saved us significantly on energy bills. Voice control integration works flawlessly with all our devices.",
      author: "Michael Chen",
      role: "Residential Client",
    },
    {
      text: "Upgraded our entire office building. The security and energy management have been transformative for our business.",
      author: "Emily Rodriguez",
      role: "Business Owner",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Scrolling Banner */}
      <div className="bg-primary text-primary-foreground py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-block">
          <span className="mx-8">Certified & Insured</span>
          <span className="mx-8">•</span>
          <span className="mx-8">24/7 Support</span>
          <span className="mx-8">•</span>
          <span className="mx-8">15+ Years</span>
          <span className="mx-8">•</span>
          <span className="mx-8">Smart Home Experts</span>
          <span className="mx-8">•</span>
          <span className="mx-8">Certified & Insured</span>
          <span className="mx-8">•</span>
          <span className="mx-8">24/7 Support</span>
          <span className="mx-8">•</span>
          <span className="mx-8">15+ Years</span>
          <span className="mx-8">•</span>
          <span className="mx-8">Smart Home Experts</span>
          <span className="mx-8">•</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="glass sticky top-0 z-50">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/NFtgaObIakoZmJFV.png"
                alt="All Things Automated Logo"
                className="h-12 w-auto"
              />
              <span className="text-xl font-bold">All Things Automated</span>
            </button>
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate("/")}
                className="text-primary font-semibold"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/about")}
                className="hover:text-primary transition-colors"
              >
                About Us
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
              <Button className="rounded-full">Book Now</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative py-40 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-7xl font-bold text-white mb-8 leading-tight">
              Step Into The World Of Smart Homes With Ease
            </h1>
            <p className="text-2xl text-white/90 mb-12 leading-relaxed">
              Intelligent automation for modern living.
            </p>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="rounded-full px-8 py-6 text-lg"
                onClick={() => navigate("/contact")}
              >
                Book a Consultation
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-6 text-lg bg-white/10 border-white text-white hover:bg-white/20"
                onClick={() => navigate("/services")}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-40 bg-background">
        <div className="container">
          <h2 className="text-6xl font-bold mb-20 text-center">
            Our Services
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Smart Lighting</h3>
              <p className="text-muted-foreground">
                Automated lighting control and ambiance.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Home Security</h3>
              <p className="text-muted-foreground">
                Advanced security and monitoring systems.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Thermometer className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Climate Control</h3>
              <p className="text-muted-foreground">
                Intelligent temperature and humidity management.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mic className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Voice Control</h3>
              <p className="text-muted-foreground">
                Seamless voice integration and automation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-40 bg-primary text-primary-foreground">
        <div className="container">
          <h2 className="text-6xl font-bold mb-20 text-center">
            What Our Clients Say
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="mb-12">
              <p className="text-2xl mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div>
                <p className="text-lg font-semibold">
                  {testimonials[currentTestimonial].author}
                </p>
                <p className="opacity-80">
                  {testimonials[currentTestimonial].role}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 bg-background">
        <div className="container text-center">
          <h2 className="text-6xl font-bold mb-8">Ready to Begin?</h2>
          <p className="text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Let's transform your home into an intelligent living space.
          </p>
          <Button
            size="lg"
            className="rounded-full px-8 py-6 text-lg"
            onClick={() => navigate("/contact")}
          >
            Schedule a Consultation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/NFtgaObIakoZmJFV.png"
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
                    onClick={() => navigate("/about")}
                    className="hover:opacity-100"
                  >
                    About
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
