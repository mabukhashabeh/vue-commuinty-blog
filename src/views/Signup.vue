<template>
    <div class="row my-5">
        <div class="col-md-6 offset-md-3">
            <div class="card p-3">
                <h3 class="text-center">SignUp</h3>
                <div class="card-body">
                    <div class="form-group">
                        <input v-model="username" type="text" placeholder="Name" name="username" class="form-control">
                    </div>
                    <div class="form-group">
                        <input v-model="email" name="email" type="text" placeholder="Email" class="form-control">
                    </div>
                    <div class="form-group">
                        <input v-model="password" name="password" type="password" placeholder="password"
                               class="form-control">
                    </div>
                    <div class="form-group">
                        <button @click="registerUser()" class="btn btn-success form-control">SignUp</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Axios from 'axios'

    export default {
        name: "Signup",
        data() {
            return {
                username: '',
                email: '',
                password: ''
            }
        },
        methods: {
            registerUser() {
                Axios.post("http://localhost:8008/api/v1/user/", {
                    name: this.username,
                    email: this.email,
                    password: this.password,
                })
                    .then(response => {
                        localStorage.setItem('authUser', JSON.stringify(response.data))
                        this.$router.push('home')
                    })
                    .catch(({response}) => {
                        console.log(response);
                    });
            }
        }
    }
</script>

<style scoped>

</style>