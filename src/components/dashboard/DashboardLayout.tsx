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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import inqreateLogo from "@/assets/inqreate-logo.png";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();

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
    { id: "team", label: "Team", icon: Users },
  ];

  const handleRouteChange = (route: string) => {
    onRouteChange(route);
    setSidebarOpen(false);
  };

  if (!user) {
    return null;
  }

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 mb-8">
        <img 
          src={inqreateLogo} 
          alt="Inqreate Logo" 
          className="h-10 w-auto object-contain"
        />
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleRouteChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm",
                activeRoute === item.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "hover:bg-muted"
              )}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-8 pt-8 border-t space-y-2">
        <button
          onClick={() => handleRouteChange("settings")}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-sm",
            activeRoute === "settings"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          <Settings className="w-5 h-5 shrink-0" />
          <span>Settings</span>
        </button>
        <Button
          variant="ghost"
          className="w-full justify-start text-sm"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-3 shrink-0" />
          Logout
        </Button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card/95 backdrop-blur-md border-b z-50 flex items-center justify-between px-4">
        <img 
          src={inqreateLogo} 
          alt="Inqreate Logo" 
          className="h-8 w-auto object-contain"
        />
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="h-10 w-10 border-2">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-6 flex flex-col bg-card z-[100]">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-card border-r p-6 overflow-y-auto flex-col z-40">
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-20 lg:pt-8 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
};

export default DashboardLayout;
