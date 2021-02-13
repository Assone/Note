import DefaultTheme from 'vitepress/theme';

import Badge from '../components/Badge.vue';
import CodeGroup from '../components/CodeGroup.vue';
import CodeGroupItem from '../components/CodeGroupItem.vue';
import Glossary from '../components/Glossary.vue';
import Term from '../components/Term.vue';
import Mermaid from '../components/Mermaid.vue';
import FlowChart from '../components/FlowChart.vue';

import './styles/index.css';
import 'katex/dist/katex.min.css';

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('Badge', Badge);
    app.component('CodeGroup', CodeGroup);
    app.component('CodeGroupItem', CodeGroupItem);
    app.component('Glossary', Glossary);
    app.component('Term', Term);
    app.component('Mermaid', Mermaid);
    app.component('FlowChart', FlowChart);
  },
};
