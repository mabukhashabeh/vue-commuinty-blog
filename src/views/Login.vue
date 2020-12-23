<template>
    <div class="row my-5">
        <div class="col-md-6 offset-md-3">
            <div class="card p-3">
                <h3 class="text-center">Login</h3>
                <div class="card-body">
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
                        <button @click="loginUser()" class="btn btn-success form-control" type="submit"
                                :disabled="loading">
                            <font-awesome-icon :icon="['fas', 'spinner']" v-if="loading"></font-awesome-icon>
                            {{ !loading ? 'Login' : '' }}
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
        name: "Login",
        // eslint-disable-next-line no-unused-vars
        beforeRouteEnter(from, to, next) {
            if (localStorage.getItem('authUser')) return next({path: "/"})

            return next()
        },

        data() {
            return {
                email: '',
                password: '',
                submitted: false,
                loading: false,
                errors: {}
            }
        },
        methods: {
            loginUser() {
                this.submitted = true
                this.loading = true

                Axios.post("http://localhost:8008/api/v1/auth/user", {
                    email: this.email,
                    password: this.password,
                })
                    .then(response => {
                        this.loading = false
                        localStorage.setItem('authUser', JSON.stringify(response.data))
                        this.$root.authUser = response.data
                        this.$noty.success("Logged in successfully")
                        this.$router.push('/')
                    })
                    .catch(({response}) => {
                        this.loading = false
                        this.errors = response.data
                        this.$noty.error("Something went wrong!")


                        if (response.status === 401) {
                            this.errors = {
                                email: [response.data.error]
                            }
                        }
                    });
            }
        }
    }
</script>


<style scoped>

</style>