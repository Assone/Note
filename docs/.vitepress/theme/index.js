import DefaultTheme from 'vitepress/theme';

import CodeGroup from '../components/CodeGroup.vue';
import CodeGroupItem from '../components/CodeGroupItem.vue';
import Glossary from '../components/Glossary.vue';

import './styles/index.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('CodeGroup', CodeGroup);
    app.component('CodeGroupItem', CodeGroupItem);
    app.component('Glossary', Glossary);
  },
};
