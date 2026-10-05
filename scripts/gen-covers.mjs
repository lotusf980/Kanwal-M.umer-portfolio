/**
 * Generate 6 project cover PNGs (1600×900) using Sharp.
 * Run: node scripts/gen-covers.mjs
 */
import { createRequire } from "module";
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const sharp = require(join(__dirname, "../node_modules/sharp"));

const OUT = join(__dirname, "../public/images/projects");
mkdirSync(OUT, { recursive: true });

// ─── 1. Portfolio V2 ───────────────────────────────────────────────────────
const portfolioSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <radialGradient id="bg1" cx="30%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#2e1065" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0e0c0b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bar1" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#a78bfa"/>
      <stop offset="100%" stop-color="#6d28d9" stop-opacity="0.2"/>
    </linearGradient>
    <pattern id="grid1" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2d2926" stroke-width="0.5" stroke-opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="1600" height="900" fill="#0e0c0b"/>
  <rect width="1600" height="900" fill="url(#grid1)"/>
  <rect width="1600" height="900" fill="url(#bg1)"/>
  <rect x="80" y="100" width="4" height="680" fill="url(#bar1)" rx="2"/>
  <text x="112" y="210" font-family="monospace" font-size="22" fill="#a8a29e" letter-spacing="4">FULL STACK</text>
  <text x="112" y="310" font-family="sans-serif" font-size="68" font-weight="700" fill="#fafaf9">Personal Portfolio V2</text>
  <text x="112" y="378" font-family="sans-serif" font-size="30" fill="#a8a29e">Production-ready dev portfolio with MDX, blog &amp; dashboard</text>
  <line x1="112" y1="820" x2="720" y2="820" stroke="#292524" stroke-width="1"/>
  <text x="112" y="848" font-family="monospace" font-size="20" fill="#57534e">Next.js · TypeScript · Tailwind · MDX · FastAPI</text>
  <text x="1520" y="860" font-family="monospace" font-size="20" fill="#57534e" text-anchor="end">2026</text>
  <g transform="translate(1050,180)">
    <circle cx="250" cy="270" r="240" fill="#6d28d9" fill-opacity="0.06"/>
    <circle cx="250" cy="270" r="180" fill="none" stroke="#6d28d9" stroke-opacity="0.15" stroke-width="1"/>
    <circle cx="250" cy="270" r="120" fill="none" stroke="#6d28d9" stroke-opacity="0.12" stroke-width="1"/>
    <text x="250" y="330" font-family="monospace" font-size="130" font-weight="700" fill="#a78bfa" fill-opacity="0.9" text-anchor="middle">&lt;/&gt;</text>
  </g>
