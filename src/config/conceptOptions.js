export const ideation = [
  { value: 'is1', label: 'IS1' },
  { value: 'is2', label: 'IS2' },
  { value: 'is3', label: 'IS3' },
  { value: 'is4', label: 'IS4' }
];

export const matrixes = [
  { value: 'digitalattacker', label: 'Digital Attacker' },
  { value: 'newbusinesses', label: 'New businesses' },
  { value: 'reengineer', label: 'Re-engineer' },
  { value: 'reimagine', label: 'Re-imagine' }
];

export const archetypes = [
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'social', label: 'Social' },
  { value: 'cloud', label: 'Cloud' },
  { value: 'saas', label: 'Saas'}
];

export const keyTechs = [
  { value: 'iot', label: 'IoT' },
  { value: 'ai', label: 'AI' },
  { value: 'ml', label: 'ML' },
  { value: 'blockchain', label: 'Blockchain' }
];

export const businessTypes = [
  { value: 'platform', label: 'Platform' },
  { value: 'product', label: 'Product' },
  { value: 'service', label: 'Service' },
  { value: 'marketplace', label: 'Marketplace' }
];

export const salesChannels = [
  { value: 'b2b', label: 'B2B' },
  { value: 'b2c', label: 'B2C' },
  { value: 'b2b2c', label: 'B2B2C' }
];

// This mirrors the shape of this data in redux and is used to build default object on getActiveInnovationData action.
export const financeScoreOptions = {
  'pvf': { title: 'PVF', key: 'pvf', labels: ['<0.85', '0.85-1.00', '1.00+'] },
  'ask': { title: 'Ask', key: 'ask', labels: ['>$2m', '-', '<$2m'] },
  'preMoneyValuation': { title: 'Pre-Money Valuation', key: 'preMoneyValuation', labels: ['>$10m', '$5-$10m', '$10m+'] },
  'setUpForSuccess': { title: 'Set up for success', key: 'setUpForSuccess', labels: ['<12 months', '12-15 months', '16-18 months'] },
  'corporateAdvantage': { title: 'Corporate advantage', key: 'corporateAdvantage', labels: ['Unclear', 'Standard', 'Exceptional'] },
  'competitiveLandscape': { title: 'Competitive landscape', key: 'competitiveLandscape', labels: ['Fierce', '-', 'Opportunity'] }
}
