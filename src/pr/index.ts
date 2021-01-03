import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
// import parse from 'parse-diff';

async function run() {
  try {
    // get information on everything
    const token = process.env['GH_PAT'];
    console.log('@@ token is:', token);
    if (!token) {
      throw new Error(`missing gh token`);
    }
    const octokit = getOctokit(token);

    console.log('@@@ octokit:', Object.keys(octokit));
    console.log('@@@ context:', Object.keys(context));

    console.log('@@ context.payload.pull_request:', context?.payload?.pull_request);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
