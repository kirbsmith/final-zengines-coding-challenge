<template>
    <div>
      <h2 class="pt-3 md:pt-8 text-2xl text-center font-montserrat dark:text-gray-200">Current Top Stories</h2>
    </div>
    <div class="flex flex-col items-center md:border-4 border-2 border-black dark:border-gray-500 mx-4 md:mx-8 my-4 md:my-8 shadow-md hover:shadow-2xl rounded-md dark:text-gray-200" v-for="article in articles.slice(0, 50)" :key="article">
        <a :href="article.data.url" target="_blank"><h3 class="text-center text-lg md:text-3xl font-montserrat font-normal p-2 hover:text-green-800 hover:duration-500" >{{ article.data.title }}</h3></a>
        <router-link :to="{ name: 'AuthorDetails', params: {id: article.data.by} }" class="text-md md:text-lg md:pt-2 font-montserrat font-light hover:underline">Author: {{ article.data.by }}</router-link>
        <p class="text-sm md:text-lg py-2 md:py-4 font-montserrat font-light">Story score: {{ article.data.score }}</p>
        <router-link v-if="article.data.descendants > 1" :to="{ name : 'ArticleDetails', params: { id: article.data.id}  }" class=" hover:underline font-montserrat font-normal text-md">View {{ article.data.descendants }} Comments</router-link>
        <router-link v-if="article.data.descendants == 1" :to="{ name : 'ArticleDetails', params: { id: article.data.id}  }" class=" hover:underline font-montserrat font-normal text-md">View {{ article.data.descendants }} Comment</router-link>
        <p class="text-center text-sm md:text-md py-2 md:py-4 font-montserrat font-light">Article posted on {{ new Date(article.data.time*1000) }}</p>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, computed} from "vue"
import axios from "axios"


let articles: (any)[] = reactive([])
 
let date = new Date()

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