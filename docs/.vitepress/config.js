const { getGlossary } = require('./plugins/glossary-get');

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  base: '/Note/',
  lang: 'zh-CN',
  title: '杉木的小破站',
  description: 'Be a student at ten times the speed.',

  markdown: {
    anchor: { permalink: true },
    lineNumbers: true,
    extractHeaders: ['h2', 'h3', 'h4'],
    config: md => {
      const Plugin = require('markdown-it-regexp');
      const patterns = require('./plugins/glossary-patterns');
      const container = require('./plugins/container');
      const mermaid = require('./plugins/mermaid');
      const flowChart = require('./plugins/flow-chart');

      md.use(require('markdown-it-footnote'))
        .use(require('markdown-it-mark'))
        .use(require('markdown-it-sup'))
        .use(require('markdown-it-sub'))
        .use(require('markdown-it-ins'))
        .use(require('@iktakahiro/markdown-it-katex'))
        .use(mermaid)
        .use(flowChart)
        .use(container);

      patterns.forEach(pattern =>
        md.use(Plugin(pattern.regex, pattern.modifier))
      );

      const render = md.render;
      md.render = function () {
        return render
          .apply(this, arguments)
          .replace(/<span class="katex">/g, '<span v-pre class="katex">');
      };
    },
  },

  themeConfig: {
    repo: 'assone/Note',
    docsDir: 'docs',

    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    nav: [
      { text: 'Math', link: '/math', activeMatch: '^/math/' },
      {
        text: 'Programing',
        link: '/programing/',
        activeMatch: '^/programing/',
      },
    ],

    sidebar: {
      '/programing': [
        {
          text: 'C',
          children: [
            {
              text: 'what is c ?',
              link: '/programing/c/',
            },
            {
              text: '数据类型',
              link: '/programing/c/data-type',
            },
            {
              text: '运算符和表达式',
              link: '/programing/c/operators-and-expressions',
            },
            {
              text: '函数',
              link: '/programing/c/function',
            },
          ],
        },
      ],
    },
  },

  customData: {
    glossary: getGlossary(),
  },
};
