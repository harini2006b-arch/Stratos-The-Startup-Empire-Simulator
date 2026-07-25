// Presets and simulation calculations for the Stratos Empire Simulator

export const STARTUP_PRESETS = {
  bootstrapped: {
    id: 'bootstrapped',
    name: 'Bootstrapped SaaS',
    tagline: 'Lean, capital-efficient, customer-funded growth.',
    description: 'Grow organically using cash flow from customers. Low starting capital, low burn, but high ownership and control.',
    valuation: 1200000, // $1.2M
    monthlyRevenue: 35000, // $35k
    cashBalance: 120000, // $120k
    activeUsers: 1200,
    marketingSpend: 5000,
    rdSpend: 8000,
    pricePerUser: 29, // $29/mo
    churnRate: 0.03, // 3% monthly churn
    cac: 45, // $45 Customer Acquisition Cost
    competitor: {
      name: 'SaaSify',
      valuation: 900000,
      monthlyRevenue: 28000,
      activeUsers: 950,
      rdProgress: 35,
      pricing: 25
    },
    employees: [
      { id: 1, name: 'Alex (Founder)', role: 'Product & Sales', salary: 5000, dept: 'Product' },
      { id: 2, name: 'Sarah', role: 'Fullstack Dev', salary: 6000, dept: 'Engineering' },
      { id: 3, name: 'David', role: 'Growth Marketer', salary: 4000, dept: 'Marketing' }
    ],
    history: [
      { name: 'Jan', Revenue: 22000, Profit: -2000, Users: 800, Cash: 110000, Valuation: 800000 },
      { name: 'Feb', Revenue: 25000, Profit: 500, Users: 900, Cash: 110500, Valuation: 900000 },
      { name: 'Mar', Revenue: 27500, Profit: 1000, Users: 1000, Cash: 111500, Valuation: 980000 },
      { name: 'Apr', Revenue: 30000, Profit: 2000, Users: 1050, Cash: 113500, Valuation: 1050000 },
      { name: 'May', Revenue: 32500, Profit: 3000, Users: 1120, Cash: 116500, Valuation: 1120000 },
      { name: 'Jun', Revenue: 35000, Profit: 4500, Users: 1200, Cash: 120000, Valuation: 1200000 }
    ],
    roadmap: [
      { id: 'mvp', name: 'Core SaaS MVP', stage: 'MVP', status: 'completed', progress: 100, cost: 20000, desc: 'Initial release of core software' },
      { id: 'stripe', name: 'Stripe Billing System', stage: 'Beta', status: 'completed', progress: 100, cost: 10000, desc: 'Subscription automation and checkout' },
      { id: 'integrations', name: 'Third-party Integrations', stage: 'Launch', status: 'in-progress', progress: 65, cost: 30000, desc: 'Slack, Notion, and HubSpot plug-ins' },
      { id: 'mobile', name: 'Mobile Companion App', stage: 'Expansion', status: 'planned', progress: 0, cost: 50000, desc: 'iOS and Android client apps' },
      { id: 'enterprise', name: 'Enterprise Security Suite', stage: 'Scale', status: 'planned', progress: 0, cost: 100000, desc: 'SSO, SAML, and SOC2 compliance' }
    ],
    fundingRounds: [
      { round: 'Founder Share', amount: 50000, valuation: 500000, date: 'Jan 2025', investor: 'Founders', dilution: 100 }
    ],
    expansionMarkets: [
      { id: 'us', name: 'North America', status: 'unlocked', cost: 0, potUsers: 50000, revenueMultiplier: 1.2 },
      { id: 'eu', name: 'Europe Union', status: 'locked', cost: 40000, potUsers: 35000, revenueMultiplier: 1.0 },
      { id: 'asia', name: 'APAC Region', status: 'locked', cost: 75000, potUsers: 60000, revenueMultiplier: 0.8 }
    ]
  },
  hypergrowth: {
    id: 'hypergrowth',
    name: 'VC-funded Hyper-growth',
    tagline: 'Scale at all costs, capture the market.',
    description: 'Fuel exponential growth using institutional venture capital. High starting cash, massive burn, rapid hiring, aggressive market penetration.',
    valuation: 12400000, // $12.4M (matches Image 1)
    monthlyRevenue: 420000, // $420K (matches Image 1)
    cashBalance: 2800000, // $2.8M (matches Image 1)
    activeUsers: 32450, // 32,450 (matches Image 1)
    marketingSpend: 120000,
    rdSpend: 150000,
    pricePerUser: 15, // $15/mo (mass market SaaS price)
    churnRate: 0.05, // 5% monthly churn
    cac: 25, // $25 Customer Acquisition Cost (competitive ads)
    competitor: {
      name: 'AlphaSync',
      valuation: 9500000,
      monthlyRevenue: 320000,
      activeUsers: 22000,
      rdProgress: 40,
      pricing: 14
    },
    employees: [
      { id: 1, name: 'Elena', role: 'CEO & Co-founder', salary: 12000, dept: 'Operations' },
      { id: 2, name: 'Marcus', role: 'CTO & Co-founder', salary: 12000, dept: 'Product' },
      { id: 3, name: 'Sanjay', role: 'VP of Engineering', salary: 15000, dept: 'Engineering' },
      { id: 4, name: 'Rachel', role: 'Head of Growth', salary: 11000, dept: 'Marketing' },
      { id: 5, name: 'Tariq', role: 'Account Executive', salary: 8000, dept: 'Sales' },
      // 40 generic hires categorized by dept for budget reasons
      ...Array.from({ length: 40 }, (_, i) => ({
        id: 6 + i,
        name: `Team Member ${i + 1}`,
        role: i % 4 === 0 ? 'Senior Engineer' : i % 4 === 1 ? 'Product Manager' : i % 4 === 2 ? 'Account Exec' : 'Designer',
        salary: 7500,
        dept: i % 4 === 0 ? 'Engineering' : i % 4 === 1 ? 'Product' : i % 4 === 2 ? 'Sales' : 'Marketing'
      }))
    ],
    history: [
      { name: 'Jan', Revenue: 210000, Profit: -310000, Users: 18000, Cash: 4300000, Valuation: 8500000 },
      { name: 'Feb', Revenue: 260000, Profit: -280000, Users: 21500, Cash: 4020000, Valuation: 9200000 },
      { name: 'Mar', Revenue: 310000, Profit: -250000, Users: 24000, Cash: 3770000, Valuation: 10000000 },
      { name: 'Apr', Revenue: 350000, Profit: -220000, Users: 27200, Cash: 3550000, Valuation: 10800000 },
      { name: 'May', Revenue: 390000, Profit: -190000, Users: 30100, Cash: 3360000, Valuation: 11600000 },
      { name: 'Jun', Revenue: 420000, Profit: -160000, Users: 32450, Cash: 2800000, Valuation: 12400000 }
    ],
    roadmap: [
      { id: 'mvp', name: 'Beta Launch', stage: 'MVP', status: 'completed', progress: 100, cost: 150000, desc: 'Initial release to early adopters' },
      { id: 'recommender', name: 'AI Recommendation Engine', stage: 'Beta', status: 'completed', progress: 100, cost: 250000, desc: 'Smart algorithms to personalize feed' },
      { id: 'multitenant', name: 'Enterprise Multi-tenancy', stage: 'Launch', status: 'in-progress', progress: 40, cost: 500000, desc: 'Supporting massive corporate structures' },
      { id: 'localization', name: 'Multi-lingual App & Localization', stage: 'Expansion', status: 'planned', progress: 0, cost: 200000, desc: 'Support EU and Asian languages' },
      { id: 'platform', name: 'Developer API Platform', stage: 'Scale', status: 'planned', progress: 0, cost: 750000, desc: 'App store and webhooks for integrations' }
    ],
    fundingRounds: [
      { round: 'Seed', amount: 1500000, valuation: 6000000, date: 'Jun 2024', investor: 'Nexus Ventures', dilution: 25 },
      { round: 'Series A', amount: 4000000, valuation: 16000000, date: 'Jan 2026', investor: 'Apex Capital', dilution: 20 }
    ],
    expansionMarkets: [
      { id: 'us', name: 'North America', status: 'unlocked', cost: 0, potUsers: 250000, revenueMultiplier: 1.0 },
      { id: 'eu', name: 'Europe Union', status: 'locked', cost: 300000, potUsers: 200000, revenueMultiplier: 1.1 },
      { id: 'asia', name: 'APAC Region', status: 'locked', cost: 500000, potUsers: 350000, revenueMultiplier: 0.9 }
    ]
  },
  biotech: {
    id: 'biotech',
    name: 'R&D-Heavy DeepTech',
    tagline: 'High science, high risk, astronomical returns.',
    description: 'Build scientific innovations (e.g. quantum chips, gene editing). Zero initial revenues, heavy lab equipment expenses, massive capital needs, long product cycles.',
    valuation: 25000000, // $25.0M
    monthlyRevenue: 0, // $0 (Scientific stage)
    cashBalance: 8500000, // $8.5M
    activeUsers: 8, // Represents scientific partners / clinic trial centers
    marketingSpend: 1000, // No ads, only PR
    rdSpend: 320000, // Enormous lab expenditure
    pricePerUser: 0, // N/A early on
    churnRate: 0.0,
    cac: 5000, // Partner sign-on cost
    competitor: {
      name: 'GeneVance',
      valuation: 18000000,
      monthlyRevenue: 0,
      activeUsers: 5,
      rdProgress: 25,
      pricing: 0
    },
    employees: [
      { id: 1, name: 'Dr. Evelyn', role: 'Chief Scientist & Founder', salary: 14000, dept: 'Product' },
      { id: 2, name: 'Dr. Liam', role: 'Principal Geneticist', salary: 13000, dept: 'Engineering' },
      { id: 3, name: 'Sarah', role: 'Lab Ops Director', salary: 9000, dept: 'Operations' },
      { id: 4, name: 'Nils', role: 'Patent Attorney', salary: 15000, dept: 'Operations' },
      ...Array.from({ length: 16 }, (_, i) => ({
        id: 5 + i,
        name: `Research Fellow ${i + 1}`,
        role: 'Research Scientist',
        salary: 9500,
        dept: 'Engineering'
      }))
    ],
    history: [
      { name: 'Jan', Revenue: 0, Profit: -350000, Users: 2, Cash: 10250000, Valuation: 20000000 },
      { name: 'Feb', Revenue: 0, Profit: -360000, Users: 4, Cash: 9890000, Valuation: 21000000 },
      { name: 'Mar', Revenue: 0, Profit: -380000, Users: 4, Cash: 9510000, Valuation: 22000000 },
      { name: 'Apr', Revenue: 0, Profit: -400000, Users: 6, Cash: 9110000, Valuation: 23000000 },
      { name: 'May', Revenue: 0, Profit: -420000, Users: 7, Cash: 8690000, Valuation: 24000000 },
      { name: 'Jun', Revenue: 0, Profit: -450000, Users: 8, Cash: 8500000, Valuation: 25000000 }
    ],
    roadmap: [
      { id: 'mvp', name: 'In-Vitro Lab Synthesis', stage: 'MVP', status: 'completed', progress: 100, cost: 800000, desc: 'Synthesize the gene editor structure in petri-dishes' },
      { id: 'preclinical', name: 'Pre-clinical Trials', stage: 'Beta', status: 'in-progress', progress: 75, cost: 2000000, desc: 'Animal model safety and toxicity assays' },
      { id: 'phase1', name: 'Phase I FDA Clinical Trials', stage: 'Launch', status: 'planned', progress: 0, cost: 5000000, desc: 'Small human cohort safety tests' },
      { id: 'phase2', name: 'Phase II Efficacy Trials', stage: 'Expansion', status: 'planned', progress: 0, cost: 12000000, desc: 'Larger cohort dosage and efficacy verification' },
      { id: 'commercial', name: 'Commercial Launch Licensing', stage: 'Scale', status: 'planned', progress: 0, cost: 25000000, desc: 'Global pharma distribution licensing deal' }
    ],
    fundingRounds: [
      { round: 'Seed Round', amount: 3000000, valuation: 12000000, date: 'May 2024', investor: 'Helix Capital', dilution: 25 },
      { round: 'Series A', amount: 8000000, valuation: 24000000, date: 'Apr 2025', investor: 'BioFuture Fund', dilution: 33 }
    ],
    expansionMarkets: [
      { id: 'us', name: 'Clinical Site North America', status: 'unlocked', cost: 0, potUsers: 25, revenueMultiplier: 1.0 },
      { id: 'eu', name: 'Clinical Site Europe', status: 'locked', cost: 800000, potUsers: 20, revenueMultiplier: 1.2 },
      { id: 'asia', name: 'Clinical Site Japan & APAC', status: 'locked', cost: 1500000, potUsers: 30, revenueMultiplier: 0.9 }
    ]
  }
};

