<script setup>
definePageMeta({
  middleware: 'auth'
})

const config = useRuntimeConfig();

const route = useRoute();

const supabase = useSupabaseClient();

const loading = ref(false);

const { data: post, error } = await useFetch(`/api/post/${route.params.id}`);

if(error.value && error.value.statusCode === 404) {
  throw createError({
    statusCode: 404,
    message: 'page not found',
  })
}

const deletePost = async () => {
  loading.value = true;
  try {
    const post = await $fetch(`/api/post/${route.params.id}`, {
      method: "DELETE"
    });

    await supabase.storage.from("images").remove(post.image);

    return navigateTo('/post');
  }finally{
    loading.value = false;
  }
}
</script>
<template>
  <Loading :loading="loading" />
  <div class="m-8">
    <NuxtLink to="/post" class="text-blue-400 hover:text-blue-500">Back</NuxtLink>
    <div class="text-gray-600 body-font">
      <div class="container mx-auto flex px-5 py-8 items-center justify-center flex-col">
        <img class="w-2/3 mb-10 object-cover object-center rounded border-2" alt="hero" :src="`${config.public.supabase.url}/storage/v1/object/public/images/${post.image}`">
        <div class="text-center lg:w-2/3 w-full">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">{{ post.title }}</h1>
          <p class="mb-8 leading-relaxed">{{ post.description }}</p>
          <div class="flex justify-center">
            <button @click="deletePost" class="inline-flex text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
