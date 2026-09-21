export const CURRENT_DIRECTION = {
  research:
    "Current research direction: biomedical inverse modeling and computational cardiology, especially magnetic-field-based feature extraction for cardiovascular diagnosis.",
  researchFocus:
    "Research focus: physics-informed ML, neural operators, inverse reconstruction, uncertainty quantification, computational cardiology.",
  engineeringFocus:
    "Engineering focus: ESP32/Raspberry Pi/Arduino systems, drones, sensor networks, soldered prototypes, CAD/Blender visualization.",
  recognition:
    "Recognition: GSEF Best in Category both times attended, Fulton County qualifier 3/3 times, Thermo Fisher JIC Top 300, GaSTC state qualification from 6th-8th grade.",
  presentation:
    "Presentation: preparing CubeSAT power subsystem work for the NCSS Student Research Conference in Summer 2026.",
} as const;

export const AREAS = [
  {
    area: "Biomedical ML",
    examples:
      "Magnetoionography, iFNO cardiac inverse feature extraction, BOCF/openCARP simulation, S1–S2 scar-substrate analysis, uncertainty-aware benchmarking",
  },
  {
    area: "Geospatial AI",
    examples:
      "SkyScraper satellite-imagery event validation with MIT STAR Lab",
  },
  {
    area: "Environmental sensing",
    examples:
      "Distributed hazardous-gas localization with ESP32 nodes and U-Net inverse reconstruction",
  },
  {
    area: "Forecasting and simulation",
    examples:
      "RNN epidemic spread simulator with SEIR engine and Monte Carlo dropout",
  },
  {
    area: "Robotics and embedded systems",
    examples:
      "Autonomous agriculture drone, CubeSAT power subsystem, IRIS face-recognition attendance, LEGO Mindstorms projects",
  },
  {
    area: "Energy systems",
    examples:
      "Passive piezoelectric/triboelectric edge-IoT energy generator; CubeSAT power simulation",
  },
] as const;

export type MajorProject = {
  number: string;
  id: string;
  name: string;
  lead?: string;
  subtitle: string;
  tags: readonly string[];
  problem: string;
  approach: string;
  contribution: string;
  status: string;
  statusSummary: string;
  supplementalSections?: readonly {
    label: string;
    items: readonly string[];
  }[];
  technicalStack?: readonly {
    label: string;
    items: string;
  }[];
};

