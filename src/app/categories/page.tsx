import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, SlidersHorizontal } from "lucide-react";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const activeSlug = typeof resolvedParams.slug === "string" ? resolvedParams.slug : null;

  // Fetch data with error handling
  let categories: any[] = [];
  let products: any[] = [];

  try {
    categories = await prisma.category.findMany({
      orderBy: { name: "asc" }
    });

    products = await prisma.product.findMany({
      where: activeSlug ? {
        category: { slug: activeSlug }
      } : undefined,
      include: {
        category: true,
      },
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    console.error("Database connection failed:", error);
  }

  const getImageUrl = (imageJson: string) => {
    try {
      return JSON.parse(imageJson)[0] || "/images/hero_bg.png";
    } catch {
      return "/images/hero_bg.png";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-screen-2xl">
      <div className="mb-10">
        <h1 className="font-outfit text-4xl md:text-5xl font-bold tracking-tight mb-4">Categories</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Browse our extensive collection by category. Fully connected to the Prisma database.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Categories Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24">
            <div className="flex items-center gap-2 mb-6 font-outfit font-semibold text-lg border-b pb-2">
              <SlidersHorizontal className="h-5 w-5" /> Filter by
            </div>
            <nav className="space-y-2">
              <Link 
                href="/categories"
                className={`block px-4 py-3 rounded-lg transition-all ${
                  !activeSlug 
                    ? "bg-primary text-primary-foreground font-medium shadow-md" 
                    : "hover:bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                All Products
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories?slug=${category.slug}`}
                  className={`block px-4 py-3 rounded-lg transition-all ${
                    activeSlug === category.slug
                      ? "bg-primary text-primary-foreground font-medium shadow-md"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{category.name}</span>
                    <ArrowRight className={`h-4 w-4 ${activeSlug === category.slug ? "opacity-100" : "opacity-0"}`} />
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {products.length === 0 ? (
            <div className="py-32 flex flex-col items-center justify-center border rounded-3xl bg-muted/10 text-center px-4">
              <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-outfit font-bold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-8">We couldn't find any products in this category.</p>
              <Link href="/categories">
                <Button size="lg" className="rounded-full">View All Categories</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group overflow-hidden border-border/50 bg-card hover:shadow-xl transition-all duration-300 rounded-2xl flex flex-col">
                  <Link href={`/products/${product.slug}`} className="block relative h-[250px] w-full overflow-hidden bg-muted/30">
                    <Image
                      src={getImageUrl(product.images)}
                      alt={product.name}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="backdrop-blur-md bg-white/70 dark:bg-black/50">
                        {product.category.name}
                      </Badge>
                    </div>
                  </Link>
                  <CardContent className="p-5 flex-1">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-outfit font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
                  </CardContent>
                  <CardFooter className="p-5 pt-0 flex justify-between items-center">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    <Link href={`/products/${product.slug}`}>
                      <Button size="sm" className="rounded-full shadow-sm hover:shadow-md transition-all">
                        <ShoppingBag className="h-4 w-4 mr-2" /> Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
