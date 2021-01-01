import * as core from '@actions/core';
import { context, getOctokit } from '@actions/github';
import processUrl from './processUrl';

const repoOwner = 'pcarion';
const repoName = 'podcastfr';

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
        const result = await processUrl(urlCandidate, issueNumber);
        // used by commit acction
        // https://github.com/marketplace/actions/add-commit
        const message = `new podcast: ${result.title} (${result.rss})`;
        core.exportVariable('ISSUE_GHA_COMMIT_MESSAGE', message);

        // https://octokit.github.io/rest.js/v18#issues-set-labels
        await octokit.issues.setLabels({
          owner: repoOwner,
          repo: repoName,
          issue_number: issueNumber,
          labels: ['new podcast'],
        });
        // https://octokit.github.io/rest.js/v18#issues-create-comment
        await octokit.issues.createComment({
          owner: repoOwner,
          repo: repoName,
          issue_number: issueNumber,
          body: `Thank you for your submission! \n The podcast has been added:\n${JSON.stringify(
            result,
            null,
            '  ',
          )}\nYou can open a PR to change the file ${
            result.fileName
          } if you need to add more information for the podcast`,
        });
        await octokit.issues.update({
          owner: repoOwner,
          repo: repoName,
          issue_number: issueNumber,
          state: 'closed',
        });
        console.log('Done - ticket closed');
      }
    } else {
      core.setFailed('no issue data');
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
