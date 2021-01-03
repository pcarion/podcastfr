import fs from 'fs-extra';

export default async function copyAssets(srcDir: string, destDir: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.copy(
      srcDir,
      destDir,
      {
        errorOnExist: false,
      },
      (err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      },
    );
  });
}
