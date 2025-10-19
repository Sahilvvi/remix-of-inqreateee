import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PostPreviewProps {
  platform: string;
  content: string;
  imageUrl?: string;
}

export const PostPreview = ({ platform, content, imageUrl }: PostPreviewProps) => {
  return (
    <Card className="glass-effect">
      <CardHeader>
        <CardTitle>Preview</CardTitle>
        <CardDescription className="capitalize">
          How your {platform} post will look
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg p-4 bg-background/50">
          {imageUrl && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img 
                src={imageUrl} 
                alt="Post preview" 
                className="w-full object-cover max-h-[400px]"
              />
            </div>
          )}
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/20" />
              <div>
                <p className="font-semibold text-sm">Your Profile</p>
                <p className="text-xs text-muted-foreground">Just now</p>
              </div>
            </div>
            <p className="text-sm whitespace-pre-wrap">
              {content || "Your generated content will appear here..."}
            </p>
            {content && (
              <div className="flex gap-4 pt-3 text-muted-foreground border-t mt-4">
                <button className="flex items-center gap-1 text-xs hover:text-foreground">
                  ❤️ Like
                </button>
                <button className="flex items-center gap-1 text-xs hover:text-foreground">
                  💬 Comment
                </button>
                <button className="flex items-center gap-1 text-xs hover:text-foreground">
                  🔄 Share
                </button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
