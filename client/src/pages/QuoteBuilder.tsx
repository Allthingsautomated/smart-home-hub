import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Home, DollarSign, Zap, Shield } from "lucide-react";

interface Room {
  id: string;
  name: string;
  type: "living-room" | "bedroom" | "kitchen" | "bathroom" | "dining-room";
  selected: boolean;
}

interface SystemOption {
  id: string;
  name: string;
  description: string;
  pricePerSwitch: number;
  hoursPerRoom: number;
  color: string;
}

const SYSTEMS: SystemOption[] = [
  {
    id: "caseta",
    name: "Caséta",
    description: "Wireless, budget-friendly, DIY-ready",
    pricePerSwitch: 75,
    hoursPerRoom: 2,
    color: "bg-blue-100",
  },
  {
    id: "ra3",
    name: "RA3",
    description: "Professional mesh network, reliable",
    pricePerSwitch: 175,
    hoursPerRoom: 3.5,
    color: "bg-blue-200",
  },
  {
    id: "homeworks",
    name: "HomeWorks",
    description: "Enterprise luxury, fully customizable",
    pricePerSwitch: 900,
    hoursPerRoom: 9,
    color: "bg-blue-300",
  },
];

const ROOMS: Room[] = [
  {
    id: "living-room",
    name: "Living Room",
    type: "living-room",
    selected: false,
  },
  { id: "bedroom", name: "Bedroom", type: "bedroom", selected: false },
  { id: "kitchen", name: "Kitchen", type: "kitchen", selected: false },
  { id: "bathroom", name: "Bathroom", type: "bathroom", selected: false },
  {
    id: "dining-room",
    name: "Dining Room",
    type: "dining-room",
    selected: false,
  },
];

const ROOM_SWITCH_COUNT: Record<string, number> = {
  "living-room": 5,
  bedroom: 3,
  kitchen: 4,
  bathroom: 2,
  "dining-room": 3,
};

const HOME_VALUE_INCREASE = 0.06; // 6% average increase
const LABOR_RATE_RESIDENTIAL = 90;
const INSURANCE_DISCOUNT = 0.1; // 10% average discount
const TAX_CREDIT = 3200; // Federal energy credit

