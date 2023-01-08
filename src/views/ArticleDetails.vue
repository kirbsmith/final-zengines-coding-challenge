<template>
    <div class="flex flex-col min-h-screen bg-lightgray dark:bg-gray-800">
        <div class="font-montserrat flex flex-col items-center py-4 text-center dark:text-gray-300">
            <!-- insert a dynamic anchor tag linking to the article -->
            <a :href="articleDetails[0].data.url" target="_blank"><h2 class="text-2xl pb-4 md:py-4 underline text-center px-2 hover:text-green-900 hover:duration-500">{{articleDetails[0].data.title}}</h2></a>
            <!-- pull article author, score, and date article was posted from api response. adjust the time to only show the date -->
            <router-link :to="{ name: 'AuthorDetails', params: {id: articleDetails[0].data.by}}" class="text-lg py-2 px-3 mb-2 underline hover:bg-green-800 rounded-md hover:text-gray-200 hover:duration-300">Article Author: {{ articleDetails[0].data.by }}</router-link>
            <p class="text-lg pb-3">Story Score: {{articleDetails[0].data.score}}</p>
            <p class="text-lg pb-3">Posted on: Article posted on {{ new Date(articleDetails[0].data.time * 1000).toDateString().split(' ').slice(0, 4).join(' ') }}</p>
            <!-- display the article ID from route params -->
            <p>Article ID: {{ route.params.id }}</p>
            <!-- display total comments and use v-if and v-else-if tags to display grammatically correct syntax -->
            <p class="pb-3">Total Comments: {{articleDetails[0].data.descendants}}</p>
            <p v-if="commentsLoaded.length > 1">View {{commentsLoaded.length}} comments below</p>
            <p v-else-if="commentsLoaded.length == 1">View 1 comment below</p>
            <p v-else-if="commentsLoaded.length == 0">There are no comments on this article</p>
        </div>
        <!-- pull and display comments for each comment in the commentsLoaded array -->
        <div class="border-2 border-black dark:border-gray-300 my-4 mx-4 font-montserrat rounded-lg shadow-md dark:text-gray-300" v-for="comment in commentsLoaded" :key="comment.data.id">
            <p class="px-2 md:pt-3 pb-4 font-bold">Comment Author: {{comment.data.by}}  <span class="font-normal text-2xl">|</span> <span v-html="comment.data.text" class="font-normal"></span></p>
        </div>
    </div>
</template>

<script setup lang="ts">
// import necessary components
import { reactive, onBeforeMount, defineProps, ref, computed} from 'vue'
import axios from "axios"
import { useRoute } from 'vue-router'
// build empty reactive arrays
let articleDetails: (any)[] = reactive([])
let commentDetails: (any)[] = reactive([])
let commentsLoaded: (any)[] = reactive([])
// rename useRoute to make typing faster
const route = useRoute()
// rename route.params.id to id
const id = route.params.id
// push original response to articleDetails array then push the 0th index.data.kids of each articleDetails value to commentDetails array
onBeforeMount(async() => {
    const url = 'https://hacker-news.firebaseio.com/v0/item/'
    const response = await axios.get(url + id + '.json')
    .then((response : any) => {
        if (articleDetails.length == 0){
            articleDetails.push(response)
            commentDetails.push(articleDetails[0].data.kids)
        }
    })
    // get response from api as variable named commentResponse then check to see if commentResponse information already exists in commentsLoaded array. If it doesn't, and the commentResponse data is not deleted and the commentResponse data is not dead, then push it to commentsLoaded array
    for (let i = 0; i <= commentDetails[0].length; i++){
        const commentResponse = await axios.get(url + commentDetails[0][i] + '.json?print=pretty')
        .then((commentResponse : any) => {
            const exists = commentsLoaded.findIndex(el => el.data.id === commentResponse.data.id) > -1
            if (!exists && commentResponse.data.deleted != true && commentResponse.data.dead != true){
                commentsLoaded.push(commentResponse)
            }
        })
    }
})

</script>