</svg>`;

// ─── 2. Evolution of Todo ──────────────────────────────────────────────────
const todoSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <radialGradient id="bg2" cx="30%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#082f49" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0e0c0b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bar2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.2"/>
    </linearGradient>
    <pattern id="grid2" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2d2926" stroke-width="0.5" stroke-opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="1600" height="900" fill="#0e0c0b"/>
  <rect width="1600" height="900" fill="url(#grid2)"/>
  <rect width="1600" height="900" fill="url(#bg2)"/>
  <rect x="80" y="100" width="4" height="680" fill="url(#bar2)" rx="2"/>
  <text x="112" y="210" font-family="monospace" font-size="22" fill="#a8a29e" letter-spacing="4">FULL STACK</text>
  <text x="112" y="310" font-family="sans-serif" font-size="68" font-weight="700" fill="#fafaf9">Evolution of Todo</text>
  <text x="112" y="378" font-family="sans-serif" font-size="30" fill="#a8a29e">From console scripts to full-stack app with auth &amp; sync</text>
  <line x1="112" y1="820" x2="720" y2="820" stroke="#292524" stroke-width="1"/>
  <text x="112" y="848" font-family="monospace" font-size="20" fill="#57534e">Next.js · TypeScript · PostgreSQL · Prisma · Auth.js</text>
  <text x="1520" y="860" font-family="monospace" font-size="20" fill="#57534e" text-anchor="end">2025</text>
  <g transform="translate(1020,160)">
    <rect x="50" y="30" width="420" height="480" rx="16" fill="#171412" stroke="#292524" stroke-width="1.5"/>
    <rect x="50" y="30" width="420" height="60" rx="16" fill="#1c1917"/>
    <rect x="50" y="74" width="420" height="16" fill="#1c1917"/>
    <text x="260" y="68" font-family="sans-serif" font-size="22" font-weight="600" fill="#fafaf9" text-anchor="middle">My Tasks</text>
    <rect x="84" y="118" width="28" height="28" rx="6" fill="#0ea5e9" fill-opacity="0.2" stroke="#0ea5e9" stroke-width="1.5"/>
    <text x="90" y="138" font-family="sans-serif" font-size="20" fill="#38bdf8">&#10003;</text>
    <text x="128" y="138" font-family="sans-serif" font-size="22" fill="#a8a29e" text-decoration="line-through">Buy groceries</text>
    <rect x="84" y="162" width="28" height="28" rx="6" fill="#0ea5e9" fill-opacity="0.2" stroke="#0ea5e9" stroke-width="1.5"/>
    <text x="90" y="182" font-family="sans-serif" font-size="20" fill="#38bdf8">&#10003;</text>
    <text x="128" y="182" font-family="sans-serif" font-size="22" fill="#a8a29e" text-decoration="line-through">Read 20 pages</text>
    <rect x="84" y="206" width="28" height="28" rx="6" fill="none" stroke="#38bdf8" stroke-width="1.5"/>
    <text x="128" y="226" font-family="sans-serif" font-size="22" fill="#fafaf9">Ship portfolio</text>
    <rect x="84" y="250" width="28" height="28" rx="6" fill="none" stroke="#57534e" stroke-width="1"/>
    <text x="128" y="270" font-family="sans-serif" font-size="22" fill="#57534e">Write tests</text>
    <rect x="84" y="294" width="28" height="28" rx="6" fill="none" stroke="#57534e" stroke-width="1"/>
    <text x="128" y="314" font-family="sans-serif" font-size="22" fill="#57534e">Deploy to prod</text>
    <rect x="84" y="380" width="332" height="10" rx="5" fill="#1c1917"/>
    <rect x="84" y="380" width="200" height="10" rx="5" fill="#0ea5e9"/>
    <text x="260" y="430" font-family="monospace" font-size="20" fill="#57534e" text-anchor="middle">3 / 5 completed</text>
  </g>
</svg>`;

