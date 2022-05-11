const path = require('path');

const template = () => {
    let requirePath;
    return {
        init() {
            requirePath = path.resolve('.');
            // eslint-disable-next-line global-require
            require('@babel/register')({
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            targets: {
                                node: 'current',
                            },
                            bugfixes: true,
                            modules: 'cjs',
                        },
                    ],
                    [
                        '@babel/preset-react',
                        {
                            runtime: 'automatic',
                        },
                    ],
                ],
            });
        },
        getData: true,
        getInstanceFromInputPath(inputPath) {
            // eslint-disable-next-line import/no-dynamic-require, global-require
            return require(path.join(requirePath, inputPath)).default;
        },
        read: false,
        compile: async (inputContent, inputPath) => {
            // eslint-disable-next-line global-require, import/extensions
            const renderTemplate = require('./render-template').default;
            return async (props) => {
                return renderTemplate(path.join(requirePath, inputPath), props);
            };
        },
        compileOptions: {
            cache: true,
            permalink: 'raw',
        },
    };
};

module.exports = (eleventyConfig) => {
    eleventyConfig.addTemplateFormats('jsx');
    eleventyConfig.addExtension('jsx', template());
};
