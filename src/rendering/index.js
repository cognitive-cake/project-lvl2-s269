import _ from 'lodash';
import renderPlainDiff from './plainDiff';
import renderPrettyDiff from './prettyDiff';

const formats = {
  plain: renderPlainDiff,
  pretty: renderPrettyDiff,
  json: _.identity,
};

const renderDiff = (ast, format = 'pretty') => formats[format](ast);

export default renderDiff;
