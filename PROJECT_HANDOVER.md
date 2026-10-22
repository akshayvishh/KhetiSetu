# KhetiSetu (खेतीसेतू) — Project Handover Document

> **Status Date:** 2026-10-22  
> **Repository:** `C:\Users\AKSHAY\OneDrive\Desktop\KhetiSetu`  
> **Git Branch:** `main` (commit `a7dde42` - clean working tree)  
> **Primary Technology:** React 19 + TypeScript + Vite 8 + Vanilla CSS (Agri-Modernism Design System)

---

## A. Project Overview

- **Project Name:** KhetiSetu (खेतीसेतू)
- **Brand Positioning:** *Connecting farmers directly to buyers.*
- **Purpose:** A production-quality, direct farmer-to-buyer agricultural trade platform for Maharashtra, incorporating transparent weighing, simulated escrow payment protection, scheduled farm-gate refrigerated/tempo logistics, and rural agricultural workforce hiring with 0% middleman platform commissions.
- **Target Users:**
  1. **Farmers / Cultivators / FPOs:** Listing crop harvests, receiving direct wholesale orders, dispatching from farm gate.
  2. **Buyers:** APMC commission agents, supermarket chains, food processing companies, and bulk institutional buyers procuring fresh harvests.
  3. **Delivery Partners / Rural Haulers:** Commercial tempo (1.5T–3T), container truck (14–19ft), and refrigerated reefer drivers bidding on corridor trips.
  4. **Agricultural Workers & Service Providers:** Seasonal harvest crews, tractor/equipment rental operators, and drone spraying technicians.
  5. **Platform Administrators:** Verifying grower land records, authenticating commercial drivers, moderating catalog listings, and monitoring freight corridors.
- **Technology Stack:**
  - **Framework:** React 19.3 (`react`, `react-dom`)
  - **Language:** TypeScript 6.0 (`strict`, bundler module resolution)
  - **Routing:** React Router v7.18 (`react-router-dom`)
  - **Icons:** Lucide React (`lucide-react`)
  - **Styling:** Pure Vanilla CSS design tokens (`src/index.css`) — no Tailwind dependency
  - **State & Data Layer:** LocalStorage-backed reactive React Context (`src/context/AppContext.tsx`)

---

## B. Original Requirements & Design System

- **Source of Truth for Visual Design:** Stitch MCP Project `2048120824324214119` (*"The Modern Acre"* / *Agri-Modernism* design system).
- **Brand Renaming:** All occurrences of "Agraria" / "IdeaLab" renamed strictly to **KhetiSetu**.
- **Color Palette (Tokens in `src/index.css`):**
  - **Primary:** Deep Forest Green `#08241A` (`--color-primary`) — used for navigation anchors, primary buttons, and high-level structure.
  - **Canvas Background:** Warm Off-White `#FDF9F0` (`--color-background`) — tactile, non-fatiguing agricultural canvas.
  - **Secondary:** Earth Brown `#785838` (`--color-secondary`) — metadata tags, regional corridor tags.
  - **Terracotta Accent:** `#C86A3D` (`--color-terracotta`) — active transit highlights, notifications, alerts.
  - **Surfaces Tonal Ladder:**
    - Lowest: `#FFFFFF` (Cards, active inputs)
    - Low: `#F7F3EA` (Sections, inactive input fields)
    - Container: `#F1EEE5` (Cards, stepper backdrops)
    - High: `#ECE8DF` (Input fills, chips)
    - Highest: `#E6E2D9` (Card borders, dividers)
- **Typography:**
  - **Headings & Display:** `Sora` (weights: 600, 700, 800) with tight tracking (`-0.015em` to `-0.025em`).
  - **Body & Data Tables:** `Inter` (weights: 400, 500, 600, 700).
- **Key Geometric Rules (Must Not Be Changed):**
  - **Corners:** 12px for buttons, pills, and input fields; 16–24px for bento cards; 40px organic corner radii on hero and footer sections.
  - **Shadows:** Diffused ambient soil shadows (`box-shadow: 0 16px 32px -4px rgba(120, 88, 56, 0.06)`).
  - **Boundaries:** Soft tonal background shifts instead of rigid 1px solid black borders.

---

## C. Implementation Status

