import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  Calendar,
  Search,
  Palette,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
  activeRoute: string;
  onRouteChange: (route: string) => void;
}

const DashboardLayout = ({ children, activeRoute, onRouteChange }: DashboardLayoutProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Logged out",
      description: "You've been logged out successfully.",
    });
    navigate("/");
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "blog", label: "Blog Generator", icon: FileText },
    { id: "social", label: "Social Media", icon: MessageSquare },
    { id: "posting", label: "Auto Posting", icon: Calendar },
    { id: "seo", label: "SEO Optimization", icon: Search },
    { id: "templates", label: "Brand Templates", icon: Palette },
    { id: "ecommerce", label: "E-Commerce", icon: ShoppingCart },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r p-6 overflow-y-auto">
        <div className="flex items-center gap-2 mb-8">
          <Sparkles className="w-6 h-6 text-primary" />
          <span className="font-bold gradient-text">AI Automation</span>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onRouteChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  activeRoute === item.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "hover:bg-muted"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t space-y-2">
          <button
            onClick={() => onRouteChange("settings")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
              activeRoute === "settings"
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            )}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      <main className="ml-64 p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
