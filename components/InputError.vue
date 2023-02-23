<script setup>
defineProps({
  error: ''
})
</script>
<template>
  <p v-if="error" class="text-red-400 text-sm">
    {{ error }}
  </p>
</template>