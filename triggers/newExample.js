const hydrators = require('../hydrators');

const identity = (z, bundle) => {
  return [
    {
      id: new Date().getTime(),
      line_items: [
        {
          id: 1,
          data: z.dehydrate(hydrators.wrap, {hello: "world"})
        }, {
          id: 2,
          data: z.dehydrate(hydrators.wrap, {hello: "there"})
        }
      ]
    }
  ]
}

// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'newExample',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Example',
  display: {
    label: 'Static Example',
    description: 'Always returns the same data.',
  },

  operation: {
    perform: identity,
    sample: {
      id: 1,
      line_items: [
        {
          id: 2,
          data: {
            "hello": "world"
          }
        }
      ]
    },
    outputFields: [],
  },

};
