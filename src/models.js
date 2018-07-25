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
    chargeCode: attr(),
    name: attr(),
    description: attr(),
    hqCity: attr(),
    hqCountry: attr(),
    industryId: attr(),
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
    id: attr(),
    createdAt: attr(),
    sprintType: attr(),
    sprintName: attr(),
    duration: attr(),
    dvPartner1: attr(),
    dvPartner2: attr(),
    mandate: attr(),
    logo: attr(),
    openDate: attr(),
    kickedOffAt: attr(),
    colour: attr(),
    partnerId: attr(),
    dvOfficeId: attr(),
    keyDates: hasMany(),
    roles: hasMany(),
    concepts: hasMany(),
    users: hasMany(),
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
    status: attr(), // killed, incomplete, complete, scored
    description: attr(),
    logo: attr(),
    segment: attr(),
    friction: attr(),
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
    corporateAssets: attr(),
    incubationCost: attr(),
    breakEvenCost: attr(),
    breakEvenYear: attr(),
    willGMLeave: attr(),
    gmConviction: attr(),
    gmComments: attr(),
    partnerPreferences: attr(),
    innovationId: attr(),
    targetIndustryId: attr(),
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
    description: attr(),
    logo: attr(),
    segment: attr(),
    friction: attr(),
    marketSize: attr(),
    targetCustomers: attr(),
    targetGeography: attr(),
    solutionDescription: attr(),
    primaryTechnology: attr(),
    successFactors: attr(),
    keyRisks: attr(),
    businessType: attr(),
    salesModel: attr(),
    revenueModel: attr(),
    unitEconomics: attr(),
    corporateAdvantage: attr(),
    corporateAssets: attr(),
    incubationCost: attr(),
    breakEvenCost: attr(),
    breakEvenYear: attr(),
    willGMLeave: attr(),
    gmConviction: attr(),
    gmComments: attr(),
    partnerPreferences: attr(),
    conceptId: attr(),
    concept: belongsTo()
  }
});

export const conceptFinanceScore = ApplicationRecord.extend({
  static: {
    jsonapiType: 'concept_finance_scores'
  },
  attrs: {
    id: attr(),
    key: attr(),
    value: attr(),
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
    innovationId: attr(),
    roles: hasMany(),
    role: belongsTo(),
    innovation: belongsTo()
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
