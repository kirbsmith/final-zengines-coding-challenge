<template>
    <div>
      <h2 class="pt-8 text-3xl text-center font-montserrat">Current Top Stories</h2>
    </div>
    <div class="flex flex-col items-center border-4 border-black mx-8 my-8 shadow-md hover:shadow-2xl rounded-md" v-for="article in articles" :key="article">
        <a :href="article.data.url" target="_blank"><h3 class="text-center text-3xl font-montserrat font-light p-2 hover:text-green-800 hover:duration-500" >{{ article.data.title }}</h3></a>
        <p class="text-lg pt-2 font-montserrat font-light">Author: {{ article.data.by }}</p>
        <p class="text-lg py-4 font-montserrat font-light">{{ article.data.descendants }} comments</p>
        <router-link :to="{ name : 'ArticleDetails', params: { id: article.data.id}  }" class="pb-4">See Details</router-link>
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