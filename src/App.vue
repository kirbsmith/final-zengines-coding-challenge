<template>
  <div class="bg-lightgray dark:bg-slate-700">
    <div class="flex items-center justify-center bg-graygreen dark:bg-slate-600 shadow-lg">
      <!-- generate dynamic router link to articles so user can click top banner to return to original page. hide 'welcome to' text if user is on mobile -->
      <router-link :to="{ name : 'Articles'}"><h1 class="text-3xl md:text-6xl py-3 lg:py-8 text-center px-4 font-montserrat font-light dark:text-gray-100"><span class="hidden md:inline-block">Welcome to </span> Zengines Hacker News</h1></router-link>
    </div>
    <!-- display the information brought by the vue-router -->
    <router-view />
  </div>
</template>

<script setup lang="ts">



</script>

