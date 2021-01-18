import generateContentFile from '.';

generateContentFile('../content/podcasts.json', '../podcasts')
  .then(() => {
    console.log('DONE');
  })
  .catch((err) => {
    console.log(err);
  });
