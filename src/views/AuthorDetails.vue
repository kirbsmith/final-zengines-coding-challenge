<template>
    <div class="flex flex-col">
        <div class="bg-lightgray dark:bg-slate-700 text-center font-montserrat border-b-2 dark:border-gray-400 border-black pb-6 dark:text-gray-100">
            <h1 class="text-center text-2xl font-light py-3">User: {{ authorDetails[0].data.id }}</h1>
            <p class="text-lg pb-3">Karma: {{ authorDetails[0].data.karma }}</p>
            <p class="pb-3">{{ authorDetails[0].data.submitted.length }} Contributions</p>
            <div class="text-center" v-if="authorDetails[0].data.about != undefined">
                <p class="text-center pb-2">About:</p>
                <p class="px-3" v-html="authorDetails[0].data.about"></p>
            </div>
            <p v-else>User has not completed 'About' section</p>
        </div>
        <h3 class="font-montserrat text-xl text-center py-4 underline dark:text-gray-200"><span>{{authorArticlesInfo.length}}</span> Stories by {{ authorDetails[0].data.id }}</h3>
        <div class="flex flex-col items-center md:border-4 border-2 border-black dark:border-gray-400 p-3 mx-4 my-2 md:mx-8 md:my-4 shadow-md hover:shadow-2xl rounded-md font-montserrat text-center dark:text-gray-200" v-for="article in authorArticlesInfo" :key="article">
            <div v-if="article.data.dead != true">
                <a :href="article.data.url" target="_blank" class="hover:text-green-600 hover:duration-500 pb-3">{{ article.data.title }}</a>
                <p v-if="article.data.descendants >= 1" class="pt-3">Total comments: {{ article.data.descendants }}</p>
                <p v-else class="pt-3">No comments on this article</p>
                <p class="text-sm pt-3">Posted on {{ new Date(article.data.time * 1000) }}</p>
            </div>
            <div v-else class="p-3">
                <p>This article is considered 'dead' by Hacker News</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, defineProps} from 'vue'
import axios from "axios"
import { useRoute } from 'vue-router'

let authorDetails: (any)[] = reactive([])
let authorArticles: (any)[] = reactive([])
let authorArticlesInfo: (any)[] = reactive([])
let authorArticlesInfoFiltered: (any)[] = reactive([])





const route = useRoute()

const authorName = route.params.id

onBeforeMount(async() => {
    const userUrl = 'https://hacker-news.firebaseio.com/v0/user/'
    const articlesUrl = 'https://hacker-news.firebaseio.com/v0/item/'
    const response = await axios.get(userUrl + authorName + '.json')
    .then((response : any) => {
        if (authorDetails.length == 0){
            authorDetails.push(response)
            authorArticles.push(authorDetails[0].data.submitted)
        }
    })
    for(let i = 0; i <= authorArticles[0].length && i < 25; i++){
        const authorSamples = await axios.get(articlesUrl + authorArticles[0][i] + '.json')
        .then((authorSamples : any)=> {
            if (authorSamples.data.type == "story"){
                authorArticlesInfo.push(authorSamples)
            }
        })
    }
    console.log(authorDetails)
})

</script>