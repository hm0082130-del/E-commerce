import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t py-12 md:py-16 lg:py-20 bg-muted/40">
      <div className="container px-4 mx-auto max-w-screen-2xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="font-outfit font-bold text-2xl tracking-tight">
                PREMIUM.
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Elevating your lifestyle with curated, high-quality products. Experience the difference.
            </p>
          </div>
          <div>
            <h3 className="font-outfit font-semibold mb-4 text-sm tracking-wider uppercase text-foreground/80">Shop</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/products" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/categories" className="hover:text-primary transition-colors">Categories</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Premium Store V2. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
