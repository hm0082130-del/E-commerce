import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { prisma } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  let product = null;
  
  try {
    product = await prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        variations: true,
      },
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }

  if (!product) {
    notFound();
  }

  const getImageUrl = (imageJson: string) => {
    try {
      return JSON.parse(imageJson)[0] || "/images/hero_bg.png";
    } catch {
      return "/images/hero_bg.png";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-screen-xl">
      <Link href="/categories" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Categories
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Product Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-muted/30 border">
          <Image
            src={getImageUrl(product.images)}
            alt={product.name}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        
        {/* Product Info */}
        <div className="flex flex-col pt-4 md:pt-10">
          <Badge variant="secondary" className="w-fit mb-4">{product.category.name}</Badge>
          <h1 className="font-outfit text-3xl md:text-5xl font-bold tracking-tight mb-4">{product.name}</h1>
          <p className="text-2xl md:text-3xl font-medium text-primary mb-6">${product.price.toFixed(2)}</p>
          
          <div className="prose prose-sm dark:prose-invert text-muted-foreground mb-8">
            <p>{product.description}</p>
          </div>
          
          <hr className="mb-8 border-border" />
          
          {/* Mock Add to Cart UI (Since Server Component) */}
          <div className="bg-muted/30 border rounded-2xl p-6">
            <h3 className="font-outfit font-semibold mb-4">Purchase Options</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1 h-14 rounded-full text-lg">
                <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart (Demo)
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-4">
              Cart functionality will be implemented in the next step using Zustand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
