<template>
  <div ref="container" className="laufsteg-container">
    <div className="laufsteg-trolley">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { LaufstegOptions } from 'laufsteg';
import { createLaufsteg } from 'laufsteg';
import { ref, watchEffect } from 'vue';

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
</script>
