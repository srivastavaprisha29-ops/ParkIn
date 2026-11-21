# ParkIn

ParkIn is a parking discovery and listing prototype for Bengaluru. The runnable version in this branch includes fictional sample listings, search filters, and a form that saves listings in your browser.

## Run the prototype

From the repository root, run `python3 -m http.server 8000` and open [localhost:8000](http://localhost:8000). See [the prototype guide](PROTOTYPE.md) for a walkthrough.

## Original project concept

The description and stack below describe the original Rocket concept.

<div align="center">

<!-- ANIMATED HERO BANNER -->
<svg width="900" height="280" viewBox="0 0 900 280" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0f;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#0d1117;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0a0f;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="blueGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1a6bff;stop-opacity:0" />
      <stop offset="50%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a6bff;stop-opacity:0" />
    </linearGradient>
    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#60a5fa" />
      <stop offset="50%" style="stop-color:#ffffff" />
      <stop offset="100%" style="stop-color:#818cf8" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="softGlow">
      <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <!-- Road grid pattern -->
    <pattern id="cityGrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
      <rect width="60" height="60" fill="none"/>
      <line x1="0" y1="30" x2="60" y2="30" stroke="#1a3a5c" stroke-width="0.5" opacity="0.4"/>
      <line x1="30" y1="0" x2="30" y2="60" stroke="#1a3a5c" stroke-width="0.5" opacity="0.4"/>
    </pattern>
    <pattern id="fineGrid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <rect width="20" height="20" fill="none"/>
      <line x1="0" y1="10" x2="20" y2="10" stroke="#0d2a4a" stroke-width="0.3" opacity="0.3"/>
      <line x1="10" y1="0" x2="10" y2="20" stroke="#0d2a4a" stroke-width="0.3" opacity="0.3"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="900" height="280" fill="url(#bgGrad)"/>
  <rect width="900" height="280" fill="url(#fineGrid)" opacity="0.6"/>
  <rect width="900" height="280" fill="url(#cityGrid)" opacity="0.8"/>

  <!-- City block shapes -->
  <rect x="20" y="40" width="80" height="50" rx="2" fill="#0d1a2e" stroke="#1a3a5c" stroke-width="0.5" opacity="0.6"/>
  <rect x="30" y="50" width="25" height="15" rx="1" fill="#0a2040" stroke="#1e4a7a" stroke-width="0.5" opacity="0.5"/>
  <rect x="60" y="48" width="30" height="20" rx="1" fill="#0a2040" stroke="#1e4a7a" stroke-width="0.5" opacity="0.5"/>
  <rect x="120" y="20" width="60" height="40" rx="2" fill="#0d1a2e" stroke="#1a3a5c" stroke-width="0.5" opacity="0.5"/>
  <rect x="800" y="30" width="70" height="55" rx="2" fill="#0d1a2e" stroke="#1a3a5c" stroke-width="0.5" opacity="0.6"/>
  <rect x="810" y="40" width="20" height="25" rx="1" fill="#0a2040" stroke="#1e4a7a" stroke-width="0.5" opacity="0.5"/>
  <rect x="840" y="38" width="22" height="18" rx="1" fill="#0a2040" stroke="#1e4a7a" stroke-width="0.5" opacity="0.5"/>
  <rect x="750" y="200" width="90" height="60" rx="2" fill="#0d1a2e" stroke="#1a3a5c" stroke-width="0.5" opacity="0.5"/>
  <rect x="50" y="200" width="75" height="55" rx="2" fill="#0d1a2e" stroke="#1a3a5c" stroke-width="0.5" opacity="0.5"/>

  <!-- Animated road lines -->
  <line x1="0" y1="140" x2="900" y2="140" stroke="#1e4a7a" stroke-width="1.5" opacity="0.5"/>
  <line x1="450" y1="0" x2="450" y2="280" stroke="#1e4a7a" stroke-width="1.5" opacity="0.5"/>
  <line x1="0" y1="80" x2="900" y2="80" stroke="#0d2a4a" stroke-width="0.8" opacity="0.4"/>
  <line x1="0" y1="200" x2="900" y2="200" stroke="#0d2a4a" stroke-width="0.8" opacity="0.4"/>
  <line x1="200" y1="0" x2="200" y2="280" stroke="#0d2a4a" stroke-width="0.8" opacity="0.4"/>
  <line x1="700" y1="0" x2="700" y2="280" stroke="#0d2a4a" stroke-width="0.8" opacity="0.4"/>

  <!-- Glowing road accent -->
  <line x1="0" y1="140" x2="900" y2="140" stroke="url(#blueGlow)" stroke-width="2" opacity="0.6"/>

  <!-- Parking markers with pulse rings -->
  <!-- Marker 1 -->
  <circle cx="160" cy="100" r="18" fill="none" stroke="#22c55e" stroke-width="0.5" opacity="0.3">
    <animate attributeName="r" values="18;28;18" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="160" cy="100" r="10" fill="#0a2a1a" stroke="#22c55e" stroke-width="1.5" filter="url(#glow)"/>
  <text x="160" y="104" text-anchor="middle" fill="#22c55e" font-size="8" font-family="monospace" font-weight="bold">P</text>
  <text x="160" y="88" text-anchor="middle" fill="#22c55e" font-size="7" font-family="monospace" opacity="0.9">₹35/hr</text>

  <!-- Marker 2 -->
  <circle cx="320" cy="180" r="18" fill="none" stroke="#22c55e" stroke-width="0.5" opacity="0.3">
    <animate attributeName="r" values="18;28;18" dur="3.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;0;0.3" dur="3.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="320" cy="180" r="10" fill="#0a2a1a" stroke="#22c55e" stroke-width="1.5" filter="url(#glow)"/>
  <text x="320" y="184" text-anchor="middle" fill="#22c55e" font-size="8" font-family="monospace" font-weight="bold">P</text>
  <text x="320" y="168" text-anchor="middle" fill="#22c55e" font-size="7" font-family="monospace" opacity="0.9">₹45/hr</text>

  <!-- Marker 3 -->
  <circle cx="620" cy="90" r="18" fill="none" stroke="#22c55e" stroke-width="0.5" opacity="0.3">
    <animate attributeName="r" values="18;28;18" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite"/>
  </circle>
  <circle cx="620" cy="90" r="10" fill="#0a2a1a" stroke="#22c55e" stroke-width="1.5" filter="url(#glow)"/>
  <text x="620" y="94" text-anchor="middle" fill="#22c55e" font-size="8" font-family="monospace" font-weight="bold">P</text>
  <text x="620" y="78" text-anchor="middle" fill="#22c55e" font-size="7" font-family="monospace" opacity="0.9">₹60/hr</text>

  <!-- Marker 4 -->
  <circle cx="740" cy="190" r="18" fill="none" stroke="#22c55e" stroke-width="0.5" opacity="0.3">
    <animate attributeName="r" values="18;28;18" dur="2.8s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;0;0.3" dur="2.8s" repeatCount="indefinite"/>
  </circle>
  <circle cx="740" cy="190" r="10" fill="#0a2a1a" stroke="#22c55e" stroke-width="1.5" filter="url(#glow)"/>
  <text x="740" y="194" text-anchor="middle" fill="#22c55e" font-size="8" font-family="monospace" font-weight="bold">P</text>
  <text x="740" y="178" text-anchor="middle" fill="#22c55e" font-size="7" font-family="monospace" opacity="0.9">₹50/hr</text>

  <!-- YOU location marker -->
  <circle cx="450" cy="155" r="22" fill="none" stroke="#3b82f6" stroke-width="0.8" opacity="0.4">
    <animate attributeName="r" values="22;35;22" dur="2.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="450" cy="155" r="14" fill="none" stroke="#3b82f6" stroke-width="0.5" opacity="0.3">
    <animate attributeName="r" values="14;22;14" dur="2.5s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite"/>
  </circle>
  <circle cx="450" cy="155" r="6" fill="#1d4ed8" stroke="#60a5fa" stroke-width="1.5" filter="url(#softGlow)"/>
  <text x="450" y="175" text-anchor="middle" fill="#60a5fa" font-size="8" font-family="monospace" opacity="0.9">◎ YOU</text>

  <!-- Route line from YOU to marker -->
  <path d="M450,155 Q380,140 320,180" stroke="#3b82f6" stroke-width="1.5" fill="none" stroke-dasharray="4,3" opacity="0.6">
    <animate attributeName="stroke-dashoffset" values="100;0" dur="3s" repeatCount="indefinite"/>
  </path>
  <path d="M450,155 Q530,120 620,90" stroke="#3b82f6" stroke-width="1.5" fill="none" stroke-dasharray="4,3" opacity="0.4">
    <animate attributeName="stroke-dashoffset" values="100;0" dur="4s" repeatCount="indefinite"/>
  </path>

  <!-- Main title -->
  <text x="450" y="52" text-anchor="middle" fill="url(#titleGrad)" font-size="48" font-family="'Segoe UI', Arial, sans-serif" font-weight="900" letter-spacing="-1" filter="url(#softGlow)">ParkIn</text>

  <!-- Subtitle -->
  <text x="450" y="72" text-anchor="middle" fill="#64748b" font-size="12" font-family="'Segoe UI', Arial, sans-serif" letter-spacing="4">FIND A SPOT · SHARE A SPOT · PARKIN</text>

  <!-- Bottom glow line -->
  <rect x="0" y="270" width="900" height="2" fill="url(#blueGlow)" opacity="0.8"/>
  <rect x="0" y="272" width="900" height="8" fill="url(#bgGrad)" opacity="0.9"/>
</svg>

<br/>

<!-- ANIMATED TAGLINE -->
<svg width="700" height="50" viewBox="0 0 700 50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="tagGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.8"/>
      <stop offset="50%" style="stop-color:#818cf8;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:0.8"/>
    </linearGradient>
  </defs>
  <rect width="700" height="50" fill="none"/>
  <line x1="0" y1="25" x2="220" y2="25" stroke="url(#tagGrad)" stroke-width="0.5" opacity="0.5"/>
  <line x1="480" y1="25" x2="700" y2="25" stroke="url(#tagGrad)" stroke-width="0.5" opacity="0.5"/>
  <text x="350" y="30" text-anchor="middle" fill="#94a3b8" font-size="13" font-family="'Segoe UI', Arial, sans-serif" letter-spacing="2">India's peer-to-peer parking marketplace</text>
</svg>

<br/>

<!-- BADGES ROW -->
<a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js"/></a>&nbsp;
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/></a>&nbsp;
<a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/></a>&nbsp;
<a href="https://supabase.com/"><img src="https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase"/></a>

<br/><br/>

<a href="https://parkin8865.builtwithrocket.new"><img src="https://img.shields.io/badge/🌐_Live_Demo-parkin8865.builtwithrocket.new-1d4ed8?style=for-the-badge" alt="Live Demo"/></a>&nbsp;
<img src="https://img.shields.io/badge/Currency-₹_INR-f59e0b?style=for-the-badge" alt="INR"/>&nbsp;
<img src="https://img.shields.io/badge/Market-India_First-ff6b35?style=for-the-badge" alt="India First"/>

</div>

---

<!-- CITY DIVIDER -->
<div align="center">
<svg width="800" height="30" viewBox="0 0 800 30" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="divGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1d4ed8;stop-opacity:0"/>
      <stop offset="30%" style="stop-color:#3b82f6;stop-opacity:0.8"/>
      <stop offset="50%" style="stop-color:#60a5fa;stop-opacity:1"/>
      <stop offset="70%" style="stop-color:#3b82f6;stop-opacity:0.8"/>
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:0"/>
    </linearGradient>
  </defs>
  <rect width="800" height="30" fill="none"/>
  <line x1="0" y1="15" x2="800" y2="15" stroke="url(#divGrad)" stroke-width="1"/>
  <circle cx="400" cy="15" r="4" fill="#3b82f6" opacity="0.8"/>
  <circle cx="200" cy="15" r="2" fill="#3b82f6" opacity="0.5"/>
  <circle cx="600" cy="15" r="2" fill="#3b82f6" opacity="0.5"/>
</svg>
</div>

## 🌆 The Concept

<div align="center">

<!-- CONCEPT GRAPHIC -->
<svg width="800" height="160" viewBox="0 0 800 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0d1a2e;stop-opacity:1"/>
      <stop offset="100%" style="stop-color:#0a0f1a;stop-opacity:1"/>
    </linearGradient>
    <filter id="cardGlow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="800" height="160" fill="none"/>

  <!-- Parker Card -->
  <rect x="30" y="20" width="220" height="120" rx="8" fill="url(#cardBg)" stroke="#1e40af" stroke-width="1" opacity="0.9"/>
  <rect x="30" y="20" width="220" height="3" rx="2" fill="#3b82f6" opacity="0.8"/>
  <text x="140" y="55" text-anchor="middle" fill="#60a5fa" font-size="22" font-family="monospace">🚗</text>
  <text x="140" y="80" text-anchor="middle" fill="#e2e8f0" font-size="14" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">PARKER</text>
  <text x="140" y="98" text-anchor="middle" fill="#64748b" font-size="10" font-family="'Segoe UI', Arial, sans-serif">Find &amp; book parking</text>
  <text x="140" y="115" text-anchor="middle" fill="#3b82f6" font-size="10" font-family="monospace">₹30 – ₹80 / hour</text>

  <!-- Arrow -->
  <text x="290" y="95" text-anchor="middle" fill="#3b82f6" font-size="28" font-family="monospace" opacity="0.8">⇄</text>

  <!-- ParkIn Center -->
  <rect x="330" y="30" width="140" height="100" rx="8" fill="#0d1a2e" stroke="#3b82f6" stroke-width="1.5"/>
  <rect x="330" y="30" width="140" height="3" rx="2" fill="#818cf8"/>
  <text x="400" y="70" text-anchor="middle" fill="white" font-size="20" font-family="'Segoe UI', Arial, sans-serif" font-weight="900">ParkIn</text>
  <text x="400" y="88" text-anchor="middle" fill="#64748b" font-size="9" font-family="monospace" letter-spacing="2">MARKETPLACE</text>
  <circle cx="400" cy="108" r="6" fill="none" stroke="#22c55e" stroke-width="1.5">
    <animate attributeName="r" values="6;10;6" dur="2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
  </circle>

  <!-- Arrow -->
  <text x="510" y="95" text-anchor="middle" fill="#3b82f6" font-size="28" font-family="monospace" opacity="0.8">⇄</text>

  <!-- Insider Card -->
  <rect x="550" y="20" width="220" height="120" rx="8" fill="url(#cardBg)" stroke="#7c3aed" stroke-width="1" opacity="0.9"/>
  <rect x="550" y="20" width="220" height="3" rx="2" fill="#818cf8" opacity="0.8"/>
  <text x="660" y="55" text-anchor="middle" fill="#a78bfa" font-size="22" font-family="monospace">🏠</text>
  <text x="660" y="80" text-anchor="middle" fill="#e2e8f0" font-size="14" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">INSIDER</text>
  <text x="660" y="98" text-anchor="middle" fill="#64748b" font-size="10" font-family="'Segoe UI', Arial, sans-serif">List &amp; earn from spaces</text>
  <text x="660" y="115" text-anchor="middle" fill="#22c55e" font-size="10" font-family="monospace">₹4,500 – ₹8,000 / month</text>
</svg>

</div>

> Cities don't always need more parking. Sometimes they need **better access** to the parking that already exists.
>
> Thousands of private parking spaces remain unused every day while drivers circle nearby streets.
> **ParkIn turns unused space into available infrastructure.**

---

<!-- SECTION DIVIDER -->
<div align="center">
<svg width="800" height="30" viewBox="0 0 800 30" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="div2Grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#7c3aed;stop-opacity:0"/>
      <stop offset="50%" style="stop-color:#818cf8;stop-opacity:0.6"/>
      <stop offset="100%" style="stop-color:#7c3aed;stop-opacity:0"/>
    </linearGradient>
  </defs>
  <line x1="0" y1="15" x2="800" y2="15" stroke="url(#div2Grad)" stroke-width="1"/>
</svg>
</div>

## 🗺️ Parking Discovery

<div align="center">

<!-- MAP INTERFACE GRAPHIC -->
<svg width="800" height="320" viewBox="0 0 800 320" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="mapBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#060d1a"/>
      <stop offset="100%" style="stop-color:#0a1628"/>
    </linearGradient>
    <pattern id="mapGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <line x1="0" y1="20" x2="40" y2="20" stroke="#0d2a4a" stroke-width="0.5"/>
      <line x1="20" y1="0" x2="20" y2="40" stroke="#0d2a4a" stroke-width="0.5"/>
    </pattern>
    <filter id="markerGlow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Map background -->
  <rect width="800" height="320" rx="12" fill="url(#mapBg)" stroke="#1e3a5f" stroke-width="1"/>
  <rect width="800" height="320" rx="12" fill="url(#mapGrid)"/>

  <!-- Road network -->
  <!-- Major roads -->
  <line x1="0" y1="160" x2="800" y2="160" stroke="#1e4a7a" stroke-width="3" opacity="0.7"/>
  <line x1="400" y1="0" x2="400" y2="320" stroke="#1e4a7a" stroke-width="3" opacity="0.7"/>
  <!-- Secondary roads -->
  <line x1="0" y1="80" x2="800" y2="80" stroke="#0d2a4a" stroke-width="1.5" opacity="0.6"/>
  <line x1="0" y1="240" x2="800" y2="240" stroke="#0d2a4a" stroke-width="1.5" opacity="0.6"/>
  <line x1="200" y1="0" x2="200" y2="320" stroke="#0d2a4a" stroke-width="1.5" opacity="0.6"/>
  <line x1="600" y1="0" x2="600" y2="320" stroke="#0d2a4a" stroke-width="1.5" opacity="0.6"/>
  <!-- Diagonal roads -->
  <line x1="0" y1="0" x2="200" y2="160" stroke="#0a1e3a" stroke-width="1" opacity="0.4"/>
  <line x1="800" y1="0" x2="600" y2="160" stroke="#0a1e3a" stroke-width="1" opacity="0.4"/>
  <line x1="0" y1="320" x2="200" y2="160" stroke="#0a1e3a" stroke-width="1" opacity="0.4"/>
  <line x1="800" y1="320" x2="600" y2="160" stroke="#0a1e3a" stroke-width="1" opacity="0.4"/>

  <!-- City blocks -->
  <rect x="220" y="20" width="160" height="50" rx="3" fill="#0a1628" stroke="#0d2a4a" stroke-width="0.5" opacity="0.7"/>
  <rect x="420" y="20" width="160" height="50" rx="3" fill="#0a1628" stroke="#0d2a4a" stroke-width="0.5" opacity="0.7"/>
  <rect x="20" y="100" width="160" height="50" rx="3" fill="#0a1628" stroke="#0d2a4a" stroke-width="0.5" opacity="0.7"/>
  <rect x="620" y="100" width="160" height="50" rx="3" fill="#0a1628" stroke="#0d2a4a" stroke-width="0.5" opacity="0.7"/>
  <rect x="220" y="180" width="160" height="50" rx="3" fill="#0a1628" stroke="#0d2a4a" stroke-width="0.5" opacity="0.7"/>
  <rect x="420" y="180" width="160" height="50" rx="3" fill="#0a1628" stroke="#0d2a4a" stroke-width="0.5" opacity="0.7"/>
  <rect x="20" y="250" width="160" height="50" rx="3" fill="#0a1628" stroke="#0d2a4a" stroke-width="0.5" opacity="0.7"/>
  <rect x="620" y="250" width="160" height="50" rx="3" fill="#0a1628" stroke="#0d2a4a" stroke-width="0.5" opacity="0.7"/>

  <!-- YOU marker with radar -->
  <circle cx="400" cy="160" r="50" fill="none" stroke="#3b82f6" stroke-width="0.5" opacity="0.2">
    <animate attributeName="r" values="20;60;20" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="400" cy="160" r="30" fill="none" stroke="#3b82f6" stroke-width="0.5" opacity="0.2">
    <animate attributeName="r" values="10;40;10" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite"/>
  </circle>
  <circle cx="400" cy="160" r="8" fill="#1d4ed8" stroke="#60a5fa" stroke-width="2" filter="url(#markerGlow)"/>
  <text x="400" y="185" text-anchor="middle" fill="#60a5fa" font-size="10" font-family="monospace" font-weight="bold">◎ YOU</text>

  <!-- Parking Marker 1 - Koramangala -->
  <circle cx="160" cy="100" r="24" fill="none" stroke="#22c55e" stroke-width="0.5" opacity="0.2">
    <animate attributeName="r" values="16;28;16" dur="3.2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;0;0.3" dur="3.2s" repeatCount="indefinite"/>
  </circle>
  <rect x="135" y="82" width="50" height="22" rx="11" fill="#052e16" stroke="#22c55e" stroke-width="1.5" filter="url(#markerGlow)"/>
  <text x="160" y="97" text-anchor="middle" fill="#22c55e" font-size="10" font-family="monospace" font-weight="bold">₹35/hr</text>
  <text x="160" y="115" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Koramangala</text>

  <!-- Parking Marker 2 - Bandra -->
  <circle cx="620" cy="100" r="24" fill="none" stroke="#22c55e" stroke-width="0.5" opacity="0.2">
    <animate attributeName="r" values="16;28;16" dur="2.8s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;0;0.3" dur="2.8s" repeatCount="indefinite"/>
  </circle>
  <rect x="595" y="82" width="50" height="22" rx="11" fill="#052e16" stroke="#22c55e" stroke-width="1.5" filter="url(#markerGlow)"/>
  <text x="620" y="97" text-anchor="middle" fill="#22c55e" font-size="10" font-family="monospace" font-weight="bold">₹60/hr</text>
  <text x="620" y="115" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Bandra West</text>

  <!-- Parking Marker 3 - Connaught -->
  <circle cx="200" cy="240" r="24" fill="none" stroke="#22c55e" stroke-width="0.5" opacity="0.2">
    <animate attributeName="r" values="16;28;16" dur="3.8s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;0;0.3" dur="3.8s" repeatCount="indefinite"/>
  </circle>
  <rect x="175" y="222" width="50" height="22" rx="11" fill="#052e16" stroke="#22c55e" stroke-width="1.5" filter="url(#markerGlow)"/>
  <text x="200" y="237" text-anchor="middle" fill="#22c55e" font-size="10" font-family="monospace" font-weight="bold">₹45/hr</text>
  <text x="200" y="255" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Connaught Pl</text>

  <!-- Parking Marker 4 - Hitech City -->
  <circle cx="600" cy="240" r="24" fill="none" stroke="#22c55e" stroke-width="0.5" opacity="0.2">
    <animate attributeName="r" values="16;28;16" dur="4.2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.3;0;0.3" dur="4.2s" repeatCount="indefinite"/>
  </circle>
  <rect x="575" y="222" width="50" height="22" rx="11" fill="#052e16" stroke="#22c55e" stroke-width="1.5" filter="url(#markerGlow)"/>
  <text x="600" y="237" text-anchor="middle" fill="#22c55e" font-size="10" font-family="monospace" font-weight="bold">₹50/hr</text>
  <text x="600" y="255" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Hitech City</text>

  <!-- Route lines (animated dashes) -->
  <path d="M400,160 Q280,130 160,100" stroke="#3b82f6" stroke-width="1.5" fill="none" stroke-dasharray="5,4" opacity="0.5">
    <animate attributeName="stroke-dashoffset" values="90;0" dur="3s" repeatCount="indefinite"/>
  </path>
  <path d="M400,160 Q510,130 620,100" stroke="#3b82f6" stroke-width="1.5" fill="none" stroke-dasharray="5,4" opacity="0.3">
    <animate attributeName="stroke-dashoffset" values="90;0" dur="4s" repeatCount="indefinite"/>
  </path>

  <!-- Filter bar -->
  <rect x="20" y="285" width="760" height="25" rx="5" fill="#0a1628" stroke="#1e3a5f" stroke-width="0.5"/>
  <text x="80" y="302" text-anchor="middle" fill="#60a5fa" font-size="9" font-family="monospace">🚗 Car</text>
  <text x="180" y="302" text-anchor="middle" fill="#60a5fa" font-size="9" font-family="monospace">🏍 Bike</text>
  <text x="310" y="302" text-anchor="middle" fill="#22c55e" font-size="9" font-family="monospace">⚡ Available Now</text>
  <text x="450" y="302" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">⚙ Filters</text>
  <text x="580" y="302" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">📍 Near Me</text>
  <text x="700" y="302" text-anchor="middle" fill="#94a3b8" font-size="9" font-family="monospace">💰 Price</text>
</svg>

</div>

---

## ✨ Features

<div align="center">

<!-- FEATURES GRID GRAPHIC -->
<svg width="800" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="featBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0d1a2e"/>
      <stop offset="100%" style="stop-color:#060d1a"/>
    </linearGradient>
  </defs>

  <!-- Parker Features -->
  <rect x="10" y="10" width="370" height="180" rx="10" fill="url(#featBg)" stroke="#1e40af" stroke-width="1"/>
  <rect x="10" y="10" width="370" height="4" rx="2" fill="#3b82f6"/>
  <text x="195" y="38" text-anchor="middle" fill="#60a5fa" font-size="13" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">🚗 PARKER MODE</text>

  <text x="30" y="62" fill="#94a3b8" font-size="10" font-family="'Segoe UI', Arial, sans-serif">📍 Find parking near your location</text>
  <text x="30" y="80" fill="#94a3b8" font-size="10" font-family="'Segoe UI', Arial, sans-serif">🗺️ Interactive live map with ₹ markers</text>
  <text x="30" y="98" fill="#94a3b8" font-size="10" font-family="'Segoe UI', Arial, sans-serif">⚡ Available Now filter</text>
  <text x="30" y="116" fill="#94a3b8" font-size="10" font-family="'Segoe UI', Arial, sans-serif">📅 Advance booking &amp; reservations</text>
  <text x="30" y="134" fill="#94a3b8" font-size="10" font-family="'Segoe UI', Arial, sans-serif">💳 UPI · Cards · Net Banking</text>
  <text x="30" y="152" fill="#94a3b8" font-size="10" font-family="'Segoe UI', Arial, sans-serif">🧭 Turn-by-turn navigation to spot</text>
  <text x="30" y="170" fill="#94a3b8" font-size="10" font-family="'Segoe UI', Arial, sans-serif">⭐ Ratings &amp; community reviews</text>

  <!-- Insider Features -->
  <rect x="420" y="10" width="370" height="180" rx="10" fill="url(#featBg)" stroke="#7c3aed" stroke-width="1"/>
  <rect x="420" y="10" width="370" height="4" rx="2" fill="#818cf8"/>
  <text x="605" y="38" text-anchor="middle" fill="#a78bfa" font-size="13" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">🏠 INSIDER MODE</text>

  <text x="440" y="62" fill="#94a3b8" font-size="10" font-family="'Segoe UI', Arial, sans-serif">➕ List your unused parking space</text>
  <text x="440" y="80" fill="#94a3b8" font-size="10" font-family="'Segoe UI', Arial, sans-serif">📍 Pin exact location on map</text>
  <text x="440" y="98" fill="#94a3b8" font-size="10" font-family="'Segoe UI', Arial, sans-serif">💰 Set your own ₹ price</text>
  <text x="440" y="116" fill="#94a3b8" font-size="10" font-family="'Segoe UI', Arial, sans-serif">📅 Manage availability calendar</text>
  <text x="440" y="134" fill="#94a3b8" font-size="10" font-family="'Segoe UI', Arial, sans-serif">📊 Analytics &amp; earnings dashboard</text>
  <text x="440" y="152" fill="#94a3b8" font-size="10" font-family="'Segoe UI', Arial, sans-serif">💵 Track payouts &amp; booking history</text>
  <text x="440" y="170" fill="#94a3b8" font-size="10" font-family="'Segoe UI', Arial, sans-serif">⭐ Build your Insider reputation</text>
</svg>

</div>

---

## 🔄 One Account. Two Modes.

<div align="center">

<!-- MODE SWITCH GRAPHIC -->
<svg width="700" height="100" viewBox="0 0 700 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="navBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0d1a2e;stop-opacity:0.95"/>
      <stop offset="100%" style="stop-color:#060d1a;stop-opacity:0.95"/>
    </linearGradient>
  </defs>
  <rect width="700" height="100" fill="none"/>

  <!-- Nav bar -->
  <rect x="0" y="20" width="700" height="60" rx="10" fill="url(#navBg)" stroke="#1e3a5f" stroke-width="1"/>
  <text x="50" y="57" fill="white" font-size="16" font-family="'Segoe UI', Arial, sans-serif" font-weight="900">ParkIn</text>
  <text x="160" y="57" fill="#94a3b8" font-size="11" font-family="'Segoe UI', Arial, sans-serif">Explore</text>
  <text x="240" y="57" fill="#94a3b8" font-size="11" font-family="'Segoe UI', Arial, sans-serif">How It Works</text>
  <text x="360" y="57" fill="#94a3b8" font-size="11" font-family="'Segoe UI', Arial, sans-serif">About</text>

  <!-- Mode switch pill -->
  <rect x="440" y="35" width="160" height="30" rx="15" fill="#0a1628" stroke="#3b82f6" stroke-width="1.5"/>
  <rect x="442" y="37" width="76" height="26" rx="13" fill="#1d4ed8"/>
  <text x="480" y="55" text-anchor="middle" fill="white" font-size="10" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">🚗 Parker</text>
  <text x="560" y="55" text-anchor="middle" fill="#64748b" font-size="10" font-family="'Segoe UI', Arial, sans-serif">🏠 Insider</text>

  <!-- Profile icon -->
  <circle cx="660" cy="50" r="14" fill="#0d1a2e" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="660" y="55" text-anchor="middle" fill="#60a5fa" font-size="12">◉</text>
</svg>

</div>

A single ParkIn account can operate as both a **Parker** and an **Insider**. Switch instantly between modes — the same account, profile, and authentication system power both.

---

## 🏗️ Tech Stack

<div align="center">

<!-- TECH STACK GRAPHIC -->
<svg width="800" height="120" viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="techBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0d1a2e"/>
      <stop offset="100%" style="stop-color:#060d1a"/>
    </linearGradient>
  </defs>

  <!-- Tech cards -->
  <rect x="10" y="10" width="110" height="100" rx="8" fill="url(#techBg)" stroke="#1e3a5f" stroke-width="1"/>
  <text x="65" y="48" text-anchor="middle" fill="white" font-size="22" font-family="monospace">▲</text>
  <text x="65" y="70" text-anchor="middle" fill="#e2e8f0" font-size="11" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Next.js 15</text>
  <text x="65" y="86" text-anchor="middle" fill="#64748b" font-size="9" font-family="monospace">App Router</text>

  <rect x="135" y="10" width="110" height="100" rx="8" fill="url(#techBg)" stroke="#1e3a5f" stroke-width="1"/>
  <text x="190" y="48" text-anchor="middle" fill="#3178c6" font-size="22" font-family="monospace">TS</text>
  <text x="190" y="70" text-anchor="middle" fill="#e2e8f0" font-size="11" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">TypeScript</text>
  <text x="190" y="86" text-anchor="middle" fill="#64748b" font-size="9" font-family="monospace">v5.0</text>

  <rect x="260" y="10" width="110" height="100" rx="8" fill="url(#techBg)" stroke="#1e3a5f" stroke-width="1"/>
  <text x="315" y="48" text-anchor="middle" fill="#06b6d4" font-size="22" font-family="monospace">TW</text>
  <text x="315" y="70" text-anchor="middle" fill="#e2e8f0" font-size="11" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Tailwind CSS</text>
  <text x="315" y="86" text-anchor="middle" fill="#64748b" font-size="9" font-family="monospace">v3.x</text>

  <rect x="385" y="10" width="110" height="100" rx="8" fill="url(#techBg)" stroke="#1e3a5f" stroke-width="1"/>
  <text x="440" y="48" text-anchor="middle" fill="#3ecf8e" font-size="22" font-family="monospace">SB</text>
  <text x="440" y="70" text-anchor="middle" fill="#e2e8f0" font-size="11" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Supabase</text>
  <text x="440" y="86" text-anchor="middle" fill="#64748b" font-size="9" font-family="monospace">PostgreSQL</text>

  <rect x="510" y="10" width="110" height="100" rx="8" fill="url(#techBg)" stroke="#1e3a5f" stroke-width="1"/>
  <text x="565" y="48" text-anchor="middle" fill="#ff6b35" font-size="22" font-family="monospace">RC</text>
  <text x="565" y="70" text-anchor="middle" fill="#e2e8f0" font-size="11" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Recharts</text>
  <text x="565" y="86" text-anchor="middle" fill="#64748b" font-size="9" font-family="monospace">Dashboard</text>

  <rect x="635" y="10" width="110" height="100" rx="8" fill="url(#techBg)" stroke="#1e3a5f" stroke-width="1"/>
  <text x="690" y="48" text-anchor="middle" fill="#f59e0b" font-size="22" font-family="monospace">₹</text>
  <text x="690" y="70" text-anchor="middle" fill="#e2e8f0" font-size="11" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Payments</text>
  <text x="690" y="86" text-anchor="middle" fill="#64748b" font-size="9" font-family="monospace">UPI · Cards</text>
</svg>

</div>

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15, React 19, TypeScript 5, Tailwind CSS 3 |
| **Charts** | Recharts — Insider earnings dashboard |
| **Backend** | Supabase (PostgreSQL + Auth + Storage) |
| **Deployment** | Vercel |
| **Maps** | Geolocation API · Mapbox *(planned)* |
| **Payments** | Razorpay / Stripe — INR *(planned)* |

---

## 🛠️ Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/parkin.git
cd parkin

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Add your Supabase credentials to .env

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 📁 Project Structure

```
parkin/
├── public/assets/images/          # Static assets & app logo
└── src/
    ├── app/
    │   ├── page.tsx                        # 🏠 Landing page
    │   ├── layout.tsx                      # Root layout
    │   ├── components/
    │   │   ├── HeroSection.tsx             # 🎬 Animated city map hero
    │   │   ├── ParkerJourneySection.tsx    # 🚗 Parker flow storytelling
    │   │   ├── ModeSwitchSection.tsx       # 🔄 Parker ↔ Insider demo
    │   │   ├── InsiderEarningsSection.tsx  # 💰 Insider earnings showcase
    │   │   ├── TrustSafetySection.tsx      # 🛡️ Trust & safety
    │   │   └── FinalCtaSection.tsx         # 🎯 Final call-to-action
    │   ├── parking-space-detail/
    │   │   └── components/
    │   │       ├── SpaceGallery.tsx        # 📸 Photo gallery
    │   │       ├── SpaceDetails.tsx        # 📋 Space info & amenities
    │   │       ├── SpaceBookingWidget.tsx  # 💳 Live ₹ price calculator
    │   │       └── SpaceReviews.tsx        # ⭐ Reviews & ratings
    │   └── insider-dashboard/
    │       └── components/
    │           ├── DashboardStats.tsx      # 📊 Animated stat counters
    │           ├── EarningsChart.tsx       # 📈 Recharts earnings graph
    │           ├── UpcomingBookings.tsx    # 📅 Booking list
    │           ├── ActiveSpaces.tsx        # 🅿️ Active listings
    │           ├── RecentReviews.tsx       # ⭐ Latest reviews
    │           └── PayoutHistory.tsx       # 💵 Payout records
    └── components/
        ├── Header.tsx                      # 🧭 Global navigation
        └── Footer.tsx                      # 📄 Global footer
```

---

## 🖥️ Screens

<div align="center">

<!-- SCREENS GRAPHIC -->
<svg width="800" height="140" viewBox="0 0 800 140" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="screenBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0d1a2e"/>
      <stop offset="100%" style="stop-color:#060d1a"/>
    </linearGradient>
  </defs>

  <!-- Screen 1 -->
  <rect x="10" y="10" width="240" height="120" rx="10" fill="url(#screenBg)" stroke="#1e40af" stroke-width="1.5"/>
  <rect x="10" y="10" width="240" height="4" rx="2" fill="#3b82f6"/>
  <text x="130" y="45" text-anchor="middle" fill="#60a5fa" font-size="20">🏠</text>
  <text x="130" y="68" text-anchor="middle" fill="#e2e8f0" font-size="12" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Landing Page</text>
  <text x="130" y="84" text-anchor="middle" fill="#64748b" font-size="9" font-family="monospace">route: /</text>
  <text x="130" y="102" text-anchor="middle" fill="#475569" font-size="9" font-family="'Segoe UI', Arial, sans-serif">Animated city map hero</text>
  <text x="130" y="116" text-anchor="middle" fill="#475569" font-size="9" font-family="'Segoe UI', Arial, sans-serif">Scroll storytelling</text>

  <!-- Screen 2 -->
  <rect x="280" y="10" width="240" height="120" rx="10" fill="url(#screenBg)" stroke="#22c55e" stroke-width="1.5"/>
  <rect x="280" y="10" width="240" height="4" rx="2" fill="#22c55e"/>
  <text x="400" y="45" text-anchor="middle" fill="#22c55e" font-size="20">🅿️</text>
  <text x="400" y="68" text-anchor="middle" fill="#e2e8f0" font-size="12" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Space Detail</text>
  <text x="400" y="84" text-anchor="middle" fill="#64748b" font-size="9" font-family="monospace">route: /parking-space-detail</text>
  <text x="400" y="102" text-anchor="middle" fill="#475569" font-size="9" font-family="'Segoe UI', Arial, sans-serif">Live ₹ booking widget</text>
  <text x="400" y="116" text-anchor="middle" fill="#475569" font-size="9" font-family="'Segoe UI', Arial, sans-serif">Photo gallery · Reviews</text>

  <!-- Screen 3 -->
  <rect x="550" y="10" width="240" height="120" rx="10" fill="url(#screenBg)" stroke="#818cf8" stroke-width="1.5"/>
  <rect x="550" y="10" width="240" height="4" rx="2" fill="#818cf8"/>
  <text x="670" y="45" text-anchor="middle" fill="#a78bfa" font-size="20">📊</text>
  <text x="670" y="68" text-anchor="middle" fill="#e2e8f0" font-size="12" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Insider Dashboard</text>
  <text x="670" y="84" text-anchor="middle" fill="#64748b" font-size="9" font-family="monospace">route: /insider-dashboard</text>
  <text x="670" y="102" text-anchor="middle" fill="#475569" font-size="9" font-family="'Segoe UI', Arial, sans-serif">Earnings · Bookings</text>
  <text x="670" y="116" text-anchor="middle" fill="#475569" font-size="9" font-family="'Segoe UI', Arial, sans-serif">Analytics · Payouts</text>
</svg>

</div>

---

## 💰 Pricing Model

<div align="center">

<!-- PRICING FLOW GRAPHIC -->
<svg width="700" height="100" viewBox="0 0 700 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="priceBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0d1a2e"/>
      <stop offset="100%" style="stop-color:#060d1a"/>
    </linearGradient>
  </defs>

  <rect x="20" y="20" width="160" height="60" rx="8" fill="url(#priceBg)" stroke="#3b82f6" stroke-width="1.5"/>
  <text x="100" y="48" text-anchor="middle" fill="#60a5fa" font-size="11" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Parker Payment</text>
  <text x="100" y="66" text-anchor="middle" fill="#22c55e" font-size="13" font-family="monospace" font-weight="bold">₹110</text>

  <text x="230" y="55" text-anchor="middle" fill="#3b82f6" font-size="20">→</text>

  <rect x="260" y="20" width="180" height="60" rx="8" fill="url(#priceBg)" stroke="#818cf8" stroke-width="1.5"/>
  <text x="350" y="44" text-anchor="middle" fill="#a78bfa" font-size="11" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">ParkIn Platform Fee</text>
  <text x="350" y="62" text-anchor="middle" fill="#818cf8" font-size="11" font-family="monospace">small % per booking</text>

  <text x="490" y="55" text-anchor="middle" fill="#3b82f6" font-size="20">→</text>

  <rect x="520" y="20" width="160" height="60" rx="8" fill="url(#priceBg)" stroke="#22c55e" stroke-width="1.5"/>
  <text x="600" y="48" text-anchor="middle" fill="#22c55e" font-size="11" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Insider Earnings</text>
  <text x="600" y="66" text-anchor="middle" fill="#22c55e" font-size="13" font-family="monospace" font-weight="bold">₹100</text>
</svg>

</div>

All pricing uses **₹ INR** — never USD, EUR, or any foreign currency.

| Duration | Price Range |
|---|---|
| Hourly | ₹30 – ₹80 / hour |
| Daily | ₹250 – ₹600 / day |
| Weekly | ₹1,500 – ₹3,500 / week |
| Monthly | ₹4,000 – ₹8,000 / month |

---

## 🗺️ Roadmap

<div align="center">

<!-- ROADMAP GRAPHIC -->
<svg width="800" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="roadmapLine" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1d4ed8"/>
      <stop offset="60%" style="stop-color:#22c55e"/>
      <stop offset="80%" style="stop-color:#f59e0b"/>
      <stop offset="100%" style="stop-color:#818cf8"/>
    </linearGradient>
  </defs>

  <!-- Timeline line -->
  <line x1="60" y1="100" x2="740" y2="100" stroke="url(#roadmapLine)" stroke-width="2" opacity="0.6"/>

  <!-- Phase nodes -->
  <!-- Phase 1 - Done -->
  <circle cx="120" cy="100" r="16" fill="#052e16" stroke="#22c55e" stroke-width="2"/>
  <text x="120" y="105" text-anchor="middle" fill="#22c55e" font-size="10" font-weight="bold">✓</text>
  <text x="120" y="130" text-anchor="middle" fill="#22c55e" font-size="9" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Foundation</text>
  <text x="120" y="143" text-anchor="middle" fill="#64748b" font-size="8" font-family="monospace">Phase 1</text>
  <text x="120" y="72" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Auth · Profiles</text>
  <text x="120" y="60" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Landing Page</text>

  <!-- Phase 2 - Done -->
  <circle cx="250" cy="100" r="16" fill="#052e16" stroke="#22c55e" stroke-width="2"/>
  <text x="250" y="105" text-anchor="middle" fill="#22c55e" font-size="10" font-weight="bold">✓</text>
  <text x="250" y="130" text-anchor="middle" fill="#22c55e" font-size="9" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Insider</text>
  <text x="250" y="143" text-anchor="middle" fill="#64748b" font-size="8" font-family="monospace">Phase 2</text>
  <text x="250" y="72" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Dashboard</text>
  <text x="250" y="60" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Listings</text>

  <!-- Phase 3 - Done -->
  <circle cx="380" cy="100" r="16" fill="#052e16" stroke="#22c55e" stroke-width="2"/>
  <text x="380" y="105" text-anchor="middle" fill="#22c55e" font-size="10" font-weight="bold">✓</text>
  <text x="380" y="130" text-anchor="middle" fill="#22c55e" font-size="9" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Parker</text>
  <text x="380" y="143" text-anchor="middle" fill="#64748b" font-size="8" font-family="monospace">Phase 3</text>
  <text x="380" y="72" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Map · Search</text>
  <text x="380" y="60" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Discovery</text>

  <!-- Phase 4 - In Progress -->
  <circle cx="510" cy="100" r="16" fill="#1a2a0a" stroke="#f59e0b" stroke-width="2">
    <animate attributeName="stroke-opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite"/>
  </circle>
  <text x="510" y="105" text-anchor="middle" fill="#f59e0b" font-size="10" font-weight="bold">⟳</text>
  <text x="510" y="130" text-anchor="middle" fill="#f59e0b" font-size="9" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Booking</text>
  <text x="510" y="143" text-anchor="middle" fill="#64748b" font-size="8" font-family="monospace">Phase 4</text>
  <text x="510" y="72" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Reservations</text>
  <text x="510" y="60" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Payments</text>

  <!-- Phase 5 - Planned -->
  <circle cx="630" cy="100" r="16" fill="#0a0f1a" stroke="#3b82f6" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="630" y="105" text-anchor="middle" fill="#3b82f6" font-size="10">○</text>
  <text x="630" y="130" text-anchor="middle" fill="#3b82f6" font-size="9" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Marketplace</text>
  <text x="630" y="143" text-anchor="middle" fill="#64748b" font-size="8" font-family="monospace">Phase 5</text>
  <text x="630" y="72" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Reviews</text>
  <text x="630" y="60" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Ratings</text>

  <!-- Phase 6 - Future -->
  <circle cx="740" cy="100" r="16" fill="#0a0f1a" stroke="#818cf8" stroke-width="1.5" stroke-dasharray="4,2"/>
  <text x="740" y="105" text-anchor="middle" fill="#818cf8" font-size="10">◇</text>
  <text x="740" y="130" text-anchor="middle" fill="#818cf8" font-size="9" font-family="'Segoe UI', Arial, sans-serif" font-weight="700">Intelligence</text>
  <text x="740" y="143" text-anchor="middle" fill="#64748b" font-size="8" font-family="monospace">Phase 6</text>
  <text x="740" y="72" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">AI Pricing</text>
  <text x="740" y="60" text-anchor="middle" fill="#64748b" font-size="8" font-family="'Segoe UI', Arial, sans-serif">Heatmaps</text>
</svg>

</div>

---

## 🛡️ Trust & Safety

<div align="center">

<!-- TRUST GRAPHIC -->
<svg width="700" height="80" viewBox="0 0 700 80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="trustBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#0d1a2e"/>
      <stop offset="100%" style="stop-color:#060d1a"/>
    </linearGradient>
  </defs>
  <rect width="700" height="80" rx="10" fill="url(#trustBg)" stroke="#1e3a5f" stroke-width="1"/>
  <text x="50" y="35" fill="#22c55e" font-size="10" font-family="'Segoe UI', Arial, sans-serif">✅ Verified Identity</text>
  <text x="50" y="55" fill="#22c55e" font-size="10" font-family="'Segoe UI', Arial, sans-serif">✅ Space Verification</text>
  <text x="200" y="35" fill="#22c55e" font-size="10" font-family="'Segoe UI', Arial, sans-serif">✅ Secure Payments</text>
  <text x="200" y="55" fill="#22c55e" font-size="10" font-family="'Segoe UI', Arial, sans-serif">✅ Booking History</text>
  <text x="370" y="35" fill="#22c55e" font-size="10" font-family="'Segoe UI', Arial, sans-serif">✅ Review Moderation</text>
  <text x="370" y="55" fill="#22c55e" font-size="10" font-family="'Segoe UI', Arial, sans-serif">✅ Fraud Detection</text>
  <text x="540" y="35" fill="#22c55e" font-size="10" font-family="'Segoe UI', Arial, sans-serif">✅ Emergency Support</text>
  <text x="540" y="55" fill="#22c55e" font-size="10" font-family="'Segoe UI', Arial, sans-serif">✅ Location Verified</text>
</svg>

</div>

Exact private-space information is restricted until a booking is confirmed.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License.

---

<!-- FOOTER BANNER -->
<div align="center">

<svg width="800" height="120" viewBox="0 0 800 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="footerBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a0f"/>
      <stop offset="100%" style="stop-color:#0d1117"/>
    </linearGradient>
    <linearGradient id="footerGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1d4ed8;stop-opacity:0"/>
      <stop offset="50%" style="stop-color:#3b82f6;stop-opacity:0.8"/>
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:0"/>
    </linearGradient>
    <pattern id="footerGrid" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
      <line x1="0" y1="15" x2="30" y2="15" stroke="#0d2a4a" stroke-width="0.3" opacity="0.4"/>
      <line x1="15" y1="0" x2="15" y2="30" stroke="#0d2a4a" stroke-width="0.3" opacity="0.4"/>
    </pattern>
  </defs>
  <rect width="800" height="120" rx="12" fill="url(#footerBg)"/>
  <rect width="800" height="120" rx="12" fill="url(#footerGrid)"/>
  <rect x="0" y="0" width="800" height="2" rx="1" fill="url(#footerGlow)"/>

  <!-- Parking markers scattered -->
  <circle cx="80" cy="60" r="8" fill="#052e16" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
  <text x="80" y="64" text-anchor="middle" fill="#22c55e" font-size="7" font-family="monospace">P</text>
  <circle cx="720" cy="60" r="8" fill="#052e16" stroke="#22c55e" stroke-width="1" opacity="0.6"/>
  <text x="720" y="64" text-anchor="middle" fill="#22c55e" font-size="7" font-family="monospace">P</text>
  <circle cx="150" cy="40" r="6" fill="#052e16" stroke="#22c55e" stroke-width="1" opacity="0.4"/>
  <circle cx="650" cy="80" r="6" fill="#052e16" stroke="#22c55e" stroke-width="1" opacity="0.4"/>

  <text x="400" y="48" text-anchor="middle" fill="white" font-size="28" font-family="'Segoe UI', Arial, sans-serif" font-weight="900">🅿️ ParkIn</text>
  <text x="400" y="70" text-anchor="middle" fill="#64748b" font-size="11" font-family="'Segoe UI', Arial, sans-serif" letter-spacing="2">YOUR CITY HAS SPACE. FIND IT.</text>
  <text x="400" y="92" text-anchor="middle" fill="#475569" font-size="10" font-family="'Segoe UI', Arial, sans-serif">Find a spot · Share a spot · ParkIn</text>

  <rect x="0" y="118" width="800" height="2" rx="1" fill="url(#footerGlow)"/>
</svg>

<br/>

**Built with ❤️ on [Rocket.new](https://rocket.new)**
