import { Project, SkillGroup, Experience } from './types';

export const BIO = {
  name: "Eduardo Bonto",
  title: "Senior Full Stack Developer",
  email: "eduardobonto@gmail.com",
  location: "Manila, Philippines",
  tagline: "Over 14 years of engineering scalable web applications, REST APIs, and database engines for enterprise sectors.",
  about: "Senior Full Stack Developer with 14+ years of experience designing, developing, and supporting enterprise web applications, REST APIs, and SQL-based systems for banking, retail, and business operations. Experienced in ASP.NET Core, C#, SQL Server, Oracle, AWS, Azure, iOS, and modern frontend frameworks. Proven ability to lead junior developers, coordinate directly with stakeholders, and deliver scalable production systems used by enterprise clients nationwide.",
  entrepreneurshipTitle: "Founder & Lead Software Engineer at Easymple",
  entrepreneurship: "Building scalable SaaS products, AI-powered solutions, enterprise ERP systems, and mobile applications for businesses and startups.",
};

export const PROJECTS: Project[] = [
  {
    id: "kinsenas",
    title: "Kinsenas Mobile App",
    description: `Kinsenas helps Filipinos manage their salary every 15th and 30th payday.

Track bills, groceries, savings, debt payments, and daily expenses using a simple spreadsheet-style budget layout.

Features:
• Separate budgeting for 15th and 30th salary
• Simple and clean interface
• Monthly expense tracking
• Local device storage
• Fast and lightweight
• Designed for Filipino budgeting habits
• AI-powered budgeting assistance
• Smart suggestions to help manage expenses and savings

Kinsenas AI can help you decide how to budget your salary based on your expenses, bills, and financial priorities.

Whether you're budgeting for rent, tuition, loans, or family expenses, Kinsenas helps you stay organized every payday.`,
    tags: ["iOS Swift"],
    liveUrl: "https://apps.apple.com/ph/app/kinsenas/id6767758015",
    category: "Mobile Application",
    stats: [
      { label: "Target Platform", value: "iOS App Store" },
      { label: "Core Security", value: "JWT & SSL" }
    ]
  },
  {
    id: "sttheresa",
    title: "St. Theresa School ERP System",
    description: "A comprehensive Enterprise Resource Planning system built for St. Theresa, covering Basic Education and College departments — streamlining enrollment, academic records, and administrative operations.",
    tags: ["Vite", "React", "TypeScript", "Supabase"],
    liveUrl: "https://www.facebook.com/reel/2147044502511110",
    category: "Enterprise ERP",
    stats: [
      { label: "Scope", value: "Basic Ed & College" },
      { label: "System Type", value: "Enterprise ERP" }
    ]
  },
  {
    id: "traveltour",
    title: "JCalbert Travel & Tours Services",
    description: "An elegant, interactive travel and tour booking engine featuring dynamic customer reservation pipelines, automated scheduling, secure checkouts, and custom travel itinerary generation structures.",
    tags: ["Vite", "React", "TypeScript", "Supabase"],
    liveUrl: "https://www.jcalberttravelandtourservices.com/",
    category: "Fullstack E-Booking",
    stats: [
      { label: "Load Velocity", value: "<1.2 seconds" },
      { label: "Data Integrity", value: "100%" }
    ]
  },
  {
    id: "cupstation",
    title: "Coffee Shop 3D Interactive Website",
    description: "An immersive 3D interactive coffee shop showcase featuring real-time WebGL product visualization, smooth scroll-driven animations, and an engaging brand storytelling experience.",
    tags: ["Vite", "React", "TypeScript", "Three.js"],
    liveUrl: "https://cupstation.vercel.app/",
    category: "Web Architecture",
    stats: [
      { label: "Rendering", value: "Realtime 3D / WebGL" },
      { label: "Frame Rate", value: "60fps" }
    ]
  },
  {
    id: "tabulation",
    title: "Mutya ng Pilipinas Tabulation Core",
    description: "A highly resilient, real-time pageant scoring and adjudication system built for Mutya ng Pilipinas. Engineered with low-latency client state synchronization and responsive dashboard projections.",
    tags: ["Vite", "React", "TypeScript", "Supabase"],
    liveUrl: "https://www.facebook.com/reel/927282166954237",
    category: "Live Event Tech",
    stats: [
      { label: "Tabulation Latency", value: "0ms delay" },
      { label: "Failover Reserves", value: "Dual Mirroring" }
    ]
  },
  {
    id: "pinkworks",
    title: "PinkWorks",
    description: "Premium aesthetics treatments — Pico Laser, Glutathione, Diamond Peel, Diode Hair Removal, Pink Slim and more. Walk-in & by appointment.",
    tags: ["Vite", "React", "TypeScript", "Supabase"],
    liveUrl: "https://pinkworks.vercel.app/",
    category: "Fullstack Booking",
    stats: [
      { label: "Services", value: "Aesthetics & Wellness" },
      { label: "Booking", value: "Walk-in & Appointment" }
    ]
  },
  {
    id: "palawanecommerce",
    title: "Palawan E-Commerce Marketplace",
    description: "A full-featured e-commerce marketplace platform for Palawan, built in the mold of Shopee and Lazada — featuring product catalogs, shopping cart and checkout flows, seller storefronts, and order management.",
    tags: ["Vite", "React", "TypeScript", "Supabase"],
    liveUrl: "https://www.facebook.com/reel/2531995353908372",
    category: "Fullstack E-Commerce",
    stats: [
      { label: "Platform Type", value: "Marketplace" },
      { label: "Inspired By", value: "Shopee / Lazada" }
    ]
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Backend & Databases",
    skills: [
      { name: "C# / .NET / ASP.NET MVC / ASP.NET Core", level: 98 },
      { name: "REST API / Web API", level: 97 },
      { name: "Microsoft SQL Server / T-SQL", level: 96 },
      { name: "Oracle SQL / Stored Procedures", level: 93 },
      { name: "SSIS ETL Pipelines", level: 90 }
    ]
  },
  {
    category: "Frontend & Mobile",
    skills: [
      { name: "ASP.NET Razor Views", level: 95 },
      { name: "Vue.js / React / TypeScript", level: 88 },
      { name: "HTML5 / CSS3 / JavaScript", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "iOS Swift", level: 84 }
    ]
  },
  {
    category: "Cloud & Practices",
    skills: [
      { name: "AWS Cloud Platforms", level: 89 },
      { name: "Microsoft Azure Hosting", level: 91 },
      { name: "IIS / Linux Deployments", level: 94 },
      { name: "Git / TFS / Jira Tools", level: 95 },
      { name: "Agile / Scrum / xUnit Tests", level: 92 }
    ]
  }
];

