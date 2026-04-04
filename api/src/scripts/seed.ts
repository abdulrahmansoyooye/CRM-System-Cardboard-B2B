import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Import Models (using relative paths for ts-node)
import { Category } from '../module/category/category.model';
import { Product } from '../module/product/product.model';
import { Blog } from '../module/blog/blog.model';
import { Setting } from '../module/setting/setting.model';
import { Industry } from '../module/industry/industry.model';
import { Testimonial } from '../module/testimonial/testimonial.model';
import { Job } from '../module/job/job.model';
import { User } from '../module/auth/user.model';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const MONGODB_URI = process.env.MONGODB_URI;

const seedData = async () => {
  if (!MONGODB_URI) {
    console.error('❌ MONGODB_URI is not defined');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('📦 Connected to MongoDB for seeding...');

    // 1. Clean existing data
    console.log('🧹 Cleaning existing database records...');
    await Promise.all([
      Category.deleteMany({}),
      Product.deleteMany({}),
      Blog.deleteMany({}),
      Setting.deleteMany({}),
      Industry.deleteMany({}),
      Testimonial.deleteMany({}),
      Job.deleteMany({}),
      User.deleteMany({}),
    ]);

    // 2. Seed Admin User
    console.log('👤 Provisioning administrative access...');
    const admin = await User.create({
      name: 'System Administrator',
      email: 'admin@cardbox.demo',
      password: 'CardboxAdminPassword2026', // Will be hashed by pre-save hook
      role: 'super_admin',
      isActive: true,
    });

    // 3. Seed Settings
    console.log('⚙️ Initializing system configurations...');
    await Setting.create({
      companyName: 'CARDBOX Industrial Manufacturing',
      tagline: 'Engineering Superior Corrugated Protection',
      contactEmail: 'logistics@cardbox.demo',
      contactPhone: '+971 4 881 2345',
      address: 'Industrial Plot 45, Street 12, Jebel Ali Industrial Area, Dubai, UAE',
      socialLinks: {
        linkedin: 'https://linkedin.com/company/cardbox-industrial',
        twitter: 'https://twitter.com/cardboxuae',
        facebook: 'https://facebook.com/cardboxmanufacturing',
        instagram: 'https://instagram.com/cardbox.packaging',
      },
      defaultSEO: {
        metaTitle: 'CARDBOX | Industrial Corrugated Packaging Manufacturer',
        metaDesc: 'Leading UAE manufacturer of master cartons, 7-ply heavy-duty boxes, and custom industrial packaging solutions for global export.',
      },
      homepageHero: {
        title: 'Industrial Strength Packaging for the Global Supply Chain',
        subtitle: 'Specializing in master cartons and heavy-duty corrugated engineering for automotive, logistics, and manufacturing sectors.',
      },
      ctaBanner: {
        title: 'Optimize Your Logistics Protocol Today',
        subtitle: 'Connect with our engineering team for specialized cargo protection structural analysis.',
      },
      analyticsId: 'UA-CARDBOX-2026',
    });

    // 4. Seed Categories
    console.log('📂 Organizing industrial product classifications...');
    const categories = await Category.insertMany([
      {
        name: 'Master Cartons',
        slug: 'master-cartons',
        description: 'Primary shipping containers designed for bulk logistics and cross-border freight.',
        coverImage: 'https://images.unsplash.com/photo-1549416805-0e6231eb546d?auto=format&fit=crop&q=80',
        isActive: true,
      },
      {
        name: 'Heavy-Duty 7-Ply',
        slug: 'heavy-duty-7-ply',
        description: 'Triple-wall corrugated engineering for heavy machinery, automotive parts, and high-weight industrial exports.',
        coverImage: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80',
        isActive: true,
      },
      {
        name: 'Retail Display Packaging',
        slug: 'retail-display',
        description: 'Point-of-sale structural engineering that combines durability with high-fidelity visual communication.',
        coverImage: 'https://images.unsplash.com/photo-1512418490979-92798ccc1380?auto=format&fit=crop&q=80',
        isActive: true,
      },
      {
        name: 'E-Commerce Solutions',
        slug: 'ecommerce-packaging',
        description: 'Frustration-free packaging optimized for last-mile delivery and parcel network durability.',
        coverImage: 'https://images.unsplash.com/photo-1589828234530-bc3a9bf88ff6?auto=format&fit=crop&q=80',
        isActive: true,
      },
    ]);

    // 5. Seed Products
    console.log('📦 Indexing industrial product specifications...');
    const c1 = categories[0]._id;
    const c2 = categories[1]._id;
    const c3 = categories[2]._id;
    const c4 = categories[3]._id;

    const products = await Product.insertMany([
      {
        name: 'Ultra-Tough Master Carton XL',
        slug: 'ultra-tough-master-carton-xl',
        categoryId: c1,
        shortDescription: 'High-density double-wall carton for sea-freight consolidation.',
        fullDescription: 'Constructed from premium virgin kraft paper, these cartons provide superior burst strength for international logistics.',
        specifications: ['Dimension: 600x400x400mm', 'Material: 200/150/150/150/200 BC Flute', 'Load Capacity: 45kg'],
        moq: 500,
        deliveryTimeline: '5-7 Working Days',
        isFeatured: true,
        images: ['https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&fit=crop&q=80'],
        isActive: true,
      },
      {
        name: '7-Ply Industrial Chassis Box',
        slug: '7-ply-industrial-chassis-box',
        categoryId: c2,
        shortDescription: 'Triple-wall structural box for automotive chassis components.',
        fullDescription: 'Engineered to withstand stack compression of up to 2 tons. Ideal for heavy metal components and engine parts.',
        specifications: ['Thickness: 15mm', 'Material: 7-Ply Triple Wall AAA Flute', 'Compression Strength: 2200kgf'],
        moq: 100,
        deliveryTimeline: '10-12 Working Days',
        isFeatured: true,
        images: ['https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?auto=format&fit=crop&q=80'],
        isActive: true,
      },
      {
        name: 'Premium Matte Subscription Box',
        slug: 'premium-matte-subscription-box',
        categoryId: c3,
        shortDescription: 'Custom printed mailer with soft-touch matte finish.',
        fullDescription: 'Elite e-commerce packaging solution with internal flexographic printing options and security tab closures.',
        specifications: ['Custom Branding: CMYK + Pantones', 'Coating: Soft-Touch UV Matte', 'Assembly: Self-Locking No Glue'],
        moq: 1000,
        deliveryTimeline: '14-16 Working Days',
        isFeatured: true,
        images: ['https://images.unsplash.com/photo-1520004434532-668416a0860d?auto=format&fit=crop&q=80'],
        isActive: true,
      },
      {
        name: 'Recyclable Courier Mailer L1',
        slug: 'recyclable-courier-mailer-l1',
        categoryId: c4,
        shortDescription: 'Lightweight shipping box for parcel delivery networks.',
        fullDescription: 'Optimized for high-volume logistics. Features double-adhesive strips for easy customer returns.',
        specifications: ['Weight: 120g', 'Sustainability: 100% Post-Consumer Waste', 'Closure: Peel & Seal'],
        moq: 2000,
        deliveryTimeline: '3-5 Working Days',
        isFeatured: false,
        images: ['https://images.unsplash.com/photo-1589828234530-bc3a9bf88ff6?auto=format&fit=crop&q=80'],
        isActive: true,
      },
    ]);

    // 6. Seed Industries
    console.log('🏗️ Mapping industry cross-references...');
    await Industry.insertMany([
      {
        name: 'Automotive & Heavy Industry',
        slug: 'automotive-heavy-industry',
        overview: 'Specialized 7-ply protection for gearbox, chassis, and drivetrain components subject to global sea freight.',
        relatedProducts: [products[1]._id],
        images: ['https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80'],
        isActive: true,
      },
      {
        name: 'Logistics & 3PL Operators',
        slug: 'logistics-3pl-operators',
        overview: 'Master carton solutions designed for standard palletization and automated warehouse systems.',
        relatedProducts: [products[0]._id, products[3]._id],
        images: ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80'],
        isActive: true,
      },
      {
        name: 'FMCG & Retails',
        slug: 'fmcg-retails',
        overview: 'Consumer-grade corrugated packaging with shelf-ready design protocols.',
        relatedProducts: [products[2]._id],
        images: ['https://images.unsplash.com/photo-1512418490979-92798ccc1380?auto=format&fit=crop&q=80'],
        isActive: true,
      },
    ]);

    // 7. Seed Blogs
    console.log('✍️ Syncing technical intelligence archives...');
    await Blog.insertMany([
      {
        title: 'Structural Engineering: The Science of Triple-Wall Corrugated',
        slug: 'science-of-triple-wall-corrugated',
        category: 'Engineering',
        excerpt: 'An in-depth analysis of how 7-ply AAA flute engineering prevents compression failure in long-haul heavy logistics.',
        content: '<p>Modern industrial packaging is no longer just "boxes". It is structural engineering. When shipping automotive engines or heavy industrial machinery, the axial load on the bottom layer of a pallet can exceed 1,500kg...</p><h3>Why AAA Flute?</h3><p>Triple-wall board provides the structural integrity equivalent to timber crates but at 30% of the weight, significantly reducing air freight costs and carbon footprint.</p>',
        featuredImage: 'https://images.unsplash.com/photo-1586769852836-bc069f19e1b6?auto=format&fit=crop&q=80',
        tags: ['Engineering', 'Industrial', 'Sustainability'],
        status: 'published',
        publishedAt: new Date(),
      },
      {
        title: 'Optimizing Warehouse Space via Master Carton Geometric Standardization',
        slug: 'warehouse-optimization-standardization',
        category: 'Logistics',
        excerpt: 'How standardizing carton sizes to Euro-pallet (EPAL) dimensions can increase warehouse utilization by 22%.',
        content: '<p>Inefficient palletization is the silent killer of profitability in a 3PL environment. By adopting master cartons specifically engineered for EPAL dimensions (1200x800mm), operators can eliminate "air shipments" and stabilize stack dynamics...</p>',
        featuredImage: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaad5b?auto=format&fit=crop&q=80',
        tags: ['Logistics', 'Warehousing', 'ROI'],
        status: 'published',
        publishedAt: new Date(),
      },
      {
        title: 'Carbon Neutrality in Packaging: Navigating New ESG Protocols',
        slug: 'carbon-neutrality-packaging-esg',
        category: 'Sustainability',
        excerpt: 'Understanding the shift toward bio-plastics and 100% recycled kraft paper in the luxury e-commerce sector.',
        content: '<p>As ESG (Environmental, Social, and Governance) mandates become more stringent, manufacturers are pivoting toward closed-loop fiber recovery systems. At Cardbox, our L1 Mailer series represents a paradigm shift in recyclability without compromising tensile strength...</p>',
        featuredImage: 'https://images.unsplash.com/photo-1588600878108-578307a3cc9d?auto=format&fit=crop&q=80',
        tags: ['ESG', 'Environment', 'Future'],
        status: 'published',
        publishedAt: new Date(),
      },
    ]);

    // 8. Seed Testimonials
    console.log('💬 Compiling client verification protocols...');
    await Testimonial.insertMany([
      {
        clientName: 'Sarah Al-Mansoori',
        company: 'Emirates Industrial Partners',
        feedback: 'Cardbox’s structural engineering for our export division reduced transit damage by 40% in our heavy parts sector.',
        rating: 5,
        isPublished: true,
      },
      {
        clientName: 'Michael Chen',
        company: 'LogiLink Global Solutions',
        feedback: 'The customization precision on their master cartons is world-class. Our warehouse automation had zero issues since the switch.',
        rating: 5,
        isPublished: true,
      },
      {
        clientName: 'Ahmed Hassan',
        company: 'Gulf FMCG Distributors',
        feedback: 'Responsive designs and quick turnaround. The retail display boxes are exactly what our branding team envisioned.',
        rating: 4,
        isPublished: true,
      },
    ]);

    // 9. Seed Jobs
    console.log('🛠️ Registering operational personnel requirements...');
    await Job.insertMany([
      {
        title: 'Production Operations Manager',
        department: 'Operations',
        experience: '8-10 Years',
        location: 'Dubai Industrial City',
        type: 'Full-Time',
        salary: 'AED 25,000 - 30,000',
        description: 'Lead high-volume corrugated board manufacturing lines. Expertise in BHS corrugators and Lean Six Sigma methodology required.',
        status: 'open',
      },
      {
        title: 'Structural Design Engineer',
        department: 'Design',
        experience: '3-5 Years',
        location: 'Jebel Ali, Dubai',
        type: 'Full-Time',
        salary: 'AED 15,000 - 20,000',
        description: 'Using ArtiosCAD and TOPS Pro for industrial palletization optimization. Knowledge of FEA analysis for corrugated structures is essential.',
        status: 'open',
      },
      {
        title: 'QC & Sustainability Officer',
        department: 'Quality Control',
        experience: '2-4 Years',
        location: 'Sharjah Industrial Area',
        type: 'Full-Time',
        salary: 'AED 12,000 - 15,000',
        description: 'Ensuring Tappi standards for burst strength and compression. Monitoring circular economy fiber recovery protocols.',
        status: 'open',
      },
    ]);

    console.log('✅ DATABASE POPULATION PROTOCOL COMPLETED SUCCESSFULLY');
    process.exit(0);
  } catch (error) {
    console.error('❌ SEEDING OPERATION FAILED:', error);
    process.exit(1);
  }
};

seedData();
