// HK Institutions from Non-JUPAS system
const HK_INSTITUTIONS = [
  'CARITAS-CBCC - Caritas Bianchi College of Careers',
  'CARITAS-CICE - Caritas Institute of Community Education',
  'CARITAS-CIHE - Caritas Institute of Higher Education',
  'CHU HAI - Chu Hai College of Higher Education',
  'CITYU - CityU, City University of Hong Kong',
  'CITYU-CCCU - CityU, Community College of CityU',
  'CITYU-SCOPE - CityU, School of Continuing and Professional Education',
  'CUHK-SCS - CUHK, School of Continuing and Professional Studies of CUHK',
  'CUHK - CUHK, The Chinese University of Hong Kong',
  'CUHK-TUNG WAH - CUHK, The Chinese University of Hong Kong-Tung Wah Group of Hospitals Community College',
  'EDUHK-SCPE - EdUHK, School of Continuing and Professional Education',
  'EDUHK - EdUHK, The Education University of Hong Kong',
  'CRATIA - Gratia Christian College',
  'HSMC - Hang Seng University of Hong Kong',
  'HANG SENG-HSSC - Hang Seng School of Commerce',
  'HKAPA - HK Academy of Performing Arts',
  'HKBU - HKBU, Hong Kong Baptist University',
  'HKBU-CIE - HKBU-CIE, HKBU-College of International Education',
  'HKBU-SCE - HKBU-SCE, HKBU-School of Continuing Education',
  'HKBU-UIC - Beijing Normal-Hong Kong Baptist University (BNBU)',
  'CENTENNIAL - HKU, Centennial College',
  'HKU-SPACE - HKU-SPACE, HKU SPACE (School of Professional and Continuing Education)',
  'HKU-SPACE CC - HKU SPACE Community College (HKU-SPACE CC)',
  'HKU-SPACE PLK - HKU SPACE Po Leung Kuk Stanley Ho Community College (HPSHCC)',
  'HKU - HKU, The University of Hong Kong',
  'HKUST-CLL - HKUST, College of Lifelong Learning',
  'HKUST - HKUST, The Hong Kong University of Science and Technology',
  'HKAC - Hong Kong Adventist College',
  'HK ARTS SCHOOL - Hong Kong Art School',
  'HK-CC - Hong Kong Central College',
  'HKCT - Hong Kong College of Technology',
  'HKIT - Hong Kong Institute of Technology',
  'HKMU - Hong Kong Metropolitan University',
  'HKMU-LIPACE - HKMU, Li Ka Shing School of Professional and Continuing Education (LiPACE)',
  'SYU - Hong Kong Shue Yan University',
  'KAPLAN - Kaplan Business and Accountancy School',
  'LU-LIFE - LU, Lingnan Institute of Further Education',
  'LU - LU, Lingnan University',
  'LU-CC - LU, The Community College at Lingnan University',
  'POLYU-HKCC - POLYU, Hong Kong Community College of PolyU',
  'POLYU-CYBERU - POLYU, Hong Kong CyberU of PolyU',
  'POLYU-SPEED - POLYU, School of Professional Education and Executive Development of PolyU',
  'POLYU - POLYU, The Hong Kong Polytechnic University',
  'PUI CHING - Pui Ching Academy',
  'SHCCC - Sacred Heart Canossian College of Commerce',
  'SCAD - SCAD Foundation (Hong Kong) Limited/ Savannah College of Art and Design',
  'CCCKLC - The Church of Christ in China Kung Lee College',
  'HKLCC - The Hong Kong Learning Community College',
  'NANG YAN - The Hong Kong Nang Yan College of Higher Education',
  'OUHK - The Open University of Hong Kong',
  'TWC - Tung Wah College',
  'UOW - UOW College Hong Kong',
  'VTC-DESIGN - VTC, Hong Kong Design Institute',
  'VTC-SHP - VTC, School for Higher and Professional Education',
  'VTC-SBI - VTC, School of Business and Information Systems',
  'VTC-THEI - VTC, Technological and Higher Education Institute of Hong Kong',
  'IVE - VTC, The Hong Kong Institute of Vocational Education',
  'VTC-HKIIT - VTC, Hong Kong Institute of Information Technology',
  'YCCC - Yew Chung Community College',
  'YMCA - YMCA College of Careers',
];

