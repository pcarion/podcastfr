import { Schema } from 'jtd';

const schema: Schema = {
  properties: {
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    imageUrl: {
      type: 'string',
    },
    pid: {
      type: 'string',
    },
    feed: {
      properties: {
        rss: {
          type: 'string',
        },
        itunes: {
          type: 'string',
        },
        soundcloud: {
          type: 'string',
        },
        deezer: {
          type: 'string',
        },
        castbox: {
          type: 'string',
        },
        spotify: {
          type: 'string',
        },
        pocketcast: {
          type: 'string',
        },
        google: {
          type: 'string',
        },
      },
    },
    hosts: {
      elements: {
        optionalProperties: {
          name: {
            type: 'string',
          },
          twitter: {
            type: 'string',
          },
        },
      },
    },
    contacts: {
      properties: {
        twitter: {
          type: 'string',
        },
        link: {
          type: 'string',
        },
        googleGroup: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        patreon: {
          type: 'string',
        },
      },
    },
  },
  optionalProperties: {
    yamlDescriptionFile: {
      type: 'string',
    },
  },
};
export default schema;