| Feature/Module | Status | Implemented Files | What Works | What's Missing / Untested |
|---|---|---|---|---|
| **Public Landing Page** | Completed | `src/pages/HomePage.tsx`<br>`src/components/home/MandiTicker.tsx`<br>`src/components/home/HeroSection.tsx`<br>`src/components/home/FeaturedProduce.tsx`<br>`src/components/home/HowItWorks.tsx`<br>`src/components/home/BenefitsSection.tsx` | Live running APMC Mandi rates ticker (Nashik, Baramati, Narayangaon, etc.); direct crop search input with query parameter forwarding to marketplace; quick crop tags; featured harvest cards with direct cart actions; interactive 3-role tabs (Farmers, Buyers, Haulers); responsive bento grid. | Fully working. Visual rendering verified via HTTP 200 server response; browser subagent UI session was blocked by environment Playwright driver CDN 404. |
| **Shared Navigation & Layout** | Completed | `src/components/common/Navbar.tsx`<br>`src/components/common/Footer.tsx`<br>`src/components/common/SimulatedBanner.tsx`<br>`src/components/common/Toast.tsx` | Sticky navbar with logo, route links, cart item count badge; quick one-click demo role switcher (Farmer, Buyer, Delivery, Admin); mobile drawer menu; persistent top simulation warning banner; reset demo database button; toast notification alerts. | Fully functional. |
| **Authentication & Role Selection** | Completed | `src/pages/AuthPage.tsx` | Mode tabs (Sign In, Register, Forgot Password, Reset OTP); role switcher for registration (Farmer, Buyer, Delivery); role-specific validation (Farm acreage & crops for Farmer, business name & buyer type for Buyer, vehicle type & registration for Delivery); pre-filled demo account buttons; password reset OTP simulation. | LocalStorage-based auth simulation; no external OAuth/backend (as requested by constraints). |
| **Buyer Marketplace** | Completed | `src/pages/MarketplacePage.tsx` | Multi-faceted search and filter engine: search by crop/farmer/location; category chips (All, Vegetables, Fruits, Grains, Pulses, Spices); district dropdown (Nashik, Pune, Sangli, etc.); organic-only checkbox; price range slider (up to ₹15,000); sorting (featured, price asc/desc, quantity); product detail modal with farmer contact, grade, shelf life, and dynamic price calculator; Add to Cart & Buy Now buttons. | Fully functional. |
| **Cart & Checkout** | Completed | `src/pages/CartPage.tsx`<br>`src/pages/CheckoutPage.tsx` | Reactive shopping cart with quantity increment/decrement, remove item, clear cart; subtotal, automatic distance freight calculation, ₹0 platform trade fee; checkout delivery address form (street, city, district, pincode, landmark); delivery slot date picker; settlement method choice (Simulated Escrow Protection or Cash on Delivery); order creation and automatic delivery freight load dispatch. | Fully functional. |
| **Order History & Live Tracking** | Completed | `src/pages/OrdersPage.tsx`<br>`src/components/logistics/TrackingMapMock.tsx` | Order list filtered by status tabs (All, Pending, In Transit, Delivered); item breakdowns; payment status indicators; milestone progress stepper; modal with vector simulated GPS map displaying vehicle coordinates, speed (km/h), progress along Nashik–Kasara–Vashi corridor, and estimated arrival; "Confirm Delivery & Release Escrow" action. | Fully functional. |
| **Farmer Dashboard** | Completed | `src/pages/FarmerDashboardPage.tsx` | Farmer profile overview (farm holding, acreage, certifications, direct revenue metrics); produce inventory CRUD (Add crop harvest modal, edit listing, delete listing, organic toggle, grade selector); incoming buyer orders review with Accept Order, Decline Order, and Pack Consignment actions; one-click "Request Pickup Hauler" modal. | Fully functional. |
| **Delivery Partner & Logistics** | Completed | `src/pages/LogisticsPage.tsx`<br>`src/components/logistics/TrackingMapMock.tsx`<br>`src/components/logistics/DocumentUploadModal.tsx` | Separate carrier dashboard; tabs for Available Loads, Active In-Transit, and Delivered records; vehicle type classification (Tempo, Truck, Refrigerated Reefer); freight earnings calculation; driver actions (Accept Load, Mark Departed Farm Gate, Confirm Unloaded at Mandi); interactive simulated GPS map modal; transit documents modal (uploading and inspecting simulated LR copy, weighbridge slip, and e-Way bill). | Fully functional. |
| **Agricultural Jobs & Workforce** | Completed | `src/pages/JobsPage.tsx` | Search and filter jobs across 4 categories (Farm Labor, Driver/Logistics, Vehicle Rental, Agri Services); job details modal with requirements; job application modal (name, phone, location, years of experience, equipment availability); "Post a Job" form modal with title, compensation, duration, openings, and requirements. | Fully functional. |
| **Admin Operations Interface** | Completed | `src/pages/AdminPage.tsx` | Metrics overview (grower count, buyer accounts, carrier fleet, listed commodity volume); live order pipeline table; user verification management (toggle verified badge on farmers and drivers); catalog moderation (delete flagged produce listings); freight corridor monitoring; reset demo database button. | Fully functional. |
| **Shared Data Layer & Mock State** | Completed | `src/context/AppContext.tsx`<br>`src/data/mockData.ts`<br>`src/types/index.ts` | Complete TypeScript data contracts; realistic Maharashtra sample data (Nashik Red Onion, Baramati Pomegranate, Narayangaon Tomatoes, Sharbati Wheat, Sangli Turmeric, etc.); reactive localStorage synchronization for users, produce, orders, cart, deliveries, and jobs. | Fully functional. |

