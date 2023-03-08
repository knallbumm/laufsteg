<template>
  <div ref="container" className="laufsteg-container">
    <div className="laufsteg-trolley" ref="trolley">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LaufstegOptions } from 'laufsteg';
import { createLaufsteg } from 'laufsteg';
import { onMounted, onUpdated, ref, watchEffect } from 'vue';

const laufsteg = ref<ReturnType<typeof createLaufsteg>>();

const container = ref<HTMLDivElement>();

watchEffect(() => {
  if (!laufsteg.value && container.value) {
    laufsteg.value = createLaufsteg(container.value, props);
  }
});

const props = defineProps<{
  offset?: LaufstegOptions['offset'];
  draggable?: LaufstegOptions['draggable'];
  animationSpeed?: LaufstegOptions['animationSpeed'];
  friction?: LaufstegOptions['friction'];
  overflowItems?: LaufstegOptions['overflowItems'];
  gap?: LaufstegOptions['gap'];
  cursor?: LaufstegOptions['cursor'];
}>();

const trolley = ref<HTMLDivElement>();

const observer = ref();
console.log('BLAAA');
onMounted(() => {
  console.log('onMounted');
  if (trolley.value) {
    observer.value = new MutationObserver(() => {
      laufsteg.value?.rebuild();
    });
    observer.value.observe(trolley.value, {
      childList: true,
      subtree: true,
    });
  }
});
onUpdated(() => {
  console.log('onUpdated');
  laufsteg.value?.rebuild();
});
</script>