// ─── 3. Physical AI & Humanoid Robotics Book ───────────────────────────────
const physicalAiSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <radialGradient id="bg3" cx="30%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#064e3b" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#0e0c0b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bar3" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#10b981" stop-opacity="0.2"/>
    </linearGradient>
    <pattern id="grid3" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2d2926" stroke-width="0.5" stroke-opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="1600" height="900" fill="#0e0c0b"/>
  <rect width="1600" height="900" fill="url(#grid3)"/>
  <rect width="1600" height="900" fill="url(#bg3)"/>
  <rect x="80" y="100" width="4" height="680" fill="url(#bar3)" rx="2"/>
  <text x="112" y="210" font-family="monospace" font-size="22" fill="#a8a29e" letter-spacing="4">PUBLICATION</text>
  <text x="112" y="300" font-family="sans-serif" font-size="57" font-weight="700" fill="#fafaf9">Physical AI &amp; Humanoid</text>
  <text x="112" y="368" font-family="sans-serif" font-size="57" font-weight="700" fill="#fafaf9">Robotics Book</text>
  <text x="112" y="430" font-family="sans-serif" font-size="28" fill="#a8a29e">Illustrated guide to embodied AI &amp; humanoid robotics</text>
  <line x1="112" y1="820" x2="720" y2="820" stroke="#292524" stroke-width="1"/>
  <text x="112" y="848" font-family="monospace" font-size="20" fill="#57534e">Research · Illustration · Technical Writing · AI</text>
  <text x="1520" y="860" font-family="monospace" font-size="20" fill="#57534e" text-anchor="end">2025</text>
  <g transform="translate(1020,50)">
    <circle cx="270" cy="400" r="300" fill="none" stroke="#10b981" stroke-opacity="0.08" stroke-width="1"/>
    <circle cx="270" cy="400" r="240" fill="none" stroke="#10b981" stroke-opacity="0.10" stroke-width="1"/>
    <circle cx="270" cy="400" r="180" fill="none" stroke="#10b981" stroke-opacity="0.14" stroke-width="1"/>
    <circle cx="270" cy="400" r="120" fill="none" stroke="#10b981" stroke-opacity="0.18" stroke-width="1.5"/>
    <circle cx="270" cy="400" r="60"  fill="#10b981" fill-opacity="0.06" stroke="#10b981" stroke-opacity="0.25" stroke-width="1.5"/>
    <circle cx="270" cy="200" r="40" fill="none" stroke="#34d399" stroke-width="3"/>
    <line x1="270" y1="240" x2="270" y2="390" stroke="#34d399" stroke-width="3"/>
    <line x1="270" y1="280" x2="200" y2="340" stroke="#34d399" stroke-width="3"/>
    <line x1="270" y1="280" x2="340" y2="340" stroke="#34d399" stroke-width="3"/>
    <line x1="270" y1="390" x2="220" y2="490" stroke="#34d399" stroke-width="3"/>
    <line x1="270" y1="390" x2="320" y2="490" stroke="#34d399" stroke-width="3"/>
    <circle cx="200" cy="340" r="6" fill="#34d399"/>
    <circle cx="340" cy="340" r="6" fill="#34d399"/>
    <circle cx="220" cy="490" r="6" fill="#34d399"/>
    <circle cx="320" cy="490" r="6" fill="#34d399"/>
  </g>
</svg>`;

// ─── 4. Personal Library Manager ──────────────────────────────────────────
const librarySvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <radialGradient id="bg4" cx="30%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#451a03" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#0e0c0b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bar4" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.2"/>
    </linearGradient>
    <pattern id="grid4" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2d2926" stroke-width="0.5" stroke-opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="1600" height="900" fill="#0e0c0b"/>
  <rect width="1600" height="900" fill="url(#grid4)"/>
  <rect width="1600" height="900" fill="url(#bg4)"/>
  <rect x="80" y="100" width="4" height="680" fill="url(#bar4)" rx="2"/>
  <text x="112" y="210" font-family="monospace" font-size="22" fill="#a8a29e" letter-spacing="4">CLI TOOL</text>
  <text x="112" y="310" font-family="sans-serif" font-size="68" font-weight="700" fill="#fafaf9">Personal Library</text>
  <text x="112" y="388" font-family="sans-serif" font-size="68" font-weight="700" fill="#fafaf9">Manager</text>
  <text x="112" y="448" font-family="sans-serif" font-size="28" fill="#a8a29e">Track, search &amp; manage your personal book collection</text>
  <line x1="112" y1="820" x2="720" y2="820" stroke="#292524" stroke-width="1"/>
  <text x="112" y="848" font-family="monospace" font-size="20" fill="#57534e">Python · Rich · JSON · CLI</text>
  <text x="1520" y="860" font-family="monospace" font-size="20" fill="#57534e" text-anchor="end">2025</text>
  <g transform="translate(1020,140)">
    <rect x="40" y="460" width="460" height="12" rx="3" fill="#292524"/>
    <rect x="60"  y="300" width="44" height="162" rx="3" fill="#f59e0b" fill-opacity="0.85"/>
    <rect x="110" y="330" width="36" height="132" rx="3" fill="#6d28d9" fill-opacity="0.75"/>
    <rect x="152" y="290" width="50" height="172" rx="3" fill="#0ea5e9" fill-opacity="0.75"/>
    <rect x="208" y="320" width="40" height="142" rx="3" fill="#10b981" fill-opacity="0.75"/>
    <rect x="254" y="310" width="44" height="152" rx="3" fill="#ef4444" fill-opacity="0.75"/>
    <rect x="304" y="350" width="36" height="112" rx="3" fill="#fbbf24" fill-opacity="0.75"/>
    <rect x="346" y="305" width="48" height="157" rx="3" fill="#a78bfa" fill-opacity="0.75"/>
    <rect x="400" y="340" width="40" height="122" rx="3" fill="#34d399" fill-opacity="0.75"/>
    <rect x="447" y="360" width="36" height="102" rx="3" fill="#f87171" fill-opacity="0.75"/>
    <circle cx="370" cy="200" r="80" fill="none" stroke="#fbbf24" stroke-width="5"/>
    <line x1="430" y1="265" x2="490" y2="330" stroke="#fbbf24" stroke-width="8" stroke-linecap="round"/>
    <line x1="330" y1="190" x2="410" y2="190" stroke="#fbbf24" stroke-width="3" stroke-opacity="0.5"/>
    <line x1="330" y1="210" x2="395" y2="210" stroke="#fbbf24" stroke-width="3" stroke-opacity="0.5"/>
  </g>
</svg>`;

