<template>
  <dl>
    <div v-for="(value, key) in terms">
      <dt class="defined-term">{{ key }}</dt>
      <dd class="term-definition">{{ value }}</dd>
    </div>
  </dl>
</template>

<script lang="ts">
export default {
  name: 'Glossary',
  props: {
    terms: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
dd {
  margin-inline-start: 1em;
  padding: 0 0 0.75em 0;
}

dt.defined-term {
  font-weight: 600;
  color: #8b9c16;
}
</style>
