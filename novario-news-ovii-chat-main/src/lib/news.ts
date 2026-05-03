export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: number;
  trending?: boolean;
  breaking?: boolean;
};

export const CATEGORIES = ["Top", "India", "World", "Business", "Tech", "Sports", "Entertainment", "Science"] as const;

export const BREAKING: string[] = [
  "BREAKING: RBI holds repo rate at 6.5% for the seventh consecutive review",
  "ISRO confirms successful docking of SpaDeX modules in low-earth orbit",
  "Madhya Pradesh signs ₹4,200 crore green hydrogen MoU with two global firms",
  "Sensex closes 612 points higher; Nifty reclaims 24,800 mark",
  "Heavy rain alert: IMD issues orange warning for 12 districts in central India",
  "Indian women's cricket team clinches T20 series 3-1 against Australia",
];

export const ARTICLES: Article[] = [
  {
    id: "1",
    slug: "mp-industrial-growth",
    title: "Madhya Pradesh emerges as India's new industrial powerhouse with record FDI",
    excerpt:
      "With ₹15.4 lakh crore in fresh investment commitments and three new industrial corridors approved, Madhya Pradesh is rewriting the manufacturing map of India.",
    body: [
      "INDORE — Madhya Pradesh has quietly become one of the most aggressive industrial destinations in the country, attracting a record ₹15.4 lakh crore in investment commitments over the past eighteen months. Industry watchers say the state's combination of central location, low logistics cost, and a streamlined single-window clearance system has begun to draw manufacturers that historically favoured Gujarat or Tamil Nadu.",
      "The Global Investors Summit held in Bhopal earlier this year was followed by ground-breakings in Pithampur, Mandideep, Ratlam and Dewas. Together these clusters are expected to generate close to 9.2 lakh direct jobs by 2028, according to projections shared by the state's Department of Industrial Policy and Investment Promotion.",
      "Semiconductor packaging, EV battery cells, and pharmaceutical APIs make up nearly 40% of the new pipeline. A consortium led by a Taiwanese fab partner has signed an MoU for a 28nm OSAT facility outside Indore — the first of its scale in central India.",
      "Logistics infrastructure is keeping pace. The Indore–Manmad rail corridor, long delayed, has cleared its final environmental hurdles and tendering will begin next quarter. The Delhi–Mumbai Expressway already cuts truck transit from Indore to JNPT to under 14 hours.",
      "\"The story used to be Bengaluru and Hyderabad for software, Chennai and Pune for cars,\" said Dr. Anjali Verma, an industrial economist at IIM Indore. \"That story now includes Indore and Bhopal, and not as supporting characters.\"",
      "Critics caution that water availability and grid reliability remain real constraints, particularly in the Malwa belt. The state has earmarked ₹6,800 crore for industrial water reuse and a dedicated 765kV transmission ring is under construction.",
      "For residents of Indore — already India's cleanest city for the seventh year running — the next chapter appears to be industrial as much as civic.",
    ],
    image: "https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=1600&q=80",
    category: "Business",
    author: "Rohan Mehta",
    publishedAt: "2 hours ago",
    readTime: 6,
    trending: true,
    breaking: true,
  },
  {
    id: "2",
    slug: "isro-spadex",
    title: "ISRO's SpaDeX mission achieves historic in-orbit docking",
    excerpt: "India becomes the fourth nation to demonstrate autonomous space docking, paving the way for Bharatiya Antariksh Station.",
    body: ["BENGALURU — In a milestone that places India in an exclusive club, ISRO confirmed that the two SpaDeX satellites successfully completed an autonomous docking maneuver at 06:20 IST.", "The capability is foundational for the Bharatiya Antariksh Station and for crewed Gaganyaan follow-on missions.", "Chairman S. Somanath called it \"a quiet triumph of indigenous guidance, navigation and control\"."],
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1600&q=80",
    category: "Science",
    author: "Priya Iyer",
    publishedAt: "4 hours ago",
    readTime: 4,
    trending: true,
  },
  {
    id: "3",
    slug: "rbi-policy",
    title: "RBI holds repo rate, signals cautious optimism on inflation trajectory",
    excerpt: "Governor flags resilient growth but warns of geopolitical risks to crude prices.",
    body: ["MUMBAI — The Reserve Bank of India's Monetary Policy Committee voted 5-1 to keep the repo rate unchanged at 6.5%."],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1600&q=80",
    category: "Business",
    author: "Karan Shah",
    publishedAt: "5 hours ago",
    readTime: 3,
    trending: true,
  },
  {
    id: "4",
    slug: "tech-ai-india",
    title: "India's AI compute capacity to triple by 2026, government tells parliament",
    excerpt: "MeitY outlines ₹10,372 crore IndiaAI Mission deployment roadmap.",
    body: ["NEW DELHI — The IndiaAI Mission has commissioned its first 14,000-GPU cluster."],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&q=80",
    category: "Tech",
    author: "Neha Gupta",
    publishedAt: "7 hours ago",
    readTime: 5,
    trending: true,
  },
  {
    id: "5",
    slug: "world-summit",
    title: "G20 sherpas convene in Cape Town to draft climate finance framework",
    excerpt: "Developing nations push for tripling of concessional finance commitments.",
    body: ["CAPE TOWN — Negotiators from twenty major economies began three days of closed-door talks."],
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1600&q=80",
    category: "World",
    author: "James Okafor",
    publishedAt: "9 hours ago",
    readTime: 4,
  },
  {
    id: "6",
    slug: "sports-cricket",
    title: "Smriti Mandhana's century powers India to historic series win",
    excerpt: "Captain's unbeaten 117 seals 3-1 T20I series triumph over Australia.",
    body: ["MELBOURNE — Smriti Mandhana hit her fifth T20I century to chase down 198."],
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1600&q=80",
    category: "Sports",
    author: "Vikas Rao",
    publishedAt: "11 hours ago",
    readTime: 3,
  },
  {
    id: "7",
    slug: "ent-bollywood",
    title: "Indian cinema dominates Busan with three feature premieres",
    excerpt: "Regional language films from Kerala, Assam and Maharashtra take centre stage.",
    body: ["BUSAN — Three Indian features premiered to standing ovations at the Busan International Film Festival."],
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80",
    category: "Entertainment",
    author: "Anaya Kapoor",
    publishedAt: "13 hours ago",
    readTime: 4,
  },
  {
    id: "8",
    slug: "india-infra",
    title: "Vande Bharat sleeper trials clear 180 km/h benchmark on Kota stretch",
    excerpt: "Indigenous sleeper rake to enter commercial service by March.",
    body: ["KOTA — The first prototype Vande Bharat sleeper rake completed high-speed trials."],
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1600&q=80",
    category: "India",
    author: "Sanjay Pillai",
    publishedAt: "15 hours ago",
    readTime: 3,
  },
  {
    id: "9",
    slug: "tech-startup",
    title: "Bengaluru deep-tech startup raises $120M to scale silicon photonics",
    excerpt: "Series C led by sovereign fund signals maturing hardware ecosystem.",
    body: ["BENGALURU — A four-year-old silicon photonics startup announced a $120 million Series C round."],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
    category: "Tech",
    author: "Meera Singh",
    publishedAt: "18 hours ago",
    readTime: 4,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