// ─── 5. Password Strength Meter ───────────────────────────────────────────
const passwordSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <radialGradient id="bg5" cx="30%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#450a0a" stop-opacity="0.45"/>
      <stop offset="100%" stop-color="#0e0c0b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bar5" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#f87171"/>
      <stop offset="100%" stop-color="#ef4444" stop-opacity="0.2"/>
    </linearGradient>
    <pattern id="grid5" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2d2926" stroke-width="0.5" stroke-opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="1600" height="900" fill="#0e0c0b"/>
  <rect width="1600" height="900" fill="url(#grid5)"/>
  <rect width="1600" height="900" fill="url(#bg5)"/>
  <rect x="80" y="100" width="4" height="680" fill="url(#bar5)" rx="2"/>
  <text x="112" y="210" font-family="monospace" font-size="22" fill="#a8a29e" letter-spacing="4">SECURITY TOOL</text>
  <text x="112" y="310" font-family="sans-serif" font-size="68" font-weight="700" fill="#fafaf9">Password Strength</text>
  <text x="112" y="388" font-family="sans-serif" font-size="68" font-weight="700" fill="#fafaf9">Meter</text>
  <text x="112" y="446" font-family="sans-serif" font-size="28" fill="#a8a29e">Real-time password analysis with entropy &amp; breach detection</text>
  <line x1="112" y1="820" x2="720" y2="820" stroke="#292524" stroke-width="1"/>
  <text x="112" y="848" font-family="monospace" font-size="20" fill="#57534e">TypeScript · React · Zxcvbn · Tailwind CSS</text>
  <text x="1520" y="860" font-family="monospace" font-size="20" fill="#57534e" text-anchor="end">2025</text>
  <g transform="translate(1040,100)">
    <path d="M270,60 L460,140 L460,340 Q460,480 270,560 Q80,480 80,340 L80,140 Z"
          fill="#ef4444" fill-opacity="0.06" stroke="#ef4444" stroke-opacity="0.4" stroke-width="3"/>
    <rect x="210" y="290" width="120" height="100" rx="10" fill="#171412" stroke="#f87171" stroke-width="2.5"/>
    <path d="M235,290 L235,250 Q270,210 305,250 L305,290"
          fill="none" stroke="#f87171" stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="270" cy="330" r="14" fill="#f87171" fill-opacity="0.3" stroke="#f87171" stroke-width="1.5"/>
    <rect x="264" y="330" width="12" height="22" rx="3" fill="#f87171" fill-opacity="0.5"/>
    <rect x="100" y="600" width="60" height="20" rx="4" fill="#ef4444"/>
    <rect x="172" y="600" width="60" height="20" rx="4" fill="#f97316"/>
    <rect x="244" y="600" width="60" height="20" rx="4" fill="#eab308"/>
    <rect x="316" y="600" width="60" height="20" rx="4" fill="#22c55e"/>
    <text x="270" y="650" font-family="monospace" font-size="18" fill="#57534e" text-anchor="middle">WEAK to STRONG</text>
  </g>
