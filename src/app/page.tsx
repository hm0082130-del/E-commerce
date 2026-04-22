import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    take: 3,
    include: {
      category: true,
    },
  });

  const categories = await prisma.category.findMany({
    take: 3,
  });

  // Helper to parse images from DB
  const getImageUrl = (imageJson: string) => {
    try {
      const arr = JSON.parse(imageJson);
      return arr[0] || "/images/hero_bg.png"; // Fallback image
    } catch {
      return "/images/hero_bg.png";
    }
  };

  // Helper mapping category slugs to images for the category section
  const getCategoryMapImage = (slug: string) => {
    switch (slug) {
      case 'audio': return '/images/product_headphones.png';
      case 'tech': return '/images/hero_bg.png';
      case 'fashion': return '/images/product_bag.png';
      default: return '/images/product_watch.png';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero_bg.png"
          alt="Premium Smartwatch"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/80 to-transparent mix-blend-multiply" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto flex flex-col items-center">
          <Badge className="mb-4 bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border-0 py-1 px-4">
            V2 Architecture
          </Badge>
          <h1 className="font-outfit text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Elevate Your Everyday.
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl font-light">
            Discover our curated collection of premium products, fully dynamic and powered by Prisma + SQLite.
          </p>
          <div className="flex gap-4">
            <Link href="/products">
              <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-12 text-base">
                Shop Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 rounded-full px-8 h-12 text-base">
                Explore Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-32 container mx-auto px-4 max-w-screen-2xl">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="font-outfit text-3xl md:text-4xl font-bold tracking-tight mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Handpicked selections fetched from the database.</p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center text-sm font-medium hover:text-primary transition-colors">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group overflow-hidden border-border/50 bg-card hover:shadow-xl transition-all duration-300 rounded-2xl flex flex-col">
              <Link href={`/products/${product.slug}`} className="block relative h-[300px] w-full overflow-hidden bg-muted/30">
                <Image
                  src={getImageUrl(product.images)}
                  alt={product.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="backdrop-blur-md bg-white/70 dark:bg-black/50">
                    {product.category.name}
                  </Badge>
                </div>
              </Link>
              <CardContent className="p-6 flex-1">
                <Link href={`/products/${product.slug}`}>
                  <h3 className="font-outfit font-semibold text-xl mb-2 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0 flex justify-between items-center">
                <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                <Link href={`/products/${product.slug}`}>
                  <Button size="icon" className="rounded-full shadow-sm hover:shadow-md transition-all">
                    <ShoppingBag className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex justify-center sm:hidden">
          <Link href="/products" className="w-full">
             <Button variant="outline" className="w-full">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-screen-2xl">
          <div className="text-center mb-12">
            <h2 className="font-outfit text-3xl md:text-4xl font-bold tracking-tight mb-2">Shop by Category</h2>
            <p className="text-muted-foreground">Find exactly what you are looking for.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link href={`/categories?slug=${category.slug}`} key={category.id} className="group relative h-[400px] overflow-hidden rounded-2xl">
                <Image
                  src={getCategoryMapImage(category.slug)}
                  alt={category.name}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-0 left-0 p-8 w-full flex flex-col items-center justify-end h-full">
                  <h3 className="text-white font-outfit font-bold text-2xl mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{category.name}</h3>
                  <span className="text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-100 flex items-center">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
