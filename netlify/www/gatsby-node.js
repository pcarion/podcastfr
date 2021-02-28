/* eslint-disable @typescript-eslint/no-var-requires */
// fs dependency is a Node.js library for working with the filesystem.
const fs = require('fs');
// Path is a Node.js library with utilities for working with file paths.
const path = require('path');

// Use the onPostBuild Node API, which runs after the build has been completed.
// Note that we have to use an async function here because the Remark plugin
// writes the html property asynchronously.
exports.onPostBuild = async () => {
  // A reference to where we are going to put the files. Note that the public
  // directory already exists because the build has been completed (since
  // we're in the onPostBuild hook).
  const badgePath = './public/badges';
  // If we don't already have the badges directory inside the public directory,
  // create it.
  if (!fs.existsSync(badgePath)) fs.mkdirSync(badgePath);

  const nbEpisodesJsonFile = path.join('./content/meta/nbEpisodes.json');
  const content = fs.readFileSync(nbEpisodesJsonFile);
  const json = JSON.parse(content);
  const nbEpisodes = json.nbEpisodes;

  const badge1 = {
    schemaVersion: 1,
    label: 'épisodes',
    message: '' + nbEpisodes,
    color: 'orange',
  };

  fs.writeFileSync(`${badgePath}/episodes.json`, JSON.stringify(badge1));
};
