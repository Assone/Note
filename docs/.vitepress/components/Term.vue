<template>
  <a
    :title="definition"
    :class="{ 'term-not-found': termNotFound, term: true }"
    >{{ displayText }}</a
  >
</template>

<script lang="ts">
import { ref, toRefs, computed } from 'vue';
import { useSiteData } from 'vitepress';

const removeTermLink = (term: string) =>
  term
    .replace(/:[\w+]*:([\w+]*):/g, (match, g1) => g1)
    .replace(/:([\w+]*):/g, (match, g1) => g1);

const replaceUnderscoresWithSpaces = str => str.split('_').join(' ');

export default {
  props: {
    term: {
      type: String,
      required: true,
    },
    show: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { term, show } = toRefs(props);
    const { customData } = useSiteData().value;
    const termNotFound = ref(false);

    const terms = computed(() => customData.glossary);
    const definition = computed(() => {
      const termWithSpaces = replaceUnderscoresWithSpaces(term.value);
      const definition = terms.value[termWithSpaces];

      if (definition) {
        return removeTermLink(definition);
      } else {
        termNotFound.value = true;
        return 'Term not found in the glossary';
      }
    });
    const displayText = computed(() =>
      replaceUnderscoresWithSpaces(show.value ? show.value : term.value)
    );

    return {
      termNotFound,
      definition,
      displayText,
    };
  },
};
</script>

<style scoped>
.term {
  font-weight: normal;
  color: #8b9c16;
}

.term-not-found {
  color: darkred;
}

.term,
.term-not-found {
  cursor: help;
}
</style>
