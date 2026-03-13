import { useLocation } from "wouter";
import { ROUTES } from "@/lib/routes";

export default function PageFooter() {
  const [, navigate] = useLocation();

  const handleNav = (path: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    navigate(path);
  };

  return (
    <footer className="bg-foreground text-background py-16 mt-auto">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm opacity-70 leading-relaxed">
              Intelligent automation for modern homes and businesses.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm tracking-wider uppercase opacity-60">Navigate</h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Home", path: ROUTES.home },
                { label: "About", path: ROUTES.about },
                { label: "Services", path: ROUTES.services },
                { label: "Pricing", path: ROUTES.quoteBuilder },
                { label: "Contact", path: ROUTES.contact },
                { label: "Blog", path: ROUTES.blog },
              ].map(({ label, path }) => (
                <li key={label}>
                  <button
                    onClick={() => handleNav(path)}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm tracking-wider uppercase opacity-60">Services</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li>Smart Lighting</li>
              <li>Home Security</li>
              <li>Climate Control</li>
              <li>Voice Integration</li>
              <li>Networks</li>
              <li>Home Audio</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-5 text-sm tracking-wider uppercase opacity-60">Contact</h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li>
                <a href="tel:9412635325" className="hover:opacity-100 transition-opacity">
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

        <div className="border-t border-background/10 pt-8 text-center text-sm opacity-50">
          <p>© 2026 All Things Automated. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
