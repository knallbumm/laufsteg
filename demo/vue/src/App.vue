<template>
  <div>
    <Laufsteg gap="1rem" class="large-text"
      ><LaufstegCell>Test</LaufstegCell></Laufsteg
    >
  </div>
</template>

<script lang="ts" setup>
import { Laufsteg, LaufstegCell } from 'laufsteg-vue';
</script>

<style>
.large-text {
  font-size: 4rem;
}
</style>
