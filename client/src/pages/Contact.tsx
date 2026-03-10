import { Button } from "@/components/ui/button";
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
import { useState } from "react";
import { useLocation } from "wouter";
import MobileNav from "@/components/MobileNav";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Contact() {
  const [, navigate] = useLocation();
  
  const handleNavigation = (path: string) => {
    scrollToTop();
    navigate(path);
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    type: "residential",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      service: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We'll be in touch soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      type: "residential",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-slate-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handleNavigation("/")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/UgZHwSmgWWJSnIDw.png"
                alt="All Things Automated Logo"
                className="h-10 w-auto"
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
                className="text-primary font-semibold hover:opacity-80 transition-opacity"
              >
                Contact
              </button>
              <button
                onClick={() => handleNavigation("/quote-builder")}
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
            <div className="flex items-center space-x-4">
              <MobileNav onNavigate={handleNavigation} />
              <Button
                className="rounded-full hidden md:inline-flex"
                onClick={() => handleNavigation("/contact")}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-32 bg-background">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-6xl font-bold mb-8 leading-tight">
              Get In Touch
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed">
              Let's discuss how we can automate your home or business.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-40 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-20">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-12">Contact Info</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Phone</h3>
                  <p className="text-muted-foreground">(555) 123-4567</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email</h3>
                  <p className="text-muted-foreground">
                    info@allthingsautomated.com
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Hours</h3>
                  <p className="text-muted-foreground">Available 24/7</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Service Area</h3>
                  <p className="text-muted-foreground">
                    Nationwide coverage
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div>
                  <Label htmlFor="name" className="text-base font-semibold mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="h-12 text-base"
                    placeholder="Your name"
                  />
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 text-base"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-base font-semibold mb-2 block">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="h-12 text-base"
                    placeholder="(555) 123-4567"
                  />
                </div>

                {/* Property Type */}
                <div>
                  <Label className="text-base font-semibold mb-4 block">
                    Property Type
                  </Label>
                  <RadioGroup
                    value={formData.type}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, type: value }))
                    }
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <RadioGroupItem value="residential" id="residential" />
                      <Label htmlFor="residential" className="font-normal cursor-pointer">
                        Residential
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="commercial" id="commercial" />
                      <Label htmlFor="commercial" className="font-normal cursor-pointer">
                        Commercial
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Service */}
                <div>
                  <Label htmlFor="service" className="text-base font-semibold mb-2 block">
                    Service Interest
                  </Label>
                  <Select value={formData.service} onValueChange={handleSelectChange}>
                    <SelectTrigger className="h-12 text-base">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lighting">Smart Lighting</SelectItem>
                      <SelectItem value="security">Home Security</SelectItem>
                      <SelectItem value="climate">Climate Control</SelectItem>
                      <SelectItem value="voice">Voice Control</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Message */}
                <div>
                  <Label htmlFor="message" className="text-base font-semibold mb-2 block">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-32 text-base"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-12 text-lg rounded-full"
                >
                  Send Message
                </Button>
              </form>
            </div>
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
                    onClick={() => handleNavigation("/")}
                    className="hover:opacity-100"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/about")}
                    className="hover:opacity-100"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/services")}
                    className="hover:opacity-100"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/contact")}
                    className="hover:opacity-100"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/blog")}
                    className="hover:opacity-100"
                  >
                    Blog
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
                <li>
                  <a href="tel:(941) 263-5325" className="hover:opacity-100 transition-opacity">
                    (941) 263-5325
                  </a>
                </li>
                <li>
                  <a href="mailto:office@allthingsautomated.org" className="hover:opacity-100 transition-opacity">
                    office@allthingsautomated.org
                  </a>
                </li>
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
