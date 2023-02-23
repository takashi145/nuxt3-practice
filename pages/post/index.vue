<script setup>
definePageMeta({
  middleware: 'auth'
})

const config = useRuntimeConfig();

const { data: posts } = await useFetch('/api/post');
</script>
<template>
  <div>
    <NuxtLink to="/post/create" class="text-blue-400 hover:text-blue-500">create</NuxtLink>
    <ul v-for="post in posts" :key="post.id">
      <li>
        <NuxtLink :to="`/post/${post.id}`" class="text-gray-600 hover:text-gray-800 hover:underline">{{ post.title }}</NuxtLink>
        <img :src="`${config.public.supabase.url}/storage/v1/object/public/images/${post.image}`" class="border-2" style="width: 300px;">
      </li>
    </ul>
  </div>
</template>