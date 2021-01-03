import path from 'path';
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

    const diff_url = context.payload.pull_request?.diff_url;
    if (!diff_url) {
      throw new Error(`missing diff_url`);
    }
    const result = await octokit.request(diff_url);
    const files = parse(result.data);
    console.log('files in PR:', files);
    const errors: string[] = [];
    const podcastFiles: string[] = [];
    // TODO: check that the podcast file is not in a subdirectory
    files.forEach((prfile) => {
      if (!prfile.to) {
        errors.push(`invalid file in pr: ${prfile}`);
      } else if (!prfile.new) {
        errors.push(`You cannot change a file from a pr: ${prfile.to}`);
      } else {
        const fileName = path.normalize(prfile.to);
        console.log('@@ fileName is:', fileName);
        console.log('@@ parsed fileName is:', path.parse(fileName));
        if (!(prfile.to || '').startsWith('podcasts/')) {
          errors.push(`You can only add files in the podcasts directory: ${prfile.to}`);
        } else if (!(prfile.to || '').endsWith('.yaml')) {
          errors.push(`You can only add .yaml files in the podcasts directory: ${prfile.to}`);
        } else {
          podcastFiles.push(prfile.to || '');
        }
      }
    });
    if (errors.length > 0) {
      console.log('Errors:', errors.join('\n'));
      core.setFailed(errors.join('\n'));
    } else {
      console.log('Podcast files:', podcastFiles);
    }
    core.exportVariable('PODCAST_FILES', podcastFiles.join('|'));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
