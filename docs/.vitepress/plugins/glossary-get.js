const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

exports.getGlossary = function getGlossary(asFeed = false) {
  const glossaryDir = path.resolve(__dirname, '../../GLOSSARY.md');
  const src = fs.readFileSync(glossaryDir, 'utf-8');

  const { data } = matter(src, { excerpt: true });

  return data.glossary;
};
