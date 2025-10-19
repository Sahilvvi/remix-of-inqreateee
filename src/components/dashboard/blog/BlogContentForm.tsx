import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

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
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="topic">Blog Topic *</Label>
          <Input
            id="topic"
            placeholder="e.g., The Future of AI in Healthcare"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="keywords">SEO Keywords (comma-separated)</Label>
          <Input
            id="keywords"
            placeholder="AI, healthcare, machine learning, diagnosis"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="audience">Target Audience</Label>
          <Input
            id="audience"
            placeholder="e.g., Healthcare professionals, Tech enthusiasts"
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="structure">Content Structure</Label>
          <Textarea
            id="structure"
            placeholder="e.g., Introduction, 3 main points, Case study, Conclusion"
            value={contentStructure}
            onChange={(e) => setContentStructure(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="language">Language</Label>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger id="language">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="spanish">Spanish</SelectItem>
              <SelectItem value="french">French</SelectItem>
              <SelectItem value="german">German</SelectItem>
              <SelectItem value="italian">Italian</SelectItem>
              <SelectItem value="portuguese">Portuguese</SelectItem>
              <SelectItem value="chinese">Chinese</SelectItem>
              <SelectItem value="japanese">Japanese</SelectItem>
              <SelectItem value="korean">Korean</SelectItem>
              <SelectItem value="arabic">Arabic</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="tone">Writing Tone</Label>
          <Select value={tone} onValueChange={setTone}>
            <SelectTrigger id="tone">
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

        <div>
          <Label htmlFor="wordCount">Target Word Count</Label>
          <Select value={wordCount} onValueChange={setWordCount}>
            <SelectTrigger id="wordCount">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="300">300 words (Quick Read)</SelectItem>
              <SelectItem value="500">500 words (Short Article)</SelectItem>
              <SelectItem value="800">800 words (Standard Post)</SelectItem>
              <SelectItem value="1000">1000 words (Medium Article)</SelectItem>
              <SelectItem value="1500">1500 words (Long Form)</SelectItem>
              <SelectItem value="2000">2000 words (In-Depth)</SelectItem>
              <SelectItem value="2500">2500 words (Comprehensive)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
