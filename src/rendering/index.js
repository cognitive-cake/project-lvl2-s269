import renderPlainDiff from './plainDiff';
import renderPrettyDiff from './prettyDiff';

// not the final rendering implementation
const renderDiff = (ast, options) => (options ? renderPlainDiff(ast) : renderPrettyDiff(ast, 1));

export default renderDiff;
