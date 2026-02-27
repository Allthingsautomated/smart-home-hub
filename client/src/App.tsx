import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/AdminDashboard";
import QuoteBuilder from "./pages/QuoteBuilder";
import SmartLighting from "./pages/services/SmartLighting";
import HomeSecurity from "./pages/services/HomeSecurity";
import ClimateControl from "./pages/services/ClimateControl";
import VoiceIntegration from "./pages/services/VoiceIntegration";
import HomeAudio from "./pages/services/HomeAudio";
import Networks from "./pages/services/Networks";
import CommercialAutomation from "./pages/services/CommercialAutomation";
import CommercialSecurity from "./pages/services/CommercialSecurity";
import CommercialClimate from "./pages/services/CommercialClimate";
import CommercialNetworks from "./pages/services/CommercialNetworks";
import TeslaPanels from "./pages/services/TeslaPanels";
import LandscapeLighting from "./pages/services/LandscapeLighting";
import SmartLightingCatalog from "./pages/SmartLightingCatalog";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AdminLogin from "./pages/AdminLogin";
import BlogEditor from "./pages/BlogEditor";
import AdminSecretDashboard from "./pages/AdminSecretDashboard";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/about"} component={About} />
        <Route path={"/services"} component={Services} />
        <Route path={"/services/smart-lighting"} component={SmartLighting} />
        <Route path={"/services/home-security"} component={HomeSecurity} />
        <Route path={"/services/climate-control"} component={ClimateControl} />
        <Route path={"/services/voice-integration"} component={VoiceIntegration} />
        <Route path={"/services/home-audio"} component={HomeAudio} />
        <Route path={"/services/networks"} component={Networks} />
        <Route path={"/services/commercial-automation"} component={CommercialAutomation} />
        <Route path={"/services/commercial-security"} component={CommercialSecurity} />
        <Route path={"/services/commercial-climate"} component={CommercialClimate} />
        <Route path={"services/commercial-networks"} component={CommercialNetworks} />
        <Route path={"services/tesla-panels"} component={TeslaPanels} />
        <Route path={"/services/landscape-lighting"} component={LandscapeLighting} />
        <Route path={"/smart-lighting-catalog"} component={SmartLightingCatalog} />
        <Route path={"/blog"} component={Blog} />
        <Route path={"/blog/:id"} component={BlogPost} />
        <Route path={"/pricing"} component={Pricing} />
        <Route path={"/contact"} component={Contact} />
        <Route path={"/admin"} component={AdminDashboard} />
        <Route path={"/admin/login"} component={AdminLogin} />
        <Route path={"/admin/blog-editor"} component={BlogEditor} />
        <Route path={"quote-builder"} component={QuoteBuilder} />
        <Route path={"/admin-all-things-automated-secret"} component={AdminSecretDashboard} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
