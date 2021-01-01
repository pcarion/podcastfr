import fs from 'fs-extra';
import path from 'path';

export default async function getPodcastDescriptionsFiles(directory: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        return reject(err);
      }
      const result: string[] = [];
      files.forEach((file) => {
        if (!file.startsWith('_') && file.endsWith('.yaml')) {
          result.push(path.join(directory, file));
        }
      });
      return resolve(result);
    });
  });
}
