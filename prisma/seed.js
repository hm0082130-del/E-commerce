const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Clean up existing data
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.variation.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  // 1. Create Categories
  const categoryAudio = await prisma.category.create({
    data: {
      name: 'Audio',
      slug: 'audio',
      description: 'High fidelity sound equipment',
    },
  })

  const categoryTech = await prisma.category.create({
    data: {
      name: 'Tech',
      slug: 'tech',
      description: 'Latest gadgets and tech accessories',
    },
  })

  const categoryFashion = await prisma.category.create({
    data: {
      name: 'Fashion',
      slug: 'fashion',
      description: 'Premium apparel and accessories',
    },
  })

  // 2. Create Products
  const products = [
    {
      name: 'Noise-Canceling Wireless Headphones',
      slug: 'noise-canceling-wireless-headphones',
      description: 'Industry-leading noise cancellation with premium sound quality. Experience music like never before.',
      price: 349.00,
      images: JSON.stringify(['/images/product_headphones.png']), // Using our generated images from before, or mock URLs
      categoryId: categoryAudio.id,
      variations: {
        create: [
          { type: 'Color', value: 'Black', stock: 50 },
          { type: 'Color', value: 'Silver', stock: 30 }
        ]
      }
    },
    {
      name: 'Minimalist Silver Wristwatch',
      slug: 'minimalist-silver-wristwatch',
      description: 'A timeless minimalist design featuring a genuine leather strap and scratch-resistant sapphire crystal.',
      price: 199.00,
      images: JSON.stringify(['/images/product_watch.png']),
      categoryId: categoryFashion.id,
      variations: {
        create: [
          { type: 'Color', value: 'Silver', stock: 25 },
          { type: 'Color', value: 'Rose Gold', stock: 15 }
        ]
      }
    },
    {
      name: 'Modern Leather Tote Bag',
      slug: 'modern-leather-tote-bag',
      description: 'Handcrafted from full-grain leather, this tote bag is the perfect blend of style and everyday functionality.',
      price: 249.00,
      images: JSON.stringify(['/images/product_bag.png']),
      categoryId: categoryFashion.id,
      variations: {
        create: [
          { type: 'Color', value: 'Tan', stock: 40 },
          { type: 'Color', value: 'Black', stock: 35 }
        ]
      }
    },
    {
      name: 'Premium Wireless Earbuds',
      slug: 'premium-wireless-earbuds',
      description: 'True wireless earbuds with active noise cancellation and spatial audio.',
      price: 249.00,
      images: JSON.stringify(['/images/product_headphones.png']),
      categoryId: categoryAudio.id,
      variations: {
        create: [
          { type: 'Color', value: 'White', stock: 100 },
          { type: 'Color', value: 'Black', stock: 100 }
        ]
      }
    },
    {
      name: 'Mechanical Keyboard Pro',
      slug: 'mechanical-keyboard-pro',
      description: 'Tactile mechanical switches with customizable RGB lighting and premium build quality.',
      price: 159.00,
      images: JSON.stringify(['/images/product_headphones.png']), // placeholder image reuse
      categoryId: categoryTech.id,
      variations: {
        create: [
          { type: 'Switch', value: 'Tactile (Brown)', stock: 50 },
          { type: 'Switch', value: 'Linear (Red)', stock: 50 }
        ]
      }
    }
  ]

  for (const p of products) {
    await prisma.product.create({ data: p })
  }

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
