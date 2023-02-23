<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const route = useRoute();

const logout = async () => {
  await supabase.auth.signOut();
  user.value = null;
  return navigateTo('/');
}
</script>
<template>
  <header class="text-gray-600 body-font shadow-lg">
    <div class="max-w-7xl container mx-auto flex flex-wrap justify-between p-5 flex-col md:flex-row items-center">
      <NuxtLink to="/post" class="flex title-font font-medium items-center text-gray-900 md:mb-0">
        <AppLogo />
      </NuxtLink>
      <div v-if="user" class="flex items-center mt-4 md:mt-0">
        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <NuxtLink to="/post" :class="[route.fullPath === '/post' ? 'underline': '']" class="mr-5 hover:text-gray-900">PostList</NuxtLink>
        </nav>
        <button @click="logout" class="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base md:mt-0">
          Logout
        </button>  
      </div>
      
    </div>
  </header>
</template>