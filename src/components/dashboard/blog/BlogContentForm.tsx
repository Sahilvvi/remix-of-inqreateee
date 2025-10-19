import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Target, FileText, Hash } from "lucide-react";

interface BlogContentFormProps {
  topic: string;
  setTopic: (value: string) => void;
  keywords: string;
  setKeywords: (value: string) => void;
  tone: string;
  setTone: (value: string) => void;
  language: string;
  setLanguage: (value: string) => void;
  wordCount: string;
  setWordCount: (value: string) => void;
  contentStructure: string;
  setContentStructure: (value: string) => void;
  targetAudience: string;
  setTargetAudience: (value: string) => void;
}

export const BlogContentForm = ({
  topic,
  setTopic,
  keywords,
  setKeywords,
  tone,
  setTone,
  language,
  setLanguage,
  wordCount,
  setWordCount,
  contentStructure,
  setContentStructure,
  targetAudience,
  setTargetAudience,
}: BlogContentFormProps) => {
  return (
    <div className="space-y-6">
      {/* Primary Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="topic" className="text-base font-semibold flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            Blog Topic *
          </Label>
          <Input
            id="topic"
            placeholder="e.g., The Future of AI in Healthcare"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="h-12 text-base border-2 focus:border-primary transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keywords" className="text-base font-semibold flex items-center gap-2">
            <Hash className="w-4 h-4 text-primary" />
            SEO Keywords
          </Label>
          <Input
            id="keywords"
            placeholder="AI, healthcare, machine learning, diagnosis"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="h-12 text-base border-2 focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="language" className="text-base font-semibold flex items-center gap-2">
            <Globe className="w-4 h-4 text-primary" />
            Language
          </Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language" className="h-12 text-base border-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectItem value="english">🇬🇧 English</SelectItem>
              <SelectItem value="spanish">🇪🇸 Spanish</SelectItem>
              <SelectItem value="french">🇫🇷 French</SelectItem>
              <SelectItem value="german">🇩🇪 German</SelectItem>
              <SelectItem value="italian">🇮🇹 Italian</SelectItem>
              <SelectItem value="portuguese">🇵🇹 Portuguese</SelectItem>
              <SelectItem value="chinese">🇨🇳 Chinese</SelectItem>
              <SelectItem value="japanese">🇯🇵 Japanese</SelectItem>
              <SelectItem value="korean">🇰🇷 Korean</SelectItem>
              <SelectItem value="arabic">🇸🇦 Arabic</SelectItem>
              <SelectItem value="hindi">🇮🇳 Hindi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tone" className="text-base font-semibold">Writing Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger id="tone" className="h-12 text-base border-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
              <SelectItem value="informative">Informative</SelectItem>
              <SelectItem value="conversational">Conversational</SelectItem>
              <SelectItem value="authoritative">Authoritative</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="wordCount" className="text-base font-semibold">Word Count</Label>
          <Select value={wordCount} onValueChange={setWordCount}>
            <SelectTrigger id="wordCount" className="h-12 text-base border-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300">300 (Quick Read)</SelectItem>
              <SelectItem value="500">500 (Short)</SelectItem>
              <SelectItem value="800">800 (Standard)</SelectItem>
              <SelectItem value="1000">1000 (Medium)</SelectItem>
              <SelectItem value="1500">1500 (Long Form)</SelectItem>
              <SelectItem value="2000">2000 (In-Depth)</SelectItem>
              <SelectItem value="2500">2500 (Comprehensive)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Advanced Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="audience" className="text-base font-semibold flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Target Audience
          </Label>
          <Input
            id="audience"
            placeholder="e.g., Healthcare professionals, Tech enthusiasts"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            className="h-12 text-base border-2 focus:border-primary transition-colors"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="structure" className="text-base font-semibold">Content Structure</Label>
          <Textarea
            id="structure"
            placeholder="e.g., Introduction, 3 main points, Case study, Conclusion"
            value={contentStructure}
            onChange={(e) => setContentStructure(e.target.value)}
            className="min-h-[48px] text-base border-2 focus:border-primary transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
};
