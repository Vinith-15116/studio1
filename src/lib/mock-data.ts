
export interface Problem {
  id: string;
  title: string;
  description: string;
  category: string;
  impact: string;
  location: string;
  status: 'CRITICAL' | 'WARNING' | 'NORMAL';
  trend: number[];
  tags: string[];
  escalating?: boolean;
}

export const PROBLEMS: Problem[] = [
  {
    id: '1',
    title: 'Deforestation in Protected Amazon Corridors',
    description: 'Rapid expansion of illegal logging operations within core biodiversity hotspots of the Amazon basin.',
    category: 'Environmental',
    impact: '45M',
    location: 'Amazon Basin',
    status: 'CRITICAL',
    trend: [10, 20, 35, 50, 80],
    tags: ['#Climate', '#Biodiversity'],
    escalating: true,
  },
  {
    id: '2',
    title: 'Critical Vulnerability in Legacy Infrastructure',
    description: 'Security breach detection in aging power grid control systems across Western Europe.',
    category: 'Technology',
    impact: '120M',
    location: 'Europe',
    status: 'CRITICAL',
    trend: [5, 15, 25, 40, 75],
    tags: ['#Cybersecurity', '#Infrastructure'],
    escalating: true,
  },
  {
    id: '3',
    title: 'Multidrug-Resistant Tuberculosis Surge',
    description: 'New strain of TB resistant to standard frontline treatments identified in southern regional hubs.',
    category: 'Health',
    impact: '12M',
    location: 'Africa',
    status: 'WARNING',
    trend: [2, 8, 12, 18, 25],
    tags: ['#Health', '#Pandemic'],
    escalating: false,
  },
  {
    id: '4',
    title: 'Education Accessibility Gap in Rural Asia',
    description: 'Disparity in digital learning tools reaching mountainous regions leading to rising literacy gaps.',
    category: 'Education',
    impact: '5M',
    location: 'Southeast Asia',
    status: 'NORMAL',
    trend: [40, 38, 35, 33, 30],
    tags: ['#Education', '#Social'],
    escalating: false,
  },
  {
    id: '5',
    title: 'Rising Microplastic Concentration in Deep Seas',
    description: 'Recent samples indicate critical levels of pollutants in previously untouched benthic zones.',
    category: 'Environmental',
    impact: 'Global',
    location: 'Pacific Ocean',
    status: 'WARNING',
    trend: [15, 25, 30, 45, 60],
    tags: ['#Ocean', '#Pollution'],
    escalating: true,
  },
  {
    id: '6',
    title: 'Supply Chain Fragility in Semiconductor Market',
    description: 'Localized conflicts causing significant delays in critical component exports.',
    category: 'Economy',
    impact: '750B',
    location: 'Global',
    status: 'CRITICAL',
    trend: [50, 60, 75, 85, 95],
    tags: ['#Trade', '#Tech'],
    escalating: true,
  }
];

export const STATS = [
  { label: 'Global Problems', value: '18', growth: '+12%' },
  { label: 'Verified Sources', value: '1.4K', growth: '+8%' },
  { label: 'Innovation Gaps', value: '842', growth: '+18%' },
  { label: 'Active Radar', value: '94', growth: 'LIVE' },
];

export const CATEGORIES = [
  'All', 'Social', 'Environmental', 'Health', 'Education', 'Technology', 'Economy'
];