</svg>`;

// ─── 6. Unit Converter Streamlit App ──────────────────────────────────────
const unitConverterSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">
  <defs>
    <radialGradient id="bg6" cx="30%" cy="40%" r="70%">
      <stop offset="0%" stop-color="#082f49" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="#0e0c0b" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="bar6" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.2"/>
    </linearGradient>
    <pattern id="grid6" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#2d2926" stroke-width="0.5" stroke-opacity="0.5"/>
    </pattern>
  </defs>
  <rect width="1600" height="900" fill="#0e0c0b"/>
  <rect width="1600" height="900" fill="url(#grid6)"/>
  <rect width="1600" height="900" fill="url(#bg6)"/>
  <rect x="80" y="100" width="4" height="680" fill="url(#bar6)" rx="2"/>
  <text x="112" y="210" font-family="monospace" font-size="22" fill="#a8a29e" letter-spacing="4">WEB APP</text>
  <text x="112" y="310" font-family="sans-serif" font-size="68" font-weight="700" fill="#fafaf9">Unit Converter</text>
  <text x="112" y="388" font-family="sans-serif" font-size="68" font-weight="700" fill="#fafaf9">Streamlit App</text>
  <text x="112" y="446" font-family="sans-serif" font-size="28" fill="#a8a29e">Multi-category unit converter with live recalculation</text>
  <line x1="112" y1="820" x2="720" y2="820" stroke="#292524" stroke-width="1"/>
  <text x="112" y="848" font-family="monospace" font-size="20" fill="#57534e">Python · Streamlit · Pandas</text>
  <text x="1520" y="860" font-family="monospace" font-size="20" fill="#57534e" text-anchor="end">2025</text>
  <g transform="translate(1020,100)">
    <circle cx="270" cy="350" r="250" fill="#0ea5e9" fill-opacity="0.05"/>
    <path d="M 80,200 Q 10,350 80,500" fill="none" stroke="#38bdf8" stroke-width="4" stroke-opacity="0.8"/>
    <polygon points="70,500 90,500 80,525" fill="#38bdf8" fill-opacity="0.8"/>
    <path d="M 460,500 Q 530,350 460,200" fill="none" stroke="#38bdf8" stroke-width="4" stroke-opacity="0.8"/>
    <polygon points="450,200 470,200 460,175" fill="#38bdf8" fill-opacity="0.8"/>
    <circle cx="270" cy="350" r="18" fill="#0ea5e9"/>
    <circle cx="270" cy="350" r="10" fill="#38bdf8"/>
    <text x="40" y="365" font-family="monospace" font-size="30" font-weight="700" fill="#38bdf8" text-anchor="middle">km</text>
    <text x="500" y="365" font-family="monospace" font-size="30" font-weight="700" fill="#38bdf8" text-anchor="middle">mi</text>
    <text x="270" y="220" font-family="monospace" font-size="22" fill="#57534e" text-anchor="middle">C to F</text>
    <text x="270" y="520" font-family="monospace" font-size="22" fill="#57534e" text-anchor="middle">kg to lb</text>
    <line x1="150" y1="350" x2="390" y2="350" stroke="#292524" stroke-width="1" stroke-opacity="0.8"/>
    <circle cx="150" cy="350" r="5" fill="#57534e"/>
    <circle cx="210" cy="350" r="5" fill="#57534e"/>
    <circle cx="270" cy="350" r="5" fill="#0ea5e9"/>
    <circle cx="330" cy="350" r="5" fill="#57534e"/>
    <circle cx="390" cy="350" r="5" fill="#57534e"/>
  </g>
</svg>`;

const covers = [
  { name: "portfolio-cover.png",      svg: portfolioSvg },
  { name: "todo-cover.png",           svg: todoSvg },
  { name: "physical-ai-cover.png",    svg: physicalAiSvg },
  { name: "library-cover.png",        svg: librarySvg },
  { name: "password-cover.png",       svg: passwordSvg },
  { name: "unit-converter-cover.png", svg: unitConverterSvg },
];

for (const { name, svg } of covers) {
  const dest = join(OUT, name);
  await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(dest);
  console.log("OK  " + name);
}
console.log("\nDone — all 6 covers generated in public/images/projects/");
