import ReactDOMServer from 'react-dom/server';
import { EleventyContext } from './eleventy-context';

export default function renderTemplate(templatePath, props) {
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const TemplateComponent = require(templatePath).default;

    return `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(
        <EleventyContext.Provider value={props}>
            <TemplateComponent />
        </EleventyContext.Provider>
    )}`;
}
