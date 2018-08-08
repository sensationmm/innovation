// Used to determine which concept fields are grouped together and under which headings for display.
// Also enables you to change front end wording (via 'label' without affective db and redux).
// The order in the arrays will determine the display order on the page.
export const conceptFieldGroups = [
  {
    key: 'customersAndMarket',
    displayAs: 'Customers and Market',
    contents: [
      { value: 'marketSegment', label: 'Customer Segment' },
      { value: 'marketFriction', label: 'Frictions' },
      { value: 'marketSize', label: 'Market Size' },
      { value: 'targetIndustry', label: 'Target Industry' },
      { value: 'targetCustomers', label: 'Target Customers' },
      { value: 'targetGeography', label: 'Target Geography' }
    ]
  },{
    key: 'solution',
    displayAs: 'Solution',
    contents: [
      { value: 'description', label: 'Description' },
      { value: 'primaryTechnology', label: 'Primary Technology' },
      { value: 'successFactors', label: 'Critical Success Factors' },
      { value: 'keyRisks', label: 'Key Risks' }
    ]
  },{
    key: 'businessModel',
    displayAs: 'Business Model',
    contents: [
      { value: 'businessType', label: 'Business Type' },
      { value: 'salesChannel', label: 'Channel' },
      { value: 'revenueModel', label: 'Revenue Model' },
      { value: 'unitEconomics', label: 'Unit Economics' }
    ]
  },{
    key: 'corporateAdvantage',
    displayAs: 'Corporate Advantage',
    contents: [
      { value: 'corporateAdvantage', label: 'Why the Corporate Partner can win' },
      { value: 'leveragedAssets', label: 'Assets Leveraged' }
    ]
  },{
    key: 'costAndImplementation',
    displayAs: 'Cost & Implementation',
    contents: [
      { value: 'incubationCost', label: 'Incubation cost' },
      { value: 'breakEvenCost', label: 'Break-even cost' },
      { value: 'breakEvenYear', label: 'Break-even year' },
      { value: 'willGmLeave', label: 'Would you (GM) leave DV?' }
    ]
  },{
    key: 'conviction',
    displayAs: 'Conviction',
    contents: [
      { value: 'gmConviction', label: 'Rank' },
      { value: 'gmComments', label: 'GM Comments' },
      { value: 'partnerPreferences', label: 'Comments on Corporate Partner preferences' },
    ]
  }
]

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

export const conceptStatusLabels = {
  'killed': 'Killed',
  'draft': 'Active',
  'ready': 'Ready for Analysis',
  'analysed': 'Analysed'
}

export const analysisDisplayColours = {
  0: '#e03c31',
  1: '#ffa900',
  2: '#00bfb7'
}