export const MAJOR_PROJECTS: readonly MajorProject[] = [
  {
    number: "01",
    id: "magnetoionography",
    name: "Magnetoionography Framework for Cardiac Inverse Feature Extraction",
    lead: "Proposed field framing derived from magnetocardiography; current flagship ML/research project.",
    subtitle: "Magnetoionography (MIG) / iFNO Cardiac Inverse Feature Extraction",
    tags: ["Computational cardiology", "physics-informed ML", "inverse problems"],
    problem:
      "Current cardiac diagnostic and inverse-mapping methods such as ECGI and MCG can suffer from non-uniqueness, weak localization, and limited feature extraction under complex electrophysiology. The project proposes a MIG-style framework that treats cardiac magnetic signatures as a route to higher-accuracy inverse features for disease diagnosis.",
    approach:
      "The pipeline generates simulated electrophysiology through the Bueno-Cherry-Fenton model using openCARP and CellML, converts electrical activity into magnetic-field structure through a Biot-Savart forward model, and uses the Kiel Cardio Database only as a reference for realistic MCG signal scale and sensor geometry, not as patient-derived training data. The inverse stage is driven by an iFNO / neural-operator model for feature extraction and localization.",
    contribution:
      "The main contribution is an end-to-end research pipeline connecting cardiac electrophysiology, magnetic forward modeling, neural operators, ablations, and uncertainty-aware evaluation. The goal is not only to classify signals, but to reconstruct clinically meaningful inverse features that can be compared against ECGI/MCG-style baselines.",
    status: "Active research. The pipeline is being expanded toward larger datasets and external mentorship.",
    statusSummary: "Active research",
    technicalStack: [
      {
        label: "Modeling",
        items: "BOCF electrophysiology, openCARP, CellML, magnetic-field generation, Biot-Savart physics.",
      },
      {
        label: "Machine learning",
        items: "iFNO/FNO, CNN/FNO ablations, uncertainty quantification, feature extraction, inverse modeling.",
      },
      {
        label: "Research outputs",
        items: "Benchmarking reports, publication-oriented manuscript development.",
      },
    ],
  },
  {
    number: "02",
    id: "mit-star-lab-skyscraper",
    name: "SkyScraper Satellite-Imagery Event Validation",
    subtitle: "MIT STAR Lab Human Validation Pipeline",
    tags: ["MIT STAR Lab", "geospatial AI", "satellite imagery", "human-in-the-loop validation"],
    problem:
      "Turning news-reported events into useful remote-sensing datasets requires more than matching a location and date. Each candidate must be checked to determine whether the claimed event is actually visible in the satellite imagery and whether the proposed temporal window is accurate.",
    approach:
      "The SkyScraper workflow extracts event locations and timelines from news, gathers temporal satellite imagery, and uses model-assisted verification before human review. The validation work examines the article context, location, and image sequence; records Yes, No, or Unsure visibility decisions; corrects first and last visible dates; and documents ambiguous cases.",
    contribution:
      "The human-validation stage provides quality control for a large-scale geospatial data pipeline. Careful visibility judgments and date corrections help separate visually supported events from plausible but unsupported matches, creating stronger training and evaluation data for remote-sensing models.",
    status:
      "Active work with the MIT STAR Lab SkyScraper team, focused on satellite-imagery review, annotation consistency, and quality control.",
    statusSummary: "Active at MIT STAR Lab",
    technicalStack: [
      {
        label: "Validation",
        items: "Temporal satellite-imagery review, event visibility labels, date-boundary correction, and annotation notes.",
      },
      {
        label: "Tooling",
        items: "Python, Streamlit, structured metadata, and CSV-based review feedback.",
      },
      {
        label: "Research context",
        items: "Human-in-the-loop verification for news-derived geospatial event sequences and remote-sensing datasets.",
      },
    ],
  },
  {
    number: "03",
    id: "rit-opencarp-s1s2",
    name: "RIT openCARP S1–S2 Scar-Substrate Study",
    subtitle: "Cardiac Electrophysiology Simulation and Re-entry Analysis",
    tags: ["RIT research", "openCARP", "TP06 monodomain", "S1–S2 protocol"],
    problem:
      "Scar and remodeled border-zone tissue can create asymmetric conduction pathways that may support re-entry. The study tested where a premature S2 stimulus captures tissue, how activation travels around a scar substrate, and whether the resulting activity becomes sustained.",
    approach:
      "The study used a 40 × 40 mm TP06 monodomain sheet in openCARP with healthy, remodeled border-zone, and near-insulating scar regions. It swept 19 coupling intervals from 250–420 ms, refined the capture boundary at 1 ms resolution, and extended a selected 380 ms case to 1.6 seconds for directional and persistence analysis.",
    contribution:
      "The work built a reproducible simulation and analysis pipeline for capture, propagation coverage, scar-ring activation, directional delay, repeated activation, and late activity. The selected case produced a 46 ms directional delay and activated all 24 scar-ring sectors while preserving a strict distinction between transient asymmetric propagation and sustained re-entry.",
    status:
      "Validated study complete. The protocol-specific capture boundary was 368–369 ms; the selected case was a credible transient unidirectional-block candidate, but it did not sustain re-entry or VT.",
    statusSummary: "Validated study",
    technicalStack: [
      {
        label: "Simulation",
        items: "openCARP, ten Tusscher–Panfilov 2006, monodomain tissue, scar and border-zone remodeling.",
      },
      {
        label: "Analysis",
        items: "Coupling-interval sweeps, activation mapping, scar-ring sector timing, repeat-activation and late-activity tests.",
      },
      {
        label: "Outputs",
        items: "Validated parameter file, reproducible Docker workflow, quantitative summaries, and supervisor-ready figures.",
      },
    ],
  },
  {
    number: "04",
    id: "gas-localization",
    name: "Distributed Gas-Leak Source Localization System",
    subtitle: "IoT Sensor Graph for Unsafe Gas Localization",
    tags: ["ESP32 sensor network", "Raspberry Pi 5 cluster", "lightweight U-Net inverse reconstruction"],
    problem:
      "Unsafe gases and particulate concentrations can be invisible and odorless, making manual source identification unreliable in maker labs, garages, workshops, and small manufacturing lines.",
    approach:
      "The system uses a graph of distributed sensor nodes, each powered by a central ESP32-style microcontroller architecture and equipped with sensors such as PM2.5 and CO2. Sensor readings are fused on a central cluster of two Raspberry Pi 5 units. A lightweight U-Net performs partial, feature-focused inverse reconstruction to estimate high-concentration regions and likely source zones.",
    contribution:
      "The key novelty is modular expansion: more sensing nodes can be added to increase coverage without changing the core reconstruction concept. This makes the system more practical for real environments than a single-point detector, because the model learns spatial structure rather than just thresholding one sensor.",
    status:
      "Prototype/project concept completed as one of the major ML systems in the portfolio; suitable for further testing in controlled lab or workshop environments.",
    statusSummary: "Prototype / concept complete",
    supplementalSections: [
      {
        label: "Potential applications",
        items: [
          "Maker labs with CNC machines, laser cutters, 3D printers, soldering stations, and resin printers.",
          "Garages and workshops where CO2, particulate matter, fumes, or combustion products can accumulate.",
          "Small to medium manufacturing lines where low-cost spatial sensing may be more feasible than industrial-grade imaging.",
        ],
      },
    ],
  },
  {
    number: "05",
    id: "epidemic-simulator",
    name: "Epidemic Forecasting Simulator - MIT Blueprint Hackathon",
    subtitle: "RNN + SEIR Disease-Spread Simulator",
    tags: ["Hackathon project", "forecasting", "uncertainty-aware simulation"],
    problem:
      "Public-health forecasting requires both predictive models and uncertainty estimates. A raw prediction is less useful if it cannot communicate confidence or scenario variability.",
    approach:
      "The project used an RNN to forecast disease spread from 7,300 past outbreak records, including COVID-19, dengue, malaria, measles, and related outbreaks. It incorporated a SEIR simulation engine to represent disease-state transitions and Monte Carlo dropout/simulation for confidence-aware outputs.",
    contribution:
      "The project combined data-driven forecasting with epidemiological structure, giving the system a more interpretable simulation layer than a simple black-box predictor.",
    status: "Completed for MIT Blueprint hackathon; serves as an example of applied ML under time constraints.",
    statusSummary: "Completed",
  },
  {
    number: "06",
    id: "passive-energy-generator",
    name: "Passive Energy Generator for Edge IoT Devices",
    subtitle: "Optimized Passive Energy Harvester",
    tags: ["Piezoelectricity", "triboelectricity", "sound/vibration/EMF capture"],
    problem:
      "Small IoT systems often need long-duration, low-maintenance power. Environmental energy sources such as vibration, sound, electrostatic changes, and electromagnetic frequency are usually wasted at small scales.",
    approach:
      "The project explored piezoelectric and triboelectric conversion, pressure-plate geometries, vibration mechanisms, and multi-source energy capture. It was designed as an edge-IoT power concept rather than a high-power generator.",
    contribution:
      "The novel contributions included a custom pressure-plate design and vibration mechanism intended to improve mechanical coupling into the energy-harvesting elements.",
    status: "Recognized at GSEF with Best in Category and a creative problem-solving special award.",
    statusSummary: "Recognized",
  },
  {
    number: "07",
    id: "agriculture-drone",
    name: "Autonomous Agriculture Drone",
    subtitle: "3.5-Inch Autonomous Seed-Planting Drone",
    tags: ["Drone build", "Arduino payload", "ArduPilot autonomy", "soil-informed planting"],
    problem:
      "Many agriculture drones disperse seeds broadly without directly evaluating local soil conditions. This wastes seeds and reduces planting precision.",
    approach:
      "The drone was built from individual parts and used a standard flight controller for the aircraft, with an Arduino-based payload system for seed deployment. The concept used soil/environmental measurements such as humidity, temperature, and soil-related indicators to estimate whether seed clusters should be dropped.",
    contribution:
      "The main contribution was coupling autonomous flight with local decision-making: seed clusters were dropped only when the estimated growth probability exceeded a threshold.",
    status: "Won 2nd place at the school CPS Expo; project continued as an efficiency-improvement effort.",
    statusSummary: "2nd place",
  },
  {
    number: "08",
    id: "cubesat-power",
    name: "CubeSAT Power Subsystem",
    subtitle: "School CubeSAT Power Subsystem Team",
    tags: ["Leadership", "power simulation", "research presentation"],
    problem:
      "CubeSAT power budgets require careful modeling of generation, storage, duty cycles, and subsystem load. Even small errors can cause mission-level instability.",
    approach:
      "As one of the heads of the school CubeSAT power subsystem team, the work focuses on power simulation, analysis, and a research paper that was presented at SmallSat 2026 and NCSS Student Research Conference 2026.",
    contribution:
      "The contribution is leadership plus technical simulation: translating engineering requirements into a model that can guide subsystem decisions.",
    status: "Active. Preparing paper and presentation.",
    statusSummary: "Active",
  },
] as const;

