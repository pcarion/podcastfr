import fs from 'fs-extra';
import yaml from 'js-yaml';
import { validate as validateAgainsJtdSchema } from 'jtd';
import schema from './jtd/schema';
import { PodcastDescription } from './jtd';

async function loadYamlFile(fileName: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        return reject(err);
      }
      const content = data.toString('utf8');
      const doc = yaml.safeLoad(content);
      if (!doc) {
        throw new Error(`ERR01: error loading yaml file: ${fileName}`);
      }
      return resolve(doc);
    });
  });
}

function validateJdtSchema(content: unknown): PodcastDescription {
  const validationErrors = validateAgainsJtdSchema(schema, content);

  if (validationErrors.length !== 0) {
    console.log(validationErrors);
    throw new Error(`file is not valid (schema validation): ${validationErrors}`);
  }
  return content as PodcastDescription;
}

async function validate(fileName: string): Promise<void> {
  const doc = await loadYamlFile(fileName);
  console.log(doc);
  const description = validateJdtSchema(doc);
  console.log(description);
}

const fileName = './podcast.yaml';
console.log(`Validating ${fileName}...`);
validate(fileName)
  .then(() => {
    console.log('File is valid');
  })
  .catch((err) => {
    console.log('File is not valid');
    console.log(err);
  });
