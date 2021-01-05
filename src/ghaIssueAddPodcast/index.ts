import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';

async function run() {
  try {
    // get information on everything
    const token = process.env['GH_PAT'];
    if (!token) {
      throw new Error(`missing gh token`);
    }
    const octokit = getOctokit(token);

    console.log('@@@ context.payload:', context.payload);
    console.log('@@@ octokit:', Object.keys(octokit));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
