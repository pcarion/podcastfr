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

  const nbPodcastsJsonFile = path.join('./content/meta/nbPodcasts.json');
  content = fs.readFileSync(nbPodcastsJsonFile);
  json = JSON.parse(content);
  const nbPodcasts = json.nbPodcasts;

  const badge2 = {
    schemaVersion: 1,
    label: 'podcasts',
    message: '' + nbPodcasts,
    color: 'brightgreen',
  };

  fs.writeFileSync(`${badgePath}/podcasts.json`, JSON.stringify(badge2));

  const lastUpdateJsonFile = path.join('./content/meta/lastUpdate.json');
  content = fs.readFileSync(lastUpdateJsonFile);
  json = JSON.parse(content);
  const lastUpdateDate = json.date;

  const badge3 = {
    schemaVersion: 1,
    label: 'mise à jour',
    message: lastUpdateDate,
    color: 'blue',
  };

  fs.writeFileSync(`${badgePath}/lastUpdate.json`, JSON.stringify(badge3));
};
