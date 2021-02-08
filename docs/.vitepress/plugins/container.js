const container = require('markdown-it-container');

function createContainer(containerOptions) {
  const { type, locales, after, before } = containerOptions;
  let renderBefore, renderAfter;

  if (before !== undefined && after !== undefined) {
    renderBefore = before;
    renderAfter = after;
  } else {
    renderBefore = info =>
      `<div class="custom-block ${type}">${
        info ? `<p class="custom-block-title">${info}</p>` : ''
      }\n`;
    renderAfter = () => `</div>\n`;
  }

  return [
    container,
    type,
    {
      render(tokens, idx) {
        const token = tokens[idx];
        const info = token.info.trim().slice(type.length).trim();
        if (token.nesting === 1) {
          return renderBefore(info);
        } else {
          return renderAfter(info);
        }
      },
    },
  ];
}

module.exports = md => {
  md.use(...createContainer({ type: 'theorem', locales: 'THEOREM' }))
    .use(...createContainer({ type: 'right', locales: '' }))
    .use(
      ...createContainer({
        type: 'details',
        before: info =>
          `<details class="custom-block details">${
            info ? `<summary>${info}</summary>` : ''
          }\n`,
        after: () => '</details>\n',
      })
    )
    .use(
      ...createContainer({
        type: 'code-group',
        before: () => `<CodeGroup>\n`,
        after: () => '</CodeGroup>\n',
      })
    )
    .use(
      ...createContainer({
        type: 'code-group-item',
        before: info => `<CodeGroupItem title="${info}">\n`,
        after: () => '</CodeGroupItem>\n',
      })
    );
};
