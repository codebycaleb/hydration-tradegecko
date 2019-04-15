const hydrators = require('../hydrators');
const utils = require('../utils.js')

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
  key: 'newFile',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'File',
  display: {
    label: 'New File',
    description: 'Trigger when a new file is added.',
  },

  // `operation` is where the business logic goes.
  operation: {
//     perform: listFiles,
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
