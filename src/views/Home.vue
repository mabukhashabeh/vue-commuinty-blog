<template>
    <div class="articles mt-3">
        <div class="row" v-if="!loading">
            <div class="col-md-8 offset-md-2" v-for="article in articles.data" :key="article.id">
                <Article :article="article"/>
            </div>
        </div>
        <div class="loader text-center mt-5" v-else>
            <i class="fas fa-3x fa-spin fa-spinner"></i>
        </div>
        <div class="d-flex my-4 justify-content-center">
            <button @click="getPrevArticles()" :disabled="articles.prev_page_url === null"
                    class="btn btn-outline-primary paginator mr-5">Prev
            </button>
            <button @click="getNextArticles()" :disabled="articles.next_page_url === null"
                    class="btn btn-outline-primary paginator ml-5">Next
            </button>
        </div>
    </div>
</template>

<script>
    import Axios from "axios";
    import config from "@/config";
    import Article from "@/components/Article";

    export default {
        name: "Home",
        components: {
            Article
        },
        data() {
            return {
                articles: {},
                loading: false
            }
        },
        mounted() {
            this.getArticles()
        },
        methods: {
            getArticles(url = `${config.apiUrl}/api/v1/articles/`) {
                this.loading = true

                Axios.get(url)
                    .then(response => {
                        this.articles = response.data
                        this.loading = false
                    })
                    .catch(({response}) => {
                        console.log(response)
                    });
            },
            getNextArticles() {
                this.getArticles(this.articles.next_page_url);
            },
            getPrevArticles() {
                this.getArticles(this.articles.prev_page_url);
            }
        },

    }
</script>

<style>
    .paginator {
        border-radius: 50%;
    }
</style>