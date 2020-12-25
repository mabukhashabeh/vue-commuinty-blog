<template>
    <div>
        <div class="card my-3">
            <div class="card-header">{{ article.title }}</div>
            <div class="card-body">
                {{ content.substr(0,200) }} ...
                <br>
                <router-link :to="`/articles/${article.id}`" class="btn btn-primary mt-3">Read more</router-link>
            </div>

        </div>
    </div>
</template>

<script>

    export default {
        name: "Article",
        props: ['article'],
        computed: {
            content() {
                return this.article.content.substr(100)
            }
        }
    }
</script>

<style scoped>

</style>