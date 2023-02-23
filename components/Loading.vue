<script setup>
defineProps({
  loading: Boolean,
})
</script>
<template>
  <div v-if="loading" class="fixed inset-0 bg-black/30 min-h-screen">
    <div class="z-40 flex justify-center items-center h-full text-white">
      <div className="animate-spin h-12 w-12 border-4 border-blue-500 rounded-full border-t-transparent"></div>
    </div>
  </div>
</template>