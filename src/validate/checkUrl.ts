import axios from 'axios';

export default async function checkUrl(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        return resolve(response.request.res.responseUrl);
      })
      .catch((err) => {
        return reject(new Error(`Error accessing url: ${url}: ${err}`));
      });
  });
}
