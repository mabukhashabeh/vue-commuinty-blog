<template>
    <div class="container my-5">
        <div class="row">
            <div class="col-md-10 offset-md-1">
                <div class="card" v-show="contentLoaded">
                    <img :src="imgUrl" @load="imageLoaded=true">
                    <div class="card-body">
                        <h1 class="card-title text-center my-3">{{ article.title }}</h1>
                        <div class="div">
                            {{ article.content }}
                        </div>
                    </div>
                </div>
                <div class="loader text-center" v-show="!contentLoaded">
                    <i class="fas fa-5x fa-spin fa-spinner"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Axios from "axios";
    import config from "@/config";
    import {loginRequiredMixin} from '@/mixins';

    export default {
        name: "Article",
        mixins: [loginRequiredMixin],
        data() {
            return {
                article: {},
                imgUrl: "https://picsum.photos/900/420",
                imageLoaded: false,
                articleLoaded: false
            }
        },
        methods: {
            getArticle() {
                Axios.get(`${config.apiUrl}/api/v1/articles/${this.$route.params.id}`)
                    .then(response => {
                        this.article = response.data
                        this.articleLoaded = true
                    })
                    .catch(({response}) => {
                        console.log(response)
                    });
            },
        },
        computed: {
            contentLoaded() {
                return this.imageLoaded && this.articleLoaded
            }
        },
        mounted() {
            this.getArticle()
        }
    }
</script>

<style scoped>

</style>