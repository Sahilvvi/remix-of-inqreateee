-- Create table for e-commerce product listings
CREATE TABLE public.ecommerce_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_name TEXT NOT NULL,
  category TEXT NOT NULL,
  features TEXT,
  target_audience TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  selling_points JSONB,
  tags JSONB,
  meta_description TEXT,
  price DECIMAL(10,2),
  sku TEXT,
  inventory_count INTEGER DEFAULT 0,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ecommerce_products ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own products" 
ON public.ecommerce_products 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own products" 
ON public.ecommerce_products 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own products" 
ON public.ecommerce_products 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own products" 
ON public.ecommerce_products 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_ecommerce_products_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_ecommerce_products_updated_at
BEFORE UPDATE ON public.ecommerce_products
FOR EACH ROW
EXECUTE FUNCTION public.update_ecommerce_products_updated_at();