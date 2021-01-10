/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Octokit } from '@octokit/core';

export default async function extractFilesFromPR(octokit: Octokit, payloadPullRequest: any): Promise<string[]> {
  const files: string[] = [];
  const commits_url = payloadPullRequest.commits_url;
  if (!commits_url) {
    throw new Error(`missing commits_url`);
  }
  const result = await octokit.request(commits_url);
  console.log('@@@ commits_url data:', result.data);
  if (result.data.length !== 1) {
    throw new Error(`only one file per PR is authorized`);
  }
  for (const commit of result.data || []) {
    const commit_url = commit.url;
    if (!commit_url) {
      throw new Error(`missing commit_url`);
    }
    console.log('>> commit_url:', commit_url);
    const result = await octokit.request(commit_url);
    console.log('@@@ commit_url data:', result.data);
    (result.data.files || []).forEach((f: any) => {
      if (!files.includes(f.filename)) {
        files.push(f.filename);
      }
    });
  }

  return files;
}
