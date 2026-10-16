import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/images/products');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. Traliber Logo
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80" width="320" height="80" fill="none">
  <defs>
    <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8657F6"/>
      <stop offset="50%" stop-color="#788CF5"/>
      <stop offset="100%" stop-color="#55C7DE"/>
    </linearGradient>
    <filter id="logoGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#8657F6" flood-opacity="0.25"/>
    </filter>
  </defs>
  <!-- Monogram Mark -->
  <g filter="url(#logoGlow)">
    <path d="M24 16 C16 16 10 22 10 30 C10 42 26 38 26 50 C26 58 18 58 14 54" stroke="url(#brandGrad)" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M22 18 L50 18 M36 18 L36 62" stroke="url(#brandGrad)" stroke-width="6" stroke-linecap="round" fill="none"/>
    <circle cx="50" cy="18" r="4" fill="#55C7DE"/>
    <circle cx="36" cy="62" r="3.5" fill="#8657F6"/>
  </g>
  <!-- Brand Name Typography -->
  <text x="72" y="44" font-family="'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="28" font-weight="800" letter-spacing="3" fill="#22213A">TRALIBER</text>
  <text x="74" y="60" font-family="'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="9" font-weight="600" letter-spacing="4.5" fill="#788CF5">TRAVEL ESSENTIALS</text>
</svg>`;

// 2. Cotton Pouch - Closed
const pouchClosedSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 320" width="440" height="320" fill="none">
  <defs>
    <linearGradient id="pouchShadow" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#22213A" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#22213A" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="canvasGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="25%" stop-color="#F9F8FD"/>
      <stop offset="70%" stop-color="#F0EDF9"/>
      <stop offset="100%" stop-color="#E2DEEE"/>
    </linearGradient>
    <linearGradient id="zipperGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37"/>
      <stop offset="50%" stop-color="#FDF6C7"/>
      <stop offset="100%" stop-color="#AA820A"/>
    </linearGradient>
    <linearGradient id="ribbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8657F6"/>
      <stop offset="100%" stop-color="#55C7DE"/>
    </linearGradient>
    <pattern id="canvasWeave" width="8" height="8" patternUnits="userSpaceOnUse">
      <path d="M0 4 L8 4 M4 0 L4 8" stroke="#D8D4E5" stroke-width="0.75" stroke-opacity="0.45"/>
      <circle cx="2" cy="2" r="0.5" fill="#8657F6" fill-opacity="0.08"/>
      <circle cx="6" cy="6" r="0.5" fill="#788CF5" fill-opacity="0.08"/>
    </pattern>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#22213A" flood-opacity="0.16"/>
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#8657F6" flood-opacity="0.1"/>
    </filter>
  </defs>
  <!-- Floor Shadow -->
  <ellipse cx="220" cy="285" rx="170" ry="22" fill="url(#pouchShadow)"/>
  
  <!-- Main Pouch Body -->
  <g filter="url(#softShadow)">
    <!-- Base Shape -->
    <path d="M70 100 C70 85 85 75 110 75 L330 75 C355 75 370 85 370 100 L380 230 C380 258 358 275 330 275 L110 275 C82 275 60 258 60 230 Z" fill="url(#canvasGrad)"/>
    <path d="M70 100 C70 85 85 75 110 75 L330 75 C355 75 370 85 370 100 L380 230 C380 258 358 275 330 275 L110 275 C82 275 60 258 60 230 Z" fill="url(#canvasWeave)"/>
    
    <!-- Organic Canvas Folds and Volume -->
    <path d="M85 95 Q140 105 220 102 Q300 105 355 95" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.9"/>
    <path d="M95 245 Q160 260 220 258 Q280 260 345 245" stroke="#D1CCE0" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
    <path d="M90 120 Q80 180 85 235" stroke="#D6D1E3" stroke-width="1.5" stroke-dasharray="2 3"/>
    <path d="M350 120 Q360 180 355 235" stroke="#D6D1E3" stroke-width="1.5" stroke-dasharray="2 3"/>

    <!-- Double Stitching Rim -->
    <path d="M100 86 L340 86" stroke="#9E97B5" stroke-width="1.5" stroke-dasharray="4 3"/>
    <path d="M96 265 L344 265" stroke="#9E97B5" stroke-width="1.5" stroke-dasharray="4 3"/>

    <!-- Top Zipper Track (Closed) -->
    <rect x="100" y="70" width="240" height="10" rx="5" fill="#3D3A50"/>
    <path d="M102 75 L338 75" stroke="url(#zipperGold)" stroke-width="3.5" stroke-dasharray="3 2"/>

    <!-- Zipper Slider & Pull Tag -->
    <rect x="210" y="67" width="16" height="15" rx="3" fill="#D4AF37"/>
    <path d="M218 82 L218 108" stroke="#AA820A" stroke-width="3" stroke-linecap="round"/>
    <rect x="211" y="98" width="14" height="28" rx="4" fill="url(#ribbonGrad)"/>
    <circle cx="218" cy="104" r="2.5" fill="#FFFFFF"/>
    
    <!-- Front Minimalist Branding Label -->
    <rect x="160" y="150" width="120" height="58" rx="8" fill="#FFFFFF" stroke="#E5E2F0" stroke-width="1.5"/>
    <text x="220" y="177" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="14" font-weight="800" letter-spacing="2" fill="#22213A">TRALIBER</text>
    <text x="220" y="193" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="7" font-weight="600" letter-spacing="2" fill="#8657F6">TRAVEL KIT</text>
  </g>
</svg>`;

// 3. Cotton Pouch - Open (with interior depth and open zipper mouth)
const pouchOpenSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 360" width="460" height="360" fill="none">
  <defs>
    <linearGradient id="pouchShadow2" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#22213A" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#22213A" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="canvasGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="20%" stop-color="#F9F8FD"/>
      <stop offset="80%" stop-color="#EDEAF8"/>
      <stop offset="100%" stop-color="#DCD7EE"/>
    </linearGradient>
    <linearGradient id="innerCavity" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#181628"/>
      <stop offset="40%" stop-color="#28243E"/>
      <stop offset="100%" stop-color="#3D375B"/>
    </linearGradient>
    <linearGradient id="zipperGold2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37"/>
      <stop offset="50%" stop-color="#FDF6C7"/>
      <stop offset="100%" stop-color="#AA820A"/>
    </linearGradient>
    <linearGradient id="brandGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8657F6" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#55C7DE" stop-opacity="0.1"/>
    </linearGradient>
    <pattern id="canvasWeave2" width="8" height="8" patternUnits="userSpaceOnUse">
      <path d="M0 4 L8 4 M4 0 L4 8" stroke="#D8D4E5" stroke-width="0.75" stroke-opacity="0.45"/>
    </pattern>
    <filter id="softShadow2" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="22" stdDeviation="18" flood-color="#22213A" flood-opacity="0.18"/>
    </filter>
  </defs>
  <!-- Floor Shadow -->
  <ellipse cx="230" cy="325" rx="185" ry="24" fill="url(#pouchShadow2)"/>

  <g filter="url(#softShadow2)">
    <!-- Back Pouch Wall (Interior back) -->
    <path d="M90 120 C90 70 120 50 170 50 L290 50 C340 50 370 70 370 120 L385 270 C385 300 360 315 325 315 L135 315 C100 315 75 300 75 270 Z" fill="#201C33"/>
    
    <!-- Interior Cavity with Soft Glow -->
    <ellipse cx="230" cy="115" rx="140" ry="45" fill="url(#innerCavity)"/>
    <ellipse cx="230" cy="118" rx="120" ry="32" fill="url(#brandGlow)"/>

    <!-- Left & Right Upper Zipper Teeth Opened Wide -->
    <path d="M95 105 C130 65 190 60 215 62" stroke="url(#zipperGold2)" stroke-width="4" stroke-dasharray="4 2"/>
    <path d="M365 105 C330 65 270 60 245 62" stroke="url(#zipperGold2)" stroke-width="4" stroke-dasharray="4 2"/>

    <!-- Front Folded Down Pouch Body -->
    <path d="M85 130 C120 160 340 160 375 130 L385 260 C385 292 358 310 325 310 L135 310 C102 310 75 292 75 260 Z" fill="url(#canvasGrad2)"/>
    <path d="M85 130 C120 160 340 160 375 130 L385 260 C385 292 358 310 325 310 L135 310 C102 310 75 292 75 260 Z" fill="url(#canvasWeave2)"/>

    <!-- Front Rim Stitching & Flap Depth -->
    <path d="M86 132 C125 164 335 164 374 132" stroke="#FFFFFF" stroke-width="3.5" fill="none"/>
    <path d="M92 142 C130 172 330 172 368 142" stroke="#B8B2CB" stroke-width="1.5" stroke-dasharray="4 3" fill="none"/>
    <path d="M90 134 C130 165 330 165 370 134" stroke="url(#zipperGold2)" stroke-width="3" stroke-dasharray="3 2" fill="none"/>

    <!-- Front Label -->
    <rect x="170" y="200" width="120" height="56" rx="8" fill="#FFFFFF" stroke="#E5E2F0" stroke-width="1.5"/>
    <text x="230" y="226" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="14" font-weight="800" letter-spacing="2" fill="#22213A">TRALIBER</text>
    <text x="230" y="242" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="7" font-weight="600" letter-spacing="2" fill="#788CF5">OPEN REVEAL</text>
  </g>
</svg>`;

// 4. Tooth Brush
const toothBrushSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 120" width="280" height="120" fill="none">
  <defs>
    <linearGradient id="handleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EBE8F4"/>
      <stop offset="50%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#D7D2E8"/>
    </linearGradient>
    <linearGradient id="bristleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#55C7DE"/>
      <stop offset="50%" stop-color="#788CF5"/>
      <stop offset="100%" stop-color="#8657F6"/>
    </linearGradient>
    <linearGradient id="gripGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8657F6"/>
      <stop offset="100%" stop-color="#55C7DE"/>
    </linearGradient>
    <filter id="brushShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="2" dy="8" stdDeviation="6" flood-color="#22213A" flood-opacity="0.15"/>
    </filter>
  </defs>
  <g filter="url(#brushShadow)">
    <!-- Brush Handle -->
    <path d="M260 62 C260 70 240 72 200 70 C150 67 110 65 75 66 C50 67 35 62 25 58 C20 56 20 52 25 50 C38 46 55 52 75 52 C115 52 155 50 200 48 C240 46 260 52 260 62 Z" fill="url(#handleGrad)"/>
    
    <!-- Ergonomic Thumb Grip -->
    <rect x="135" y="54" width="40" height="9" rx="4.5" fill="url(#gripGrad)"/>
    <circle cx="145" cy="58.5" r="1.5" fill="#FFFFFF"/>
    <circle cx="155" cy="58.5" r="1.5" fill="#FFFFFF"/>
    <circle cx="165" cy="58.5" r="1.5" fill="#FFFFFF"/>

    <!-- Bristle Head Base & Bristles -->
    <rect x="25" y="32" width="38" height="20" rx="3" fill="url(#bristleGrad)"/>
    <!-- Bristle Rows -->
    <path d="M27 32 L27 48 M31 30 L31 48 M35 30 L35 48 M39 30 L39 48 M43 30 L43 48 M47 30 L47 48 M51 30 L51 48 M55 30 L55 48 M59 32 L59 48" stroke="#FFFFFF" stroke-width="1.2" stroke-opacity="0.7"/>
    
    <!-- Clear Protective Travel Cap Outline -->
    <rect x="18" y="26" width="52" height="34" rx="7" fill="#788CF5" fill-opacity="0.12" stroke="#788CF5" stroke-width="1.2" stroke-dasharray="2 1"/>
    
    <!-- Wordmark -->
    <text x="210" y="61" font-family="'Outfit', sans-serif" font-size="6" font-weight="700" letter-spacing="1" fill="#8657F6">TRALIBER</text>
  </g>
</svg>`;

// 5. Tablet Paste
const tabletPasteSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180" width="200" height="180" fill="none">
  <defs>
    <linearGradient id="tinMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="35%" stop-color="#EFEBF9"/>
      <stop offset="70%" stop-color="#D7D0EC"/>
      <stop offset="100%" stop-color="#BAAFDB"/>
    </linearGradient>
    <linearGradient id="tabletMint" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#D5F5FA"/>
    </linearGradient>
    <filter id="tinShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#22213A" flood-opacity="0.16"/>
    </filter>
  </defs>
  <g filter="url(#tinShadow)">
    <!-- Aluminum Circular Tin Body -->
    <ellipse cx="100" cy="98" rx="78" ry="58" fill="#B3A9CE"/>
    <ellipse cx="100" cy="92" rx="78" ry="58" fill="url(#tinMetallic)"/>
    <ellipse cx="100" cy="92" rx="70" ry="50" fill="none" stroke="#FFFFFF" stroke-width="2"/>

    <!-- Inner embossed label ring -->
    <ellipse cx="100" cy="92" rx="56" ry="38" fill="#F4F1FB" stroke="#D3CBE5" stroke-width="1.2"/>
    <text x="100" y="86" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="10" font-weight="800" letter-spacing="2" fill="#22213A">TRALIBER</text>
    <text x="100" y="99" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="6.5" font-weight="700" letter-spacing="1.5" fill="#788CF5">DENTAL TABLETS</text>
    <text x="100" y="110" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="6" font-weight="600" fill="#55C7DE">30 CHEWABLE TABS</text>

    <!-- Two decorative tablets resting on side -->
    <ellipse cx="152" cy="130" rx="14" ry="10" fill="url(#tabletMint)" stroke="#55C7DE" stroke-width="1"/>
    <line x1="144" y1="130" x2="160" y2="130" stroke="#788CF5" stroke-width="1" stroke-linecap="round"/>

    <ellipse cx="168" cy="116" rx="13" ry="9" fill="url(#tabletMint)" stroke="#55C7DE" stroke-width="1"/>
    <line x1="161" y1="116" x2="175" y2="116" stroke="#788CF5" stroke-width="1" stroke-linecap="round"/>
  </g>
</svg>`;

// 6. Wet Wipes (2) - Showing 2 distinct sachets
const wetWipesSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 200" width="240" height="200" fill="none">
  <defs>
    <linearGradient id="wipePack1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#F3EFFC"/>
      <stop offset="100%" stop-color="#E2DAF5"/>
    </linearGradient>
    <linearGradient id="wipePack2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="60%" stop-color="#EAF8FA"/>
      <stop offset="100%" stop-color="#D2EEF4"/>
    </linearGradient>
    <filter id="wipeShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="2" dy="10" stdDeviation="8" flood-color="#22213A" flood-opacity="0.14"/>
    </filter>
  </defs>
  <g filter="url(#wipeShadow)">
    <!-- Back Packet (Pack #2) -->
    <g transform="translate(30, 10) rotate(8, 100, 80)">
      <rect x="20" y="20" width="130" height="135" rx="14" fill="url(#wipePack2)" stroke="#C6E9F0" stroke-width="1.5"/>
      <rect x="20" y="20" width="130" height="8" fill="#B4E3EC" opacity="0.6"/>
      <rect x="20" y="147" width="130" height="8" fill="#B4E3EC" opacity="0.6"/>
      <rect x="50" y="55" width="70" height="38" rx="8" fill="#FFFFFF" stroke="#788CF5" stroke-width="1"/>
      <text x="85" y="74" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="7" font-weight="800" fill="#22213A">TRALIBER</text>
      <text x="85" y="84" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="5" font-weight="700" fill="#55C7DE">WET WIPE #2</text>
    </g>

    <!-- Front Packet (Pack #1) -->
    <g transform="translate(10, 20) rotate(-4, 90, 85)">
      <rect x="15" y="15" width="134" height="138" rx="14" fill="url(#wipePack1)" stroke="#D8CEF0" stroke-width="1.5"/>
      <!-- Sealed Crimp Edges -->
      <path d="M15 15 L149 15 M15 18 L149 18 M15 150 L149 150 M15 153 L149 153" stroke="#9E92C3" stroke-width="1" stroke-dasharray="2 2"/>
      
      <!-- Moisture Lock Resealable Flap -->
      <rect x="42" y="50" width="80" height="48" rx="10" fill="#FFFFFF" stroke="#8657F6" stroke-width="1.5"/>
      <text x="82" y="70" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="8.5" font-weight="800" letter-spacing="1" fill="#22213A">TRALIBER</text>
      <text x="82" y="82" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="6" font-weight="700" letter-spacing="0.5" fill="#8657F6">CLEANSING WIPE</text>
      <circle cx="82" cy="91" r="3" fill="#55C7DE"/>
      
      <!-- Badge (2 Pack indicator) -->
      <rect x="48" y="112" width="68" height="16" rx="8" fill="#F0ECFA"/>
      <text x="82" y="123" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="6" font-weight="700" fill="#788CF5">PACK OF 2 • 100% ECO</text>
    </g>
  </g>
</svg>`;

// 7. Wet Towel - Folded waffle texture
const wetTowelSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 180" width="220" height="180" fill="none">
  <defs>
    <linearGradient id="towelFabric" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#F8F6FD"/>
      <stop offset="100%" stop-color="#E5E0F2"/>
    </linearGradient>
    <pattern id="wafflePattern" width="6" height="6" patternUnits="userSpaceOnUse">
      <rect x="0" y="0" width="5" height="5" fill="none" stroke="#D3CCE5" stroke-width="0.8"/>
    </pattern>
    <filter id="towelShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="2" dy="10" stdDeviation="8" flood-color="#22213A" flood-opacity="0.14"/>
    </filter>
  </defs>
  <g filter="url(#towelShadow)">
    <!-- Folded Towel Base Stack -->
    <!-- Bottom layer fold -->
    <rect x="25" y="65" width="170" height="55" rx="12" fill="#D8D1EB"/>
    <!-- Middle layer fold -->
    <rect x="25" y="52" width="170" height="55" rx="12" fill="#EAE5F6"/>
    <!-- Top layer fold -->
    <rect x="25" y="40" width="170" height="55" rx="12" fill="url(#towelFabric)"/>
    <rect x="25" y="40" width="170" height="55" rx="12" fill="url(#wafflePattern)"/>

    <!-- Realistic Fold Curvatures -->
    <path d="M25 65 C40 85 180 85 195 65" stroke="#FFFFFF" stroke-width="2" fill="none"/>
    <path d="M25 90 C40 108 180 108 195 90" stroke="#CDC6DF" stroke-width="2" fill="none"/>

    <!-- Paper Band Wrapping with Branding -->
    <rect x="85" y="38" width="50" height="78" rx="4" fill="#22213A"/>
    <rect x="87" y="40" width="46" height="74" rx="3" fill="#312E4E"/>
    <text x="110" y="70" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="6.5" font-weight="800" fill="#FFFFFF" letter-spacing="1">TRALIBER</text>
    <line x1="93" y1="76" x2="127" y2="76" stroke="#55C7DE" stroke-width="1"/>
    <text x="110" y="86" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="5" font-weight="600" fill="#788CF5">WET TOWEL</text>
  </g>
</svg>`;

// 8. Toilet Seat Cover (2) - Showing 2 units / accurate dual unit representation
const toiletSeatCoverSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 190" width="220" height="190" fill="none">
  <defs>
    <linearGradient id="coverPack" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="70%" stop-color="#F2EEFA"/>
      <stop offset="100%" stop-color="#DFD6F4"/>
    </linearGradient>
    <filter id="coverShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="2" dy="10" stdDeviation="8" flood-color="#22213A" flood-opacity="0.13"/>
    </filter>
  </defs>
  <g filter="url(#coverShadow)">
    <!-- Unit #2 (Underneath slightly offset) -->
    <g transform="translate(18, 12) rotate(6, 90, 80)">
      <rect x="20" y="20" width="140" height="120" rx="10" fill="#E0D7F5" stroke="#BFB2E0" stroke-width="1.2"/>
      <rect x="25" y="25" width="130" height="110" rx="8" fill="#ECE5FA"/>
      <text x="90" y="78" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="7" font-weight="700" fill="#8657F6">UNIT #2</text>
    </g>

    <!-- Unit #1 (Top unit) -->
    <g transform="translate(5, 5)">
      <rect x="20" y="20" width="146" height="126" rx="10" fill="url(#coverPack)" stroke="#C7BBE6" stroke-width="1.5"/>
      
      <!-- Embossed Fold Lines -->
      <line x1="20" y1="62" x2="166" y2="62" stroke="#D1C7EB" stroke-width="1.5" stroke-dasharray="3 3"/>
      <line x1="20" y1="104" x2="166" y2="104" stroke="#D1C7EB" stroke-width="1.5" stroke-dasharray="3 3"/>
      
      <!-- Sanitary Icon Symbol -->
      <circle cx="93" cy="54" r="16" fill="#F4F0FD" stroke="#788CF5" stroke-width="1.2"/>
      <!-- Toilet seat silhouette -->
      <ellipse cx="93" cy="54" rx="8" ry="11" fill="none" stroke="#8657F6" stroke-width="2"/>
      <ellipse cx="93" cy="54" rx="4" ry="6" fill="#F4F0FD" stroke="#788CF5" stroke-width="1.5"/>

      <!-- Label text -->
      <text x="93" y="86" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="8.5" font-weight="800" letter-spacing="1" fill="#22213A">TRALIBER</text>
      <text x="93" y="98" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="6" font-weight="700" fill="#788CF5">TOILET SEAT COVER</text>
      
      <!-- Quantity marker -->
      <rect x="58" y="112" width="70" height="18" rx="9" fill="#8657F6" fill-opacity="0.12"/>
      <text x="93" y="124" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="6.5" font-weight="800" fill="#8657F6">2 PACK • HYGIENIC</text>
    </g>
  </g>
</svg>`;

// 9. Face Mask - 3D ergonomic mask
const faceMaskSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 180" width="240" height="180" fill="none">
  <defs>
    <linearGradient id="maskFabric" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="40%" stop-color="#F5F3FC"/>
      <stop offset="100%" stop-color="#DDD6F2"/>
    </linearGradient>
    <filter id="maskShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#22213A" flood-opacity="0.14"/>
    </filter>
  </defs>
  <g filter="url(#maskShadow)">
    <!-- Left Elastic Loop -->
    <path d="M50 75 C10 65 5 115 50 105" stroke="#B8AEDB" stroke-width="3" fill="none" stroke-linecap="round"/>
    <!-- Right Elastic Loop -->
    <path d="M190 75 C230 65 235 115 190 105" stroke="#B8AEDB" stroke-width="3" fill="none" stroke-linecap="round"/>

    <!-- Mask Main Contour -->
    <path d="M45 80 C60 45 120 40 120 40 C120 40 180 45 195 80 C205 110 185 140 120 145 C55 140 35 110 45 80 Z" fill="url(#maskFabric)" stroke="#C6BBE7" stroke-width="1.5"/>
    
    <!-- Central Ergonomic Nose Seam -->
    <path d="M120 40 L120 145" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M120 40 L120 145" stroke="#B5A8DA" stroke-width="1" stroke-dasharray="3 2"/>

    <!-- Embedded Nose Bridge Clip -->
    <path d="M95 48 Q120 44 145 48" stroke="#8657F6" stroke-width="2" stroke-linecap="round"/>

    <!-- Breathable Micro-Pleats -->
    <path d="M60 85 Q120 92 180 85" stroke="#D0C7EA" stroke-width="1.2" fill="none"/>
    <path d="M68 105 Q120 114 172 105" stroke="#D0C7EA" stroke-width="1.2" fill="none"/>

    <!-- Woven Brand Tag on Edge -->
    <rect x="52" y="70" width="16" height="20" rx="3" fill="#8657F6"/>
    <text x="60" y="82" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="5" font-weight="800" fill="#FFFFFF">TL</text>
  </g>
</svg>`;

// 10. Paper Soap - Flip-top travel case with sheets
const paperSoapSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 180" width="200" height="180" fill="none">
  <defs>
    <linearGradient id="soapCase" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#E8F9FC"/>
      <stop offset="50%" stop-color="#D7EEFA"/>
      <stop offset="100%" stop-color="#C2E2F5"/>
    </linearGradient>
    <filter id="soapShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="2" dy="8" stdDeviation="6" flood-color="#22213A" flood-opacity="0.13"/>
    </filter>
  </defs>
  <g filter="url(#soapShadow)">
    <!-- Case Base -->
    <rect x="40" y="35" width="120" height="105" rx="18" fill="url(#soapCase)" stroke="#A9D7EE" stroke-width="2"/>
    
    <!-- Transparent Window / Flip Top Lid -->
    <rect x="50" y="45" width="100" height="85" rx="12" fill="#FFFFFF" fill-opacity="0.6" stroke="#55C7DE" stroke-width="1.2"/>
    
    <!-- Thin Paper Soap Leaves Peeking Out -->
    <rect x="62" y="60" width="76" height="42" rx="4" fill="#F8EAFE" stroke="#E6C4FC" stroke-width="1"/>
    <rect x="64" y="56" width="72" height="42" rx="4" fill="#FEF4EB" stroke="#FBD9BC" stroke-width="1"/>
    <rect x="66" y="52" width="68" height="42" rx="4" fill="#E8F9FC" stroke="#BCE9F4" stroke-width="1"/>
    
    <!-- Hinge Details -->
    <rect x="85" y="32" width="30" height="6" rx="3" fill="#788CF5"/>

    <!-- Branding Text -->
    <text x="100" y="112" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="7.5" font-weight="800" fill="#22213A">TRALIBER</text>
    <text x="100" y="122" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="5" font-weight="700" fill="#788CF5">50 PAPER SOAP SHEETS</text>
  </g>
</svg>`;

// 11. Mini Sanitizer (5) - Showing individual and group
const miniSanitizerSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 200" width="280" height="200" fill="none">
  <defs>
    <linearGradient id="sanitizerBottle" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="30%" stop-color="#EEF9FC" stop-opacity="0.8"/>
      <stop offset="70%" stop-color="#E2F2FC" stop-opacity="0.85"/>
      <stop offset="100%" stop-color="#D0E8FA" stop-opacity="0.95"/>
    </linearGradient>
    <linearGradient id="sprayCap" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8657F6"/>
      <stop offset="50%" stop-color="#788CF5"/>
      <stop offset="100%" stop-color="#55C7DE"/>
    </linearGradient>
    <filter id="sanitizerShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="2" dy="8" stdDeviation="6" flood-color="#22213A" flood-opacity="0.14"/>
    </filter>
  </defs>

  <!-- 5 Fan-out Bottles -->
  <g filter="url(#sanitizerShadow)">
    <!-- Bottle 1 (-20 deg) -->
    <g transform="translate(60, 110) rotate(-22)">
      <rect x="-14" y="-55" width="28" height="75" rx="10" fill="url(#sanitizerBottle)" stroke="#A9DCEE" stroke-width="1.2"/>
      <rect x="-8" y="-72" width="16" height="18" rx="3" fill="url(#sprayCap)"/>
      <rect x="-10" y="-35" width="20" height="40" rx="3" fill="#FFFFFF" fill-opacity="0.9"/>
      <text x="0" y="-12" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="4" font-weight="800" fill="#8657F6">#1</text>
    </g>

    <!-- Bottle 2 (-11 deg) -->
    <g transform="translate(100, 105) rotate(-11)">
      <rect x="-14" y="-55" width="28" height="75" rx="10" fill="url(#sanitizerBottle)" stroke="#A9DCEE" stroke-width="1.2"/>
      <rect x="-8" y="-72" width="16" height="18" rx="3" fill="url(#sprayCap)"/>
      <rect x="-10" y="-35" width="20" height="40" rx="3" fill="#FFFFFF" fill-opacity="0.9"/>
      <text x="0" y="-12" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="4" font-weight="800" fill="#8657F6">#2</text>
    </g>

    <!-- Bottle 3 (Center 0 deg) -->
    <g transform="translate(140, 102)">
      <rect x="-15" y="-58" width="30" height="78" rx="11" fill="url(#sanitizerBottle)" stroke="#89CCE8" stroke-width="1.5"/>
      <!-- Liquid level -->
      <path d="M-13 -10 Q0 -7 13 -10 L13 18 Q0 20 -13 18 Z" fill="#55C7DE" fill-opacity="0.25"/>
      <rect x="-9" y="-77" width="18" height="20" rx="4" fill="url(#sprayCap)"/>
      <circle cx="0" cy="-68" r="1.5" fill="#FFFFFF"/>
      <!-- Label -->
      <rect x="-11" y="-38" width="22" height="42" rx="4" fill="#FFFFFF"/>
      <text x="0" y="-24" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="4" font-weight="800" fill="#22213A">TRALIBER</text>
      <text x="0" y="-16" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="3" font-weight="700" fill="#788CF5">MIST</text>
      <text x="0" y="-8" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="2.5" font-weight="600" fill="#55C7DE">75%</text>
      <text x="0" y="0" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="3" font-weight="800" fill="#8657F6">#3</text>
    </g>

    <!-- Bottle 4 (+11 deg) -->
    <g transform="translate(180, 105) rotate(11)">
      <rect x="-14" y="-55" width="28" height="75" rx="10" fill="url(#sanitizerBottle)" stroke="#A9DCEE" stroke-width="1.2"/>
      <rect x="-8" y="-72" width="16" height="18" rx="3" fill="url(#sprayCap)"/>
      <rect x="-10" y="-35" width="20" height="40" rx="3" fill="#FFFFFF" fill-opacity="0.9"/>
      <text x="0" y="-12" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="4" font-weight="800" fill="#8657F6">#4</text>
    </g>

    <!-- Bottle 5 (+22 deg) -->
    <g transform="translate(220, 110) rotate(22)">
      <rect x="-14" y="-55" width="28" height="75" rx="10" fill="url(#sanitizerBottle)" stroke="#A9DCEE" stroke-width="1.2"/>
      <rect x="-8" y="-72" width="16" height="18" rx="3" fill="url(#sprayCap)"/>
      <rect x="-10" y="-35" width="20" height="40" rx="3" fill="#FFFFFF" fill-opacity="0.9"/>
      <text x="0" y="-12" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="4" font-weight="800" fill="#8657F6">#5</text>
    </g>
  </g>

  <!-- Fan Label Tag -->
  <rect x="95" y="152" width="90" height="20" rx="10" fill="#22213A"/>
  <text x="140" y="165" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="7" font-weight="800" fill="#55C7DE" letter-spacing="1">5x MINI BOTTLES</text>
</svg>`;

// 12. Cutlery Kit - Slim travel casing with spoon, fork, chopsticks
const cutleryKitSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 160" width="240" height="160" fill="none">
  <defs>
    <linearGradient id="cutleryCase" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2D2B4A"/>
      <stop offset="50%" stop-color="#3D3A62"/>
      <stop offset="100%" stop-color="#24223A"/>
    </linearGradient>
    <linearGradient id="metalSilver" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#E7E5F0"/>
      <stop offset="100%" stop-color="#C2BCD6"/>
    </linearGradient>
    <filter id="cutleryShadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="2" dy="8" stdDeviation="6" flood-color="#22213A" flood-opacity="0.16"/>
    </filter>
  </defs>
  <g filter="url(#cutleryShadow)">
    <!-- Protective Travel Case -->
    <rect x="25" y="45" width="190" height="70" rx="18" fill="url(#cutleryCase)" stroke="#524E7E" stroke-width="1.5"/>
    
    <!-- Cutlery Inside (Slide-out visual tray) -->
    <!-- Fork -->
    <path d="M42 62 L90 62 M90 56 L125 56 M90 60 L125 60 M90 64 L125 64 M90 68 L125 68" stroke="url(#metalSilver)" stroke-width="2.2" stroke-linecap="round"/>
    
    <!-- Spoon -->
    <path d="M42 80 L88 80" stroke="url(#metalSilver)" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="106" cy="80" rx="18" ry="10" fill="url(#metalSilver)" stroke="#AFA7C9" stroke-width="1"/>

    <!-- Reusable Travel Chopsticks -->
    <line x1="42" y1="98" x2="128" y2="95" stroke="url(#metalSilver)" stroke-width="2" stroke-linecap="round"/>
    <line x1="42" y1="102" x2="128" y2="100" stroke="url(#metalSilver)" stroke-width="2" stroke-linecap="round"/>

    <!-- Case Clip & Branding -->
    <rect x="135" y="45" width="70" height="70" rx="14" fill="#1C1B2E"/>
    <text x="170" y="78" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="7" font-weight="800" fill="#FFFFFF" letter-spacing="1">TRALIBER</text>
    <text x="170" y="88" text-anchor="middle" font-family="'Outfit', sans-serif" font-size="5" font-weight="700" fill="#55C7DE">CUTLERY KIT</text>
    <circle cx="170" cy="98" r="2.5" fill="#8657F6"/>
  </g>
</svg>`;

// Write all assets to public/images/products and public/images/
fs.writeFileSync(path.join(outDir, 'cotton-pouch-closed.svg'), pouchClosedSvg);
fs.writeFileSync(path.join(outDir, 'cotton-pouch-open.svg'), pouchOpenSvg);
fs.writeFileSync(path.join(outDir, 'toothbrush.svg'), toothBrushSvg);
fs.writeFileSync(path.join(outDir, 'tablet-paste.svg'), tabletPasteSvg);
fs.writeFileSync(path.join(outDir, 'wet-wipes.svg'), wetWipesSvg);
fs.writeFileSync(path.join(outDir, 'wet-towel.svg'), wetTowelSvg);
fs.writeFileSync(path.join(outDir, 'toilet-seat-cover.svg'), toiletSeatCoverSvg);
fs.writeFileSync(path.join(outDir, 'face-mask.svg'), faceMaskSvg);
fs.writeFileSync(path.join(outDir, 'paper-soap.svg'), paperSoapSvg);
fs.writeFileSync(path.join(outDir, 'mini-sanitizer.svg'), miniSanitizerSvg);
fs.writeFileSync(path.join(outDir, 'cutlery-kit.svg'), cutleryKitSvg);

fs.writeFileSync(path.resolve('public/images/traliber-logo.svg'), logoSvg);

console.log('All 12 premium vector product assets successfully generated!');
