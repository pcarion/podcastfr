import fs from 'fs-extra';
import { validate as validateAgainsJtdSchema } from 'jtd';
import schema from '../jtd/podcast/schema';
import { Podcast } from '../jtd/podcast';

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

export default async function validateContentFile(fileName: string): Promise<Podcast[]> {
  const exists = await fs.pathExists(fileName);
  if (!exists) {
    return [];
  }
  const doc = await fs.readJSON(fileName);
  if (!Array.isArray(doc)) {
    throw new Error(`content invalid (not an array)`);
  }
  return doc.map((d) => validateJdtSchema(d, fileName));
}
