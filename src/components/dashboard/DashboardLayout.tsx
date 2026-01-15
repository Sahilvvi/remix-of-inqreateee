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
  Menu,
  X,
  Shield,
  Image,
  Library,
  Users,
  DollarSign,
  Bell,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import inqreateLogo from "@/assets/inqreate-logo.png";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  useEffect(() => {
    setSidebarOpen(false);
  }, [activeRoute]);

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
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "blog", label: "Content Generator", icon: FileText },
    { id: "posting", label: "Posting & Scheduling", icon: Calendar },
    { id: "social", label: "AI Image Generator", icon: Image },
    { id: "seo", label: "SEO Blog Optimizer", icon: Search },
    { id: "ecommerce-tools", label: "E-commerce Tools", icon: ShoppingCart },
    { id: "brand-kit", label: "Brand Kit", icon: Palette },
    { id: "templates", label: "Templates Library", icon: Library },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "team", label: "Team Collaboration", icon: Users },
    { id: "monetization", label: "Monetization", icon: DollarSign },
  ];

  const handleRouteChange = (route: string) => {
    onRouteChange(route);
    setSidebarOpen(false);
  };

  const getActiveLabel = () => {
    const item = menuItems.find(i => i.id === activeRoute);
    return item?.label || "Dashboard";
  };

  if (!user) {
    return null;
  }

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {/* Logo */}
      <div className={cn("flex items-center", isMobile ? "justify-between mb-6" : "gap-2 mb-8")}>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <Palette className="w-5 h-5 text-primary" />
          </div>
          <span className="text-lg font-semibold text-foreground">Logo</span>
        </div>
        {isMobile && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 hover:bg-muted"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="space-y-0.5 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeRoute === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleRouteChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm",
                isActive
                  ? "bg-sidebar-accent text-foreground font-medium"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
              )}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-4 pt-4 border-t border-border space-y-0.5">
        {isAdmin && (
          <button
            onClick={() => navigate('/admin')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-150 text-sm"
          >
            <Shield className="w-[18px] h-[18px] shrink-0" />
            <span>Admin Panel</span>
          </button>
        )}
        <button
          onClick={() => handleRouteChange("settings")}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm",
            activeRoute === "settings"
              ? "bg-sidebar-accent text-foreground font-medium"
              : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
          )}
        >
          <Settings className="w-[18px] h-[18px] shrink-0" />
          <span>Settings</span>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span className="hover:text-foreground cursor-pointer transition-colors">Resources</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Legal</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Contact Us</span>
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">𝕏</span>
          <span className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">▶</span>
          <span className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">in</span>
          <span className="w-5 h-5 text-muted-foreground hover:text-foreground cursor-pointer transition-colors">◎</span>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-card border-b border-border z-50 flex items-center justify-between px-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-9 w-9"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <span className="text-sm font-medium text-foreground">{getActiveLabel()}</span>
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.user_metadata?.avatar_url} />
          <AvatarFallback className="bg-muted text-muted-foreground text-xs">
            {user?.email?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div 
        className={cn(
          "lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300",
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile Sidebar */}
      <aside 
        className={cn(
          "lg:hidden fixed top-0 left-0 bottom-0 w-[260px] bg-sidebar-background border-r border-border z-[70] p-4 overflow-y-auto flex flex-col transition-transform duration-300 ease-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent isMobile />
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-[220px] bg-sidebar-background border-r border-border p-4 overflow-y-auto flex-col z-40">
        <SidebarContent />
      </aside>

      {/* Top Header Bar - Desktop */}
      <header className="hidden lg:flex fixed top-0 left-[220px] right-0 h-14 bg-card border-b border-border z-30 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <span className="text-sm font-medium text-foreground">{getActiveLabel()}</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search content, posts, or users" 
              className="w-[280px] pl-9 h-9 bg-background border-border text-sm"
            />
          </div>

          {/* Create Content Button */}
          <Button className="h-9 bg-[#0d9488] hover:bg-[#0f766e] text-white text-sm font-medium">
            <Plus className="w-4 h-4 mr-1.5" />
            Create Content
          </Button>

          {/* Notification Bell */}
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
            <Bell className="w-[18px] h-[18px]" />
          </Button>

          {/* User Avatar */}
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={user?.user_metadata?.avatar_url} />
            <AvatarFallback className="bg-primary/20 text-primary text-xs font-medium">
              {user?.email?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </header>

      {/* Main Content */}
      <main className="lg:ml-[220px] pt-14 lg:pt-14 min-h-screen bg-background">
        <div className="p-4 sm:p-6">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