export const ADDITIONAL_PROJECTS = [
  {
    name: "IRIS AI Face Recognition Attendance System",
    body: "Raspberry Pi-based attendance project using face-recognition models and spreadsheet logging.",
  },
  {
    name: "Helios AI Door Lock",
    body: "ESP32/AI access-control system that recognized known users and opened a door; won first place at state-level technology competition.",
  },
  {
    name: "Smart Plant Monitoring System",
    body: "IoT plant-health system measuring humidity and temperature; won Outstanding 6th Grade Project Award at GSEF.",
  },
  {
    name: "Augmented Reality Smart Glasses Prototype",
    body: "Arduino Nano and OLED reflection prototype displaying basic data such as date, time, and IoT notifications.",
  },
  {
    name: "LEGO Mindstorms Rubik's Cube Solver",
    body: "Python-programmed 3x3 solver using color sensing and Korf's algorithm; averaged about 15 seconds with 100% solve accuracy.",
  },
  {
    name: "Custom FPV Drone Build",
    body: "Scratch-built drone assembled from individual components with soldered electronics and simulator-based flight training.",
  },
] as const;

export const RECOGNITION_GROUPS = [
  {
    label: "Science fair",
    text: "Fulton County Science and Engineering Fair qualifier 3/3 times; Best in Category and GSEF qualifier 2x; GSEF Best in Category both appearances with multiple scholarship/special awards.",
  },
  {
    label: "National recognition",
    text: "Thermo Fisher Scientific Junior Innovators Challenge Top 300.",
  },
  {
    label: "Technology competitions",
    text: "GaSTC state qualification from 6th-8th grade and 1st in category twice.",
  },
  {
    label: "Speaking",
    text: "Top 3 Speaker Award at Ivy Bridge Debate.",
  },
] as const;