---

## D. Exact Technical State

### 1. Folder Structure
```
c:\Users\AKSHAY\OneDrive\Desktop\KhetiSetu\
├── public\
│   └── favicon.svg
├── src\
│   ├── assets\
│   ├── components\
│   │   ├── common\
│   │   │   ├── Badge.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── SimulatedBanner.tsx
│   │   │   └── Toast.tsx
│   │   ├── home\
│   │   │   ├── BenefitsSection.tsx
│   │   │   ├── FeaturedProduce.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   └── MandiTicker.tsx
│   │   └── logistics\
│   │       ├── DocumentUploadModal.tsx
│   │       └── TrackingMapMock.tsx
│   ├── context\
│   │   └── AppContext.tsx
│   ├── data\
│   │   └── mockData.ts
│   ├── pages\
│   │   ├── AdminPage.tsx
│   │   ├── AuthPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── FarmerDashboardPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── JobsPage.tsx
│   │   ├── LogisticsPage.tsx
│   │   ├── MarketplacePage.tsx
│   │   └── OrdersPage.tsx
│   ├── types\
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── .oxlintrc.json
├── .gitignore
├── README.md
└── PROJECT_HANDOVER.md
```

### 2. Routes & Navigation Flow
- `/` — Homepage (MandiTicker, HeroSection, FeaturedProduce, HowItWorks, BenefitsSection, Fleet Teasers, Footer).
- `/marketplace` — Buyer Marketplace with live search, filters, and produce details modal.
- `/cart` — Purchase Order Cart with quantity adjustments and freight calculation.
- `/checkout` — Delivery Address & Simulated Escrow Checkout.
- `/orders` — Order history, fulfillment stepper, and Simulated GPS telemetry map modal.
- `/farmer` — Farmer inventory CRUD, incoming buyer orders, and haulage request trigger.
- `/logistics` — Carrier hub with available loads, active trips, simulated GPS map, and document uploads.
- `/jobs` — Rural workforce & rental marketplace with application and job creation modals.
- `/admin` — State agri-operations portal with verification toggles and moderation actions.
- `/auth` — Role selection, login, registration, and simulated OTP password reset.
- `*` — Wildcard redirect to `/`.

### 3. State Management & LocalStorage
`AppContext.tsx` automatically loads and persists the following keys in browser `localStorage`:
- `khetisetu_users_v1`: User profiles (farmers, buyers, carriers, admin).
- `khetisetu_current_user_id_v1`: ID of currently active user.
- `khetisetu_produce_v1`: Produce inventory listings.
- `khetisetu_cart_v1`: Buyer cart items.
- `khetisetu_orders_v1`: Orders and timeline events.
- `khetisetu_deliveries_v1`: Haulage requests and mock GPS data.
- `khetisetu_jobs_v1`: Agricultural job listings.
- `khetisetu_applications_v1`: Job applications.

### 4. Git Branch & Commit Status
- **Branch:** `main`
- **Commit:** `a7dde42` (*"feat: complete KhetiSetu frontend implementation with marketplace, logistics, jobs, and admin modules"*)
- **Working Tree:** Clean (zero uncommitted files prior to creating this handover document).

