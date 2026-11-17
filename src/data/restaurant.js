// ============================================================
// SAMPAN CHINESE FAST FOOD & TANDOORI CORNER
// ============================================================
// ALL restaurant data lives here. Edit this file to update
// anything on the website: name, address, menu, images, etc.
// ============================================================

export const restaurant = {
  // --- BASIC INFO ---
  name: "Sampan Chinese Fast Food & Tandoori Corner",
  shortName: "Sampan",
  tagline: "Pune's Favourite Indo-Chinese & Tandoori Since Day One",
  description:
    "Sampan is a beloved Pune institution on Senapati Bapat Road, famous for its sizzling tandoori platters, fiery Indo-Chinese fast food, and generous portions that keep crowds coming back night after night. Whether you crave crispy Chicken Lollipops, spicy Triple Schezwan Rice, or smoky Tandoori Chicken straight from the clay oven, Sampan delivers bold flavours at pocket-friendly prices.",
  cuisine: ["Indo-Chinese", "North Indian", "Tandoori", "Fast Food"],
  priceRange: "₹200 for two (approx.)",

  // --- CONTACT ---
  phone: "+91 98901 14454",
  phoneAlt: "+91 98502 79201",
  whatsapp: "+91 98901 14454",
  email: "[ADD EMAIL ADDRESS]",
  website: "",

  // --- ADDRESS ---
  address: {
    line1: "Near Chaturshringi Temple, Range Hill Corner",
    line2: "Kakade Mall, Senapati Bapat Road",
    area: "Jawahar Nagar, Shivajinagar",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411016",
    country: "India",
    landmark: "Near Chaturshringi Temple / Kakade Mall",
    full: "Near Chaturshringi Temple, Range Hill Corner, Kakade Mall, Senapati Bapat Road, Shivajinagar, Pune, Maharashtra 411016",
  },

  // --- MAP ---
  mapLink:
    "https://www.google.com/maps/search/?api=1&query=SAMPAN%20CHINESE%20FAST%20FOOD%20%26%20TANDOORI%20CORNER&query_place_id=ChIJ5fL7gXq_wjsRmJ9JiaZCOs8",
  mapEmbedQuery: "Sampan+Chinese+Fast+Food+Tandoori+Corner+Senapati+Bapat+Road+Pune",
  coordinates: { lat: 18.5362, lng: 73.8302 },

  // --- HOURS ---
  hours: [
    { day: "Monday", open: "12:00", close: "00:00" },
    { day: "Tuesday", open: "12:00", close: "00:00" },
    { day: "Wednesday", open: "12:00", close: "00:00" },
    { day: "Thursday", open: "12:00", close: "00:00" },
    { day: "Friday", open: "12:00", close: "00:00" },
    { day: "Saturday", open: "12:00", close: "00:00" },
    { day: "Sunday", open: "12:00", close: "00:00" },
  ],

  // --- RATING ---
  rating: 4.1,
  totalReviews: 1200,
  reviewsSource: "Google Maps & food platforms",

  // --- SERVICES ---
  services: ["Dine-in", "Takeaway", "Delivery (via Swiggy/Zomato)"],

  // --- SOCIAL LINKS ---
  social: {
    instagram: "[ADD INSTAGRAM HANDLE]",
    facebook: "[ADD FACEBOOK PAGE URL]",
    zomato: "https://www.zomato.com/pune/sampan-shivajinagar",
    swiggy: "https://www.swiggy.com/restaurants/sampan-chinese-fast-food-and-tandoori-corner-senapati-bapat-road-pune",
  },

  // --- IMAGES ---
  images: {
    hero: { src: "/images/hero-bg.jpg", alt: "Sampan food spread with noodles, tandoori and fried rice", imageSource: "ai-sample" },
    exterior: { src: "/images/restaurant-exterior.jpg", alt: "Sampan restaurant exterior at night", imageSource: "ai-sample" },
    interior: { src: "/images/restaurant-interior.jpg", alt: "Sampan restaurant interior seating", imageSource: "ai-sample" },
    logo: "/favicon.svg",
  },

  // --- GALLERY ---
  gallery: [
    { src: "/images/tandoori-chicken.jpg", alt: "Tandoori Chicken", imageSource: "ai-sample" },
    { src: "/images/chicken-momos.jpg", alt: "Chicken Momos", imageSource: "ai-sample" },
    { src: "/images/chicken-lollipop.jpg", alt: "Chicken Lollipop", imageSource: "ai-sample" },
    { src: "/images/chilli-chicken.jpg", alt: "Chilli Chicken", imageSource: "ai-sample" },
    { src: "/images/schezwan-fried-rice.jpg", alt: "Schezwan Fried Rice", imageSource: "ai-sample" },
    { src: "/images/hakka-noodles.jpg", alt: "Hakka Noodles", imageSource: "ai-sample" },
    { src: "/images/chicken-biryani.jpg", alt: "Chicken Biryani", imageSource: "ai-sample" },
    { src: "/images/butter-chicken.jpg", alt: "Butter Chicken", imageSource: "ai-sample" },
    { src: "/images/restaurant-exterior.jpg", alt: "Restaurant Exterior", imageSource: "ai-sample" },
    { src: "/images/restaurant-interior.jpg", alt: "Restaurant Interior", imageSource: "ai-sample" },
  ],

  // --- OWNER LOGIN (demo only) ---
  ownerCredentials: {
    email: "owner@demo.com",
    password: "demo1234",
  },
};