// Tick the simulation forward by 1 month
export function calculateNextMonth(currentState) {
  const {
    id,
    activeUsers,
    cashBalance,
    marketingSpend,
    rdSpend,
    pricePerUser,
    employees,
    churnRate,
    cac,
    history,
    roadmap,
    expansionMarkets,
    competitor
  } = currentState;

  // 1. Calculate Payroll expenses
  const monthlySalaryCost = employees.reduce((total, emp) => total + emp.salary, 0);

  // 2. Adjust growth factors depending on R&D and Marketing spend
  const engineersCount = employees.filter(emp => emp.dept === 'Engineering').length;
  const productCount = employees.filter(emp => emp.dept === 'Product').length;
  const salesCount = employees.filter(emp => emp.dept === 'Sales').length;
  const marketingCount = employees.filter(emp => emp.dept === 'Marketing').length;

  let newUsers = activeUsers;
  let monthlyRevenue = 0;
  let actualCac = cac;

  if (id === 'biotech') {
    const partnerAcquisitionCost = 150000;
    const newPartnersGained = Math.floor((marketingSpend / partnerAcquisitionCost) + (rdSpend > 200000 ? 1 : 0));
    newUsers = activeUsers + newPartnersGained;
    
    const phase2Completed = roadmap.find(m => m.id === 'phase2')?.status === 'completed';
    const phase1Completed = roadmap.find(m => m.id === 'phase1')?.status === 'completed';
    const preclinicalCompleted = roadmap.find(m => m.id === 'preclinical')?.status === 'completed';

    if (phase2Completed) {
      monthlyRevenue = newUsers * 500000;
    } else if (phase1Completed) {
      monthlyRevenue = newUsers * 80000;
    } else if (preclinicalCompleted) {
      monthlyRevenue = newUsers * 15000;
    } else {
      monthlyRevenue = 0;
    }
  } else {
    const marketingBonus = 1 + (marketingCount * 0.15);
    const cacDiscount = 1 - Math.min(0.4, (productCount * 0.05));
    actualCac = Math.max(5, cac * cacDiscount);
    
    const organicGrowth = id === 'bootstrapped' ? 0.02 : 0.04;
    const marketingAcquisition = marketingSpend / actualCac * marketingBonus;
    
    const productQualityBonus = Math.min(0.5, (engineersCount * 0.02) + (rdSpend / 100000));
    const finalChurn = Math.max(0.01, churnRate * (1 - productQualityBonus));
    
    const churnedUsers = Math.floor(activeUsers * finalChurn);
    const addedUsers = Math.floor((activeUsers * organicGrowth) + marketingAcquisition);
    
    const unlockedMarkets = expansionMarkets.filter(m => m.status === 'unlocked');
    const marketCapacityMultiplier = unlockedMarkets.reduce((total, m) => total + m.revenueMultiplier, 0);

    newUsers = Math.max(0, activeUsers + addedUsers - churnedUsers);
    
    const arpuUpsell = 1 + (salesCount * 0.08);
    monthlyRevenue = Math.floor(newUsers * pricePerUser * arpuUpsell * (marketCapacityMultiplier / unlockedMarkets.length));
  }

  // Calculate costs
  const infraCostPerUser = id === 'biotech' ? 2000 : 0.5;
  const serverCosts = Math.floor(newUsers * infraCostPerUser);
  const totalBurn = monthlySalaryCost + marketingSpend + rdSpend + serverCosts;

  const profit = monthlyRevenue - totalBurn;
  const newCash = cashBalance + profit;

  // Recalculate Valuation
  let newValuation = 0;
  if (id === 'biotech') {
    const baseIPVal = 10000000;
    const milestoneBonus = roadmap.reduce((total, r) => total + (r.status === 'completed' ? r.cost * 3 : r.status === 'in-progress' ? r.cost * 0.8 : 0), 0);
    newValuation = Math.floor(baseIPVal + milestoneBonus + newCash * 0.5);
  } else {
    const arr = monthlyRevenue * 12;
    const multiple = id === 'bootstrapped' ? 4 : 15;
    newValuation = Math.floor(arr * multiple + newCash);
  }

  // Update Roadmap items
  const totalDevProgressPower = (engineersCount * 8) + (rdSpend / 15000);
  const updatedRoadmap = roadmap.map(milestone => {
    if (milestone.status === 'in-progress') {
      const newProgress = milestone.progress + totalDevProgressPower;
      if (newProgress >= 100) {
        return { ...milestone, progress: 100, status: 'completed' };
      }
      return { ...milestone, progress: Math.min(99, Math.floor(newProgress)) };
    }
    return milestone;
  });

  const hasInProgress = updatedRoadmap.some(m => m.status === 'in-progress');
  if (!hasInProgress) {
    const nextPlannedIndex = updatedRoadmap.findIndex(m => m.status === 'planned');
    if (nextPlannedIndex !== -1) {
      updatedRoadmap[nextPlannedIndex].status = 'in-progress';
    }
  }

  // Competitor Swarm Simulation Ticks
  const comp = competitor || { name: 'AlphaSync', valuation: 9000000, revenue: 300000, activeUsers: 20000, rdProgress: 40, pricing: 14 };
  const competitorOrganic = id === 'biotech' ? 0.04 : 0.055;
  let compUsers = comp.activeUsers + Math.floor(comp.activeUsers * competitorOrganic);
  let competitorNewsAlert = null;
  let poachedEmployeeAlert = null;

  // Pricing Wars: Competitor undercuts if player pricing is high
  if (id !== 'biotech' && pricePerUser > comp.pricing) {
    const priceDiff = pricePerUser - comp.pricing;
    const userLeakage = Math.floor(newUsers * (priceDiff / 150) * 0.08);
    newUsers = Math.max(0, newUsers - userLeakage);
    compUsers += userLeakage;
    if (userLeakage > 100) {
      competitorNewsAlert = `${comp.name} undercuts you at $${comp.pricing}/mo, poaching ${userLeakage.toLocaleString()} users.`;
    }
  }

  // R&D Competition: If player underfunds R&D, competitor releases feature first
  const playerRDUnderfunded = rdSpend < (id === 'hypergrowth' ? 80000 : 5000);
  const compRDIncrement = playerRDUnderfunded ? 14 : 7;
  let compRD = comp.rdProgress + compRDIncrement;
  if (compRD >= 100) {
    compRD = 0;
    const userLost = Math.floor(newUsers * 0.08);
    newUsers = Math.max(0, newUsers - userLost);
    compUsers += userLost;
    competitorNewsAlert = `${comp.name} shipped their product update first, poaching 8% of your users!`;
  }

  // Employee Poaching Alert roll (8% monthly chance)
  if (Math.random() < 0.08 && employees.length > 2) {
    // Pick random non-founder employee
    const eligible = employees.filter(e => e.id !== 1);
    if (eligible.length > 0) {
      const target = eligible[Math.floor(Math.random() * eligible.length)];
      poachedEmployeeAlert = {
        employeeId: target.id,
        employeeName: target.name,
        role: target.role,
        currentSalary: target.salary,
        rivalOffer: Math.floor(target.salary * 1.35),
        rivalName: comp.name
      };
    }
  }

  const compRevenue = id === 'biotech' ? 0 : Math.floor(compUsers * comp.pricing);
  const compValuation = id === 'biotech' ? comp.valuation + 800000 : Math.floor(compRevenue * 12 * 10 + 100000);
  
  const updatedCompetitor = {
    ...comp,
    activeUsers: compUsers,
    monthlyRevenue: compRevenue,
    valuation: compValuation,
    rdProgress: compRD,
    newsAlert: competitorNewsAlert
  };

  // Update History list
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const lastMonthName = history[history.length - 1]?.name || 'Jun';
  const nextMonthIndex = (monthNames.indexOf(lastMonthName) + 1) % 12;
  const nextMonthName = monthNames[nextMonthIndex];

  const updatedHistory = [
    ...history,
    {
      name: nextMonthName,
      Revenue: monthlyRevenue,
      Profit: profit,
      Users: newUsers,
      Cash: Math.max(0, newCash),
      Valuation: newValuation
    }
  ];
  if (updatedHistory.length > 12) {
    updatedHistory.shift();
  }

  // Roll for random Black Swan event (15% chance, if no event is already active)
  let activeEvent = currentState.activeEvent;
  if (!activeEvent && Math.random() < 0.15) {
    const eventsList = [
      {
        id: 'competitor_clone',
        title: '🚨 Competitor Clone Launched!',
        description: 'A venture-backed copycat has launched a clone of your software at half the price. Customers are inquiring about matching their price.',
        options: [
          {
            text: 'File patent lawsuit ($100K legal fee)',
            cost: 100000,
            impact: 'Protects market share, stabilizes churn. Deducts $100K from cash.',
            type: 'competitor_clone_lawsuit'
          },
          {
            text: 'Slash prices by 30% to compete',
            cost: 0,
            impact: 'Permanent 30% drop in user pricing, churn rate increases by 25%.',
            type: 'competitor_clone_slash'
          },
          {
            text: 'Invest $80K in unique features sprint',
            cost: 80000,
            impact: 'Rushes roadmap progress by +40% instantly, preserves pricing.',
            type: 'competitor_clone_rd'
          }
        ]
      },
      {
        id: 'ad_network_crash',
        title: '📉 Ad-Network Channel Crash',
        description: 'Major advertising networks have updated privacy algorithms, causing your acquisition ads to crash. Active CAC has surged.',
        options: [
          {
            text: 'Shift to organic influencer partnerships ($30K)',
            cost: 30000,
            impact: 'Acquisition CAC increases by 25%, but keeps user growth moving.',
            type: 'ad_crash_influencer'
          },
          {
            text: 'Halt all marketing budget for the month',
            cost: 0,
            impact: 'Marketing spend goes to $0, active user base drops by 10% due to loss of visibility.',
            type: 'ad_crash_halt'
          }
        ]
      },
      {
        id: 'key_employee_exit',
        title: '👋 Lead Engineer Exit Request',
        description: 'Your lead developer has received a competing offer with a 25% salary increase. They will resign unless matched.',
        options: [
          {
            text: 'Match competing offer (+25% salary)',
            cost: 0,
            impact: 'Lead developer salary increases by 25% permanently, maintaining development speed.',
            type: 'exit_match'
          },
          {
            text: 'Let them exit, hire emergency contractor ($45K)',
            cost: 45000,
            impact: 'Ramp-up delays cause active roadmap progress to slip by -20%.',
            type: 'exit_contractor'
          }
        ]
      },
      {
        id: 'viral_growth',
        title: '🚀 Viral Loop Breakthrough',
        description: 'A major tech influencer posted a review of your startup. Sign-ups are exploding, stressing servers.',
        options: [
          {
            text: 'Scale server infrastructure immediately ($50K)',
            cost: 50000,
            impact: 'Server scale costs increase, but active user base instantly climbs by 40%!',
            type: 'viral_scale'
          },
          {
            text: 'Throttle incoming servers (no cost)',
            cost: 0,
            impact: 'Saves setup costs, but server outages cause churn rate to double next month.',
            type: 'viral_throttle'
          }
        ]
      },
      {
        id: 'database_crash',
        title: '🔥 Server Database Corruption',
        description: 'A bad software update corrupted a customer database segment. Users are reporting system errors and outages.',
        options: [
          {
            text: 'Retain cyber-recovery experts ($60K)',
            cost: 60000,
            impact: 'System restored immediately. Churn stabilized with 2% user loss.',
            type: 'crash_experts'
          },
          {
            text: 'Manual internal recovery (no cost)',
            cost: 0,
            impact: 'R&D team pulled off product lines. 15% user base churns due to a 3-day outage.',
            type: 'crash_manual'
          }
        ]
      }
    ];
    activeEvent = eventsList[Math.floor(Math.random() * eventsList.length)];
  }

  return {
    ...currentState,
    activeUsers: newUsers,
    monthlyRevenue,
    cashBalance: newCash,
    valuation: newValuation,
    history: updatedHistory,
    roadmap: updatedRoadmap,
    activeEvent,
    competitor: updatedCompetitor,
    poachAlert: poachedEmployeeAlert
  };
}

