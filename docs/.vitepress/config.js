const { getGlossary } = require('./plugins/glossary-get');

/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  lang: 'zh-CN',
  title: '杉木的小破站',
  description: 'Be a student at ten times the speed.',

  dest: './../../../',

  markdown: {
    anchor: { permalink: false },
    lineNumbers: true,
    config: md => {
      const Plugin = require('markdown-it-regexp');
      const patterns = require('./plugins/glossary-patterns');
      const container = require('./plugins/container');

      container(md);
      patterns.forEach(pattern =>
        md.use(Plugin(pattern.regex, pattern.modifier))
      );
    },
  },

  themeConfig: {
    repo: 'assone/note',
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

  plugins: [
    [
      'container',
      {
        type: 'right',
        defaultTitle: '',
      },
    ],
    [
      'container',
      {
        type: 'theorem',
        before: info => `<div class="theorem"><p class="title">${info}</p>`,
        after: '</div>',
      },
    ],
  ],
};
