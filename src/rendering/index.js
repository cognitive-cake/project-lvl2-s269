import renderPlainDiff from './plainDiff';
import renderPrettyDiff from './prettyDiff';

// not the final rendering implementation
const renderDiff = (ast, options) => (options ? renderPlainDiff(ast) : renderPrettyDiff(ast, 0));

export default renderDiff;
