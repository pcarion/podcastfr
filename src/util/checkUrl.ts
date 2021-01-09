import axios from 'axios';

// follow URL redirect to get final landing URL
export default async function checkUrl(url: string): Promise<string> {
  console.log(`checking url: ${url} type:${typeof url}...`);
  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url: url,
    })
      .then((response) => {
        console.log('response...');
        return resolve(response.request.res.responseUrl);
      })
      .catch((err) => {
        return reject(new Error(`Error accessing url: ${url}: ${err}`));
      });
  });
}
