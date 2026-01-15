import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { 
  ChevronLeft, ChevronRight, Instagram, Facebook, 
  Twitter, Linkedin, Youtube, Clock
} from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday } from "date-fns";

interface ScheduledPost {
  id: string;
  content: string;
  platform: string;
  scheduled_time: string;
  status: string;
  image_url?: string;
}

const platformIcons: Record<string, any> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
};

const platformColors: Record<string, string> = {
  instagram: "bg-pink-500/20 text-pink-500",
  facebook: "bg-blue-500/20 text-blue-500",
  twitter: "bg-sky-500/20 text-sky-500",
  linkedin: "bg-blue-700/20 text-blue-600",
  youtube: "bg-red-500/20 text-red-500",
};

const ScheduleCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [scheduledPosts, setScheduledPosts] = useState<ScheduledPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);

  useEffect(() => {
    fetchScheduledPosts();
  }, [currentDate]);

  const fetchScheduledPosts = async () => {
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(currentDate);

      const { data, error } = await supabase
        .from('scheduled_posts')
        .select('*')
        .eq('user_id', user.id)
        .gte('scheduled_time', monthStart.toISOString())
        .lte('scheduled_time', monthEnd.toISOString())
        .order('scheduled_time', { ascending: true });

      if (error) throw error;
      setScheduledPosts(data || []);
    } catch (error) {
      console.error('Error fetching scheduled posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const getPostsForDay = (day: Date) => {
    return scheduledPosts.filter((post) =>
      isSameDay(new Date(post.scheduled_time), day)
    );
  };

  const startDayOfWeek = startOfMonth(currentDate).getDay();
  const emptyDays = Array(startDayOfWeek).fill(null);

  const selectedDayPosts = selectedDay ? getPostsForDay(selectedDay) : [];

  return (
    <div className="space-y-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <h2 className="text-lg font-semibold text-foreground min-w-[180px] text-center">
            {format(currentDate, "MMMM yyyy")}
          </h2>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={goToToday}>
          Today
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-border">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium text-muted-foreground bg-muted/30"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {/* Empty cells for days before start of month */}
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="h-24 border-b border-r border-border bg-muted/10" />
          ))}

          {/* Actual days */}
          {days.map((day) => {
            const dayPosts = getPostsForDay(day);
            const isSelected = selectedDay && isSameDay(day, selectedDay);
            const todayClass = isToday(day) ? "bg-primary/10" : "";

            return (
              <div
                key={day.toISOString()}
                onClick={() => setSelectedDay(day)}
                className={`h-24 border-b border-r border-border p-2 cursor-pointer transition-colors hover:bg-muted/30 ${todayClass} ${
                  isSelected ? "ring-2 ring-primary ring-inset" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm font-medium ${
                      isToday(day)
                        ? "bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center"
                        : "text-foreground"
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                  {dayPosts.length > 0 && (
                    <Badge variant="secondary" className="text-xs h-5">
                      {dayPosts.length}
                    </Badge>
                  )}
                </div>

                {/* Post Indicators */}
                <div className="space-y-1 overflow-hidden">
                  {dayPosts.slice(0, 2).map((post) => {
                    const Icon = platformIcons[post.platform] || Clock;
                    return (
                      <div
                        key={post.id}
                        className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-xs truncate ${
                          platformColors[post.platform] || "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="w-3 h-3 shrink-0" />
                        <span className="truncate">{format(new Date(post.scheduled_time), "HH:mm")}</span>
                      </div>
                    );
                  })}
                  {dayPosts.length > 2 && (
                    <div className="text-xs text-muted-foreground px-1">
                      +{dayPosts.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDay && (
        <div className="bg-card rounded-lg border border-border p-4">
          <h3 className="font-semibold text-foreground mb-3">
            Posts for {format(selectedDay, "EEEE, MMMM d, yyyy")}
          </h3>

          {selectedDayPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No posts scheduled for this day
            </p>
          ) : (
            <div className="space-y-3">
              {selectedDayPosts.map((post) => {
                const Icon = platformIcons[post.platform] || Clock;
                return (
                  <div
                    key={post.id}
                    className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg"
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        platformColors[post.platform] || "bg-muted"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground capitalize">
                          {post.platform}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(post.scheduled_time), "h:mm a")}
                        </span>
                        <Badge
                          variant={post.status === "posted" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {post.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {post.content}
                      </p>
                    </div>
                    {post.image_url && (
                      <img
                        src={post.image_url}
                        alt="Post preview"
                        className="w-12 h-12 rounded object-cover"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
        <span className="font-medium">Platforms:</span>
        {Object.entries(platformColors).map(([platform, colorClass]) => {
          const Icon = platformIcons[platform];
          return (
            <div key={platform} className="flex items-center gap-1">
              <div className={`p-1 rounded ${colorClass}`}>
                <Icon className="w-3 h-3" />
              </div>
              <span className="capitalize">{platform}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleCalendar;
