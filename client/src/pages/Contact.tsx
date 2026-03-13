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
import ServicePageHeader from "@/components/ServicePageHeader";
import PageFooter from "@/components/PageFooter";

export default function Contact() {
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
    <div className="min-h-screen flex flex-col bg-background">
      <ServicePageHeader />

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

      <PageFooter />
    </div>
  );
}
