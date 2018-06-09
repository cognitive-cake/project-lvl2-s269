import renderPlainDiff from './plainDiff';
import renderPrettyDiff from './prettyDiff';

const formats = {
  plain: renderPlainDiff,
  pretty: renderPrettyDiff,
};

const renderDiff = (ast, format = 'pretty') => formats[format](ast, 0);

export default renderDiff;