### 5. Running the Application
```bash
# Development server (starts on http://localhost:5173/)
npm run dev

# Production build test
npm run build

# Code linting
npm run lint
```

---

## E. Bugs & Verification Results

### 1. Verification Runs
- **TypeScript & Vite Build (`npm run build`):** **PASSED (Exit code 0)**. Output:
  ```
  vite v8.3.5 building client environment for production...
  ✓ 1965 modules transformed.
  dist/index.html                   1.44 kB │ gzip:   0.82 kB
  dist/assets/index-uqGngubz.css    9.30 kB │ gzip:   2.51 kB
  dist/assets/index-BLlnlOF-.js   471.70 kB │ gzip: 125.54 kB
  ✓ built in 969ms
  ```
- **Code Linting (`npm run lint` / OxLint):** **PASSED (Exit code 0)**. 0 errors.
- **Local Dev Server HTTP Check:** **PASSED (`HTTP 200 OK`)** on `http://localhost:5173/`.
- **Browser Subagent Session:** **FAILED at environment level**. The Playwright driver download failed with `HTTP 404` when fetching from Azure CDN (`playwright.azureedge.net`). Interactive browser screenshots/videos could not be recorded due to this machine-level dependency download error.

### 2. Known Limitations & Notes
- All simulated backends (escrow payments, GPS telemetry, OTP codes) are deliberately decoupled from external APIs in accordance with the project constraints.
- Image URLs in `mockData.ts` use Unsplash agricultural photography. When offline, fallback alt text and container backgrounds render cleanly.

---

## F. Remaining Work — Prioritized

1. **Production Deployment / Static Preview (Priority: Medium)**
   - Files: `vite.config.ts`, `dist/`
   - Task: Configure base path if deploying to GitHub Pages or a subfolder.
2. **Additional Crop Data Presets (Priority: Low)**
   - File: `src/data/mockData.ts`
   - Task: Add more regional varieties (e.g. Kolhapur Jaggery, Nagpur Oranges, Ratnagiri Alphonso Mangoes, Jalgaon Bananas) to expand the catalog showcase.
3. **PWA / Offline Service Worker (Priority: Low)**
   - Files: `public/manifest.json`, `src/main.tsx`
   - Task: Add offline caching manifest for rural farmers with intermittent cellular connectivity.

---

## G. Next Session Instructions

1. **Step 1:** Open `PROJECT_HANDOVER.md` and verify that the Vite dev server is running on `http://localhost:5173/` (`npm run dev`).
2. **Step 2:** DO NOT reinstall dependencies or recreate components. All 10 routes and common components exist and are fully functional.
3. **Step 3:** If you wish to test or demo:
   - Navigate to `http://localhost:5173/`.
   - Use the Navbar Role Switcher to toggle between **Farmer (Ramesh)**, **Buyer (Anand)**, **Delivery (Sachin)**, and **Admin**.
   - Create a listing in `/farmer` -> Verify it appears in `/marketplace` -> Buy it via `/cart` & `/checkout` -> Observe the load generated in `/logistics` -> Inspect the telemetry in `/orders`.
4. **Step 4:** If extending any UI, reuse tokens from `src/index.css` (Deep Forest `#08241A`, Warm Off-White `#FDF9F0`, Earth Brown `#785838`, Terracotta `#C86A3D`) and typography (`Sora` + `Inter`).

---

## H. Resume Prompt

```markdown
RESUME KHETISETU

You are continuing the frontend implementation and maintenance of KhetiSetu, a farmer-to-buyer agricultural marketplace with delivery logistics and farm job services.

Before doing anything:
1. Read `PROJECT_HANDOVER.md` in the workspace root to understand what was completed, the architecture, and design decisions.
2. Inspect the current workspace files (`src/`, `package.json`, `src/index.css`) to verify the state before making any changes.
3. The application is built with React 19 + TypeScript + Vite + Vanilla CSS, with full LocalStorage-backed state in `src/context/AppContext.tsx`.
4. Do not regenerate the project, do not install Tailwind or external APIs, and do not rebuild existing working modules unnecessarily.
5. Reuse the Agri-Modernism design system (Deep Forest `#08241A`, Warm Off-White `#FDF9F0`, Earth Brown `#785838`, Terracotta `#C86A3D`, Sora + Inter fonts).
6. Run `npm run build` and `npm run lint` to verify any modifications.
```
