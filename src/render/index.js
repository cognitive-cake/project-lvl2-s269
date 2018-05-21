import _ from 'lodash';
import renderPlainDiff from './plainDiff';
import renderPrettyDiff from './prettyDiff';

const renderDiff = (ast, options) => (options ? renderPlainDiff(ast) : `{\n${_.flatten(renderPrettyDiff(ast, 1)).join('\n')}\n}`); // заготовка для шестого задания, это не окончательная реализация выбора рендера

export default renderDiff;
