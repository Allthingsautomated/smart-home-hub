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
import VideoEstimate from "./pages/VideoEstimate";
import VideoEstimateAdmin from "./pages/VideoEstimateAdmin";
import FacebookLead from "./pages/FacebookLead";
import { ROUTES } from "@/lib/routes";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path={ROUTES.home} component={Home} />
        <Route path={ROUTES.about} component={About} />
        <Route path={ROUTES.services} component={Services} />
        <Route path={ROUTES.smartLighting} component={SmartLighting} />
        <Route path={ROUTES.homeSecurity} component={HomeSecurity} />
        <Route path={ROUTES.climateControl} component={ClimateControl} />
        <Route path={ROUTES.voiceIntegration} component={VoiceIntegration} />
        <Route path={ROUTES.homeAudio} component={HomeAudio} />
        <Route path={ROUTES.networks} component={Networks} />
        <Route
          path={ROUTES.commercialAutomation}
          component={CommercialAutomation}
        />
        <Route
          path={ROUTES.commercialSecurity}
          component={CommercialSecurity}
        />
        <Route path={ROUTES.commercialClimate} component={CommercialClimate} />
        <Route
          path={ROUTES.commercialNetworks}
          component={CommercialNetworks}
        />
        <Route path={ROUTES.teslaPanels} component={TeslaPanels} />
        <Route path={ROUTES.landscapeLighting} component={LandscapeLighting} />
        <Route
          path={ROUTES.smartLightingCatalog}
          component={SmartLightingCatalog}
        />
        <Route path={ROUTES.blog} component={Blog} />
        <Route path={`${ROUTES.blog}/:id`} component={BlogPost} />
        <Route path={ROUTES.pricing} component={Pricing} />
        <Route path={ROUTES.videoEstimate} component={VideoEstimate} />
        <Route
          path={ROUTES.videoEstimateAdmin}
          component={VideoEstimateAdmin}
        />
        <Route path={ROUTES.contact} component={Contact} />
        <Route path="/facebook-lead" component={FacebookLead} />
        <Route path={ROUTES.admin} component={AdminDashboard} />
        <Route path={ROUTES.adminLogin} component={AdminLogin} />
        <Route path={ROUTES.adminBlogEditor} component={BlogEditor} />
        <Route path={ROUTES.quoteBuilder} component={QuoteBuilder} />
        <Route
          path={ROUTES.adminSecretDashboard}
          component={AdminSecretDashboard}
        />
        <Route path={ROUTES.notFound} component={NotFound} />
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
