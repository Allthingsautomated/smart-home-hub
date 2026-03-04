import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { ROUTES, type AppRoute } from "@/lib/routes";

interface MobileNavProps {
  onNavigate?: (path: AppRoute) => void;
}

export default function MobileNav({ onNavigate }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [, navigate] = useLocation();

  const handleNavigation = (path: AppRoute) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      navigate(path);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-700" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700" />
        )}
      </button>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg md:hidden">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <button
              onClick={() => handleNavigation(ROUTES.home)}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation(ROUTES.about)}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              About
            </button>
            <button
              onClick={() => handleNavigation(ROUTES.services)}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => handleNavigation(ROUTES.contact)}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              Contact
            </button>
            <button
              onClick={() => handleNavigation(ROUTES.blog)}
              className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
            >
              Blog
            </button>
            <button
              onClick={() => handleNavigation(ROUTES.videoEstimate)}
              className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
            >
              Get Estimate
            </button>
          </div>
        </div>
      )}
    </>
  );
}
