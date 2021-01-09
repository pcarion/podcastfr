import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import processUrl from './processUrl';

async function run() {
  try {
    // get information on everything
    const token = process.env['GH_PAT'];
    if (!token) {
      throw new Error(`missing gh token`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const octokit = getOctokit(token);

    if (context.payload.issue) {
      const issueNumber = context.payload.issue.number;
      const title = context.payload.issue.title as string;
      if (!title) {
        core.setFailed('no title for the issue');
      } else {
        console.log('title of issue:', title);
        // we have a title for the issue
        const urlCandidate = title.trim();
        await processUrl(urlCandidate, issueNumber);
      }
    } else {
      core.setFailed('no issue data');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
