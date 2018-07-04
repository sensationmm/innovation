import Config from './config';

// TODO. Look for possible alternatives to JSORM which are ES6 compatible.
const {
  JSORMBase,
  attr,
  belongsTo,
  hasMany
} = require("jsorm/dist/jsorm");

const ApplicationRecord = JSORMBase.extend({
  static: {
    baseUrl: Config.apiDomain,
    apiNamespace: Config.apiNamespace,
    jwtStorage: "inventure-auth",
    generateAuthHeader(auth) {
      const authObj = JSON.parse(auth);
      return `Bearer ${authObj.token}`
    }
  }
});

export const Innovation = ApplicationRecord.extend({
  static: {
    jsonapiType: "innovations"
  },
  attrs: {
    id: attr(),
    name: attr(),
    colour: attr(),
    createdAt: attr(),
    updatedAt: attr(),
    kickedOffAt: attr(),
    logo: attr(),
    logoName: attr(),
    keyDates: hasMany(),
    users: hasMany(),
    roles: hasMany()
  }
});

export const Concept = ApplicationRecord.extend({
  static: {
    jsonapiType: "concepts"
  },
  attrs: {
    id: attr(),
    name: attr(),
    opportunityAreas: attr(),
    archetypes: attr()
  }
})

export const User = ApplicationRecord.extend({
  static: {
    jsonapiType: "users"
  },
  attrs: {
    id: attr(),
    name: attr(),
    email: attr(),
    password: attr(),
    currentPassword: attr(),
    innovation: belongsTo(),
    roles: hasMany(),
    role: belongsTo()
  }
});

export const Role = ApplicationRecord.extend({
  static: {
    jsonapiType: "roles"
  },
  attrs: {
    name: attr(),
    email: attr(),
    user: belongsTo(),
    rolableId: attr(),
    rolable: belongsTo(),
    rolableType: attr()
  }
});

export const KeyDate = ApplicationRecord.extend({
  static: {
    jsonapiType: "key_dates"
  },
  attrs: {
    id: attr(),
    name: attr(),
    date: attr(),
    keyDatableId: attr(),
    keyDatable: belongsTo(),
    keyDatableType: attr()
  }
});
