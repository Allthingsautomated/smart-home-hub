import { ROUTES } from "@/lib/routes";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function ServicePageHeader() {
  const [, navigate] = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(ROUTES.home)}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663351682597/UgZHwSmgWWJSnIDw.png"
              alt="SmartHome Hub Logo"
              className="h-10 w-auto"
            />
          </button>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate(ROUTES.home)}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate(ROUTES.about)}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigate(ROUTES.services)}
              className="text-primary font-semibold"
            >
              Services
            </button>
            <button
              onClick={() => navigate(ROUTES.contact)}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => navigate(ROUTES.quoteBuilder)}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Pricing
            </button>
            <button
              onClick={() => navigate(ROUTES.blog)}
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Blog
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <MobileNav />
            <Button
              className="rounded-full hidden md:inline-flex"
              onClick={() => navigate(ROUTES.contact)}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