export default function QuoteBuilder() {
  const [, navigate] = useLocation();
  const [address, setAddress] = useState("");
  const [selectedRooms, setSelectedRooms] = useState<Room[]>(ROOMS);
  const [selectedSystem, setSelectedSystem] = useState<string>("ra3");
  const [homeValue, setHomeValue] = useState<number>(500000);
  const [showResults, setShowResults] = useState(false);

  const toggleRoom = (roomId: string) => {
    const selected = selectedRooms.filter((r) => r.selected).length;
    const room = selectedRooms.find((r) => r.id === roomId);

    if (room?.selected || selected < 5) {
      setSelectedRooms(
        selectedRooms.map((r) =>
          r.id === roomId ? { ...r, selected: !r.selected } : r
        )
      );
    }
  };

  const calculateQuote = () => {
    const system = SYSTEMS.find((s) => s.id === selectedSystem);
    if (!system) return null;

    const selectedCount = selectedRooms.filter((r) => r.selected).length;
    if (selectedCount === 0) return null;

    // Calculate equipment cost
    let equipmentCost = 0;
    selectedRooms.forEach((room) => {
      if (room.selected) {
        const switchCount = ROOM_SWITCH_COUNT[room.type];
        equipmentCost += switchCount * system.pricePerSwitch;
      }
    });

    // Calculate labor hours
    const laborHours = selectedCount * system.hoursPerRoom;
    const laborCost = laborHours * LABOR_RATE_RESIDENTIAL;

    // Total quote
    const totalQuote = equipmentCost + laborCost;

    // ROI calculations
    const homeValueIncrease = homeValue * HOME_VALUE_INCREASE;
    const insuranceSavingsAnnual = (homeValue * 0.01) * INSURANCE_DISCOUNT; // 1% of home value, 10% discount
    const paybackMonths = (totalQuote / insuranceSavingsAnnual) * 12;

    return {
      system: system.name,
      equipmentCost,
      laborHours,
      laborCost,
      totalQuote,
      homeValueIncrease,
      insuranceSavingsAnnual,
      taxCredit: TAX_CREDIT,
      paybackMonths,
      selectedRoomCount: selectedCount,
    };
  };

  const quote = calculateQuote();
  const selectedCount = selectedRooms.filter((r) => r.selected).length;

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
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/UgZHwSmgWWJSnIDw.png"
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
      <section className="py-16 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6">
            GET YOUR QUOTE
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Build your custom smart home system and see the investment value
          </p>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Left Column - Inputs */}
            <div className="md:col-span-2 space-y-8">
              {/* Address Input */}
              <Card className="p-8">
                <div className="flex items-center mb-6">
                  <MapPin className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">Your Address</h2>
                </div>
                <input
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-sm text-gray-500 mt-3">
                  We'll use this to estimate your home value and show you
                  potential savings
                </p>
              </Card>

              {/* Home Value Input */}
              <Card className="p-8">
                <div className="flex items-center mb-6">
                  <Home className="w-6 h-6 text-primary mr-3" />
                  <h2 className="text-2xl font-bold">Home Value</h2>
                </div>
                <input
                  type="number"
                  placeholder="500000"
                  value={homeValue}
                  onChange={(e) => setHomeValue(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-sm text-gray-500 mt-3">
                  Estimated market value of your home
                </p>
              </Card>

              {/* System Selection */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">Choose Your System</h2>
                <div className="grid gap-4">
                  {SYSTEMS.map((system) => (
                    <button
                      key={system.id}
                      onClick={() => setSelectedSystem(system.id)}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        selectedSystem === system.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      <h3 className="text-xl font-bold mb-2">{system.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {system.description}
                      </p>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Room Selection */}
              <Card className="p-8">
                <h2 className="text-2xl font-bold mb-6">
                  Select Rooms ({selectedCount}/5)
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedRooms.map((room) => (
                    <button
                      key={room.id}
                      onClick={() => toggleRoom(room.id)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        room.selected
                          ? "border-primary bg-primary/10"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      <p className="font-semibold">{room.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {ROOM_SWITCH_COUNT[room.type]} switches
                      </p>
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Select up to 5 rooms. For whole-home automation, schedule an
                  in-person consultation.
                </p>
              </Card>

              <Button
                onClick={() => setShowResults(true)}
                disabled={selectedCount === 0}
                className="w-full py-6 text-lg"
              >
                Generate Quote
              </Button>
            </div>

            {/* Right Column - Quote Summary */}
            {showResults && quote && (
              <div className="space-y-6">
                {/* Quote Card */}
                <Card className="p-8 bg-gradient-to-br from-primary/5 to-transparent border-2 border-primary">
                  <h3 className="text-2xl font-bold mb-6">YOUR QUOTE</h3>

                  <div className="space-y-4 mb-6 pb-6 border-b-2 border-gray-200">
                    <div className="flex justify-between">
                      <span className="text-gray-600">System Type</span>
                      <span className="font-bold">{quote.system}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rooms Selected</span>
                      <span className="font-bold">{quote.selectedRoomCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Equipment Cost</span>
                      <span className="font-bold">
                        ${quote.equipmentCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Labor Hours</span>
                      <span className="font-bold">{quote.laborHours.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Labor Cost</span>
                      <span className="font-bold">
                        ${quote.laborCost.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6 pb-6 border-b-2 border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold">TOTAL QUOTE</span>
                      <span className="text-3xl font-bold text-primary">
                        ${quote.totalQuote.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => navigate("/contact")}
                    className="w-full py-4 text-lg"
                  >
                    Request This Quote
                  </Button>
                </Card>

                {/* ROI Card */}
                <Card className="p-8">
                  <div className="flex items-center mb-4">
                    <DollarSign className="w-5 h-5 text-green-600 mr-2" />
                    <h3 className="text-xl font-bold">Investment Value</h3>
                  </div>
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    +${quote.homeValueIncrease.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">
                    Estimated increase in home value
                  </p>
                </Card>

                {/* Savings Card */}
                <Card className="p-8">
                  <div className="flex items-center mb-4">
                    <Zap className="w-5 h-5 text-yellow-600 mr-2" />
                    <h3 className="text-xl font-bold">Annual Savings</h3>
                  </div>
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    ${quote.insuranceSavingsAnnual.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">
                    Insurance + energy savings per year
                  </p>
                </Card>

                {/* Tax Credit Card */}
                <Card className="p-8">
                  <div className="flex items-center mb-4">
                    <Shield className="w-5 h-5 text-blue-600 mr-2" />
                    <h3 className="text-xl font-bold">Tax Credit</h3>
                  </div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    ${quote.taxCredit.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-600">
                    Federal energy efficiency credit
                  </p>
                </Card>

                {/* Payback Period */}
                <Card className="p-8 bg-primary/5">
                  <h3 className="text-xl font-bold mb-3">Payback Period</h3>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {quote.paybackMonths.toFixed(1)} months
                  </div>
                  <p className="text-sm text-gray-600">
                    Time to recover investment through savings
                  </p>
                </Card>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            READY TO GET STARTED?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Schedule a consultation with our experts to discuss your smart home
            needs
          </p>
          <Button
            variant="outline"
            className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg"
            onClick={() => navigate("/contact")}
          >
            Schedule Consultation
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/UgZHwSmgWWJSnIDw.png"
                alt="All Things Automated"
                className="h-10 w-auto mb-4"
              />
              <p className="text-sm opacity-80">
                Intelligent automation for modern homes
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Navigate</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/services")}
                    className="hover:text-white transition-colors"
                  >
                    Services
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/pricing")}
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/blog")}
                    className="hover:text-white transition-colors"
                  >
                    Blog
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Systems</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>Caséta Wireless</li>
                <li>RA3 Professional</li>
                <li>HomeWorks Enterprise</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>(941) 263-5325</li>
                <li>info@allthingsautomated.com</li>
                <li>24/7 Support</li>
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
