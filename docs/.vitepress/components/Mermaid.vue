<script lang="ts">
import { defineComponent, ref, toRefs, h, onMounted } from 'vue';
import MermaidLoading from './MermaidLoading.vue';

export default defineComponent({
  name: 'Mermaid',
  props: {
    id: {
      type: String,
      required: true,
    },
    graph: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { id, graph } = toRefs(props);
    const svg = ref(undefined);

    onMounted(() => {
      import('mermaid/dist/mermaid.min').then(mermaid => {
        mermaid.initialize({ startOnLoad: true });

        let renderDiv = document.createElement('div');
        document.body.appendChild(renderDiv);

        mermaid.render(
          id.value,
          graph.value,
          view => {
            svg.value = view;
            document.body.removeChild(renderDiv);
          },
          renderDiv
        );
      });
    });

    return () =>
      svg.value
        ? h('div', {
            innerHTML: svg.value,
            style: {
              width: '100%',
            },
          })
        : h(MermaidLoading);
  },
});
</script>