const QUALIFICATION_LEVELS = [
  'PhD',
  'Doctorate degree',
  'Mphil',
  'Master\'s degree',
  'Advanced Postgraduate Diploma',
  'Postgraduate Diploma',
  'Pre-Master',
  'Postgraduate Certificate',
  'Bachelor\'s degree',
  'Graduation Certificate (Benke)',
  'Associate Degree',
  'Higher Diploma',
  'Advanced Diploma',
  'Advanced Higher Diploma',
  'Professional Diploma',
];

const TARGET_PROGRAMMES = [
  'B - SOWK',
  'BA - C & P WRITING',
  'BA - CHI',
  'BA - ENG',
  'BA - HIST',
  'BA - HUM',
  'BA - PERM',
  'BA - REL PHIL & ETH',
  'BA - SIM',
  'BA - TRANSLATION',
  'BA FILM & TV',
  'BA MUSIC',
  'BA VISUAL ARTS',
  'BBA ACCT',
  'BBA ECON & DA',
  'BBA ENTREP & BI',
  'BBA FINANCE',
  'BBA HUM RES MGNT',
  'BBA ISBI',
  'BBA MARKETING',
  'BBA RETAIL MGNT',
  'BCOMM GDA',
  'BCOMM IMP',
  'BCOMM JOUR & DM DMC (GEN)',
  'BCOMM JOUR & DM JOUR (GEN)',
  'BCOMM PRA AD & BRAND',
  'BCOMM PRA PR',
  'BM CREATIVE IND',
  'BSC AP BIOL BIOTECH STD',
  'BSC AP BIOL ENVIRO SCI',
  'BSC BC & DA',
  'BSC BIO & AS',
  'BSC BIOCHE TEST SCI BMC',
  'BSC BIOCHE TEST SCI T&C',
  'BSC COMPUTER SCI AI',
  'BSC COMPUTER SCI CST',
  'BSC COMPUTER SCI DMC',
  'BSC COMPUTER SCI ISA',
  'BSC GEST',
  'BSC MATH & STAT',
  'BSSC - GEOG',
  'BSSC - GIS',
  'BSSC - SOC',
  'BSSC GCS'
];

const PERCENTILES = ['Top 10%', 'Top 25%', 'Top 50%', 'Top 75%', 'Below Top 75%'];

