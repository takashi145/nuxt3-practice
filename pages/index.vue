<script setup>
const user = useSupabaseUser();

watchEffect(async () => {
  if(user.value ) await navigateTo('/post');
})
</script>
<template>
  <div class="flex flex-col justify-center mt-48 text-center space-y-4">
    <h1 class="text-4xl">Welcome!</h1>
    <NuxtLink to="/login" class="underline text-xl text-blue-400 hover:text-blue-500">SignIn</NuxtLink>
  </div>
</template>