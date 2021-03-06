module.exports = [
  {
    regex: /:([\w+]*):([\w+]*):/,
    modifier: (match, utils) => {
      const m1 = match[1].split(':').filter(Boolean).join(':');
      const m2 = match[2].split(':').filter(Boolean).join(':');
      return `<Term term="${m1}" show="${m2}"/>`;
    },
  },
  {
    regex: /:([\w+]*):/,
    modifier: (match, utils) => {
      const m1 = match[1].split(':').filter(Boolean).join(':');
      return `<Term term="${m1}"/>`;
    },
  },
];
