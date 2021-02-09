<template>
  <div :id="id" :class="{ loading: loading }" class="flowchart">
    <FlowChartLoading class="flowchart-loading-icon" v-if="loading" />
  </div>
</template>

<script>
import { toRefs, ref, onMounted } from 'vue';
import FlowChartLoading from './FlowChartLoading.vue';

const base = {
  x: 0,
  y: 0,
  'line-width': 2,
  'line-length': 50,
  'text-margin': 10,
  'font-size': 14,
  'font-color': '#8DA1AC',
  'line-color': '#8DA1AC',
  'element-color': 'black',
  fill: 'white',
  'yes-text': 'yes',
  'no-text': 'no',
  'arrow-end': 'block',
  scale: 1,
};

const styleList = {
  vue: {
    start: {
      class: 'start-element',
      'font-color': 'white',
      fill: '#2F495F',
      'line-width': '0px',
    },
    end: {
      class: 'end-element',
      'font-color': 'white',
      fill: '#2F495F',
      'line-width': '0px',
    },
    operation: {
      class: 'operation-element',
      'font-color': 'white',
      fill: '#00BC7D',
      'line-width': '0px',
    },
    inputoutput: {
      class: 'inputoutput-element',
      'font-color': 'white',
      fill: '#EB4D5D',
      'line-width': '0px',
    },
    subroutine: {
      class: 'subroutine-element',
      'font-color': 'white',
      fill: '#937AC4',
      'element-color': '#fff',
      'line-color': 'red',
    },
    condition: {
      class: 'condition-element',
      'font-color': 'white',
      fill: '#FFB500',
      'line-width': '0px',
    },
    parallel: {
      class: 'parallel-element',
      'font-color': 'white',
      fill: '#2F495F',
      'line-width': '0px',
    },
  },
  ant: {
    start: {
      class: 'start-element',
      'font-color': 'white',
      fill: '#595959',
      'line-width': '0px',
    },
    end: {
      class: 'end-element',
      'font-color': 'white',
      fill: '#595959',
      'line-width': '0px',
    },
    operation: {
      class: 'operation-element',
      'font-color': 'white',
      fill: '#1890ff',
      'line-width': '0px',
    },
    inputoutput: {
      class: 'inputoutput-element',
      'font-color': 'white',
      fill: '#1890ff',
      'line-width': '0px',
    },
    subroutine: {
      class: 'subroutine-element',
      'font-color': 'white',
      fill: '#FF485E',
      'element-color': '#fff',
      'line-color': 'red',
    },
    condition: {
      class: 'condition-element',
      'font-color': 'white',
      fill: '#FF485E',
      'line-width': '0px',
    },
    parallel: {
      class: 'parallel-element',
      'font-color': 'white',
      fill: '#1890ff',
      'line-width': '0px',
    },
  },
};

export default {
  name: 'flowchart',
  components: {
    FlowChartLoading,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    preset: {
      type: String,
      default: 'vue',
    },
  },
  setup(props) {
    const { id, code, preset } = toRefs(props);
    const loading = ref(true);

    onMounted(() => {
      const style = styleList[preset.value];
      if (!style) {
        console.warn(`[flowchart] Unknown preset: ${preset.value}`);
        return;
      }

      Promise.all([
        import('flowchart.js'),
        new Promise(resolve => setTimeout(resolve, 500)),
      ]).then(([flowchart]) => {
        const { parse } = flowchart.default;

        parse(code.value).drawSVG(id.value, { ...base, symbols: { ...style } });
        loading.value = false;
      });
    });

    return {
      loading,
      id,
    };
  },
};
</script>

<style>
.flowchart {
  overflow: scroll;
  text-align: center;
  font-size: 0px;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 1s;
  padding: 10px;
}

.flowchart > svg {
  max-width: 100%;
  height: auto;
}

.flowchart.loading {
  background-color: #f3f6f8;
}

.operation-element,
.parallel-element {
  rx: 5px;
  ry: 5px;
}
.flowchart-loading-icon {
  width: 40px;
  height: 40px;
  fill: #3eaf7c;
}
</style>
