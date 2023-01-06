<template>
    <div>
      <h2 class="pt-3 md:pt-8 text-2xl text-center font-montserrat">Current Top Stories</h2>
    </div>
    <div class="flex flex-col items-center md:border-4 border-2 border-black mx-4 md:mx-8 my-4 md:my-8 shadow-md hover:shadow-2xl rounded-md" v-for="article in articles" :key="article">
        <a :href="article.data.url" target="_blank"><h3 class="text-center text-lg md:text-3xl font-montserrat font-normal p-2 hover:text-green-800 hover:duration-500" >{{ article.data.title }}</h3></a>
        <p class="text-md md:text-lg md:pt-2 font-montserrat font-light">Author: {{ article.data.by }}</p>
        <p class=" text-sm md:text-lg py-2 md:py-4 font-montserrat font-light">{{ article.data.descendants }} comments</p>
        <router-link :to="{ name : 'ArticleDetails', params: { id: article.data.id}  }" class="pb-4 hover:underline mb-2 font-montserrat font-normal text-md">See Details</router-link>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue"
import axios from "axios"

let articles: (any)[] = reactive([])



onMounted(async () => {
    const url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty'
    const response = await axios.get(url)
    const results = response.data.slice(0, 50)
    results.map((id : any) => {
        axios.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json')
        .then((response : any) => {
            articles.push(response)
        })
    })
})



</script>