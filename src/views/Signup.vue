<template>
    <div class="row my-5">
        <div class="col-md-6 offset-md-3">
            <div class="card p-3">
                <h3 class="text-center">SignUp</h3>
                <div class="card-body">
                    <div class="form-group">
                        <input v-model="username"
                               :class="{'is-invalid': this.errors.name, 'is-valid': this.submitted && !this.errors.name}"
                               type="text" placeholder="Name" name="username" class="form-control">
                        <small class="text-danger" :key="error" v-for="error in errors.name">{{ error }}</small>
                    </div>
                    <div class="form-group">
                        <input v-model="email"
                               :class="{'is-invalid': this.errors.email, 'is-valid': this.submitted && !this.errors.email}"
                               name="email" type="text" placeholder="Email" class="form-control">
                        <small class="text-danger" :key="error" v-for="error in errors.email">{{ error }}</small>

                    </div>
                    <div class="form-group">
                        <input v-model="password"
                               :class="{'is-invalid': this.errors.password, 'is-valid': this.submitted && !this.errors.password}"
                               name="password" type="password" placeholder="password"
                               class="form-control">
                        <small class="text-danger" :key="error" v-for="error in errors.password">{{ error }}</small>

                    </div>
                    <div class="form-group">
                        <button @click="registerUser()" class="btn btn-success form-control" :disabled="loading">
                            <font-awesome-icon :icon="['fas', 'spinner']" v-if="loading"></font-awesome-icon>
                            {{ !loading ? 'SignUp' : '' }}
                        </button>
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
                password: '',
                submitted: false,
                loading: false,
                errors: {}
            }
        },
        methods: {
            registerUser() {
                this.submitted = true
                this.loading = true

                Axios.post("http://localhost:8008/api/v1/user/", {
                    name: this.username,
                    email: this.email,
                    password: this.password,
                })
                    .then(response => {
                        this.loading = false
                        localStorage.setItem('authUser', JSON.stringify(response.data))
                        this.$router.push('home')
                    })
                    .catch(({response}) => {
                        this.loading = false
                        this.errors = response.data
                    });
            }
        }
    }
</script>

<style scoped>

</style>