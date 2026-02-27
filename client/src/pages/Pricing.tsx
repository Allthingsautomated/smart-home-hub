import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function Pricing() {
  const [, navigate] = useLocation();
  
  const handleNavigation = (path: string) => {
    scrollToTop();
    navigate(path);
  };
  const [systemType, setSystemType] = useState<"caseta" | "ra3" | "homeworks">(
    "caseta"
  );
  const [quantities, setQuantities] = useState({
    hub: 1,
    dimmers: 0,
    keypads: 0,
    remotes: 0,
  });
  const [laborHours, setLaborHours] = useState(2);
  const [clientType, setClientType] = useState<"residential" | "commercial">(
    "residential"
  );

  // Lutron Pricing (Retail)
  const lutronPricing = {
    caseta: {
      hub: 99.99,
      dimmer: 89.99,
      keypad: 129.99,
      remote: 49.99,
    },
    ra3: {
      hub: 219.99,
      dimmer: 199.99,
      keypad: 249.99,
      remote: 79.99,
    },
    homeworks: {
      hub: 1499.99,
      dimmer: 599.99,
      keypad: 699.99,
      remote: 199.99,
    },
  };

  // Labor rates
  const laborRates = {
    residential: 90,
    commercial: 125,
  };

  const prices = lutronPricing[systemType];
  const laborRate = laborRates[clientType];

  // Calculate totals
  const equipmentCost =
    quantities.hub * prices.hub +
    quantities.dimmers * prices.dimmer +
    quantities.keypads * prices.keypad +
    quantities.remotes * prices.remote;

  const laborCost = laborHours * laborRate;
  const totalCost = equipmentCost + laborCost;

  const handleQuantityChange = (
    item: keyof typeof quantities,
    change: number
  ) => {
    setQuantities((prev) => ({
      ...prev,
      [item]: Math.max(0, prev[item] + change),
    }));
  };

  const handleLaborChange = (change: number) => {
    setLaborHours(Math.max(0.5, laborHours + change));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/LnTadohNeulVPyBf.png"
                alt="All Things Automated Logo"
                className="h-10 w-auto"
              />
            </button>
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigate("/")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/about")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                About
              </button>
              <button
                onClick={() => navigate("/services")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Services
              </button>
              <button
                onClick={() => navigate("/pricing")}
                className="text-primary font-semibold hover:opacity-80 transition-opacity"
              >
                Pricing
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                Contact
              </button>
            </div>
            <Button className="rounded-full">Book Now</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-7xl md:text-8xl font-bold mb-6">PRICING</h1>
          <p className="text-xl text-gray-600 mb-6">
            Build your custom smart home quote
          </p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left: Configuration */}
            <div>
              <h2 className="text-4xl font-bold mb-12">BUILD YOUR SYSTEM</h2>

              {/* System Type Selection */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">System Type</h3>
                <div className="space-y-3">
                  {[
                    {
                      id: "caseta",
                      name: "Caséta",
                      desc: "Wireless, easy to install",
                    },
                    {
                      id: "ra3",
                      name: "RA3",
                      desc: "Professional, wired control",
                    },
                    {
                      id: "homeworks",
                      name: "HomeWorks",
                      desc: "Enterprise, commercial-grade",
                    },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        setSystemType(option.id as "caseta" | "ra3" | "homeworks")
                      }
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        systemType === option.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="font-bold">{option.name}</div>
                      <div className="text-sm text-gray-600">{option.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Client Type */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Client Type</h3>
                <div className="space-y-3">
                  {[
                    { id: "residential", name: "Residential ($90/hr)" },
                    { id: "commercial", name: "Commercial ($125/hr)" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() =>
                        setClientType(option.id as "residential" | "commercial")
                      }
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left font-bold ${
                        clientType === option.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {option.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Equipment Quantities */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Equipment</h3>
                <div className="space-y-4">
                  {[
                    { key: "hub", label: "Smart Bridge (Hub)" },
                    { key: "dimmers", label: "Dimmers/Switches" },
                    { key: "keypads", label: "Keypads" },
                    { key: "remotes", label: "Pico Remotes" },
                  ].map((item) => (
                    <div
                      key={item.key}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <span className="font-semibold">{item.label}</span>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.key as keyof typeof quantities,
                              -1
                            )
                          }
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold">
                          {quantities[item.key as keyof typeof quantities]}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.key as keyof typeof quantities,
                              1
                            )
                          }
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Labor Hours */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6">Installation Hours</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-semibold">Estimated Hours</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleLaborChange(-0.5)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold">
                      {laborHours.toFixed(1)}
                    </span>
                    <button
                      onClick={() => handleLaborChange(0.5)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quote Summary */}
            <div className="bg-gray-50 p-8 rounded-lg sticky top-32 h-fit">
              <h2 className="text-4xl font-bold mb-8">YOUR QUOTE</h2>

              {/* System Info */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <div className="text-lg text-gray-600 mb-2">System Type</div>
                <div className="text-2xl font-bold capitalize">
                  {systemType}
                </div>
              </div>

              {/* Equipment Breakdown */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <div className="text-lg font-bold mb-4">Equipment</div>
                <div className="space-y-3 text-sm">
                  {quantities.hub > 0 && (
                    <div className="flex justify-between">
                      <span>
                        {quantities.hub}x Smart Bridge @ $
                        {prices.hub.toFixed(2)}
                      </span>
                      <span>
                        ${(quantities.hub * prices.hub).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {quantities.dimmers > 0 && (
                    <div className="flex justify-between">
                      <span>
                        {quantities.dimmers}x Dimmer @ $
                        {prices.dimmer.toFixed(2)}
                      </span>
                      <span>
                        ${(quantities.dimmers * prices.dimmer).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {quantities.keypads > 0 && (
                    <div className="flex justify-between">
                      <span>
                        {quantities.keypads}x Keypad @ $
                        {prices.keypad.toFixed(2)}
                      </span>
                      <span>
                        ${(quantities.keypads * prices.keypad).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {quantities.remotes > 0 && (
                    <div className="flex justify-between">
                      <span>
                        {quantities.remotes}x Remote @ $
                        {prices.remote.toFixed(2)}
                      </span>
                      <span>
                        ${(quantities.remotes * prices.remote).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex justify-between font-bold mt-4 pt-4 border-t border-gray-300">
                  <span>Equipment Total</span>
                  <span>${equipmentCost.toFixed(2)}</span>
                </div>
              </div>

              {/* Labor Breakdown */}
              <div className="mb-8 pb-8 border-b border-gray-200">
                <div className="text-lg font-bold mb-4">Labor</div>
                <div className="flex justify-between text-sm mb-3">
                  <span>
                    {laborHours.toFixed(1)} hours @ ${laborRate}/hour
                  </span>
                  <span>${laborCost.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-2xl font-bold">TOTAL QUOTE</span>
                  <span className="text-4xl font-bold text-primary">
                    ${totalCost.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* CTA */}
              <Button
                size="lg"
                className="w-full rounded-lg py-6 text-lg font-semibold"
                onClick={() => navigate("/contact")}
              >
                Request This Quote
              </Button>
              <p className="text-center text-sm text-gray-600 mt-4">
                Contact us to finalize your custom quote
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/LnTadohNeulVPyBf.png"
                  alt="All Things Automated Logo"
                  className="h-10 w-auto"
                />
              </div>
              <p className="text-sm opacity-80">
                Intelligent automation for modern homes.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Navigate</h4>
              <ul className="space-y-3 text-sm opacity-80">
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
                    onClick={() => handleNavigation("/pricing")}
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigation("/contact")}
                    className="hover:text-white transition-colors"
                  >
                    Contact
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

            <div>
              <h4 className="font-bold mb-4 text-lg">Services</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li>Smart Lighting</li>
                <li>Home Security</li>
                <li>Climate Control</li>
                <li>Voice Control</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Contact</h4>
              <ul className="space-y-3 text-sm opacity-80">
                <li>(941) 263-5325</li>
                <li>info@allthingsautomated.com</li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-sm opacity-80">
            <p>© 2026 All Things Automated. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
