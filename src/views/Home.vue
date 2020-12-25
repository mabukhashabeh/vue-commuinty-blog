<template>
    <div class="row"  v-if="articles">
        <div class="col-md-8 offset-md-2" v-for="article in articles" :key="article.id">
            <Article :article="article"></Article>
        </div>
    </div>
</template>

<script>
    import Axios from "axios";
    import config from "@/config";
    import Article from "../components/Article";

    export default {
        name: "Home",
        components: {
            Article
        },
        data(){
          return {
              articles: {}
          }
        },
        mounted() {
            this.getArticles()
        },
        methods: {
            getArticles() {
                Axios.get(`${config.apiUrl}/api/v1/articles/`)
                    .then(response => {
                       this.articles = response.data
                    })
                    .catch(({response}) => {
                       console.log(response)
                    });
            }
        }
    }
</script>

<style scoped>

</style>