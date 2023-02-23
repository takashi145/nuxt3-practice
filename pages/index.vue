<script setup>
import { reactive, ref } from 'vue';

definePageMeta({
  middleware: 'auth'
})

const supabase = useSupabaseClient();

const form = reactive({
  title: '',
  description: '',
  image: null,
});

const errors = ref({});

const imageUpload = async e => {
  form.image = e.target.files[0];
}

const create = async () => {
  const fileName = Math.floor(Math.random() * 10000000000000000000);
  const { data, error } = await supabase.storage.from("images").upload("public/" + fileName, form.image);
  if(error) {
    alert("画像のアップロードに失敗しました。");
    return;
  }
  form.image = data.path;
  try {
    const res = await $fetch('/api/post', {
      method: 'POST',
      body: form
    })
    posts.value.push(res);
    form.title = '';
    form.description = '';  
    form.image = null;
  }catch(e) {
    if(e.response._data.statusCode === 422) {
      const data = e.response._data.data;
      data.forEach((d) => {
        errors.value[d.context.label] = d.message
      });
    }

    await supabase.storage.from("images").remove(data.path);
  }
}
</script>
<template>
  <div class="m-8">
    <form @submit.prevent="create" class="mb-8">
      <div class="mb-3">
        <InputLabel>Title</InputLabel>
        <Input type="text" v-model="form.title" />
        <InputError :error="errors.title" />
      </div>
      <div class="mb-3">
        <InputLabel>Description</InputLabel>
        <Textarea v-model="form.description" />
        <InputError :error="errors.description" />
      </div>
      <div class="mb-3">
        <InputLabel>Image</InputLabel>
        <Input type="file" @change="imageUpload" />
        <InputError :error="errors.image" />
      </div>
      <button type="submit" class="text-white bg-indigo-400 hover:bg-indigo-500 px-3 py-2 rounded">Submit</button>
    </form>
  </div>
</template>
