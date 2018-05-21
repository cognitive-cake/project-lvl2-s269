import renderPlainDiff from './plainDiff';
import renderPrettyDiff from './prettyDiff';

// заготовка для шестого задания, это не окончательная реализация выбора рендера
const renderDiff = (ast, options) => (options ? renderPlainDiff(ast) : renderPrettyDiff(ast, 1));

export default renderDiff;
