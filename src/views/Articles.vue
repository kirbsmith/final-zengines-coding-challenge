<template>
    <div>
      <h2 class="pt-3 md:pt-8 text-2xl text-center font-montserrat dark:text-gray-200">Current Top Stories</h2>
    </div>
    <div class="flex flex-col items-center md:border-4 border-2 border-black dark:border-gray-500 mx-4 md:mx-8 my-4 md:my-8 shadow-md hover:shadow-2xl rounded-md dark:text-gray-200" v-for="article in paginated" :key="article">
        <a :href="article.data.url" target="_blank"><h3 class="text-center text-lg md:text-3xl font-montserrat font-medium p-2 hover:text-green-800 hover:duration-500" >{{ article.data.title }}</h3></a>
        <router-link :to="{ name: 'AuthorDetails', params: {id: article.data.by} }" class="text-md md:text-lg mt-2 px-4 py-2 font-montserrat font-normal hover:bg-green-800 rounded-md hover:text-gray-200 hover:duration-300">Author: {{ article.data.by }}</router-link>
        <p class="text-sm md:text-lg py-2 md:pb-2 font-montserrat font-light">Story score: {{ article.data.score }}</p>
        <router-link v-if="article.data.descendants > 1" :to="{ name : 'ArticleDetails', params: { id: article.data.id}  }" class="px-2 py-1 hover:bg-green-800 hover:duration-300 hover:text-gray-200 font-montserrat font-normal text-md rounded-md">View {{ article.data.descendants }} Comments</router-link>
        <router-link v-if="article.data.descendants == 1" :to="{ name : 'ArticleDetails', params: { id: article.data.id}  }" class=" hover:underline font-montserrat font-normal text-md">View {{ article.data.descendants }} Comment</router-link>
        <p class="text-center text-sm md:text-md py-2 md:py-4 font-montserrat font-light">Article posted on {{ new Date(article.data.time * 1000).toDateString().split(' ').slice(0, 4).join(' ') }}</p>
    </div>
    <div class="flex gap-4 font-montserrat pt-4 pb-10 place-content-center">
        <button class="dark:border-gray-200 border-gray-800 dark:text-gray-100 border-2 rounded-md px-2 w-32" @click="current--; scrollTop()" :disabled="current === 1">Previous</button>
        <p class="dark:text-gray-200">{{ current }}</p>
        <button class="dark:border-gray-200 border-gray-800 dark:text-gray-100 border-2 rounded-md px-2 w-32" @click="current++; scrollTop()" :disabled="current === 5">Next</button>
    </div>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref, computed} from "vue"
import axios from "axios"


let articles: (any)[] = reactive([])
let current = ref(1)
let pageSize = ref(10)

const indexStart = computed(() => (current.value - 1) * pageSize.value)
const indexEnd = computed(() => indexStart.value + pageSize.value)
const paginated = computed(() => articles.slice(indexStart.value, indexEnd.value))

function scrollTop(){
    window.scrollTo(0,0)
}

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