// Perform quarter simulation
export function calculateNextQuarter(currentState) {
  let tempState = { ...currentState };
  for (let i = 0; i < 3; i++) {
    if (tempState.cashBalance <= 0) break;
    tempState = calculateNextMonth(tempState);
    if (tempState.activeEvent || tempState.poachAlert) {
      break;
    }
  }
  return tempState;
}

// Apply Black Swan Crisis Resolution Action
export function applyBlackSwanResolution(state, eventId, optionType) {
  let updated = { ...state };
  
  if (eventId === 'competitor_clone') {
    if (optionType === 'competitor_clone_lawsuit') {
      updated.cashBalance -= 100000;
      updated.valuation = Math.max(100000, updated.valuation - 50000);
    } else if (optionType === 'competitor_clone_slash') {
      updated.pricePerUser = Math.floor(updated.pricePerUser * 0.7);
      updated.churnRate = updated.churnRate * 1.25;
    } else if (optionType === 'competitor_clone_rd') {
      updated.cashBalance -= 80000;
      updated.roadmap = updated.roadmap.map(m => 
        m.status === 'in-progress' ? { ...m, progress: Math.min(100, m.progress + 40), status: m.progress + 40 >= 100 ? 'completed' : m.status } : m
      );
    }
  } else if (eventId === 'ad_network_crash') {
    if (optionType === 'ad_crash_influencer') {
      updated.cashBalance -= 30000;
      updated.cac = updated.cac * 1.25;
    } else if (optionType === 'ad_crash_halt') {
      updated.marketingSpend = 0;
      updated.activeUsers = Math.max(1, Math.floor(updated.activeUsers * 0.9));
    }
  } else if (eventId === 'key_employee_exit') {
    if (optionType === 'exit_match') {
      const devIndex = updated.employees.findIndex(e => e.dept === 'Engineering');
      if (devIndex !== -1) {
        updated.employees = updated.employees.map((e, idx) => 
          idx === devIndex ? { ...e, salary: Math.floor(e.salary * 1.25) } : e
        );
      }
    } else if (optionType === 'exit_contractor') {
      updated.cashBalance -= 45000;
      updated.roadmap = updated.roadmap.map(m => 
        m.status === 'in-progress' ? { ...m, progress: Math.max(0, m.progress - 20) } : m
      );
    }
  } else if (eventId === 'viral_growth') {
    if (optionType === 'viral_scale') {
      updated.cashBalance -= 50000;
      updated.activeUsers = Math.floor(updated.activeUsers * 1.4);
    } else if (optionType === 'viral_throttle') {
      updated.activeUsers = Math.floor(updated.activeUsers * 1.1);
      updated.churnRate = updated.churnRate * 2.0;
    }
  } else if (eventId === 'database_crash') {
    if (optionType === 'crash_experts') {
      updated.cashBalance -= 60000;
      updated.activeUsers = Math.max(1, Math.floor(updated.activeUsers * 0.98));
    } else if (optionType === 'crash_manual') {
      updated.activeUsers = Math.max(1, Math.floor(updated.activeUsers * 0.85));
      updated.churnRate = updated.churnRate * 1.8;
    }
  }

  updated.activeEvent = null;
  return updated;
}

