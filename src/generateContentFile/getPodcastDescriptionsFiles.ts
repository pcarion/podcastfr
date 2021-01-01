import fs from 'fs-extra';
import path from 'path';

export default async function getPodcastDescriptionsFiles(
  directory: string,
  filesToValidate: string[],
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        return reject(err);
      }
      const result: string[] = [];
      files.forEach((file) => {
        if (!file.startsWith('_') && file.endsWith('.yaml')) {
          const fileName = path.join(directory, file);
          if (filesToValidate && filesToValidate.length > 0) {
            if (!!filesToValidate.find((f) => f === fileName)) {
              result.push(fileName);
            } else {
              console.log('skipping file:', fileName);
            }
          } else {
            result.push(fileName);
          }
        }
      });
      return resolve(result);
    });
  });
}