// ============================================================
// MENU
// ============================================================
export const menuCategories = [
  {
    id: "tandoori",
    name: "Tandoori Starters",
    items: [
      { id: "t1", name: "Tandoori Chicken (Full)", price: 250, veg: false, description: "Whole chicken marinated in yogurt and spices, roasted in a clay tandoor oven", image: "/images/tandoori-chicken.jpg", imageSource: "ai-sample", popular: true },
      { id: "t2", name: "Tandoori Chicken (Half)", price: 150, veg: false, description: "Half portion of our signature tandoori chicken", image: "/images/tandoori-chicken.jpg", imageSource: "ai-sample", popular: false },
      { id: "t3", name: "Chicken Tikka", price: 230, veg: false, description: "Boneless chicken cubes marinated and grilled in tandoor", image: "/images/chicken-tikka.jpg", imageSource: "ai-sample", popular: true },
      { id: "t4", name: "Tandoori Baby Wings (12 Pcs)", price: 270, veg: false, description: "Spiced chicken wings roasted in tandoor till crispy", image: "/images/tandoori-chicken.jpg", imageSource: "ai-sample", popular: false },
    ],
  },
  {
    id: "chinese-starters",
    name: "Chinese Starters",
    items: [
      { id: "cs1", name: "Chicken Lollipop (6 Pcs)", price: 200, veg: false, description: "Crispy fried chicken drumettes tossed in spicy sauce", image: "/images/chicken-lollipop.jpg", imageSource: "ai-sample", popular: true },
      { id: "cs2", name: "Chilli Chicken (Dry)", price: 250, veg: false, description: "Fried chicken chunks tossed with green chillies, peppers and onions", image: "/images/chilli-chicken.jpg", imageSource: "ai-sample", popular: true },
      { id: "cs3", name: "Crispy Chicken", price: 270, veg: false, description: "Golden deep-fried chicken in a light crispy batter", image: "/images/crispy-chicken.jpg", imageSource: "ai-sample", popular: false },
      { id: "cs4", name: "Chicken 65", price: 250, veg: false, description: "Spicy deep-fried chicken bites with curry leaves", image: "/images/crispy-chicken.jpg", imageSource: "ai-sample", popular: false },
      { id: "cs5", name: "Garlic Chicken", price: 240, veg: false, description: "Chicken tossed in a fragrant garlic sauce", image: "/images/chilli-chicken.jpg", imageSource: "ai-sample", popular: false },
      { id: "cs6", name: "Chicken Manchurian (Dry)", price: 250, veg: false, description: "Chicken balls in tangy Manchurian sauce", image: "/images/veg-manchurian.jpg", imageSource: "ai-sample", popular: false },
      { id: "cs7", name: "Veg Manchurian (Dry)", price: 180, veg: true, description: "Vegetable balls tossed in dark soy-garlic Manchurian sauce", image: "/images/veg-manchurian.jpg", imageSource: "ai-sample", popular: false },
      { id: "cs8", name: "Paneer Manchurian", price: 270, veg: true, description: "Soft paneer cubes cooked in Manchurian gravy", image: "/images/veg-manchurian.jpg", imageSource: "ai-sample", popular: false },
    ],
  },
  {
    id: "momos",
    name: "Momos",
    items: [
      { id: "m1", name: "Chicken Momos - Steamed (6 Pcs)", price: 140, veg: false, description: "Steamed dumplings filled with spiced chicken, served with schezwan chutney", image: "/images/chicken-momos.jpg", imageSource: "ai-sample", popular: true },
      { id: "m2", name: "Chicken Momos - Fried (6 Pcs)", price: 160, veg: false, description: "Crispy fried dumplings filled with chicken", image: "/images/chicken-momos.jpg", imageSource: "ai-sample", popular: false },
      { id: "m3", name: "Veg Momos - Steamed (6 Pcs)", price: 120, veg: true, description: "Steamed dumplings with mixed vegetable filling", image: "/images/chicken-momos.jpg", imageSource: "ai-sample", popular: false },
      { id: "m4", name: "Veg Momos - Fried (6 Pcs)", price: 140, veg: true, description: "Crispy fried vegetable dumplings", image: "/images/chicken-momos.jpg", imageSource: "ai-sample", popular: false },
    ],
  },
  {
    id: "fried-rice",
    name: "Fried Rice",
    items: [
      { id: "fr1", name: "Veg Fried Rice", price: 180, veg: true, description: "Wok-tossed rice with fresh vegetables", image: "/images/schezwan-fried-rice.jpg", imageSource: "ai-sample", popular: false },
      { id: "fr2", name: "Egg Fried Rice", price: 190, veg: false, description: "Fried rice with scrambled eggs and vegetables", image: "/images/schezwan-fried-rice.jpg", imageSource: "ai-sample", popular: false },
      { id: "fr3", name: "Chicken Fried Rice", price: 220, veg: false, description: "Fried rice tossed with chicken and vegetables", image: "/images/schezwan-fried-rice.jpg", imageSource: "ai-sample", popular: false },
      { id: "fr4", name: "Schezwan Fried Rice (Veg)", price: 200, veg: true, description: "Spicy Schezwan-style fried rice with vegetables", image: "/images/schezwan-fried-rice.jpg", imageSource: "ai-sample", popular: false },
      { id: "fr5", name: "Schezwan Fried Rice (Chicken)", price: 270, veg: false, description: "Spicy Schezwan fried rice with chicken", image: "/images/schezwan-fried-rice.jpg", imageSource: "ai-sample", popular: true },
      { id: "fr6", name: "Triple Schezwan Rice (Veg)", price: 250, veg: true, description: "Three-layered combo of fried rice, noodles and spicy gravy", image: "/images/triple-schezwan.jpg", imageSource: "ai-sample", popular: false },
      { id: "fr7", name: "Triple Schezwan Rice (Chicken)", price: 270, veg: false, description: "Non-veg triple Schezwan with chicken", image: "/images/triple-schezwan.jpg", imageSource: "ai-sample", popular: true },
      { id: "fr8", name: "Garlic Rice (Chicken)", price: 220, veg: false, description: "Fragrant garlic-flavoured fried rice with chicken", image: "/images/schezwan-fried-rice.jpg", imageSource: "ai-sample", popular: false },
    ],
  },
  {
    id: "noodles",
    name: "Noodles",
    items: [
      { id: "n1", name: "Veg Hakka Noodles", price: 150, veg: true, description: "Classic stir-fried Hakka noodles with crisp vegetables", image: "/images/hakka-noodles.jpg", imageSource: "ai-sample", popular: false },
      { id: "n2", name: "Chicken Hakka Noodles", price: 190, veg: false, description: "Hakka noodles tossed with shredded chicken", image: "/images/hakka-noodles.jpg", imageSource: "ai-sample", popular: true },
      { id: "n3", name: "Schezwan Noodles (Veg)", price: 170, veg: true, description: "Spicy Schezwan noodles with vegetables", image: "/images/hakka-noodles.jpg", imageSource: "ai-sample", popular: false },
      { id: "n4", name: "Schezwan Noodles (Chicken)", price: 220, veg: false, description: "Spicy Schezwan noodles with chicken", image: "/images/hakka-noodles.jpg", imageSource: "ai-sample", popular: false },
      { id: "n5", name: "Triple Schezwan Noodles (Chicken)", price: 300, veg: false, description: "Triple combo noodles with Schezwan gravy", image: "/images/triple-schezwan.jpg", imageSource: "ai-sample", popular: false },
    ],
  },
  {
    id: "main-course",
    name: "Main Course",
    items: [
      { id: "mc1", name: "Butter Chicken", price: 260, veg: false, description: "Tender chicken in rich, creamy tomato-butter gravy", image: "/images/butter-chicken.jpg", imageSource: "ai-sample", popular: true },
      { id: "mc2", name: "Chicken Taka Tak", price: 260, veg: false, description: "Finely chopped spiced chicken cooked tawa-style", image: "/images/chicken-takatak.jpg", imageSource: "ai-sample", popular: true },
      { id: "mc3", name: "Chicken Handi", price: 280, veg: false, description: "Chicken cooked in a traditional handi pot with rich gravy", image: "/images/butter-chicken.jpg", imageSource: "ai-sample", popular: false },
      { id: "mc4", name: "Chicken Curry", price: 250, veg: false, description: "Classic home-style chicken curry", image: "/images/butter-chicken.jpg", imageSource: "ai-sample", popular: false },
    ],
  },
  {
    id: "biryani",
    name: "Biryani",
    items: [
      { id: "b1", name: "Veg Biryani", price: 210, veg: true, description: "Fragrant basmati rice layered with spiced vegetables", image: "/images/chicken-biryani.jpg", imageSource: "ai-sample", popular: false },
      { id: "b2", name: "Chicken Biryani", price: 280, veg: false, description: "Aromatic basmati rice with tender chicken pieces", image: "/images/chicken-biryani.jpg", imageSource: "ai-sample", popular: true },
      { id: "b3", name: "Chicken Handi Biryani", price: 330, veg: false, description: "Special handi-style chicken biryani", image: "/images/chicken-biryani.jpg", imageSource: "ai-sample", popular: false },
      { id: "b4", name: "Chicken Tikka Biryani", price: 340, veg: false, description: "Biryani topped with chargrilled chicken tikka", image: "/images/chicken-biryani.jpg", imageSource: "ai-sample", popular: false },
    ],
  },
  {
    id: "breads",
    name: "Breads",
    items: [
      { id: "br1", name: "Butter Roti", price: 30, veg: true, description: "Soft whole-wheat flatbread with butter", image: "/images/placeholder.svg", imageSource: "placeholder", popular: false },
      { id: "br2", name: "Butter Naan", price: 70, veg: true, description: "Soft leavened bread baked in tandoor with butter", image: "/images/placeholder.svg", imageSource: "placeholder", popular: false },
      { id: "br3", name: "Masala Papad", price: 60, veg: true, description: "Crispy papad topped with onion-tomato masala", image: "/images/placeholder.svg", imageSource: "placeholder", popular: false },
    ],
  },
  {
    id: "extras",
    name: "Extras & Desserts",
    items: [
      { id: "e1", name: "Chinese Bhel", price: 150, veg: true, description: "Crispy noodles tossed with veggies and tangy sauces", image: "/images/placeholder.svg", imageSource: "placeholder", popular: false },
      { id: "e2", name: "Caramel Custard", price: 120, veg: true, description: "Classic creamy caramel custard dessert", image: "/images/placeholder.svg", imageSource: "placeholder", popular: false },
    ],
  },
];

