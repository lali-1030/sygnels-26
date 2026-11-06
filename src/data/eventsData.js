// SYGNELS ’26 Central Event Archive
export const CATEGORIES = [
  {
    id: 'technical',
    channelIndex: 0,
    code: '01',
    name: 'TECHNICAL TRANSMISSION',
    shortName: 'TECHNICAL',
    frequency: '108.4 MHz',
    accentColor: '#38bdf8',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    tagline: 'Engineering feats, silicon logic, and decoding algorithms',
    description: 'Hardware challenges, coding sprints, DSP processing, and algorithmic battles designed to push technical limits.'
  },
  {
    id: 'non-technical',
    channelIndex: 1,
    code: '02',
    name: 'NON-TECHNICAL BROADCAST',
    shortName: 'NON-TECHNICAL',
    frequency: '84.2 MHz',
    accentColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.4)',
    tagline: 'Cinematic mysteries, strategic auctions, and creative wit',
    description: 'Engaging events spanning film archives, forensic deduction, tech charades, and mock trading floors.'
  },
  {
    id: 'special',
    channelIndex: 2,
    code: '03',
    name: 'SPECIAL ARCHIVES',
    shortName: 'SPECIAL EVENTS',
    frequency: '124.6 MHz',
    accentColor: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    tagline: 'High-stakes hackathons, autonomous arenas, and campus ARG ciphers',
    description: 'Flagship symposium spectacles featuring hardware-software marathons, robotics, and cryptographic expeditions.'
  }
];

