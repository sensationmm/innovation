import Config from './config';

// TODO. Look for possible alternatives to JSORM which are ES6 compatible.
const {
  JSORMBase,
  attr,
  belongsTo,
  hasMany,
  hasOne
} = require('jsorm/dist/jsorm');

const ApplicationRecord = JSORMBase.extend({
  static: {
    baseUrl: Config.apiDomain,
    apiNamespace: Config.apiNamespace,
    jwtStorage: 'inventure-auth',
    generateAuthHeader(auth) {
      const authObj = JSON.parse(auth);
      return `Bearer ${authObj.token}`
    }
  }
});

export const Industry = ApplicationRecord.extend({
  static: {
    jsonapiType: 'industries'
  },
  attrs: {
    id: attr(),
    createdAt: attr(),
    name: attr(),
    partners: hasMany()
  }
});

export const Partner = ApplicationRecord.extend({
  static: {
    jsonapiType: 'partners'
  },
  attrs: {
    id: attr(),
    createdAt: attr(),
    name: attr(),
    description: attr(),
    hqCity: attr(),
    hqCountry: attr(),
    industryId: attr(),
    roles: hasMany(),
    users: hasMany(),
    innovation: hasOne(),
    industry: belongsTo()
  }
});

export const DvOffice = ApplicationRecord.extend({
  static: {
    jsonapiType: 'dv_offices'
  },
  attrs: {
    id: attr(),
    name: attr(),
    innovations: hasMany()
  }
});

export const Innovation = ApplicationRecord.extend({
  static: {
    jsonapiType: 'innovations'
  },
  attrs: {
    createdAt: attr(),
    colour: attr(),
    duration: attr(),
    dvPartner1: attr(),
    dvPartner2: attr(),
    id: attr(),
    kickedOffAt: attr(),
    logo: attr(),
    mandate: attr(),
    openDate: attr(),
    sprintName: attr(),
    sprintType: attr(),
    chargeCode: attr(),
    partnerId: attr(),
    dvOfficeId: attr(),
    keyDates: hasMany(),
    concepts: hasMany(),
    dvOffice: belongsTo(),
    partner: belongsTo()
  }
});

export const TargetIndustry = ApplicationRecord.extend({
  static: {
    jsonapiType: 'target_industries'
  },
  attrs: {
    id: attr(),
    createdAt: attr(),
    name: attr(),
    concepts: hasMany()
  }
});

export const Concept = ApplicationRecord.extend({
  static: {
    jsonapiType: 'concepts'
  },
  attrs: {
    id: attr(),
    createdAt: attr(),
    name: attr(),
    status: attr(), // killed, draft, ready, analysed
    description: attr(),
    logo: attr(),
    logoName: attr(),
    marketFriction: attr(),
    marketSegment: attr(),
    marketSize: attr(),
    targetCustomers: attr(),
    targetGeography: attr(),
    solutionDescription: attr(),
    primaryTechnology: attr(),
    successFactors: attr(),
    keyRisks: attr(),
    businessType: attr(),
    salesChannel: attr(),
    revenueModel: attr(),
    unitEconomics: attr(),
    corporateAdvantage: attr(),
    leveragedAssets: attr(),
    incubationCost: attr(),
    breakEvenCost: attr(),
    breakEvenYear: attr(),
    willGmLeave: attr(),
    gmConviction: attr(),
    gmComments: attr(),
    partnerPreferences: attr(),
    innovationId: attr(),
    targetIndustryId: attr(),
    financeScores: hasMany(), // Each finance score is a single entry of { key, value, description }
    conceptChanges: hasMany(),
    innovation: belongsTo(),
    targetIndustry: belongsTo()
  }
});

export const ConceptChange = ApplicationRecord.extend({
  static: {
    jsonapiType: 'concept_changes'
  },
  attrs: {
    id: attr(),
    createdAt: attr(),
    name: attr(),
    status: attr(), // killed, draft, ready, analysed
    description: attr(),
    logo: attr(),
    logoName: attr(),
    marketFriction: attr(),
    marketSegment: attr(),
    marketSize: attr(),
    targetCustomers: attr(),
    targetGeography: attr(),
    solutionDescription: attr(),
    primaryTechnology: attr(),
    successFactors: attr(),
    keyRisks: attr(),
    businessType: attr(),
    salesChannel: attr(),
    revenueModel: attr(),
    unitEconomics: attr(),
    corporateAdvantage: attr(),
    leveragedAssets: attr(),
    incubationCost: attr(),
    breakEvenCost: attr(),
    breakEvenYear: attr(),
    willGmLeave: attr(),
    gmConviction: attr(),
    gmComments: attr(),
    partnerPreferences: attr(),
    innovationId: attr(),
    targetIndustryId: attr(),
    conceptId: attr(),
    concept: belongsTo()
  }
});

export const FinanceScore = ApplicationRecord.extend({
  static: {
    jsonapiType: 'finance_scores'
  },
  attrs: {
    id: attr(),
    key: attr(),
    value: attr(),
    description: attr(),
    comment: attr(),
    conceptId: attr(),
    concept: belongsTo()
  }
});

export const Role = ApplicationRecord.extend({
  static: {
    jsonapiType: 'roles'
  },
  attrs: {
    name: attr(),
    email: attr(),
    rolableId: attr(),
    rolableType: attr(),
    rolable: belongsTo(),
    user: belongsTo()
  }
});

export const User = ApplicationRecord.extend({
  static: {
    jsonapiType: 'users'
  },
  attrs: {
    id: attr(),
    name: attr(),
    email: attr(),
    password: attr(),
    currentPassword: attr(),
    partner: belongsTo(),
    roles: hasMany(),
    role: belongsTo()
  }
});

export const KeyDate = ApplicationRecord.extend({
  static: {
    jsonapiType: 'key_dates'
  },
  attrs: {
    id: attr(),
    name: attr(),
    date: attr(),
    keyDatableId: attr(),
    keyDatableType: attr(),
    keyDatable: belongsTo()
  }
});
