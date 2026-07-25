# Stratos Empire Simulator 🚀

Stratos Empire Simulator is a high-fidelity, interactive founder simulation dashboard built with **React** and **Vite**. It gamifies startup operations, corporate governance, and macro-environmental crisis survival. Rather than managing ideal growth curves, founders are exposed to realistic market chaos, rival pricing wars, employee poaching attempts, and an opinionated Board of Directors.

---

## 🌟 Hackathon-Winning Features

### 1. Generative "Black Swan" Event Engine
- **Unpredictable Crises**: The simulation dynamically rolls for random macro-environmental shocks (15% monthly probability), including ad-network crashes, venture copycats, database corruptions, server loops, or lead engineer exit threats.
- **War Room Morphing State**: When a crisis triggers, the application locks navigation sidebar tabs and time progression, instantly morphing into a crimson warning layout with flashing alert ambient indicators. You must formulate a strategic resolution strategy to resume operations.

### 2. Autonomous "Agentic" Board of Directors
- **Virtual Advisors**: A live chat-feed panel on the dashboard houses your board directors:
  - **Vikram (VC)**: Growth at all costs, ARR valuation multiples, aggressive budgets.
  - **Sarah (CFO)**: Runway preservation, cost freezing, treasury buffers, margin health.
  - **Kenji (Product Lead)**: Code quality, user community satisfaction, roadmap speed.
- **Reactive Debates**: Monitors state mutations. Whenever you adjust user prices, hire staff, secure VC funding, or execute natural language commands, the board immediately starts a live debate showing conflicting perspectives.

### 3. Competitor Swarm Simulation
- **Evolving AI Rival**: A shadow startup (**AlphaSync** or **GeneVance**) scales in parallel. 
- **Pricing Undercuts**: If you raise prices too high, the competitor undercuts you and poaches users. If you underfund R&D, they release features first to steal market share.
- **Employee Poaching Popups**: Ticking months triggers a poaching attempt. The competitor offers your developers a 35% wage premium. You must counter-offer (matching the raise) or let them exit (losing 20% roadmap progress).

### 4. Natural Language "Prompt-to-Pivot" CommandCenter
- **Conversational Restructuring**: Type spoken commands directly into the glowing terminal bar at the top of the header:
  - `"pivot to healthcare"`: Restructures into an Enterprise MedTech suite ($499/mo clinic pricing, sticky 1% churn, clinical partners, Dr. Aaron hire).
  - `"engage austerity / cut costs"`: Slashes marketing & R&D spend, discounts pricing by 15%, lays off excess staff.
  - `"viral growth mode"`: Doubles marketing budgets, lowers CAC by 30%, discounts user pricing.
  - `"poach competitor developers"`: Pays $60K sign-on to recruit Cynthia (Principal AI Architect) from your rival.
- **Instant UI Remap**: The engine instantly overrides state variables, displays a success notification overlay, and triggers a board debate.

### 5. Holographic Cockpit Splash Screen
- A 6-second animated boot sequence recreating a spaceship command-room control board.
- Renders glowing concentric hologram loops, a building + chart vector logo, server racks with blinking LEDs, digital world maps, diagnostic console logs, and a segmented loader bar.

### 6. Glassmorphic Onboarding Portal
- A glassmorphic login panel allowing founders to log in, name their startup, select an archetype (Bootstrapped, VC-funded, or DeepTech R&D), and customize starting metrics (cash, users, price) dynamically.

---

## 🛠️ Technology Stack
- **Library**: React 19
- **Build Tool**: Vite
- **Data Visualizations**: Recharts (with `react-is` compiler resolution)
- **Icons**: Lucide React
- **Styling**: Vanilla CSS (Tailored glassmorphism, responsive flex grids, keyframe glows, custom theme togglers)

---

## 📦 Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/stratos-empire-simulator.git
   cd stratos-empire-simulator
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Local Dev Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build Production Assets**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```
stratos-empire-simulator/
├── public/
├── src/
│   ├── components/
│   │   ├── BoardOfDirectors.jsx    # Live board chat bubbles
│   │   ├── CommandCenter.jsx       # NLP Prompt-to-Pivot bar
│   │   ├── CompetitorSwarm.jsx      # You vs Rival comparison charts
│   │   ├── Customizer.jsx          # Theme selector & widgets toggle
│   │   ├── Dashboard.jsx           # Main KPI & chart widgets
│   │   ├── Financials.jsx          # Funding rounds & runway calculators
│   │   ├── LoginOnboard.jsx        # Onboarding custom metric configurations
│   │   ├── Logo.jsx                # Monogram vector monogram
│   │   ├── MetricCard.jsx          # Mini widgets with line charts
│   │   ├── RoadmapExpansion.jsx    # Milestones & market regions unlock
│   │   ├── Sidebar.jsx             # Collapsible primary navigation
│   │   ├── SimulationControls.jsx  # Time tick progress actions
│   │   ├── SplashScreen.jsx        # Cockpit bootscreen
│   │   └── WarRoom.jsx             # Crisis selection interface
│   ├── utils/
│   │   └── mockData.js             # Simulation presets & calculators
│   ├── App.jsx                     # State orchestrator & event loops
│   ├── index.css                   # Global glassmorphic themes & warning keyframes
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```