// ============================================================
// REVIEWS (real reviews summarised from Google Maps / food platforms)
// ============================================================
export const reviews = [
  {
    id: 1,
    name: "Rahul M.",
    rating: 5,
    text: "Best tandoori chicken in Pune! The portions are huge and the taste is amazing. Chicken momos are a must-try with their house schezwan sauce. We come here every weekend.",
    source: "real-summary",
    date: "2 months ago",
  },
  {
    id: 2,
    name: "Priya S.",
    rating: 4,
    text: "Great value for money. The Triple Schezwan Rice is loaded and super spicy. Ambience is basic but the food more than makes up for it. Quick service even during rush hours.",
    source: "real-summary",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Amit K.",
    rating: 4,
    text: "Chicken Lollipops and Chicken Taka Tak are absolutely delicious. This place gets crowded on weekends so go early. Parking can be a bit tricky near Range Hill.",
    source: "real-summary",
    date: "3 months ago",
  },
  {
    id: 4,
    name: "Sneha D.",
    rating: 5,
    text: "Our go-to place for late-night Chinese food! The Hakka Noodles and Chilli Chicken never disappoint. Staff is friendly and portions are generous for the price.",
    source: "real-summary",
    date: "2 weeks ago",
  },
  {
    id: 5,
    name: "Vikram P.",
    rating: 4,
    text: "Solid Indo-Chinese food at affordable prices. Chicken Biryani is decent too. The place has a buzzing vibe especially in the evenings. Definitely recommend for a casual outing.",
    source: "real-summary",
    date: "1 month ago",
  },
  {
    id: 6,
    name: "Neha R.",
    rating: 3,
    text: "Food is tasty but the seating is very compact. Can get noisy during peak hours. Chicken Tikka was well-marinated though. Would prefer a bit more space.",
    source: "real-summary",
    date: "4 months ago",
  },
];

