<script setup>
import { reactive } from 'vue';

definePageMeta({
  middleware: 'auth'
})

const { data: posts } = await useFetch('/api/post');

const form = reactive({
  title: '',
  description: '',
});

const create = async () => {
  await $fetch('/api/post', {
    method: 'POST',
    body: form
  })
}
</script>
<template>
  <div class="m-8">
    <form @submit.prevent="create" class="mb-8">
      <div class="mb-3">
        <label for="">Title</label>
        <input type="text" v-model="form.title" class="block border border-gray-400">
      </div>
      <div class="mb-3">
        <label for="">Description</label>
        <textarea v-model="form.description" cols="30" rows="10" class="block border border-gray-400"></textarea>
      </div>
      <button type="submit" class="text-white bg-indigo-400 hover:bg-indigo-500 px-3 py-2 rounded">Submit</button>
    </form>
    <hr>
    <ul class="my-4">
      <li v-for="post in posts" :key="post.id">{{ post.title }}</li>
    </ul>
  </div>
</template>