<script setup>
defineProps({
  value: String,
})
</script>
<template>
  <label >
    <span v-if="vlaue">{{ value }}</span>
    <span v-else><slot /></span>
  </label>
</template>