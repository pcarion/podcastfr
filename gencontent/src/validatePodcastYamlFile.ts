import yaml from 'js-yaml';
import fs from 'fs-extra';
import { validate as validateAgainsJtdSchema } from 'jtd';
import schema from './jtd/podcast/schema';
import { Podcast } from './jtd/podcast';

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

function validateJdtSchema(content: unknown): Podcast {
  const validationErrors = validateAgainsJtdSchema(schema, content);

  if (validationErrors.length !== 0) {
    console.log(validationErrors);
    throw new Error(
      `content is not valid - ${content} - (schema validation): ${JSON.stringify(validationErrors, null, '  ')}`,
    );
  }
  return content as Podcast;
}

export default async function validatePodcastYaml(fileName: string): Promise<Podcast> {
  try {
    const doc = await loadYamlFile(fileName);
    // console.log(`@@@@ doc for ${fileName} is:`, doc);
    const podcast = validateJdtSchema(doc);
    podcast.yamlDescriptionFile = fileName;
    return podcast;
  } catch (err) {
    console.log(err);
    throw new Error(`invalid podcast yaml structure for: ${fileName}`);
  }
}