export const EVENTS = [
  // TECHNICAL EVENTS
  {
    id: 'tech-001',
    code: 'TECH-001',
    name: 'CIRCUIT HUNT',
    tagline: 'Decode. Trace. Restore the broken carrier.',
    category: 'technical',
    categoryName: 'TECHNICAL',
    accentColor: '#38bdf8',
    date: 'MARCH 20, 2026',
    time: '10:00 AM - 01:00 PM',
    venue: 'ECE Microprocessor Lab (Block 3)',
    teamSize: '2 - 3 Members',
    fee: '₹150 / Team',
    status: 'open',
    prizePool: '₹6,000 Cash + Certificates',
    filmFrame: '#01-A',
    briefing: 'A classified analog radio transmitter has lost its modulation lock. Agents must analyze damaged PCB schematics, identify faulty components using multimeters and oscilloscopes, and rebuild the resonant circuit under strict countdown constraints.',
    rules: [
      'Each team will be given an identical locked circuit briefcase and test probes.',
      'Round 1: Rapid-fire component identification and circuit theorem quiz (30 mins).',
      'Round 2: Physical hardware fault-finding and soldering verification (60 mins).',
      'Use of personal smartphones or unauthorized reference cheat sheets is strictly prohibited.',
      'Judges decision based on accuracy, clock time, and signal purity is final.'
    ],
    rounds: [
      { name: 'Stage 01: Signal Reconnaissance', desc: 'Screening test on electronic device physics, OP-AMPs, and digital gates.' },
      { name: 'Stage 02: Hardware Extraction', desc: 'Hands-on debugging on the breadboard rig; repair the disrupted telemetry carrier.' }
    ],
    coordinators: [
      { name: 'Dr. S. K. Ramanathan', role: 'Staff Coordinator', contact: 'Dept of ECE' },
      { name: 'Arun Prakash K.', role: 'Student Lead', contact: '+91 98401 23456' },
      { name: 'Pooja Sundaram', role: 'Student Joint Lead', contact: '+91 97892 34567' }
    ]
  },
  {
    id: 'tech-002',
    code: 'TECH-002',
    name: 'CODE EMBARGO',
    tagline: 'Algorithmic speed coding under terminal handicaps.',
    category: 'technical',
    categoryName: 'TECHNICAL',
    accentColor: '#38bdf8',
    date: 'MARCH 20, 2026',
    time: '02:00 PM - 04:30 PM',
    venue: 'DSP Simulation Lab (Ground Floor)',
    teamSize: 'Individual / 2 Members',
    fee: '₹100 / Entry',
    status: 'open',
    prizePool: '₹5,000 Cash + Certificates',
    filmFrame: '#02-B',
    briefing: 'Compete in a vintage CRT terminal environment where programming challenges must be solved with intermittent keyboard locks, blind coding phases (monitors off), and strict memory-execution constraints.',
    rules: [
      'Supported languages: C, C++, Python 3, Java.',
      'Round 1: Speed Run - 5 algorithmic challenges in 45 minutes.',
      'Round 2: Blind Terminal - Screens are blacked out for the first 10 minutes of coding.',
      'Round 3: Reverse Engineering - Given compiled binary outputs, deduce and write the source algorithm.',
      'Plagiarism or use of generative AI tools triggers instant disqualification.'
    ],
    rounds: [
      { name: 'Stage 01: Fast Fourier Code', desc: 'Standard data structures and time complexity optimization sprint.' },
      { name: 'Stage 02: Screenless Execution', desc: 'Blind coding with syntax precision under physical pressure.' }
    ],
    coordinators: [
      { name: 'Prof. V. Meenakshi', role: 'Staff Coordinator', contact: 'Dept of ECE' },
      { name: 'Karthik Raja M.', role: 'Student Lead', contact: '+91 94432 11223' }
    ]
  },
  {
    id: 'tech-003',
    code: 'TECH-003',
    name: 'SIGNAL MATRIX',
    tagline: 'DSP filtering, modulation puzzles, and frequency conquest.',
    category: 'technical',
    categoryName: 'TECHNICAL',
    accentColor: '#38bdf8',
    date: 'MARCH 21, 2026',
    time: '10:30 AM - 01:00 PM',
    venue: 'Communication Systems Lab (Block 2)',
    teamSize: '2 Members',
    fee: '₹150 / Team',
    status: 'open',
    prizePool: '₹4,500 Cash + Certificates',
    filmFrame: '#03-C',
    briefing: 'A noisy RF spectrum hides encrypted audio telemetry from a vintage spy satellite. Teams must apply MATLAB / Python filter designs, Fourier transforms, and constellation decoders to recover the clean audio stream.',
    rules: [
      'MATLAB or SciPy toolboxes provided on laboratory workstations.',
      'Teams must design bandpass/notch filters to clean the audio within 40 minutes.',
      'Bonus points for minimal phase distortion and highest SNR restoration.',
      'Output audio must match the secret spoken passphrase.'
    ],
    rounds: [
      { name: 'Stage 01: Spectrum Analysis', desc: 'Identify harmonic noise frequencies on visual FFT plot.' },
      { name: 'Stage 02: Filter Synthesis', desc: 'Implement digital Butterworth/Chebyshev filter in code.' }
    ],
    coordinators: [
      { name: 'Dr. N. Balamurugan', role: 'Staff Coordinator', contact: 'Dept of ECE' },
      { name: 'Swetha R.', role: 'Student Lead', contact: '+91 96554 99887' }
    ]
  },
  {
    id: 'tech-004',
    code: 'TECH-004',
    name: 'SILICON DECODER',
    tagline: 'Verilog logic architecture and FPGA timing mastery.',
    category: 'technical',
    categoryName: 'TECHNICAL',
    accentColor: '#38bdf8',
    date: 'MARCH 21, 2026',
    time: '02:00 PM - 04:30 PM',
    venue: 'VLSI Design Center (Block 3, 2nd Floor)',
    teamSize: '2 Members',
    fee: '₹150 / Team',
    status: 'open',
    prizePool: '₹5,000 Cash + Certificates',
    filmFrame: '#04-D',
    briefing: 'Design and synthesize custom finite state machines (FSM) and register-transfer level (RTL) Verilog modules to decrypt an encrypted hardware bitstream on Xilinx / ModelSim rigs.',
    rules: [
      'Teams will be provided ModelSim / Vivado environment.',
      'Testbenches will automatically evaluate timing closure and gate count.',
      'Top 3 teams with zero latch inference and lowest clock cycles win.'
    ],
    rounds: [
      { name: 'Stage 01: Boolean Synthesis', desc: 'K-map logic minimization and propagation delay calculation.' },
      { name: 'Stage 02: RTL Implementation', desc: 'Code the FSM decoder in Verilog with behavioral testbench.' }
    ],
    coordinators: [
      { name: 'Dr. K. Anitha', role: 'Staff Coordinator', contact: 'Dept of ECE' },
      { name: 'Dinesh Kumar P.', role: 'Student Lead', contact: '+91 91234 56789' }
    ]
  },

  // NON-TECHNICAL EVENTS
  {
    id: 'nontech-001',
    code: 'NONTECH-001',
    name: 'CINEMA MYSTERY',
    tagline: 'Vintage cinematic frames, audio cues, and director easter eggs.',
    category: 'non-technical',
    categoryName: 'NON-TECHNICAL',
    accentColor: '#fbbf24',
    date: 'MARCH 20, 2026',
    time: '11:00 AM - 01:30 PM',
    venue: 'Central ECE Seminar Hall (Air Conditioned)',
    teamSize: '2 - 3 Members',
    fee: '₹150 / Team',
    status: 'open',
    prizePool: '₹5,000 Cash + Trophies',
    filmFrame: '#05-E',
    briefing: 'Step into a golden-era cinema theater projection room. Identify famous films and background scores from 1-second audio snippets, zoomed-in vintage film stills, and cryptic script dialogues.',
    rules: [
      'Buzzer-based interactive rounds on theater screen.',
      'Negative marking applies for false early buzzes.',
      'Audio snippets will be played only once through stereo theater monitors.'
    ],
    rounds: [
      { name: 'Round 1: 35mm Frame Flash', desc: 'Identify cult classics from a 2-second film reel freeze.' },
      { name: 'Round 2: Foley & Score Hunt', desc: 'Name the movie composer and track from isolated Foley audio.' },
      { name: 'Round 3: The Directors Cut', desc: 'Connect 4 abstract props to a film storyline.' }
    ],
    coordinators: [
      { name: 'Mr. R. Rajesh', role: 'Staff Coordinator', contact: 'Dept of ECE' },
      { name: 'Vigneshwaran S.', role: 'Student Lead', contact: '+91 98840 12345' }
    ]
  },
  {
    id: 'nontech-002',
    code: 'NONTECH-002',
    name: 'TECH CHARADES',
    tagline: 'Silent miming, analog props, and electronic idioms.',
    category: 'non-technical',
    categoryName: 'NON-TECHNICAL',
    accentColor: '#fbbf24',
    date: 'MARCH 20, 2026',
    time: '02:30 PM - 04:30 PM',
    venue: 'Auditorium Annex',
    teamSize: '3 Members',
    fee: '₹150 / Team',
    status: 'open',
    prizePool: '₹4,000 Cash + Mementos',
    filmFrame: '#06-F',
    briefing: 'Communicate intricate engineering concepts, tech corporate scandals, and movie gizmos without uttering a single vocal sound. Time is ticking on the vintage mechanical hourglass!',
    rules: [
      'No vocalization, mouthing words, or air-spelling allowed.',
      'Mimer gets 90 seconds per word card.',
      'Team members can guess freely until the clock chimes.'
    ],
    rounds: [
      { name: 'Round 1: Component Mime', desc: 'Mime basic hardware, antennas, and everyday gadgets.' },
      { name: 'Round 2: Tech Headlines', desc: 'Act out historic tech events and AI milestones.' }
    ],
    coordinators: [
      { name: 'Mrs. T. Selvi', role: 'Staff Coordinator', contact: 'Dept of ECE' },
      { name: 'Divya Bharathi M.', role: 'Student Lead', contact: '+91 97910 88776' }
    ]
  },
  {
    id: 'nontech-003',
    code: 'NONTECH-003',
    name: 'STOCK TICKER ’26',
    tagline: 'Retro Wall Street trading floor & commodity auction chaos.',
    category: 'non-technical',
    categoryName: 'NON-TECHNICAL',
    accentColor: '#fbbf24',
    date: 'MARCH 21, 2026',
    time: '10:00 AM - 01:00 PM',
    venue: 'Conference Hall (Block 1)',
    teamSize: '2 - 4 Members',
    fee: '₹200 / Team',
    status: 'open',
    prizePool: '₹6,000 Cash + Certificates',
    filmFrame: '#07-G',
    briefing: 'Equipped with simulated vintage telegraph tickers and paper ledgers, trade tech stocks and rare silicon patents amid breaking news bulletins and sudden market crashes.',
    rules: [
      'Each team starts with $1,000,000 mock archival capital.',
      'Breaking news flashes on CRT screens every 5 minutes.',
      'The team with the highest portfolio net worth at market close wins.'
    ],
    rounds: [
      { name: 'Bell 1: IPO Bidding', desc: 'Acquire early shares in high-risk tech startups.' },
      { name: 'Bell 2: Crash & Arbitrage', desc: 'Navigate emergency news flashes and commodity trading.' }
    ],
    coordinators: [
      { name: 'Dr. C. Vijayakumar', role: 'Staff Coordinator', contact: 'Dept of ECE' },
      { name: 'Harish Kumar V.', role: 'Student Lead', contact: '+91 95000 66778' }
    ]
  },
  {
    id: 'nontech-004',
    code: 'NONTECH-004',
    name: 'CADENCE OF CRIME',
    tagline: 'Forensic deduction, typewriter alibis, and fingerprint analysis.',
    category: 'non-technical',
    categoryName: 'NON-TECHNICAL',
    accentColor: '#fbbf24',
    date: 'MARCH 21, 2026',
    time: '02:00 PM - 04:30 PM',
    venue: 'Old Library Archive Room',
    teamSize: '2 - 3 Members',
    fee: '₹150 / Team',
    status: 'open',
    prizePool: '₹4,500 Cash + Certificates',
    filmFrame: '#08-H',
    briefing: 'A mysterious theft occurred in the ACGCET radio telemetry archives in 1986. Examine typewritten police reports, crime scene polaroids, autopsy notes, and physical evidence to unmask the mole.',
    rules: [
      'Teams will inspect 5 physical evidence bags.',
      'Submit written dossier detailing the killer, weapon, and exact timeline.',
      'Points awarded for rigorous logical deductions vs lucky guesses.'
    ],
    rounds: [
      { name: 'Briefing: The Cold Case', desc: 'Study the suspect files and alibi timestamps.' },
      { name: 'Inquest: The Cross-Examination', desc: 'Interrogate live volunteer suspect actors.' }
    ],
    coordinators: [
      { name: 'Prof. L. Karpagam', role: 'Staff Coordinator', contact: 'Dept of ECE' },
      { name: 'Sanjay Dutt B.', role: 'Student Lead', contact: '+91 94888 33445' }
    ]
  },

  // SPECIAL EVENTS
  {
    id: 'spec-001',
    code: 'SPEC-001',
    name: 'THE ARCHIVAL HACKATHON',
    tagline: '24-hour hardware + software retro-futuristic invention sprint.',
    category: 'special',
    categoryName: 'SPECIAL EVENTS',
    accentColor: '#f43f5e',
    date: 'MARCH 20 - 21, 2026',
    time: '10:00 AM (24-Hour Continuous)',
    venue: 'ECE Central IoT & Embedded Labs',
    teamSize: '3 - 4 Members',
    fee: '₹350 / Team (Food & Kits Provided)',
    status: 'open',
    prizePool: '₹15,000 Grand Prize + Mentorship',
    filmFrame: '#09-S',
    briefing: 'The crown jewel of SYGNELS 26. Build working physical computing prototypes combining microcontrollers (ESP32/Raspberry Pi) with modern web dashboards, AI edge inferencing, or retro-analog interfaces.',
    rules: [
      '24-hour non-stop hackathon with meals and snacks provided.',
      'Hardware kits or your own components are permitted.',
      'Mentors will conduct 3 checkpoint evaluations at 6h, 12h, and 18h.',
      'Final live stage demonstration in front of industry judges.'
    ],
    rounds: [
      { name: 'Stage 01: Architecture Pitch', desc: 'Submit schematic block diagram and bill of materials.' },
      { name: 'Stage 02: Midnight Checkpoint', desc: 'Demonstrate functional circuit communication and data pipeline.' },
      { name: 'Stage 03: Grand Jury Defense', desc: '5-minute live working demonstration to panel.' }
    ],
    coordinators: [
      { name: 'Dr. G. Sivakumar (HOD)', role: 'Chief Convener', contact: 'Dept of ECE' },
      { name: 'Mithun Chakravarthy', role: 'Symposium President', contact: '+91 90031 99881' },
      { name: 'Kavitha S.', role: 'General Secretary', contact: '+91 94421 77665' }
    ]
  },
  {
    id: 'spec-002',
    code: 'SPEC-002',
    name: 'ROBO-CHASE ARENA',
    tagline: 'High-speed autonomous rovers on a treacherous neon obstacle track.',
    category: 'special',
    categoryName: 'SPECIAL EVENTS',
    accentColor: '#f43f5e',
    date: 'MARCH 21, 2026',
    time: '11:00 AM - 02:00 PM',
    venue: 'Department Open Quadrangle',
    teamSize: '2 - 4 Members',
    fee: '₹200 / Team',
    status: 'open',
    prizePool: '₹8,000 Cash + Trophies',
    filmFrame: '#10-S',
    briefing: 'Unleash your line-follower and obstacle-avoiding autonomous rovers onto our custom elevated track featuring optical tunnels, speed ramps, and magnetic switches.',
    rules: [
      'Maximum bot dimensions: 25cm x 25cm x 20cm; weight under 2kg.',
      'Bot must be fully autonomous once the start button is depressed.',
      'Penalties for leaving the line track or knocking hazard cones.'
    ],
    rounds: [
      { name: 'Heat 1: Time Trial Qualifier', desc: 'Complete single clean lap around perimeter track.' },
      { name: 'Heat 2: The Obstacle Gauntlet', desc: 'Bridge crosses, light sensors, and ramp climbs.' }
    ],
    coordinators: [
      { name: 'Dr. P. Murugesan', role: 'Staff Coordinator', contact: 'Dept of ECE' },
      { name: 'Raghavan K.', role: 'Student Lead', contact: '+91 99443 22110' }
    ]
  },
  {
    id: 'spec-003',
    code: 'SPEC-003',
    name: 'CIPHER HUNT: 1984',
    tagline: 'Campus-wide cryptographic ARG & clandestine physical dead-drops.',
    category: 'special',
    categoryName: 'SPECIAL EVENTS',
    accentColor: '#f43f5e',
    date: 'MARCH 20, 2026',
    time: '03:00 PM - 06:00 PM',
    venue: 'Starts at ECE Portico (Entire Campus)',
    teamSize: '3 - 4 Members',
    fee: '₹150 / Team',
    status: 'open',
    prizePool: '₹6,000 Cash + Medals',
    filmFrame: '#11-S',
    briefing: 'Decode Caesar ciphers, radio frequency Morse code beacons, and concealed QR coordinate tags scattered throughout ACGCET campus to unveil the lost symposium blueprint.',
    rules: [
      'Each clue unlocks the GPS coordinates or physical landmark of the next cipher.',
      'Teams must carry at least one smartphone with FM radio tuner capability.',
      'First team to enter the final master passphrase at headquarters wins.'
    ],
    rounds: [
      { name: 'Transmission 1: The Morse Key', desc: 'Receive and decode audio broadcast over local 88.5 FM.' },
      { name: 'Transmission 2: Campus Grid', desc: 'Find physical micro-capsules hidden under campus monuments.' }
    ],
    coordinators: [
      { name: 'Mrs. S. Gandhimathi', role: 'Staff Coordinator', contact: 'Dept of ECE' },
      { name: 'Gokulnath R.', role: 'Student Lead', contact: '+91 91590 12349' }
    ]
  }
];