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
    console.log('@@@ commits_url data:', result.data);
    if (result.data.length !== 1) {
      throw new Error(`only one file per PR is authorized`);
    }
    const commit_url = (result.data || [])[0]?.url;
    if (!commit_url) {
      throw new Error(`missing commit_url`);
    }
    console.log('>> commit_url:', commit_url);
    const result2 = await octokit.request(commit_url);
    console.log('@@@ commit_url data:', result2.data);

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
