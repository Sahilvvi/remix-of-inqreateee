import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Overview from "@/components/dashboard/Overview";
import BlogGenerator from "@/components/dashboard/BlogGenerator";
import SocialMediaGenerator from "@/components/dashboard/SocialMediaGenerator";
import AutoPosting from "@/components/dashboard/AutoPosting";
import SeoOptimization from "@/components/dashboard/SeoOptimization";
import BrandTemplates from "@/components/dashboard/BrandTemplates";
import EcommerceGenerator from "@/components/dashboard/EcommerceGenerator";
import Analytics from "@/components/dashboard/Analytics";
import TeamCollaboration from "@/components/dashboard/TeamCollaboration";
import BrandKitTeams from "@/components/dashboard/BrandKitTeams";
import EcommerceContentTools from "@/components/dashboard/EcommerceContentTools";
import AIImageGenerator from "@/components/dashboard/AIImageGenerator";
import TemplatesLibrary from "@/components/dashboard/TemplatesLibrary";
import WebsiteBuilder from "@/components/dashboard/WebsiteBuilder";
import WebsiteAuditor from "@/components/dashboard/WebsiteAuditor";
import Settings from "@/pages/Settings";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const [activeRoute, setActiveRoute] = useState("overview");

  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      setActiveRoute(event.detail);
    };

    window.addEventListener('dashboard-navigate', handleNavigate as EventListener);
    return () => {
      window.removeEventListener('dashboard-navigate', handleNavigate as EventListener);
    };
  }, []);

  const renderContent = () => {
    switch (activeRoute) {
      case "overview":
        return <Overview />;
      case "blog":
        return <BlogGenerator />;
      case "social":
        return <AIImageGenerator />;
      case "posting":
        return <AutoPosting />;
      case "seo":
        return <SeoOptimization />;
      case "templates":
        return <TemplatesLibrary />;
      case "ecommerce":
        return <EcommerceGenerator />;
      case "ecommerce-tools":
        return <EcommerceContentTools />;
      case "website-builder":
        return <WebsiteBuilder />;
      case "website-auditor":
        return <WebsiteAuditor />;
      case "brand-kit":
        return <BrandKitTeams />;
      case "analytics":
        return <Analytics />;
      case "team":
        return <TeamCollaboration />;
      case "settings":
        return <Settings />;
      default:
        return (
          <Card className="p-12 text-center glass-effect">
            <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
            <p className="text-muted-foreground">
              This feature is currently under development and will be available soon!
            </p>
          </Card>
        );
    }
  };

  return (
    <DashboardLayout activeRoute={activeRoute} onRouteChange={setActiveRoute}>
      {renderContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
