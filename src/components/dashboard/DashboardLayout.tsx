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
  Users,
  Menu,
  X,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import inqreateLogo from "@/assets/inqreate-logo.png";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
interface DashboardLayoutProps {
  children: ReactNode;
  activeRoute: string;
  onRouteChange: (route: string) => void;
}

const DashboardLayout = ({ children, activeRoute, onRouteChange }: DashboardLayoutProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAdmin } = useAdminAuth();

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

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [activeRoute]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

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
    { id: "team", label: "Team", icon: Users },
  ];

  const handleRouteChange = (route: string) => {
    onRouteChange(route);
    setSidebarOpen(false);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 sm:h-16 bg-card/95 backdrop-blur-md border-b z-50 flex items-center justify-between px-4">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-9 w-9 sm:h-10 sm:w-10 border-2 transition-all duration-200 hover:scale-105 active:scale-95"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <img 
          src={inqreateLogo} 
          alt="Inqreate Logo" 
          className="h-7 sm:h-8 w-auto object-contain"
        />
        <div className="w-9 sm:w-10" /> {/* Spacer for centering logo */}
      </header>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={cn(
          "lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300",
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile Sidebar - Left Side */}
      <aside 
        className={cn(
          "lg:hidden fixed top-0 left-0 bottom-0 w-[280px] sm:w-[300px] bg-card border-r z-[70] p-5 sm:p-6 overflow-y-auto flex flex-col transition-transform duration-300 ease-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close Button */}
        <div className="flex items-center justify-between mb-6">
          <img 
            src={inqreateLogo} 
            alt="Inqreate Logo" 
            className="h-8 w-auto object-contain"
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 transition-all duration-200 hover:scale-105 hover:bg-muted"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5 flex-1">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleRouteChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
                  activeRoute === item.id
                    ? "bg-primary text-primary-foreground shadow-lg scale-[1.02]"
                    : "hover:bg-muted hover:scale-[1.01]"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="mt-6 pt-6 border-t space-y-1.5">
          {isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all duration-200 text-sm font-medium"
            >
              <Shield className="w-5 h-5 shrink-0" />
              <span>Admin Panel</span>
              <Badge className="ml-auto bg-red-500 text-white text-[10px]">Admin</Badge>
            </button>
          )}
          <button
            onClick={() => handleRouteChange("settings")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
              activeRoute === "settings"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "hover:bg-muted"
            )}
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span>Settings</span>
          </button>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm font-medium h-12 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3 shrink-0" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 xl:w-72 bg-card border-r p-6 overflow-y-auto flex-col z-40 transition-all duration-300">
        <div className="flex items-center gap-2 mb-8">
          <img 
            src={inqreateLogo} 
            alt="Inqreate Logo" 
            className="h-10 w-auto object-contain"
          />
        </div>

        <nav className="space-y-1.5 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleRouteChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
                  activeRoute === item.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "hover:bg-muted hover:translate-x-1"
                )}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-6 pt-6 border-t space-y-1.5">
          {isAdmin && (
            <button
              onClick={() => navigate('/admin')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-all duration-200 text-sm font-medium"
            >
              <Shield className="w-5 h-5 shrink-0" />
              <span>Admin Panel</span>
              <Badge className="ml-auto bg-red-500 text-white text-[10px]">Admin</Badge>
            </button>
          )}
          <button
            onClick={() => handleRouteChange("settings")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium",
              activeRoute === "settings"
                ? "bg-primary text-primary-foreground shadow-lg"
                : "hover:bg-muted hover:translate-x-1"
            )}
          >
            <Settings className="w-5 h-5 shrink-0" />
            <span>Settings</span>
          </button>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm font-medium h-12 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3 shrink-0" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 xl:ml-72 pt-16 sm:pt-18 lg:pt-0 min-h-screen transition-all duration-300">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
