<template>
        <div class="container my-5">
            <div class="row">
                <div class="col-md-10 offset-md-1">
                    <div class="card" v-if="!loading">
                        <img height="420px" src="https://picsum.photos/900/420" alt="" class="card-img-top">
                        <div class="card-body">
                            <h1 class="card-title text-center my-3">{{ article.title }}</h1>
                            <div class="div">
                                {{ article.content }}
                            </div>
                        </div>
                    </div>
                    <div class="loader text-center" v-else>
                        <i class="fas fa-5x fa-spin fa-spinner"></i>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>

    import Axios from "axios";
    import config from "@/config";

    export default {
        name: "Article",
        data() {
            return {
                article: {},
                loading: true
            }
        },
        methods: {
            getArticle() {
                Axios.get(`${config.apiUrl}/api/v1/articles/${this.$route.params.id}`)
                    .then(response => {
                        this.article = response.data
                        this.loading = false
                    })
                    .catch(({response}) => {
                        console.log(response)
                    });
            }
        },
        mounted() {
            this.getArticle()
        }
    }
</script>

<style scoped>

</style>