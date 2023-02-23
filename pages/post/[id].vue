<script setup>
definePageMeta({
  middleware: 'auth'
})

const config = useRuntimeConfig();

const route = useRoute();

const supabase = useSupabaseClient();

const { data: post, error } = await useFetch(`/api/post/${route.params.id}`);

if(error.value && error.value.statusCode === 404) {
  throw createError({
    statusCode: 404,
    message: 'page not found',
  })
}

const deletePost = async () => {
  try {
    const post = await $fetch(`/api/post/${route.params.id}`, {
      method: "DELETE"
    });

    await supabase.storage.from("images").remove(post.image);

    return navigateTo('/post');
  }catch(e) {
    console.log(e.response);
  }
}
</script>
<template>
  <div>
    <NuxtLink to="/post" class="text-blue-400 hover:text-blue-500">Back</NuxtLink>
    <img :src="`${config.public.supabase.url}/storage/v1/object/public/images/${post.image}`" class="border-2" style="width: 300px;">
    <h3>{{ post.title }}</h3>
    <p>{{ post.description }}</p>
    <button @click="deletePost" class="text-red-400">delete</button>
  </div>
</template>
