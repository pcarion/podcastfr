import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import parse from 'parse-diff';

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

    const diff_url = context.payload.pull_request?.diff_url;
    if (!diff_url) {
      throw new Error(`missing diff_url`);
    }
    const result = await octokit.request(diff_url);
    const files = parse(result.data);
    console.log('files in PR:', files);
    const errors: string[] = [];
    files.forEach((prfile) => {
      if (!prfile.new) {
        errors.push(`You cannot change a file from a pr: ${prfile.to}`);
      } else {
        if (!(prfile.to || '').startsWith('podcasts/')) {
          errors.push(`You can only add files in the podcasts directory: ${prfile.to}`);
        }
        if (!(prfile.to || '').endsWith('.yaml')) {
          errors.push(`You can only add .yaml files in the podcasts directory: ${prfile.to}`);
        }
      }
    });
    console.log('@@@ errors:', errors);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
