<script setup>
definePageMeta({
  middleware: 'auth'
})

const config = useRuntimeConfig();

const route = useRoute();

const { data: post } = await useFetch(`/api/post/${route.params.id}`);

const deletePost = async () => {
  try {
    await $fetch(`/api/post/${route.params.id}`, {
      method: "DELETE"
    });
    return navigateTo('/post');
  }catch(e) {
    console.log(e.response);
  }
}
</script>
<template>
  <div>
    <img :src="`${config.public.supabase.url}/storage/v1/object/public/images/${post.image}`" class="border-2" style="width: 300px;">
    <h3>{{ post.title }}</h3>
    <p>{{ post.description }}</p>
    <button @click="deletePost" class="text-red-400">delete</button>
  </div>
</template>
