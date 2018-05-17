import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
  '.json': JSON.parse,
  '.ini': ini.parse,
};

const parse = (ext) => {
  if (!parsers[ext]) {
    throw new Error(`unsupported file format ${ext}`);
  }
  return parsers[ext];
};

export default parse;
