<template>
  <div class="bg-lightgray">
    <div class="flex items-center justify-center bg-graygreen shadow-lg">
      <router-link :to="{ name : 'Articles'}"><h1 class="text-5xl py-8 text-center px-4 font-montserrat font-light">Welcome to Zengines Hacker News</h1></router-link>
    </div>
    <router-view />
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
</style>
