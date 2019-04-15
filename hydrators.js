const _ = require('lodash')
const utils = require('./utils.js')

const hydrators = {
  identity: (z, bundle) => bundle.inputData,
  wrap: (z, bundle) => z.dehydrate(hydrators.identity, bundle.inputData),
};

module.exports = hydrators;