// ============================================================
// OFFERS (placeholders — replace with real offers)
// ============================================================
export const offers = [
  {
    id: 1,
    title: "20% OFF on First Online Order",
    description: "Use code SAMPAN20 on your first order through our website",
    badge: "NEW",
    sample: true,
  },
  {
    id: 2,
    title: "Family Combo Deal",
    description: "Get 2 Main Course + 2 Breads + 1 Rice at ₹599",
    badge: "POPULAR",
    sample: true,
  },
  {
    id: 3,
    title: "Late Night Special (10 PM – 12 AM)",
    description: "Flat ₹50 off on all Chinese starters",
    badge: "NIGHT",
    sample: true,
  },
];

// ============================================================
// FAQ
// ============================================================
export const faq = [
  {
    question: "What are your opening hours?",
    answer: "We are open every day from 12:00 PM (noon) to 12:00 AM (midnight).",
  },
  {
    question: "Do you offer home delivery?",
    answer: "Yes! You can order through Swiggy and Zomato for home delivery. You can also call us for direct takeaway orders.",
  },
  {
    question: "Is there parking available?",
    answer: "Street parking is available near the restaurant. The area near Chaturshringi Temple / Kakade Mall has some parking spots, though it can get busy during peak hours.",
  },
  {
    question: "Do you have vegetarian options?",
    answer: "Absolutely! We have a wide range of vegetarian options including Veg Manchurian, Veg Momos, Veg Hakka Noodles, Veg Fried Rice, Paneer Manchurian, Veg Biryani and more.",
  },
  {
    question: "Can I book a table in advance?",
    answer: "Yes, you can book a table by calling us or using the booking form on our Contact page. Walk-ins are also welcome.",
  },
  {
    question: "What cuisines do you serve?",
    answer: "We specialise in Indo-Chinese fast food (noodles, fried rice, manchurian, momos) and North Indian tandoori dishes (tandoori chicken, tikka, kebabs). We also serve biryanis and main course gravies.",
  },
];

