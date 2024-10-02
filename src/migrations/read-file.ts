import { resolve } from 'path';

import * as fs from 'fs';

export const readFileDist = (...paths: string[]) => {
  const filePath = resolve(...paths);
  const file = fs.readFileSync(filePath);
  return file;
};
