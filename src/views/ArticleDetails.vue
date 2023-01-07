<template>
    <div class="min-h-screen bg-lightgray dark:bg-gray-800">
        <div class="font-montserrat flex flex-col items-center py-4 text-center dark:text-gray-300">
            <a :href="articleDetails[0].data.url" target="_blank"><h2 class="text-2xl pb-4 md:py-4 underline text-center px-2 hover:text-green-900 hover:duration-500">{{articleDetails[0].data.title}}</h2></a>
            <p class="text-lg pb-3">Article Author: {{articleDetails[0].data.by}}</p>
            <p class="text-lg pb-3">Story Score: {{articleDetails[0].data.score}}</p>
            <p class="text-lg pb-3">Posted on: {{ new Date(articleDetails[0].data.time * 1000) }}</p>
            <p>Article ID: {{ route.params.id }}</p>
            <p class="pb-3">Total Comments: {{articleDetails[0].data.descendants}}</p>
            <p v-if="commentsLoaded.length > 1">View {{commentsLoaded.length}} comments below</p>
            <p v-else-if="commentsLoaded.length == 1">View 1 comment below</p>
            <p v-else-if="commentsLoaded.length == 0">There are no comments on this article</p>
        </div>
        <div class="border-2 border-black dark:border-gray-300 m-6 font-montserrat rounded-lg shadow-md pt-2 dark:text-gray-300" v-for="comment in commentsLoaded" :key="comment.data.id">
            <p class="px-2 md:pt-3 pb-4 font-bold">Comment Author: {{comment.data.by}}  <span class="font-normal text-2xl">|</span> <span v-html="comment.data.text" class="font-normal"></span></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, defineProps} from 'vue'
import axios from "axios"
import { useRoute } from 'vue-router'

let articleDetails: (any)[] = reactive([])
let commentDetails: (any)[] = reactive([])
let commentsLoaded: (any)[] = reactive([])

const route = useRoute()

const id = route.params.id

onBeforeMount(async() => {
    const url = 'https://hacker-news.firebaseio.com/v0/item/'
    const response = await axios.get(url + id + '.json')
    .then((response : any) => {
        if (articleDetails.length == 0){
            articleDetails.push(response)
            commentDetails.push(articleDetails[0].data.kids)
        }
    })
    for (let i = 0; i <= commentDetails[0].length; i++){
        const commentResponse = await axios.get(url + commentDetails[0][i] + '.json?print=pretty')
        .then((commentResponse : any) => {
            const exists = commentsLoaded.findIndex(el => el.data.id === commentResponse.data.id) > -1
            if (!exists){
                commentsLoaded.push(commentResponse)
            }
        })
    }
})

</script>