// Institution Lookup Table with Realistic Multipliers
// Based on HK grading rigor: Tier 1 (Research Universities) = Lower multiplier (stricter grading)
// Tier 2 (Other Universities) = Standard, Tier 3 (Community Colleges) = Higher multiplier
const INSTITUTION_MULTIPLIERS = {
  // TIER 1: Research Universities (Multiplier: 0.95-1.00) - Strictest grading
  'HKU - HKU, The University of Hong Kong': 0.95,
  'CUHK - CUHK, The Chinese University of Hong Kong': 0.98,
  'HKUST - HKUST, The Hong Kong University of Science and Technology': 0.97,
  'POLYU - POLYU, The Hong Kong Polytechnic University': 0.96,
  'HKBU - HKBU, Hong Kong Baptist University': 0.99,
  'LU - LU, Lingnan University': 0.99,
  'EDUHK - EdUHK, The Education University of Hong Kong': 0.98,
  
  // TIER 1.5: City University (Multiplier: 0.97)
  'CITYU - CityU, City University of Hong Kong': 0.97,
  
  // TIER 2: Newer/Smaller Universities (Multiplier: 1.05-1.10)
  'HSMC - Hang Seng University of Hong Kong': 1.08,
  'HKMU - Hong Kong Metropolitan University': 1.10,
  'OUHK - The Open University of Hong Kong': 1.15,
  'TWC - Tung Wah College': 1.12,
  'SYU - Hong Kong Shue Yan University': 1.09,
  'CHU HAI - Chu Hai College of Higher Education': 1.11,
  'CARITAS-CIHE - Caritas Institute of Higher Education': 1.12,
  'UOW - UOW College Hong Kong': 1.10,
  
  // TIER 2.5: Specialized Institutions
  'HKAPA - HK Academy of Performing Arts': 1.08,
  'SCAD - SCAD Foundation (Hong Kong) Limited/ Savannah College of Art and Design': 1.10,
  'HK ARTS SCHOOL - Hong Kong Art School': 1.11,
  
  // TIER 3: Community Colleges & Further Education (Multiplier: 1.15-1.30)
  'CENTENNIAL - HKU, Centennial College': 1.20,
  'CITYU-CCCU - CityU, Community College of CityU': 1.18,
  'POLYU-HKCC - POLYU, Hong Kong Community College of PolyU': 1.19,
  'CUHK-TUNG WAH - CUHK, The Chinese University of Hong Kong-Tung Wah Group of Hospitals Community College': 1.17,
  'LU-CC - LU, The Community College at Lingnan University': 1.18,
  'HKU-SPACE CC - HKU SPACE Community College (HKU-SPACE CC)': 1.21,
  'HKU-SPACE PLK - HKU SPACE Po Leung Kuk Stanley Ho Community College (HPSHCC)': 1.22,
  'HKMU-LIPACE - HKMU, Li Ka Shing School of Professional and Continuing Education (LiPACE)': 1.24,
  'HANG SENG-HSSC - Hang Seng School of Commerce': 1.15,
  'SHCCC - Sacred Heart Canossian College of Commerce': 1.19,
  'CARITAS-CBCC - Caritas Bianchi College of Careers': 1.20,
  'CARITAS-CICE - Caritas Institute of Community Education': 1.21,
  'NANG YAN - The Hong Kong Nang Yan College of Higher Education': 1.20,
  'HKLCC - The Hong Kong Learning Community College': 1.23,
  'YCCC - Yew Chung Community College': 1.18,
  'YMCA - YMCA College of Careers': 1.19,
  'PUI CHING - Pui Ching Academy': 1.16,
  'CCCKLC - The Church of Christ in China Kung Lee College': 1.17,
  'HK-CC - Hong Kong Central College': 1.22,
  'HKCT - Hong Kong College of Technology': 1.14,
  'HKIT - Hong Kong Institute of Technology': 1.13,
  'KAPLAN - Kaplan Business and Accountancy School': 1.18,
  
  // TIER 3.5: VTC & Vocational (Multiplier: 1.20-1.35)
  'IVE - VTC, The Hong Kong Institute of Vocational Education': 1.28,
  'VTC-THEI - VTC, Technological and Higher Education Institute of Hong Kong': 1.27,
  'VTC-HKIIT - VTC, Hong Kong Institute of Information Technology': 1.26,
  'VTC-SBI - VTC, School of Business and Information Systems': 1.25,
  'VTC-SHP - VTC, School for Higher and Professional Education': 1.26,
  'VTC-DESIGN - VTC, Hong Kong Design Institute': 1.24,
  
  // TIER 4: Professional/Continuing Education (Multiplier: 1.10-1.20)
  'HKU-SPACE - HKU-SPACE, HKU SPACE (School of Professional and Continuing Education)': 1.15,
  'CITYU-SCOPE - CityU, School of Continuing and Professional Education': 1.14,
  'POLYU-SPEED - POLYU, School of Professional Education and Executive Development of PolyU': 1.13,
  'HKBU-SCE - HKBU-SCE, HKBU-School of Continuing Education': 1.12,
  'HKBU-CIE - HKBU-CIE, HKBU-College of International Education': 1.11,
  'CUHK-SCS - CUHK, School of Continuing and Professional Studies of CUHK': 1.10,
  'EDUHK-SCPE - EdUHK, School of Continuing and Professional Education': 1.11,
  'HKUST-CLL - HKUST, College of Lifelong Learning': 1.09,
  'POLYU-CYBERU - POLYU, Hong Kong CyberU of PolyU': 1.12,
  'HKBU-UIC - Beijing Normal-Hong Kong Baptist University (BNBU)': 1.08,
  'LU-LIFE - LU, Lingnan Institute of Further Education': 1.13,
};

// Helper function to get multiplier for institution
const getInstitutionMultiplier = (institution) => {
  return INSTITUTION_MULTIPLIERS[institution] || 1.10; // Default to 1.10 if not found
};

// Helper function to get rank bonus based on percentile
const getRankBonus = (percentile) => {
  const rankBonusMap = {
    'Top 10%': 15,
    'Top 25%': 12,
    'Top 50%': 8,
    'Top 75%': 4,
    'Below Top 75%': 0
  };
  return rankBonusMap[percentile] || 0;
};

module.exports = {
  HK_INSTITUTIONS,
  QUALIFICATION_LEVELS,
  TARGET_PROGRAMMES,
  PERCENTILES,
  INSTITUTION_MULTIPLIERS,
  getInstitutionMultiplier,
  getRankBonus
};
