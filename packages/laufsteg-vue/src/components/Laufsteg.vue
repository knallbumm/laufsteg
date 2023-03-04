<template>
  <div ref="container" className="laufsteg-container">
    <div className="laufsteg-trolley">
      <div className="laufsteg-cell">Your cell content goes here</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { createLaufsteg } from 'laufsteg';
import { ref, watchEffect } from 'vue';

const laufsteg = ref<ReturnType<typeof createLaufsteg>>();

defineProps<{ msg: string }>();

const container = ref<HTMLDivElement>();

watchEffect(() => {
  if (!laufsteg.value && container.value) {
    laufsteg.value = createLaufsteg(container.value, {});
  }
});
</script>
