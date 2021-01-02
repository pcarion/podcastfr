import { Schema } from 'jtd';

const schema: Schema = {
  properties: {
    title: { type: 'string' },
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
  optionalProperties: {
    ignore: { type: 'boolean' },
  },
};
export default schema;
