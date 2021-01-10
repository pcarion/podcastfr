import path from 'path';
import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import parse from 'parse-diff';

import validate from '../validate';

async function run() {
  try {
    // get information on everything
    const token = process.env['GH_PAT'];
    if (!token) {
      throw new Error(`missing gh token`);
    }
    const octokit = getOctokit(token);

    console.log('context.payload.pull_request:', context.payload.pull_request);
    const commits_url = context.payload.pull_request?.commits_url;
    if (!commits_url) {
      throw new Error(`missing commits_url`);
    }
    const result = await octokit.request(commits_url);
    console.log('@@@ commits_url data:', result);
    // const files = parse(result.data);
    // console.log('files in PR:', files);
    const errors: string[] = [];
    // //const podcastFiles: string[] = [];

    // files.forEach((prfile) => {
    //   console.log(prfile);
    // });
    if (errors.length > 0) {
      console.log('Errors:', errors.join('\n'));
      core.setFailed(errors.join('\n'));
    } else {
      // console.log('Podcast files:', podcastFiles);
      // await validate('./podcasts', podcastFiles, './content/podcasts.json');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
