<template>
    <div class="min-h-screen bg-lightgray">
        <div class="font-montserrat flex flex-col items-center py-4">
            <a :href="articleDetails[0].data.url" target="_blank"><h2 class="text-2xl pb-4 md:py-4 underline text-center px-2 hover:text-green-900 hover:duration-500">{{articleDetails[0].data.title}}</h2></a>
            <p class="text-lg pb-3">Article Author: {{articleDetails[0].data.by}}</p>
            <p>Article ID: {{ route.params.id }}</p>
            <p class="pb-3">Total Comments: {{articleDetails[0].data.descendants}}</p>
            <p v-if="commentsLoaded.length > 1">View {{commentsLoaded.length}} comments below</p>
            <p v-else-if="commentsLoaded.length == 1">View 1 comment below</p>
            <p v-else-if="commentsLoaded.length == 0">There are no comments on this article</p>
        </div>
        <div class="border-2 border-black m-6 font-montserrat rounded-lg shadow-md pt-2" v-for="comment in commentsLoaded" :key="comment.data.id">
            <p class="px-2 md:pt-3 pb-4 font-bold"><span class="underline">Comment Author:</span> {{comment.data.by}}</p>
            <p v-html="comment.data.text" class="px-2 pb-2"></p>
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
let commentsFinal: (any)[] = reactive([])

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