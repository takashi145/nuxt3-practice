<script setup>
const supabase = useSupabaseClient();

const user = useSupabaseUser();

const loading = ref(false);

const login = async () => {
  loading.value = true;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google'
  });

  if(error) throw error;

  loading.value = true;
}

watchEffect(async () => {
  if(user.value) {
    await navigateTo('/post');
  }
})

</script>
<template>
  <div class="text-gray-600 body-font">
    <div class="container px-5 py-32 mx-auto flex flex-wrap items-center">
      <div class="shadow-lg mx-auto lg:w-1/3 md:w-1/2 bg-indigo-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
        <button @click="login" type="button" class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-3 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
          <svg class="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>
