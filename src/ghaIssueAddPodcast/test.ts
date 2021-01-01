import processUrl from './processUrl';

const urlCandidate = process.argv[2];

processUrl(urlCandidate, 999)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
