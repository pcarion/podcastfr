import { Schema } from 'jtd';

const schema: Schema = {
  definitions: {
    PodcastDescription: {
      properties: {
        titre: { type: 'string' },
        feed: {
          optionalProperties: {
            rss: { type: 'string' },
            soundcloud: { type: 'string' },
            itunes: { type: 'string' },
            spotify: { type: 'string' },
            deezer: { type: 'string' },
            google: { type: 'string' },
            castbox: { type: 'string' },
            pocketcast: { type: 'string' },
          },
        },
      },
    },
  },
  elements: {
    ref: 'PodcastDescription',
  },
};
export default schema;
