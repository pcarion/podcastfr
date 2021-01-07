import fs from 'fs-extra';
import yaml from 'js-yaml';
import { validate as validateAgainsJtdSchema } from 'jtd';
import schema from '../jtd/podcast/schema';
import { Podcast } from '../jtd/podcast';

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

function validateJdtSchema(content: unknown, fileName: string): Podcast {
  const validationErrors = validateAgainsJtdSchema(schema, content);

  if (validationErrors.length !== 0) {
    console.log(validationErrors);
    throw new Error(
      `file is not valid - ${fileName} - (schema validation): ${JSON.stringify(validationErrors, null, '  ')}`,
    );
  }
  return content as Podcast;
}

export default async function validateYamlFile(fileName: string): Promise<Podcast> {
  const doc = await loadYamlFile(fileName);
  const descriptions = validateJdtSchema(doc, fileName);
  return descriptions;
}
