const path = require("path");

const template = (config = {}) => {
  let requirePath;
  const { babelConfig = {} } = config;

  return {
    init() {
      requirePath = path.resolve(".");
      // eslint-disable-next-line global-require
      require("@babel/register")({
        ...babelConfig,
        presets: [
          [
            "@babel/preset-env",
            {
              targets: {
                node: "current",
              },
              bugfixes: true,
            },
          ],
          [
            "@babel/preset-react",
            {
              runtime: "automatic",
            },
          ],
          ...(babelConfig.presets ?? []),
        ],
        only: [__dirname, process.cwd()],
        plugins: babelConfig.plugins ?? [],
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
      const renderTemplate = require("./template").default;
      return async (props) => {
        return renderTemplate(path.join(requirePath, inputPath), props);
      };
    },
    compileOptions: {
      cache: true,
      permalink: "raw",
    },
  };
};

module.exports = (eleventyConfig, config) => {
  eleventyConfig.addTemplateFormats("jsx");
  eleventyConfig.addExtension("jsx", template(config));
};
