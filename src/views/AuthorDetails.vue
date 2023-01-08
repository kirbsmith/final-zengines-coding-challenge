<template>
    <div class="flex flex-col">
        <div class="bg-lightgray dark:bg-gray-800 text-center font-montserrat border-b-2 dark:border-gray-400 border-black pb-6 dark:text-gray-100">
            <!-- display author's unique username, karma, contributions (stories + comments) and about section. If the user has not completed an about section, the v-else p will be displayed -->
            <h1 class="text-center text-2xl font-light py-3">User: {{ authorDetails[0].data.id }}</h1>
            <p class="text-lg pb-3">Karma: {{ authorDetails[0].data.karma }}</p>
            <p class="pb-3">{{ authorDetails[0].data.submitted.length }} Contributions</p>
            <div class="text-center" v-if="authorDetails[0].data.about != undefined">
                <p class="text-center pb-2">About:</p>
                <p class="px-3" v-html="authorDetails[0].data.about"></p>
            </div>
            <p v-else>User has not completed 'About' section</p>
        </div>
        <!-- pull and  show information from author. -->
        <h3 class="font-montserrat text-xl text-center py-4 underline dark:text-gray-200"><span>{{authorArticlesInfo.length}}</span> Stories by {{ authorDetails[0].data.id }}</h3>
        <!-- display each article from paginated to limit unnecessary scrolling and display information from each article. display date that article was posed -->
        <div class="flex flex-col items-center md:border-4 border-2 border-black dark:border-gray-400 p-3 mx-4 my-2 md:mx-8 md:my-4 shadow-md hover:shadow-2xl rounded-md font-montserrat text-center dark:text-gray-200" v-for="article in paginated" :key="article">
            <div v-if="article.data.dead != true">
                <a :href="article.data.url" target="_blank" class="hover:text-green-600 hover:duration-500 pb-3">{{ article.data.title }}</a>
                <p v-if="article.data.descendants >= 1" class="pt-3">Total comments: {{ article.data.descendants }}</p>
                <p v-else class="pt-3">No comments on this article</p>
                <p class="text-sm pt-3">Article posted on {{ new Date(article.data.time * 1000).toDateString().split(' ').slice(0, 4).join(' ') }}</p>
            </div>
            <div v-else class="p-3">
                <p>This article is considered 'dead' by Hacker News</p>
            </div>
        </div>
        <div class="flex gap-4 font-montserrat pt-4 pb-10 place-content-center">
            <!-- create page navigation allowing user to navigate pages and reset their scrollbar and view to the top of the window -->
            <button class="dark:border-gray-200 border-gray-800 dark:text-gray-100 border-2 rounded-md px-2 w-32 disabled:opacity-0" @click="current--; scrollTop()" :disabled="current === 1">Previous</button>
            <p class="dark:text-gray-200">{{ current }}</p>
            <button class="dark:border-gray-200 border-gray-800 dark:text-gray-100 border-2 rounded-md px-2 w-32 disabled:opacity-0" @click="current++; scrollTop()" :disabled="current === Math.ceil(authorArticlesInfo.length/10)">Next</button>
        </div>
    </div>
</template>

<script setup lang="ts">
// import components
import { reactive, onBeforeMount, defineProps, ref, computed} from 'vue'
import axios from "axios"
import { useRoute } from 'vue-router'
// create two ref variables
let current = ref(1)
let pageSize = ref(10)
// create computed variables used for page navigation
const indexStart = computed(() => (current.value - 1) * pageSize.value)
const indexEnd = computed(() => indexStart.value + pageSize.value)
const paginated = computed(() => authorArticlesInfo.slice(indexStart.value, indexEnd.value))
// create function that resets scrollbar and window view to top of page
function scrollTop(){
    window.scrollTo(0,0)
}

// create three empty reactive arrays
let authorDetails: (any)[] = reactive([])
let authorArticles: (any)[] = reactive([])
let authorArticlesInfo: (any)[] = reactive([])

// rename useRoute() to route
const route = useRoute()
// rename route.params.id to authorName for easier use
const authorName = route.params.id
// pull data from api before mount and push data into its requisite array. only push data into authorArticlesInfo array if that data's type is 'story'
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
})

</script>