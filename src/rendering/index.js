import renderPlainDiff from './plainDiff';
import renderPrettyDiff from './prettyDiff';
import renderJsonDiff from './jsonDiff';

const formats = {
  plain: renderPlainDiff,
  pretty: renderPrettyDiff,
  json: renderJsonDiff,
};

const renderDiff = (ast, format = 'pretty') => formats[format](ast);

export default renderDiff;
