import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import extractFilesFromPR from './extractFilesFromPR';
import validateYamlFile from '../util/validateYamlFile';

async function run() {
  try {
    // get information on everything
    const token = process.env['GH_PAT'];
    if (!token) {
      throw new Error(`missing gh token`);
    }
    const octokit = getOctokit(token);

    const pullRequestNumber = context.payload.pull_request?.number;
    if (!pullRequestNumber) {
      throw new Error(`could not find pull request number`);
    }
    const files = await extractFilesFromPR(octokit, context.payload.pull_request);
    console.log('pullRequestNumber:', pullRequestNumber);
    console.log('files in PR:', files);
    if (files.length !== 1) {
      throw new Error(`PR must change one and only one file from the podcasts directory`);
    }
    const podcastYamlFile = files[0];
    const podcast = await validateYamlFile(podcastYamlFile);
    const owner = context.payload.pull_request?.base?.repo?.owner.login;
    const repo = context.payload.pull_request?.base?.repo?.name;
    const prUser = context.payload.pull_request?.user?.login || 'unknown';
    if (!owner || !repo) {
      throw new Error(`Error retrieving PR information`);
    }

    // merging PR
    await octokit.pulls.merge({
      owner,
      repo,
      pull_number: pullRequestNumber,
      commit_title: `update podcast: ${podcast.title}`,
      commit_message: `merge from PR #${pullRequestNumber} by  ${prUser}`,
    });
    console.log('Done');
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
