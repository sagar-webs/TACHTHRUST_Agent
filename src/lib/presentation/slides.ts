// Slide content is sourced from the live site copy (home, /services, /ai-products, /about).
export type ChartPoint = { label: string; value: number };
export type Visual =
  | { type: "bars"; title: string; unit: string; data: ChartPoint[]; source: string }
  | { type: "area"; title: string; unit: string; data: ChartPoint[]; source: string }
  | { type: "compare"; head: [string, string, string]; rows: [string, string, string][] }
  | { type: "flow"; steps: { label: string; sub: string }[] }
  | { type: "chips"; items: string[] };

export type Slide = { id: string; kicker: string; title: string; tagline: string; bullets: string[]; notes: string; visuals?: Visual[] };

export const SLIDES: Slide[] = [
  {
    id: "welcome",
    kicker: "WELCOME",
    title: "TechThrust",
    tagline: "Digital systems that generate leads and scale businesses.",
    bullets: ["AI-native digital growth agency", "Tech Thrust Digital Solutions FZC, Ajman Free Zone, UAE"],
    visuals: [{ type: "chips", items: ["UAE & GCC", "India", "USA & Canada", "United Kingdom", "European Union", "Australia"] }],
    notes: "TechThrust is an AI-native digital growth agency, registered as Tech Thrust Digital Solutions FZC in Ajman Free Zone, UAE. We engineer websites, apps, performance marketing and AI voice agents for ambitious global brands, serving six markets: UAE and GCC, India, USA and Canada, the UK, the European Union and Australia.",
  },
  {
    id: "market",
    kicker: "THE MARKET",
    title: "Where the Market Is Heading",
    tagline: "Digital advertising is growing fast in both of our home markets.",
    bullets: ["India: roughly 14.5% a year growth", "UAE: roughly 14% a year growth", "Estimates vary by research firm; treat as indicative"],
    visuals: [
      {
        type: "area", title: "India digital advertising market", unit: "$B",
        data: [{ label: "2025", value: 8.2 }, { label: "2026", value: 9.4 }, { label: "2027", value: 10.8 }, { label: "2028", value: 12.3 }, { label: "2029", value: 14.1 }, { label: "2030", value: 16.2 }, { label: "2031", value: 18.5 }],
        source: "Ken Research: $8.2B in 2025 to $18.5B in 2031 at 14.5% CAGR (years between are interpolated)",
      },
      {
        type: "bars", title: "UAE digital advertising market", unit: "$B",
        data: [{ label: "2025", value: 2.29 }, { label: "2026", value: 2.64 }, { label: "2029", value: 4.3 }, { label: "2032", value: 5.9 }],
        source: "Ken Research, UAE digital advertising market forecast",
      },
    ],
    notes: "Both of our home markets are growing fast. According to Ken Research estimates, India's digital advertising market is about 8.2 billion dollars in 2025 and is projected to reach about 18.5 billion by 2031, roughly 14.5 percent a year. The same firm estimates the UAE digital advertising market at about 2.3 billion dollars in 2025, rising to about 5.9 billion by 2032. Different research firms publish different numbers, so treat these as indicative. The message: more of every business's customers are found and won online, and the competition for them is growing.",
  },
  {
    id: "voice-market",
    kicker: "THE MARKET",
    title: "AI Voice Is Taking Off",
    tagline: "Businesses are moving calls and follow-ups to AI agents.",
    bullets: ["Voice AI agents are among the fastest-growing software categories", "Analyst forecasts cluster around 30-40% yearly growth", "Estimates vary widely between firms"],
    visuals: [
      {
        type: "bars", title: "Global AI voice agents market", unit: "$B",
        data: [{ label: "2025", value: 2.54 }, { label: "2033", value: 35.24 }],
        source: "Grand View Research (39% CAGR), as cited by CloudTalk. Other analysts publish different bases.",
      },
    ],
    notes: "AI voice is one of the fastest-growing areas in business software. Grand View Research estimates the global AI voice agents market at about 2.5 billion dollars in 2025, growing to about 35 billion by 2033, around 39 percent a year. Other analysts use different definitions and publish different numbers, but they generally land between 30 and 40 percent annual growth. That is why TechThrust builds AI voice agents alongside websites and marketing.",
  },
  {
    id: "pillars",
    kicker: "OUR APPROACH",
    title: "Three Pillars, One Growth Ecosystem",
    tagline: "We don't run isolated initiatives. We build the system that compounds.",
    bullets: ["Web & App Development: engineering", "Digital Marketing: pipeline-filling performance", "AI Automation: voice agents and workflows"],
    visuals: [{
      type: "bars", title: "What we deliver: offerings per pillar", unit: "offerings",
      data: [{ label: "Web & App", value: 8 }, { label: "Digital Marketing", value: 11 }, { label: "AI Voice", value: 8 }, { label: "AI Automation", value: 8 }],
      source: "TechThrust service catalogue (35 offerings listed on this website)",
    }],
    notes: "Our services sit on three integrated pillars: engineering, marketing and AI automation. They operate as one growth ecosystem rather than isolated initiatives, so each piece feeds the others and results compound.",
  },
  {
    id: "web",
    kicker: "PILLAR 01",
    title: "Web & App Development",
    tagline: "Build platforms that perform.",
    bullets: ["Corporate & business websites", "E-commerce: Shopify, WooCommerce or custom", "Landing page systems for paid traffic", "Web applications, SaaS and enterprise portals", "Native iOS & Android apps", "UI/UX design and website redesign"],
    notes: "Web and app development covers corporate websites engineered to convert, e-commerce on Shopify, WooCommerce or custom stacks, high-converting landing page systems for paid traffic, web applications and SaaS platforms, enterprise portals and dashboards, native iOS and Android apps, UI/UX design systems, and redesigns that modernize your stack without losing SEO equity.",
  },
  {
    id: "marketing",
    kicker: "PILLAR 02",
    title: "Digital Marketing",
    tagline: "Pipeline-filling performance marketing.",
    bullets: ["SEO and SEM", "Google Ads, YouTube Ads and META campaigns", "PPC management and A/B testing", "Social media marketing and optimization", "Content marketing", "Influencer and brand campaigns"],
    notes: "Digital marketing includes SEO on-page, off-page and technical, SEM and full-funnel campaigns, Google Ads across search, display and shopping, YouTube ads, META campaigns on Facebook and Instagram, PPC bid management and A/B testing, social media marketing and optimization, content marketing engines, and influencer and brand campaigns.",
  },
  {
    id: "startup",
    kicker: "PILLAR 03",
    title: "Startup-as-a-Service",
    tagline: "You have the vision. We build the machine.",
    bullets: ["Phase 1: Ideation & strategic blueprint", "Phase 2: MVP build & digital infrastructure", "Phase 3: Go-to-market & growth engine", "Phase 4: Scale with AI automation"],
    notes: "Startup-as-a-Service is our end-to-end program from idea to automated scale. Phase one is ideation and strategic blueprint: market research, business model validation, brand positioning and go-to-market planning. Phase two is MVP build and digital infrastructure. Phase three is go-to-market and the growth engine, with multi-channel campaigns. Phase four scales the business with AI voice agents and automation. The promise: walk in with an idea, walk out with a business.",
  },
  {
    id: "voice",
    kicker: "AI PRODUCTS",
    title: "AI Voice Calling Agents",
    tagline: "Human-sounding agents that never miss a call.",
    bullets: ["Outbound sales calling & lead qualification", "Inbound call handling & after-hours response", "Appointment booking & scheduling", "Feedback collection & retention campaigns", "Call analytics & reporting", "Go live in 3 steps: configure, connect phone system, launch"],
    notes: "Our AI voice calling agents pick up your phones, run outbound campaigns, qualify leads and book meetings, around the clock. They handle outbound sales calling, inbound calls, appointment booking, customer feedback, retention campaigns, lead qualification, after-hours response and call analytics. Going live takes three steps: configure the agent, connect your phone system, and go live. Industries that benefit most include real estate, healthcare, e-commerce, finance, education, hospitality and retail.",
  },
  {
    id: "automation",
    kicker: "AI PRODUCTS",
    title: "AI Business Automation",
    tagline: "Custom AI agents for any business workflow.",
    bullets: ["CRM data entry & updates", "Automated email & WhatsApp campaigns", "Report generation & summarization", "E-commerce order & inventory automation", "Lead scraping & enrichment", "HR & onboarding workflows"],
    notes: "AI business automation builds custom agents for internal and external workflows: CRM data entry and updates, automated email and WhatsApp campaigns, report generation and summaries, e-commerce order and inventory automation, lead scraping and enrichment, HR and onboarding workflows, multi-channel customer engagement, and virtually any custom business process.",
  },
  {
    id: "engine",
    kicker: "THE SYSTEM",
    title: "The Digital-AI Growth Engine",
    tagline: "From first click to scaled revenue, connected end to end.",
    bullets: ["One connected system, not six separate vendors"],
    visuals: [{ type: "flow", steps: [
      { label: "Attract", sub: "App development" }, { label: "Capture", sub: "Digital marketing" }, { label: "Engage", sub: "Lead generation" },
      { label: "Convert", sub: "Smart CRM" }, { label: "Optimize", sub: "AI calling agents" }, { label: "Scale", sub: "Insights & reporting" },
    ] }],
    notes: "Everything connects in the Digital-AI Growth Engine. Application development attracts visitors, digital marketing captures them, lead generation engages them, a smart CRM converts them, AI calling agents optimize follow-up, and real-time insights and reporting help you scale.",
  },
  {
    id: "why",
    kicker: "WHERE WE STAND",
    title: "Not Another Agency. A Growth System.",
    tagline: "Operators, not vendors.",
    bullets: ["Values: innovation, transparency, results, partnership"],
    visuals: [{ type: "compare", head: ["", "Typical agency", "TechThrust"], rows: [
      ["AI", "Added on later", "Native from day one"],
      ["Success measured by", "Deliverables", "Your revenue KPIs"],
      ["Scope", "One channel at a time", "Web, marketing and AI under one roof"],
      ["Operating model", "Single location", "UAE, India and partner geographies"],
      ["Relationship", "Vendor", "Operating partner"],
    ] }],
    notes: "What makes us different: we are AI-native rather than AI-added, we measure success by your revenue rather than our deliverables, we operate globally across the UAE, India and partner geographies in your time zone, and we act as operators, not vendors. Our values are innovation, transparency with open dashboards and numbers, results, and long-term partnership.",
  },
  {
    id: "next",
    kicker: "NEXT STEP",
    title: "Let's Build the Next Chapter Together",
    tagline: "Book a free strategy call with a senior strategist.",
    bullets: ["Leave your name, email and phone below", "info@tech-thrust.com", "+971 585203369 (calls & WhatsApp)"],
    notes: "To get started, book a free strategy call. A senior strategist responds within one business day. You can leave your name, email and phone number in the form at the bottom of the home page, email info at tech-thrust dot com, or call or WhatsApp plus 971 585 203 369.",
  },
];
