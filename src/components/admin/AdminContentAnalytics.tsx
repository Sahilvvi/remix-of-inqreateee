import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Share2, ShoppingCart, Search, TrendingUp, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface ContentItem {
  id: string;
  title?: string;
  topic?: string;
  product_name?: string;
  platform?: string;
  created_at: string;
  user_id: string;
  user_email?: string;
}

export const AdminContentAnalytics = () => {
  const [blogs, setBlogs] = useState<ContentItem[]>([]);
  const [socialPosts, setSocialPosts] = useState<ContentItem[]>([]);
  const [products, setProducts] = useState<ContentItem[]>([]);
  const [seoAnalyses, setSeoAnalyses] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [contentByDay, setContentByDay] = useState<any[]>([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      // Fetch all profiles for user mapping
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, email');

      const profileMap = new Map(profiles?.map(p => [p.id, p.email]) || []);

      // Fetch recent blogs
      const { data: blogsData } = await supabase
        .from('generated_blogs')
        .select('id, title, topic, created_at, user_id')
        .order('created_at', { ascending: false })
        .limit(50);

      // Fetch recent social posts
      const { data: postsData } = await supabase
        .from('social_media_posts')
        .select('id, topic, platform, created_at, user_id')
        .order('created_at', { ascending: false })
        .limit(50);

      // Fetch recent products
      const { data: productsData } = await supabase
        .from('ecommerce_products')
        .select('id, product_name, category, created_at, user_id')
        .order('created_at', { ascending: false })
        .limit(50);

      // Fetch recent SEO analyses
      const { data: seoData } = await supabase
        .from('seo_analyses')
        .select('id, target_keywords, seo_score, created_at, user_id')
        .order('created_at', { ascending: false })
        .limit(50);

      // Add user emails to content items
      const addUserEmail = (items: any[]) => 
        items?.map(item => ({ ...item, user_email: profileMap.get(item.user_id) || 'Unknown' })) || [];

      setBlogs(addUserEmail(blogsData || []));
      setSocialPosts(addUserEmail(postsData || []));
      setProducts(addUserEmail(productsData || []));
      setSeoAnalyses(addUserEmail(seoData || []));

      // Calculate content by day for chart
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        date.setHours(0, 0, 0, 0);
        return date;
      });

      const chartData = last7Days.map(date => {
        const dateStr = date.toISOString().split('T')[0];
        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);
        
        return {
          date: format(date, 'EEE'),
          blogs: blogsData?.filter(b => {
            const created = new Date(b.created_at);
            return created >= date && created < nextDate;
          }).length || 0,
          posts: postsData?.filter(p => {
            const created = new Date(p.created_at);
            return created >= date && created < nextDate;
          }).length || 0,
          products: productsData?.filter(pr => {
            const created = new Date(pr.created_at);
            return created >= date && created < nextDate;
          }).length || 0,
        };
      });

      setContentByDay(chartData);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Content Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Content Generation Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Content Generation (Last 7 Days)
          </CardTitle>
          <CardDescription>Daily breakdown of generated content</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contentByDay}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="blogs" name="Blogs" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="posts" name="Social Posts" fill="#a855f7" radius={[4, 4, 0, 0]} />
                <Bar dataKey="products" name="Products" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Content Tables */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-primary" />
            Recent Content
          </CardTitle>
          <CardDescription>Browse all generated content across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="blogs">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="blogs" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Blogs ({blogs.length})
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Social ({socialPosts.length})
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Products ({products.length})
              </TabsTrigger>
              <TabsTrigger value="seo" className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                SEO ({seoAnalyses.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blogs" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Topic</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blogs.slice(0, 10).map((blog) => (
                    <TableRow key={blog.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {blog.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{blog.topic}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {blog.user_email}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(blog.created_at), 'MMM d, HH:mm')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="social" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Topic</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {socialPosts.slice(0, 10).map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {post.topic}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{post.platform}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {post.user_email}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(post.created_at), 'MMM d, HH:mm')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="products" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.slice(0, 10).map((product: any) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {product.product_name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{product.category}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {product.user_email}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(product.created_at), 'MMM d, HH:mm')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="seo" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keywords</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {seoAnalyses.slice(0, 10).map((seo: any) => (
                    <TableRow key={seo.id}>
                      <TableCell className="font-medium max-w-[200px] truncate">
                        {seo.target_keywords}
                      </TableCell>
                      <TableCell>
                        <Badge className={seo.seo_score >= 70 ? 'bg-green-500' : seo.seo_score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}>
                          {seo.seo_score}/100
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {seo.user_email}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(seo.created_at), 'MMM d, HH:mm')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};
