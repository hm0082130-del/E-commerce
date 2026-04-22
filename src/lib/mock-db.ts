export const mockCategories = [
  {
    id: "cat_1",
    name: "Audio",
    slug: "audio",
    description: "High quality audio devices"
  },
  {
    id: "cat_2",
    name: "Tech",
    slug: "tech",
    description: "Modern tech gadgets"
  },
  {
    id: "cat_3",
    name: "Fashion",
    slug: "fashion",
    description: "Premium fashion accessories"
  }
];

export const mockProducts = [
  {
    id: "prod_1",
    name: "Premium Wireless Headphones",
    slug: "premium-wireless-headphones",
    description: "Experience sound like never before with our premium noise-canceling wireless headphones.",
    price: 299.99,
    images: JSON.stringify(["/images/product_headphones.png"]),
    categoryId: "cat_1",
    category: mockCategories[0],
    variations: [
      { id: "var_1", type: "Color", value: "Black", stock: 10 },
      { id: "var_2", type: "Color", value: "White", stock: 5 }
    ]
  },
  {
    id: "prod_2",
    name: "Smart Watch Elite",
    slug: "smart-watch-elite",
    description: "Stay connected and track your health with the Smart Watch Elite.",
    price: 199.99,
    images: JSON.stringify(["/images/product_watch.png"]),
    categoryId: "cat_2",
    category: mockCategories[1],
    variations: [
      { id: "var_3", type: "Size", value: "42mm", stock: 15 }
    ]
  },
  {
    id: "prod_3",
    name: "Designer Leather Bag",
    slug: "designer-leather-bag",
    description: "A beautifully crafted leather bag for all your daily needs.",
    price: 149.99,
    images: JSON.stringify(["/images/product_bag.png"]),
    categoryId: "cat_3",
    category: mockCategories[2],
    variations: [
      { id: "var_4", type: "Color", value: "Brown", stock: 8 }
    ]
  }
];
