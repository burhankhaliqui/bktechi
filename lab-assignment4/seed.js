/**
 * seed.js — Assignment 3
 * Seeds 31 Apple products into MongoDB using LOCAL image paths.
 * Run: npm run seed
 */
const mongoose = require('mongoose');
const config = require('config');
const Product = require('./models/Product');

const MONGO_URI = config.get('mongoURI');

const products = [
  // ── iPhone (7) ──────────────────────────────────────────────────────────
  {
    name: 'iPhone 16 Pro Max',
    description: 'Titanium design with A18 Pro chip. 48 MP Fusion Camera. 4K 120fps ProRes video.',
    price: 1199, category: 'iPhone', rating: 4.9, stock: 60,
    image: '/images/p01.jpg'
  },
  {
    name: 'iPhone 16 Pro',
    description: 'Action button. Camera Control. All-new A18 Pro chip. 6.3-inch display.',
    price: 999, category: 'iPhone', rating: 4.8, stock: 80,
    image: '/images/p02.jpg'
  },
  {
    name: 'iPhone 16 Plus',
    description: 'A16 Bionic. 6.7-inch Super Retina XDR. All-day battery life.',
    price: 899, category: 'iPhone', rating: 4.7, stock: 75,
    image: '/images/p03.jpg'
  },
  {
    name: 'iPhone 16',
    description: 'A16 Bionic chip. 6.1-inch display. Dynamic Island. Camera Control.',
    price: 799, category: 'iPhone', rating: 4.7, stock: 100,
    image: '/images/p04.jpg'
  },
  {
    name: 'iPhone 15',
    description: 'Dynamic Island. 48 MP Main camera. USB-C connector.',
    price: 699, category: 'iPhone', rating: 4.6, stock: 90,
    image: '/images/p05.jpg'
  },
  {
    name: 'iPhone 15 Plus',
    description: 'All-day battery. 6.7-inch display. Dynamic Island. 48 MP camera.',
    price: 799, category: 'iPhone', rating: 4.6, stock: 70,
    image: '/images/p06.jpg'
  },
  {
    name: 'iPhone SE (3rd Gen)',
    description: 'A15 Bionic. 5G connectivity. Ceramic Shield. Most affordable iPhone.',
    price: 429, category: 'iPhone', rating: 4.4, stock: 120,
    image: '/images/p07.jpg'
  },

  // ── Mac (6) ─────────────────────────────────────────────────────────────
  {
    name: 'MacBook Pro 16" M4 Pro',
    description: 'M4 Pro chip. Liquid Retina XDR display. Up to 24-core GPU. All-day battery.',
    price: 2499, category: 'Mac', rating: 4.9, stock: 25,
    image: '/images/p08.jpg'
  },
  {
    name: 'MacBook Pro 14" M4',
    description: 'M4 chip. 14-inch Liquid Retina XDR. Up to 32 GB RAM. Space Black finish.',
    price: 1599, category: 'Mac', rating: 4.8, stock: 35,
    image: '/images/p09.jpg'
  },
  {
    name: 'MacBook Air 15" M3',
    description: '15.3-inch Liquid Retina. Up to 18 hours battery. Fanless design.',
    price: 1299, category: 'Mac', rating: 4.8, stock: 40,
    image: '/images/p10.jpg'
  },
  {
    name: 'MacBook Air 13" M3',
    description: 'Thin, light, and packed with Apple Intelligence. Built for Apple M3.',
    price: 1099, category: 'Mac', rating: 4.7, stock: 55,
    image: '/images/p11.jpg'
  },
  {
    name: 'Mac mini M4',
    description: 'Tiny desktop. Mighty M4 chip. Up to 32 GB RAM. Thunderbolt 4.',
    price: 599, category: 'Mac', rating: 4.7, stock: 45,
    image: '/images/p12.jpg'
  },
  {
    name: 'iMac 24" M4',
    description: '24-inch 4.5K Retina. 10 vibrant colors. M4 chip. Ultra-thin design.',
    price: 1299, category: 'Mac', rating: 4.8, stock: 30,
    image: '/images/p13.jpg'
  },

  // ── iPad (5) ────────────────────────────────────────────────────────────
  {
    name: 'iPad Pro 13" M4',
    description: 'Ultra Retina XDR tandem OLED. Thinnest Apple product ever. Apple Pencil Pro.',
    price: 1299, category: 'iPad', rating: 4.9, stock: 30,
    image: '/images/p14.jpg'
  },
  {
    name: 'iPad Pro 11" M4',
    description: 'M4 chip powerhouse in an incredibly thin profile. Perfect for creative work.',
    price: 999, category: 'iPad', rating: 4.8, stock: 45,
    image: '/images/p15.jpg'
  },
  {
    name: 'iPad Air 13" M2',
    description: '13-inch Liquid Retina. Perfect for creative work. Apple Pencil Pro support.',
    price: 799, category: 'iPad', rating: 4.7, stock: 50,
    image: '/images/p16.jpg'
  },
  {
    name: 'iPad Air 11" M2',
    description: 'Light and versatile. M2 power. Wi-Fi 6E. Apple Pencil and Magic Keyboard.',
    price: 599, category: 'iPad', rating: 4.6, stock: 65,
    image: '/images/p17.jpg'
  },
  {
    name: 'iPad mini (7th Gen)',
    description: 'Compact 8.3-inch. A17 Pro chip. 5G. Perfect on-the-go tablet.',
    price: 499, category: 'iPad', rating: 4.5, stock: 75,
    image: '/images/p18.jpg'
  },

  // ── Apple Watch (5) ─────────────────────────────────────────────────────
  {
    name: 'Apple Watch Ultra 2',
    description: 'Rugged titanium. Precision dual-frequency GPS. Up to 60-hour battery.',
    price: 799, category: 'Apple Watch', rating: 4.9, stock: 20,
    image: '/images/p19.jpg'
  },
  {
    name: 'Apple Watch Series 10',
    description: 'Thinnest Apple Watch ever. Sleep apnea detection. 18-hour battery.',
    price: 399, category: 'Apple Watch', rating: 4.8, stock: 55,
    image: '/images/p20.jpg'
  },
  {
    name: 'Apple Watch SE (2nd Gen)',
    description: 'Essential health & safety features. Crash Detection. Affordable Apple Watch.',
    price: 249, category: 'Apple Watch', rating: 4.6, stock: 80,
    image: '/images/p21.jpg'
  },
  {
    name: 'Apple Watch Hermès Series 10',
    description: 'Luxury collaboration. Exclusive Hermès watch faces. Premium materials.',
    price: 1249, category: 'Apple Watch', rating: 4.9, stock: 10,
    image: '/images/p22.jpg'
  },
  {
    name: 'Apple Watch Nike Series 10',
    description: 'Nike Run Club integration. Exclusive Nike Sport Band. Lightweight.',
    price: 429, category: 'Apple Watch', rating: 4.7, stock: 40,
    image: '/images/p23.jpg'
  },

  // ── AirPods (4) ─────────────────────────────────────────────────────────
  {
    name: 'AirPods Pro (2nd Gen)',
    description: 'Active Noise Cancellation. Adaptive Audio. H2 chip. USB-C charging case.',
    price: 249, category: 'AirPods', rating: 4.9, stock: 100,
    image: '/images/p24.jpg'
  },
  {
    name: 'AirPods 4',
    description: 'Redesigned for comfort. USB-C. Active Noise Cancellation model available.',
    price: 129, category: 'AirPods', rating: 4.7, stock: 150,
    image: '/images/p25.jpg'
  },
  {
    name: 'AirPods Max',
    description: 'Over-ear headphones. Spatial Audio. Crown digital control.',
    price: 549, category: 'AirPods', rating: 4.8, stock: 35,
    image: '/images/p26.jpg'
  },
  {
    name: 'AirPods 4 (ANC)',
    description: 'Active Noise Cancellation. Personalised Spatial Audio. H2 chip.',
    price: 179, category: 'AirPods', rating: 4.6, stock: 120,
    image: '/images/p27.jpg'
  },

  // ── Accessories (4) ─────────────────────────────────────────────────────
  {
    name: 'Apple Pencil Pro',
    description: 'Pixel-perfect precision. Find My. Double-tap & squeeze actions.',
    price: 129, category: 'Accessories', rating: 4.8, stock: 90,
    image: '/images/p28.jpg'
  },
  {
    name: 'MagSafe Charger (1m)',
    description: '15 W wireless charging for iPhone 12 and later. USB-C connector.',
    price: 39, category: 'Accessories', rating: 4.5, stock: 200,
    image: '/images/p29.jpg'
  },
  {
    name: 'Apple TV 4K (3rd Gen)',
    description: 'A15 Bionic. 4K HDR. Dolby Atmos. Siri Remote. Thread smart-home hub.',
    price: 129, category: 'Accessories', rating: 4.7, stock: 60,
    image: '/images/p30.jpg'
  },
  {
    name: 'HomePod (2nd Gen)',
    description: 'Room-filling Spatial Audio. Smart Home hub. Matter & Thread support.',
    price: 299, category: 'Accessories', rating: 4.6, stock: 45,
    image: '/images/p31.jpg'
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    for (const p of products) {
      await new Product(p).save();
    }

    console.log(`✅ ${products.length} Apple products seeded successfully!`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
