<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const logout = async () => {
  await supabase.auth.signOut();
  user.value = null;
  return navigateTo('/login');
}
</script>
<template>
  <header class="text-gray-600 body-font shadow-lg">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <NuxtLink to="/" class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <AppLogo />
      </NuxtLink>
      <nav v-if="user" class="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <NuxtLink to="/post" class="mr-5 hover:text-gray-900">PostList</NuxtLink>
      </nav>
      <button v-if="user" @click="logout" class="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">
        Logout
      </button>
    </div>
  </header>
</template>