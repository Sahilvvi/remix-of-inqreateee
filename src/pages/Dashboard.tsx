import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Overview from "@/components/dashboard/Overview";
import BlogGenerator from "@/components/dashboard/BlogGenerator";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const [activeRoute, setActiveRoute] = useState("overview");

  const renderContent = () => {
    switch (activeRoute) {
      case "overview":
        return <Overview />;
      case "blog":
        return <BlogGenerator />;
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
