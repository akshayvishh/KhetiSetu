# KhetiSetu (खेतीसेतू)

> **Connecting farmers directly to buyers.**
> A production-quality agricultural marketplace with integrated delivery logistics and agricultural workforce services.

---

## 🌾 Overview

KhetiSetu bridges the gap between Indian farmers (cultivators & FPOs), wholesale APMC merchants, food processors, retail chains, and rural freight carriers. By removing middleman commissions (0% platform take-rate) and embedding transparent weighing, escrow protection, and cold-chain haulage, KhetiSetu guarantees fair price realization for growers and fresh harvests for buyers.

---

## 🎨 Brand & Design System

Built on the **Agri-Modernism** design language from Stitch:
- **Primary Brand:** Deep Forest Green (`#08241A`) — navigation anchors, primary buttons, structural hierarchy.
- **Canvas / Background:** Warm Off-White (`#FDF9F0`) — easy-on-the-eyes organic background.
- **Secondary Accent:** Earth Brown (`#785838`) — regional tags, categorical metadata.
- **Highlight Accent:** Terracotta (`#C86A3D`) — alerts, in-transit telemetry milestones, action highlights.
- **Typography:**
  - Headings & Display: **Sora** (weights 600, 700, 800)
  - Body & Data: **Inter** (weights 400, 500, 600, 700)
- **Geometry:** 12px for interactive controls, 16–24px for bento cards, 40px organic curvatures for hero and footer containers.
- **Elevation:** Diffused soil shadows (`rgba(120, 88, 56, 0.06)`).

---

## 🚀 Key Modules & Features

### 1. Public Website (`/`)
- **Live Mandi Ticker:** Real-time simulated modal rates across Maharashtra APMC markets (Nashik Onion, Baramati Pomegranate, Narayangaon Tomato, etc.).
- **Editorial Hero Section:** Display headline, direct crop search bar, popular Maharashtra crop tags, and direct CTAs.
- **Featured Harvests Grid:** Live inventory cards with direct order actions.
- **How It Works:** Interactive 4-step walkthrough for Farmers, Buyers, and Logistics Haulers.
- **Core Benefits Bento Grid:** Zero-commission policy, cold-chain freight, and workforce sourcing.
- **Corridor Footer:** Supply routes (Nashik–Mumbai, Pune–Navi Mumbai, Sangli–Kolhapur), kisan newsletter subscription, and clear simulation disclaimer.

### 2. Authentication & Role Selection (`/auth`)
- Login and registration with role picker: **Farmer**, **Buyer**, **Delivery Partner**.
- Role-tailored signup forms:
  - *Farmer:* Land acreage, primary crops, farm name, taluka/district.
  - *Buyer:* Business firm name, procurement category (Wholesale, Supermarket, Processor, Restaurant).
  - *Delivery Partner:* Vehicle type (Tempo, 14ft Truck, Refrigerated Reefer), vehicle registration number, operating corridors.
- Simulated OTP code verification and password reset flow.
- One-click quick login pills for immediate evaluation.

### 3. Farmer Dashboard (`/farmer`)
- **Inventory CRUD:** Add, edit, delete, and view produce listings with crop name, category, quantity, unit (kg, quintal, crate, tonne), price per unit, harvest date, location, and organic certification.
- **Buyer Orders Management:** Review incoming purchase requests, accept orders, decline orders, and update packing status.
- **Haulage Dispatch:** One-click initiate carrier pickup request (Tempo / Container Truck / Reefer) for farm-gate collection.
- **Farm Overview:** Land holding, soil health certifications, and cumulative direct revenue tracker.

### 4. Buyer Marketplace (`/marketplace`)
- Search by crop, farmer name, or location.
- Multi-faceted filtering: Category (Vegetables, Fruits, Grains, Pulses, Spices), District (Nashik, Pune, Sangli, Solapur, etc.), Max Price range slider, and Organic Certified toggle.
- Produce Details Modal: High-resolution images, cultivator phone contact, quality grade (Grade A+ Export, Grade A Premium, Grade B), shelf life, and dynamic price calculator.
- Add to Cart and Instant Buy Now flows.

### 5. Cart & Simulated Escrow Checkout (`/cart`, `/checkout`)
- **Procurement Cart:** Quantity increment/decrement, unit conversions, automatic freight estimation, transparent 0% platform fee breakdown.
- **Simulated Checkout:** Delivery address form, requested delivery slot, and settlement selection (Simulated Escrow Protection or Pay on Delivery).
- Automatic dispatch of corresponding delivery load to the logistics fleet.

### 6. Order History & Live Tracking (`/orders`)
- Chronological order history with fulfillment statuses (`pending`, `accepted`, `in_transit`, `delivered`).
- Fulfillment milestone stepper.
- **Simulated GPS Telemetry Modal:** Interactive vector route map (Nashik to Vashi APMC corridor), live speed (km/h), current landmark, and estimated time of arrival with prominent `SIMULATED GPS TELEMETRY` labeling.
- One-click delivery confirmation that unlocks escrow settlement.

### 7. Delivery & Logistics Hub (`/logistics`)
- Dedicated driver & carrier portal with vehicle filters (1.5T-3T Tempo, Container Truck, Insulated Reefer).
- Open load bidding / acceptance.
- Mile tracking: Mark departed farm gate, mark arrived at buyer destination.
- **Transit Documents Modal:** Paperless attachment and inspection of Lorry Receipt (LR Copy), APMC Weighbridge Weight Slip, and Commercial Tax Invoice / e-Way Bill.

### 8. Agricultural Workforce & Jobs (`/jobs`)
- Search and filter jobs by category: Farm Workers & Labor, Driver / Logistics Hauler, Vehicle & Tempo Rental, Agri Services & Drones.
- Job application modal with experience details, daily wage expectation, and notes.
- Post a Job modal for growers seeking harvest crews or equipment.

### 9. Platform Administration Portal (`/admin`)
- Operations overview: Registered users by role, active commodity volume (₹ Lakhs), order status breakdown.
- **User Verification Management:** Toggle verification status (Grant/Revoke Verified Badge) for farmers and commercial drivers.
- **Produce Moderation:** Delete non-compliant or flagged listings.
- **Freight Corridors Oversight:** Active loads, document attachment status, and route legs.
- **Reset Demo Database:** One-click restoration of initial Maharashtra sample datasets.

---

## 🛠️ Technology Stack

- **Framework:** React 19 + TypeScript
- **Bundler / Dev Server:** Vite
- **Routing:** React Router v7
- **Styling:** Vanilla CSS design tokens (`src/index.css`) adhering to Agri-Modernism principles
- **Icons:** Lucide React
- **Data Layer:** LocalStorage-backed reactive Context (`src/context/AppContext.tsx`) with zero external API dependencies

---

## 🏃 Running the Application Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the Vite development server
npm run dev

# 3. Open in your browser:
# http://localhost:5173/
```

### Production Build & Linting

```bash
# Type check and build bundle
npm run build

# Code linting
npm run lint
```
