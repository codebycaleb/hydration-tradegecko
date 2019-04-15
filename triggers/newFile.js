const hydrators = require('../hydrators');
const utils = require('../utils.js')

const listFiles = (z, bundle) => {
  // You may return a promise or a normal data structure from any perform method.
  return z.request({
      url: utils.getFilesUrl(bundle),
    })
    .then(res => res.json)
    .then(res => {
      const files = res.files;

      // Make it possible to get the actual file contents if necessary (no need to make the request now)
      return files.map((file) => {
        const dataPointer = z.dehydrate(hydrators.fileMeta, { // retrieve file metadata
          filename: file.filename,
        });

        return {id: file.filename, meta: dataPointer};
      });
    });
};

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
//   return [
//     {
//       id: new Date().getTime(),
//       static_dehydrated: z.dehydrate(hydrators.identity, {data: 42}),
//       line_items: [
//         {
//           id: 1,
//           data: z.dehydrate(hydrators.identity, {data: {id: 11, description: {data: {text: 'In West Philadelphia, born and raised'}}}}) 
//         }, {
//           id: 2,
//           data: z.dehydrate(hydrators.identity, {data: {id: 22, description: {data: {text: 'On the playground is where I spent most of my days'}}}}) 
//         }
//       ]
//     }
//   ]
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

//     sample: {
//       id: 'E52F6A0A-0C99-4150-A53D-DD994880F4B1.txt',
//       meta: {
//         filename: 'E52F6A0A-0C99-4150-A53D-DD994880F4B1.txt',
//         createdAt: '2019-03-12T18:47:09.869Z',
//         size: 0,
//         blocks: 0
//       }
//     },
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

    outputFields: [
      {key: 'meta__createdAt', type: 'datetime', label: 'Created At'},
      {key: 'meta__size', type: 'integer', label: 'File Size (bytes)'},
      {key: 'meta__blocks', type: 'integer', label: 'Blocks'},
      {key: 'meta__filename', type: 'string', label: 'Filename'},
      {key: 'meta__file', type: 'file', label: 'File'},
    ],
  },

};