export const EXPERIENCE_HISTORY: Experience[] = [
  {
    id: "techpryme",
    role: "Senior Software Engineer / Senior Mobile Developer",
    company: "Techpryme – McDonald's Philippines",
    period: "April 2023 – May 2026",
    highlights: [
      "Designed and developed ASP.NET Core REST APIs for McDonald's Daily Sales System integrated with AWS cloud services and centralized databases.",
      "Built secure API and web application architecture using JWT authentication and API keys.",
      "Migrated legacy VB.NET desktop applications into modern Vue.js and ASP.NET Core web platforms.",
      "Developed scalable database processes capable of handling nationwide daily sales transactions and reporting.",
      "Supported iOS Swift mobile application initiatives for McDelivery projects.",
      "Collaborated directly with enterprise clients including SM, Ayala, Robinsons, and Megaworld for system coordination and data validation.",
      "Led junior developers by providing technical guidance, code reviews, and development standards.",
      "Created xUnit automated tests to support QA validation and improve application reliability.",
      "Participated in requirements gathering, system analysis, and technical planning with stakeholders and management."
    ]
  },
  {
    id: "chinabank",
    role: "Senior .NET Developer",
    company: "China Bank – Prime Technology Inc.",
    period: "September 2017 – March 2023",
    highlights: [
      "Developed enterprise web applications and REST APIs using ASP.NET Core, MVC, Razor, Oracle, and SQL Server.",
      "Modernized legacy systems into ASP.NET Core applications compatible with Linux server environments.",
      "Designed and maintained reporting systems generating more than 100 operational and reconciliation reports.",
      "Built centralized authentication APIs and administrative modules for Trust web systems.",
      "Developed ETL and migration solutions using Microsoft SSIS, T-SQL, and Oracle SQL.",
      "Optimized SQL queries, stored procedures, and database structures to improve system performance.",
      "Handled deployments to IIS, Azure, and Linux servers using WinSCP and PuTTY.",
      "Worked directly with users, analysts, and project stakeholders to gather requirements and deliver enhancements.",
      "Prepared project timelines, sprint updates, and technical documentation for Scrum meetings.",
      "Mentors junior developers and new hires on MVC architecture, coding standards, and SQL optimization."
    ]
  },
  {
    id: "bancnet",
    role: "VB.NET Developer",
    company: "BancNet Online – Emerio Philippines",
    period: "February 2017 – September 2017",
    highlights: [
      "Supported and maintained legacy banking application systems and handled database performance diagnostics.",
      "Implemented secure, standard VB.NET client interfaces and performed automated data validation workflows.",
      "Created custom T-SQL diagnostic procedures to expedite transactions and resolve operational banking exceptions."
    ]
  },
  {
    id: "sunlife",
    role: "ASP.NET MVC Developer",
    company: "Sun Life Philippines – System Generator",
    period: "September 2016 – February 2017",
    highlights: [
      "Developed insurance web applications using ASP.NET MVC and SQL Server.",
      "Created database tables, stored procedures, and backend modules for new insurance products."
    ]
  },
  {
    id: "ucpb",
    role: ".NET Developer",
    company: "United Coconut Planters Bank",
    period: "October 2013 – September 2016",
    highlights: [
      "Developed ASP.NET and VB.NET systems for loans, reporting, and internal banking operations.",
      "Built automated reporting tools and PDF generation systems connected to AS400 databases.",
      "Created applications that streamlined report conversion and operational workflows for the Loans Department.",
      "Developed AS400 RPG programs generating CSV reports and backend integrations."
    ]
  },
  {
    id: "alliedpnb",
    role: "VB.NET Developer",
    company: "Allied Bank / Philippine National Bank – Software Laboratory Inc.",
    period: "October 2012 – October 2013",
    highlights: [
      "Maintained payroll and warehouse systems used by multiple bank branches.",
      "Developed audit and monitoring tools for Treasury operations.",
      "Enhanced existing desktop systems and supported government reporting requirements."
    ]
  }
];

