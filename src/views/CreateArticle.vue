<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card my-5">
                    <div class="card-body">
                        <label for="">Category</label>
                        <select class="form-control my-3" v-model="category">
                            <option selected>Select a Category</option>
                            <option :value="category.id" :key="category.id" v-for="category in categories">
                                {{ category.name }}
                            </option>
                        </select>
                        <label for="">Title</label>
                        <input type="text" placeholder="Title"  v-model="title" class="mb-3 form-control">
                        <label for="">Content</label>
                        <wysiwyg v-model="content" />
                        <label for="" class="mt-3">Image</label>
                        <picture-input
                                accept="image/jpeg,image/png"
                                size="5"
                                button-class="btn btn-danger"
                                @change="onChange" />
                        <div class="text-center">
                            <button :disabled="loading" @click="createArticle()" class="btn-success btn mt-3">
                                <i class="fas fa-spin fa-spinner" v-if="loading"></i>
                                {{ loading ? 'Creating...' : 'Create Category' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios';
    import {loginRequiredMixin} from '@/mixins';
    import config from "@/config";
    import PictureInput from "vue-picture-input";


    export default {
        name: "CreateArticle",
        mixins: [loginRequiredMixin],
        components: {
            PictureInput
        },
        data() {
            return {
                content: "",
                title:"",
                image: null,
                categories: [],
                category: null,
                loading: false
            }
        },
        methods: {
            onChange(image) {
                this.image = image;
            },
            createArticle() {
                if ([this.image, this.content, this.title , this.category].includes(null)) {
                    this.$noty.error("Please fill out all of fields.")

                    return

                }

                const form = new FormData();
                form.append('file', this.image);
                form.append('upload_preset', process.env.VUE_APP_CLOUDINARY_PRESET);
                form.append('api_key', process.env.VUE_APP_CLOUDINARY_API_KEY);

                this.loading = true
                Axios.post(process.env.VUE_APP_CLOUDINARY_URL, form)
                    .then(response =>
                        Axios.post(
                            `${config.apiUrl}/api/v1/articles`,
                            {
                                title: this.title,
                                content: this.content,
                                category_id: this.category,
                                user_id: this.$root.authUser.user.id,
                                image_url: response.data.secure_url
                            }
                        )
                            .then(() => {
                                this.loading = false;
                                this.$noty.success("Article created successfully.");
                                this.$router.push("/");
                            })
                            .catch(() => {
                                this.loading = false;
                                this.$noty.error("Oops ! Something went wrong.");
                            })
                    )
                    .catch(() => {
                        this.loading = false;
                        this.$noty.error("Oops ! Something went wrong.");
                    });
            },
            getCategories() {
                const categories = localStorage.getItem("categories");
                if (categories && categories.length !==0) {
                    this.categories = JSON.parse(categories);
                    return;
                }
                Axios.get(`${config.apiUrl}/api/v1/categories`).then(response => {
                    this.categories = response.data;
                    localStorage.setItem("categories", JSON.stringify(this.categories));
                });
            }
        },
        mounted() {
            this.getCategories();
        }
    }
</script>

<style scoped>

</style>