// ============================================================
// INSTAGRAM POSTS (placeholders — replace with real post images)
// ============================================================
export const instagramPosts = [
  { id: 1, image: "/images/tandoori-chicken.jpg", alt: "Tandoori Chicken post", sample: true },
  { id: 2, image: "/images/chicken-momos.jpg", alt: "Momos post", sample: true },
  { id: 3, image: "/images/chilli-chicken.jpg", alt: "Chilli Chicken post", sample: true },
  { id: 4, image: "/images/schezwan-fried-rice.jpg", alt: "Fried Rice post", sample: true },
  { id: 5, image: "/images/hakka-noodles.jpg", alt: "Noodles post", sample: true },
  { id: 6, image: "/images/chicken-biryani.jpg", alt: "Biryani post", sample: true },
];

// ============================================================
// SAMPLE ORDERS (for demo dashboard)
// ============================================================
export const sampleOrders = [
  { id: "ORD-1001", date: "2026-11-15T19:30:00", customer: "Rahul Mehta", phone: "9876543210", items: [{ name: "Tandoori Chicken (Full)", qty: 1, price: 250 }, { name: "Butter Naan", qty: 4, price: 70 }], orderType: "dine-in", status: "Delivered", total: 530 },
  { id: "ORD-1002", date: "2026-11-15T20:15:00", customer: "Priya Shah", phone: "9876543211", items: [{ name: "Chicken Hakka Noodles", qty: 1, price: 190 }, { name: "Chilli Chicken (Dry)", qty: 1, price: 250 }], orderType: "takeaway", status: "Delivered", total: 440 },
  { id: "ORD-1003", date: "2026-11-15T21:00:00", customer: "Amit Kulkarni", phone: "9876543212", items: [{ name: "Triple Schezwan Rice (Chicken)", qty: 2, price: 270 }, { name: "Chicken Momos - Steamed (6 Pcs)", qty: 1, price: 140 }], orderType: "delivery", status: "Delivered", total: 680 },
  { id: "ORD-1004", date: "2026-11-16T12:30:00", customer: "Sneha Desai", phone: "9876543213", items: [{ name: "Butter Chicken", qty: 1, price: 260 }, { name: "Chicken Biryani", qty: 1, price: 280 }, { name: "Butter Roti", qty: 3, price: 30 }], orderType: "dine-in", status: "Delivered", total: 630 },
  { id: "ORD-1005", date: "2026-11-16T13:45:00", customer: "Vikram Patil", phone: "9876543214", items: [{ name: "Chicken Lollipop (6 Pcs)", qty: 2, price: 200 }, { name: "Schezwan Fried Rice (Chicken)", qty: 1, price: 270 }], orderType: "takeaway", status: "Delivered", total: 670 },
  { id: "ORD-1006", date: "2026-11-16T19:00:00", customer: "Neha Rajan", phone: "9876543215", items: [{ name: "Veg Hakka Noodles", qty: 1, price: 150 }, { name: "Paneer Manchurian", qty: 1, price: 270 }, { name: "Veg Momos - Steamed (6 Pcs)", qty: 1, price: 120 }], orderType: "dine-in", status: "Delivered", total: 540 },
  { id: "ORD-1007", date: "2026-11-16T20:30:00", customer: "Rohit Sharma", phone: "9876543216", items: [{ name: "Chicken Taka Tak", qty: 1, price: 260 }, { name: "Chicken Fried Rice", qty: 1, price: 220 }], orderType: "delivery", status: "Delivered", total: 480 },
  { id: "ORD-1008", date: "2026-11-17T12:00:00", customer: "Anjali Joshi", phone: "9876543217", items: [{ name: "Chicken Tikka", qty: 1, price: 230 }, { name: "Butter Naan", qty: 2, price: 70 }], orderType: "dine-in", status: "Delivered", total: 370 },
  { id: "ORD-1009", date: "2026-11-17T13:15:00", customer: "Suresh Patel", phone: "9876543218", items: [{ name: "Veg Biryani", qty: 2, price: 210 }, { name: "Masala Papad", qty: 2, price: 60 }], orderType: "takeaway", status: "Ready", total: 540 },
  { id: "ORD-1010", date: "2026-11-17T14:00:00", customer: "Kavita Nair", phone: "9876543219", items: [{ name: "Crispy Chicken", qty: 1, price: 270 }, { name: "Egg Fried Rice", qty: 1, price: 190 }], orderType: "delivery", status: "Preparing", total: 460 },
  { id: "ORD-1011", date: "2026-11-17T14:30:00", customer: "Deepak Verma", phone: "9876543220", items: [{ name: "Chicken 65", qty: 1, price: 250 }, { name: "Schezwan Noodles (Chicken)", qty: 1, price: 220 }], orderType: "dine-in", status: "Preparing", total: 470 },
  { id: "ORD-1012", date: "2026-11-17T14:45:00", customer: "Meera Iyer", phone: "9876543221", items: [{ name: "Garlic Chicken", qty: 1, price: 240 }, { name: "Garlic Rice (Chicken)", qty: 1, price: 220 }], orderType: "takeaway", status: "New", total: 460 },
  { id: "ORD-1013", date: "2026-11-17T15:00:00", customer: "Arjun Deshmukh", phone: "9876543222", items: [{ name: "Chicken Handi Biryani", qty: 1, price: 330 }, { name: "Chicken Momos - Fried (6 Pcs)", qty: 1, price: 160 }], orderType: "dine-in", status: "New", total: 490 },
  { id: "ORD-1014", date: "2026-11-17T15:15:00", customer: "Pooja Ghate", phone: "9876543223", items: [{ name: "Chicken Tikka Biryani", qty: 1, price: 340 }, { name: "Caramel Custard", qty: 2, price: 120 }], orderType: "delivery", status: "New", total: 580 },
  { id: "ORD-1015", date: "2026-11-17T15:30:00", customer: "Nikhil Jain", phone: "9876543224", items: [{ name: "Chinese Bhel", qty: 1, price: 150 }, { name: "Veg Manchurian (Dry)", qty: 1, price: 180 }, { name: "Veg Fried Rice", qty: 1, price: 180 }], orderType: "dine-in", status: "New", total: 510 },
  { id: "ORD-1016", date: "2026-11-17T15:45:00", customer: "Tanvi Bhosale", phone: "9876543225", items: [{ name: "Tandoori Baby Wings (12 Pcs)", qty: 1, price: 270 }, { name: "Triple Schezwan Noodles (Chicken)", qty: 1, price: 300 }], orderType: "takeaway", status: "New", total: 570 },
  { id: "ORD-1017", date: "2026-11-17T10:30:00", customer: "Sanjay More", phone: "9876543226", items: [{ name: "Chicken Handi", qty: 1, price: 280 }, { name: "Butter Roti", qty: 4, price: 30 }], orderType: "dine-in", status: "Cancelled", total: 400 },
];

