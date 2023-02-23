<script setup>
definePageMeta({
  middleware: 'auth'
})

const supabase = useSupabaseClient();

const form = ref({
  title: '',
  description: '',
  image: null,
});

const errors = ref({});

const loading = ref(false);

const create = async () => {
  loading.value = true;
  const fileName = Math.floor(Math.random() * 1000000000000000);
  const { data, error } = await supabase.storage.from("images").upload("public/" + fileName, form.value.image);
  if(error) {
    alert("画像のアップロードに失敗しました。");
    return;
  }
  form.value.image = data.path;
  try {
    await $fetch('/api/post', {
      method: 'POST',
      body: form.value
    })
    return await navigateTo('/post');
  }catch(e) {
    if(e.response._data.statusCode === 422) {
      const data = e.response._data.data;
      data.forEach((d) => {
        errors.value[d.context.label] = d.message
      });
    }
    await supabase.storage.from("images").remove(data.path);
  }finally{
    loading.value = false;
  }
}
</script>
<template>
  <Loading :loading="loading" />
  <div class="m-8">
    <NuxtLink to="/post" class="text-blue-400 hover:text-blue-500 hover:underline">Back</NuxtLink>
    <form @submit.prevent="create" class="my-8 w-full md:w-2/3 mx-auto">
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
        <Input type="file" @change="form.image = $event.target.files[0]" />
        <InputError :error="errors.image" />
      </div>
      <button type="submit" class="text-white bg-indigo-400 hover:bg-indigo-500 px-3 py-2 rounded">Submit</button>
    </form>
  </div>
</template>