// BOARD DEBATE FEED ENGINE (Personalities: Vikram (VC), Sarah (CFO), Kenji (Product))
export function generateBoardDebate(actionType, details) {
  switch (actionType) {
    case 'pricing':
      const newPrice = details.price;
      return [
        {
          sender: 'Vikram (VC)',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          message: newPrice > 35 
            ? `Charging $${newPrice}/mo? Love it! Let's boost margins and blow up our ARR multiples for Series B. High prices validate high values.` 
            : `Only $${newPrice}/mo? That is way too cheap. We are leaving massive amounts of VC growth multiples on the table. Double it!`,
          color: '#c084fc'
        },
        {
          sender: 'Sarah (CFO)',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          message: newPrice > 35 
            ? `Be careful. A high price point of $${newPrice} will spike churn rate. Our runway projections will collapse if user retention drops below 95%.` 
            : `A price of $${newPrice} keeps us safe. Churn will stay low and we have stable cash reserves. Let's build a secure buffer.`,
          color: '#22d3ee'
        },
        {
          sender: 'Kenji (Product)',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          message: newPrice > 35 
            ? `Our roadmap integrations are still in progress. Charging users more before delivering Stripe billing is customer suicide.` 
            : `At $${newPrice}, users will give us massive leeway. Let's focus on shipping quality features and building a loyal community.`,
          color: '#34d399'
        }
      ];

    case 'hire':
      const role = details.role;
      return [
        {
          sender: 'Vikram (VC)',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          message: `Hiring a ${role} is the scaling move we need! We should triple our developer hiring speed immediately to grab market territory.`,
          color: '#c084fc'
        },
        {
          sender: 'Sarah (CFO)',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          message: `Wait. Our payroll is already high. Adding more monthly recurring salaries reduces our runway. We need to freeze hiring.`,
          color: '#22d3ee'
        },
        {
          sender: 'Kenji (Product)',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          message: `If we hired a developer, they can help Marcus build the AI recommendation engine. Product velocity is what matters!`,
          color: '#34d399'
        }
      ];

    case 'funding':
      return [
        {
          sender: 'Vikram (VC)',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          message: `Fresh funding secured! Now pour 80% of this cash directly into aggressive user acquisition. We need a 3x YoY growth curve.`,
          color: '#c084fc'
        },
        {
          sender: 'Sarah (CFO)',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          message: `I highly advise parking 50% of this cash in a high-yield treasury buffer. We must extend our runway to at least 24 months.`,
          color: '#22d3ee'
        },
        {
          sender: 'Kenji (Product)',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          message: `Let's use this capital to hire dedicated R&D geneticists / engineers. A superior product sells itself without marketing spend.`,
          color: '#34d399'
        }
      ];

    case 'pivot':
      return [
        {
          sender: 'Vikram (VC)',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          message: `This strategic pivot is pure genius! The enterprise markets are where the multi-billion valuation multiples are hidden.`,
          color: '#c084fc'
        },
        {
          sender: 'Sarah (CFO)',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          message: `Pivoting models resets our market readiness. Sales cycles in enterprise healthcare will delay cash revenues. Watch the runway closely!`,
          color: '#22d3ee'
        },
        {
          sender: 'Kenji (Product)',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          message: `Re-engineering our code stack for the new pivot means throwing out our old features. Stack refactoring is a high risk product move.`,
          color: '#34d399'
        }
      ];

    default:
      return [
        {
          sender: 'Vikram (VC)',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
          message: `Solid numbers this month. Let's scale marketing budget by 20% to capture the residual market. Speed is life!`,
          color: '#c084fc'
        },
        {
          sender: 'Sarah (CFO)',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
          message: `Cash balance is looking stable, but keep marketing spend in check. Let's maintain a minimum 12-month operating runway.`,
          color: '#22d3ee'
        },
        {
          sender: 'Kenji (Product)',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
          message: `Product usage metrics are high. Let's keep refining our onboarding flows to push churn rate below 2%.`,
          color: '#34d399'
        }
      ];
  }
}

