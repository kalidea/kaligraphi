// https://github.com/angular/angular/issues/35615#issuecomment-592253747
module.exports = {
  packages: {
    '@kalidea/kaligraphi': {
      ignorableDeepImportMatchers: [
        /lodash-es\//,
      ]
    },
  },
};
