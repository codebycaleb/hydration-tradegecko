const hydrators = require('./hydrators');
const newExample = require('./triggers/newExample');

// We can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  authentication: {
    type: 'session',
    test: () => ({success: true}),
    sessionConfig: {
      perform: (z, bundle) => ({success: true})
    },
    fields: [{key: 'number', type: 'number', helpText: 'Enter your favorite number here!'}],
  },

  // beforeRequest & afterResponse are optional hooks into the provided HTTP client
  beforeRequest: [
  ],

  afterResponse: [
    (res, z, bundle) => {
      if (res.status != 200) {
        throw new Error(res.content);
      }
      return res;
    },
  ],

  // Any hydrators go here
  hydrators: hydrators,

  // If you want to define optional resources to simplify creation of triggers, searches, creates - do that here!
  resources: {
  },

  // If you want your triggers to show up, you better include it here!
  triggers: {
    [newExample.key]: newExample,
  },

  // If you want your searches to show up, you better include it here!
  searches: {
  },

  // If you want your creates to show up, you better include it here!
  creates: {
  }
};

// Finally, export the app.
module.exports = App;
