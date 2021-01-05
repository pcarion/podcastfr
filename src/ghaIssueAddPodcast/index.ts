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
    if (context.payload.issue) {
      const title = context.payload.issue.title as string;
      if (!title) {
        core.setFailed('no title for the issue');
      }
      console.log('title of issue:', title);
    } else {
      core.setFailed('no issue data');
    }
    console.log('@@@ octokit:', Object.keys(octokit));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
