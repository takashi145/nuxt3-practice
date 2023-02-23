<script setup>
import Navbar from "~~/components/Navbar.vue";
</script>

<template>
  <div class="h-screen">
    <Navbar />
    <div class="max-w-5xl mx-auto">
      <slot />
    </div>
  </div>
</template>
