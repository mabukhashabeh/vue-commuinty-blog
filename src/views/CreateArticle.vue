<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <div class="card my-5">
                    <div class="card-body">
                        <label for="">Title</label>
                        <input type="text" placeholder="Title" class="mb-3 form-control">
                        <label for="">Content</label>
                        <wysiwyg v-model="content" />
                        <label for="" class="mt-3">Image</label>
                        <picture-input
                                accept="image/jpeg,image/png"
                                size="5"
                                button-class="btn btn-danger"
                                @change="onChange" />
                        <div class="text-center">
                            <button @click="createArticle()" class="btn-success btn btn-lg mt-3">Create Article</button>
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
                image: null
            }
        },
        methods: {
            onChange(image) {
                this.image = image;
            },
            createArticle() {
                const form = new FormData();
                form.append('file', this.image);
                form.append('upload_preset', 'ml_default');
                form.append('api_key', '375722845933325');
                Axios.post('https://api.cloudinary.com/v1_1/dybppjpw4/image/upload', form)
                    .then(res => console.log(res));
            }
        }
    }
</script>

<style scoped>

</style>