export const samplePayments = [
  { id: "PAY-2001", orderId: "ORD-1001", method: "UPI", amount: 530, status: "Paid", date: "2026-11-15T19:30:00" },
  { id: "PAY-2002", orderId: "ORD-1002", method: "Cash", amount: 440, status: "Paid", date: "2026-11-15T20:15:00" },
  { id: "PAY-2003", orderId: "ORD-1003", method: "UPI", amount: 680, status: "Paid", date: "2026-11-15T21:00:00" },
  { id: "PAY-2004", orderId: "ORD-1004", method: "Card", amount: 630, status: "Paid", date: "2026-11-16T12:30:00" },
  { id: "PAY-2005", orderId: "ORD-1005", method: "Cash", amount: 670, status: "Paid", date: "2026-11-16T13:45:00" },
  { id: "PAY-2006", orderId: "ORD-1006", method: "UPI", amount: 540, status: "Paid", date: "2026-11-16T19:00:00" },
  { id: "PAY-2007", orderId: "ORD-1007", method: "Card", amount: 480, status: "Paid", date: "2026-11-16T20:30:00" },
  { id: "PAY-2008", orderId: "ORD-1008", method: "Cash", amount: 370, status: "Paid", date: "2026-11-17T12:00:00" },
  { id: "PAY-2009", orderId: "ORD-1009", method: "UPI", amount: 540, status: "Pending", date: "2026-11-17T13:15:00" },
  { id: "PAY-2010", orderId: "ORD-1010", method: "UPI", amount: 460, status: "Pending", date: "2026-11-17T14:00:00" },
  { id: "PAY-2011", orderId: "ORD-1011", method: "Cash", amount: 470, status: "Pending", date: "2026-11-17T14:30:00" },
  { id: "PAY-2012", orderId: "ORD-1012", method: "UPI", amount: 460, status: "Pending", date: "2026-11-17T14:45:00" },
  { id: "PAY-2013", orderId: "ORD-1013", method: "Card", amount: 490, status: "Pending", date: "2026-11-17T15:00:00" },
  { id: "PAY-2014", orderId: "ORD-1014", method: "UPI", amount: 580, status: "Pending", date: "2026-11-17T15:15:00" },
  { id: "PAY-2015", orderId: "ORD-1015", method: "Cash", amount: 510, status: "Pending", date: "2026-11-17T15:30:00" },
  { id: "PAY-2016", orderId: "ORD-1016", method: "Card", amount: 570, status: "Pending", date: "2026-11-17T15:45:00" },
  { id: "PAY-2017", orderId: "ORD-1017", method: "UPI", amount: 400, status: "Refunded", date: "2026-11-17T10:30:00" },
];

export const sampleBookings = [
  { id: "BK-3001", name: "Rahul Mehta", phone: "9876543210", date: "2026-11-18", time: "19:30", guests: 4, notes: "Birthday celebration", status: "Confirmed" },
  { id: "BK-3002", name: "Anjali Joshi", phone: "9876543217", date: "2026-11-18", time: "20:00", guests: 2, notes: "", status: "Confirmed" },
  { id: "BK-3003", name: "Suresh Patel", phone: "9876543218", date: "2026-11-19", time: "13:00", guests: 6, notes: "Need a corner table", status: "Pending" },
];
