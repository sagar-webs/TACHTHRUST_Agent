// Catalogue built from the services already listed on /services and /ai-products.
export type Category = "Web & App" | "Marketing" | "AI";
export type Product = { id: string; name: string; category: Category; blurb: string; includes: string[]; icon: string };

export const PRODUCTS: Product[] = [
  { id: "corporate-website", name: "Corporate Website", category: "Web & App", icon: "globe", blurb: "A website engineered to convert visitors into customers.", includes: ["Conversion-focused design", "SEO-technical foundation", "Mobile-first build"] },
  { id: "ecommerce-store", name: "E-commerce Store", category: "Web & App", icon: "bag", blurb: "Shopify, WooCommerce or custom stores built to sell.", includes: ["Catalogue & checkout", "Payment integrations", "Speed & SEO tuned"] },
  { id: "mobile-app", name: "Mobile App", category: "Web & App", icon: "phone", blurb: "Native iOS and Android applications.", includes: ["UI/UX design system", "iOS & Android", "Backend & APIs"] },
  { id: "web-app", name: "Web App / SaaS Platform", category: "Web & App", icon: "layers", blurb: "SaaS platforms, enterprise portals and dashboards.", includes: ["Custom workflows", "Role-based access", "Dashboards & reports"] },
  { id: "seo", name: "SEO Program", category: "Marketing", icon: "search", blurb: "On-page, off-page and technical SEO.", includes: ["Technical audit", "Content & links", "Monthly reporting"] },
  { id: "google-ads", name: "Google Ads Management", category: "Marketing", icon: "target", blurb: "Search, Display, Shopping and YouTube campaigns.", includes: ["Campaign setup", "Bid management & A/B tests", "Conversion tracking"] },
  { id: "meta-campaigns", name: "META Campaigns", category: "Marketing", icon: "megaphone", blurb: "Facebook and Instagram performance advertising.", includes: ["Creative strategy", "Audience testing", "Lead & sales campaigns"] },
  { id: "social-media", name: "Social Media Marketing", category: "Marketing", icon: "share", blurb: "Organic and paid social growth.", includes: ["Content calendar", "Community management", "Influencer collaborations"] },
  { id: "voice-agent", name: "AI Voice Calling Agent", category: "AI", icon: "mic", blurb: "Human-sounding agents that answer calls, qualify leads and book meetings.", includes: ["Inbound & outbound calling", "Appointment booking", "Call analytics"] },
  { id: "ai-automation", name: "AI Business Automation", category: "AI", icon: "zap", blurb: "Custom AI agents for CRM, campaigns, reports and workflows.", includes: ["CRM updates", "Email & WhatsApp campaigns", "Custom workflows"] },
  { id: "startup-as-a-service", name: "Startup-as-a-Service", category: "AI", icon: "rocket", blurb: "From idea to automated scale, all under one roof.", includes: ["Strategy blueprint", "MVP build", "Go-to-market & AI scale"] },
];

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id);