// NATURAL LANGUAGE PIVOT PARSER (Prompt-to-Pivot Engine)
export function parseCommandToPivot(commandText, currentState) {
  const query = commandText.toLowerCase().trim();
  let updated = { ...currentState };
  let descriptionText = "";

  if (query.includes('healthcare') || query.includes('medical') || query.includes('hospital')) {
    // 1. Pivot to Healthcare Enterprise
    updated.name = 'Stratos MedTech Suite';
    updated.pricePerUser = 499; // high contract value
    updated.activeUsers = 12; // clinic sites
    updated.cac = 3500; // enterprise sales cycle
    updated.churnRate = 0.01; // extremely sticky
    updated.rdSpend = Math.max(50000, updated.rdSpend);
    // Lay off non-scientists, add specialist
    const scientist = { id: Date.now(), name: 'Dr. Aaron', role: 'Chief Medical Officer', salary: 14000, dept: 'Operations' };
    updated.employees = [updated.employees[0], scientist];
    
    descriptionText = "PIVOT COMPLETE: Stratos has restructured into an Enterprise MedTech platform ($499/mo per clinic, churn lowered to 1%, custom medical advisory hired).";
  } 
  else if (query.includes('cost') || query.includes('austerity') || query.includes('save') || query.includes('budget')) {
    // 2. Austerity Mode
    updated.marketingSpend = Math.floor(updated.marketingSpend * 0.1);
    updated.rdSpend = Math.floor(updated.rdSpend * 0.15);
    updated.pricePerUser = Math.floor(updated.pricePerUser * 0.85); // discount to preserve users
    updated.churnRate = Math.max(0.01, updated.churnRate * 0.8);
    
    // Lay off 2 employees to cut payroll if count is high
    if (updated.employees.length > 3) {
      updated.employees = updated.employees.slice(0, Math.max(2, updated.employees.length - 2));
    }
    
    descriptionText = "AUSTERITY ENGAGED: Operational budgets slashed, pricing discounted by 15% to retain users, and non-core staff laid off to secure cash runway.";
  } 
  else if (query.includes('viral') || query.includes('growth') || query.includes('scale') || query.includes('marketing')) {
    // 3. Hyper growth hack
    updated.marketingSpend = Math.max(100000, updated.marketingSpend * 2);
    updated.cac = Math.floor(updated.cac * 0.7); // viral loops make CAC cheaper
    updated.pricePerUser = Math.max(10, Math.floor(updated.pricePerUser * 0.8)); // mass market drop
    
    descriptionText = "GROWTH SPEEDWAY ACTIVED: Doubled marketing spends, reduced user price for viral adoption, and unlocked a -30% discount on customer acquisition costs.";
  }
  else if (query.includes('poach') || query.includes('hire dev') || query.includes('engineer')) {
    // 4. Elite Poaching
    if (updated.cashBalance < 60000) {
      return { state: currentState, error: "Insufficient cash reserves! Poaching elite engineers requires a $60,000 finder and sign-on premium." };
    }
    updated.cashBalance -= 60000;
    const poachedDev = {
      id: Date.now(),
      name: 'Dr. Cynthia (Poached)',
      role: 'Principal AI Architect',
      salary: 16000,
      dept: 'Engineering'
    };
    updated.employees = [...updated.employees, poachedDev];
    
    descriptionText = "COMPETITOR POACH SECURED: Paid $60,000 headhunter/sign-on fee to secure Cynthia, a Principal AI Architect from your shadow rival. dev velocity boosted!";
  }
  else {
    return { state: currentState, error: "Unrecognized pivot command. Try queries like: 'pivot to healthcare', 'engage austerity mode', 'maximize viral growth', or 'poach elite dev'." };
  }

  // Set board debate trigger
  updated.activeEvent = null; // clear any pending black swans
  
  return { state: updated, successText: descriptionText };
}

