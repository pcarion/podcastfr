import axios from 'axios';

// follow URL redirect to get final landing URL
export default async function checkUrl(url: string): Promise<string> {
  console.log(`checking url: ${url}...`);
  axios.interceptors.request.use((request) => {
    console.log('Starting Request', JSON.stringify(request, null, 2));
    return request;
  });

  axios.interceptors.response.use((response) => {
    console.log('Response:', JSON.stringify(response, null, 2));
    return response;
  });

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
