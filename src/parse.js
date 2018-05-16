import yaml from 'js-yaml';

const parsers = {
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
  '.json': JSON.parse,
};

const parse = (ext) => {
  if (!parsers[ext]) {
    return console.log(`unsupported file format ${ext}`);
  }
  return parsers[ext];
};

export default parse;
