<script setup>
definePageMeta({
  middleware: 'auth'
})

const config = useRuntimeConfig();

const { data: posts } = await useFetch('/api/post');
</script>
<template>
  <div class="m-8">
    <NuxtLink to="/post/create" class="z-40 fixed bottom-12 right-6 p-4 rounded-lg text-white bg-blue-400 hover:bg-blue-500">Add</NuxtLink>
    
    <ul class="my-3">
      <li v-for="post in posts" :key="post.id" class="border-b mb-6 p-2 flex space-x-8 shadow">
        <img :src="`${config.public.supabase.url}/storage/v1/object/public/images/${post.image}`" class="border-2" style="width: 200px;">
        <div>
          <p class="text-sm text-gray-600 mb-3">Id: {{ post.id }}</p>
          <NuxtLink 
            :to="`/post/${post.id}`" 
            class="text-gray-600 hover:text-gray-800 hover:underline text-lg"
          >
            {{ post.title }}
          </NuxtLink>
        </div>
        
      </li>
    </ul>
  </div>
</template>