// Generate some random candidate profiles for hiring pipeline
export const CANDIDATE_POOL = [
  { id: 'c1', name: 'Aiden Vance', role: 'Fullstack Engineer', salary: 8500, dept: 'Engineering', status: 'sourcing', rating: 4.8 },
  { id: 'c2', name: 'Sophia Chen', role: 'Sr. Backend Dev', salary: 11000, dept: 'Engineering', status: 'interviewing', rating: 4.9 },
  { id: 'c3', name: 'Marcus Miller', role: 'Product Designer', salary: 7000, dept: 'Product', status: 'offered', rating: 4.5 },
  { id: 'c4', name: 'Emma Watson', role: 'Growth Lead', salary: 7800, dept: 'Marketing', status: 'sourcing', rating: 4.6 },
  { id: 'c5', name: 'Lucas Novak', role: 'Sales Specialist', salary: 6500, dept: 'Sales', status: 'sourcing', rating: 4.2 },
  { id: 'c6', name: 'Dr. Clara Oswald', role: 'Bio-Informatics Ph.D', salary: 12500, dept: 'Engineering', status: 'interviewing', rating: 5.0 },
  { id: 'c7', name: 'Nate Diaz', role: 'Ops Coordinator', salary: 5500, dept: 'Operations', status: 'sourcing', rating: 4.1 },
  { id: 'c8', name: 'Jessica Alba', role: 'PR Representative', salary: 6200, dept: 'Marketing', status: 'offered', rating: 4.4 }
];