export const SKILLS = [
  "Python",
  "C++",
  "PyTorch",
  "neural operators",
  "U-Net",
  "RNNs",
  "Monte Carlo dropout",
  "Raspberry Pi",
  "ESP32",
  "Arduino",
  "sensors",
  "soldering",
  "drones",
  "ArduPilot",
  "Tinkercad",
  "Blender",
  "technical writing",
  "openCARP",
  "geospatial data validation",
] as const;

export const RESOURCES = [
  {
    label: "Google Drive selected photographs",
    href: "https://drive.google.com/drive/folders/1VuAYSX86NH_fakkvUtGWqohpPG2DmO-a?usp=sharing",
  },
  {
    label: "COPS presentation",
    href: "https://view.genially.com/657b7b48e9579d00142e34ac/presentation-cops-cybersecurity-offline-protection-system",
  },
  {
    label: "IRIS presentation",
    href: "https://view.genially.com/65a5aa05b1978a00148b8fa1/presentation-2024-gastc-robotic-project-by-sahil-singh-iris",
  },
  {
    label: "Smart System presentation",
    href: "https://view.genially.com/63d329835a1b7a0019a60771/presentation-smart-system-by-sahil-singh",
  },
  {
    label: "GaSTC Robotic Project presentation",
    href: "https://view.genially.com/63c308cd77385300175a2d7a/presentation-gastc-robotic-project-by-sahil",
  },
  {
    label: "Energy Harvester presentation",
    href: "https://view.genially.com/67c10c9a987e743fe72eb508/presentation-gsef-2025-energy-harvester",
  },
] as const;

export const RESOURCE_INTRO = {
  scope: "These links and projects are from middle school.",
  photos: "Below is a Google Drive Folder with some selected photographs of my previous projects.",
  presentations:
    "Here are the links to my presentations for some of my projects (images and diagrams also included in them):",
} as const;
