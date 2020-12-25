<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <router-link class="navbar-brand" to="/"><i class="fas fa-blog fa-lg"></i></router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item" v-if="!authUser">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item" v-if="!authUser">
                        <router-link class="nav-link" to="/signup">SignUp</router-link>
                    </li>
                    <li class="nav-item dropdown" v-if="authUser">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Hey {{ authUser.name }},
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <button class="dropdown-item" @click="logout()">Logout</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "Navbar",
        computed: {
            authUser() {
                return this.$root.authUser.user
            }
        },
        methods: {
            logout() {
                this.$root.authUser = {}
                localStorage.removeItem('authUser')
                this.$router.push('/login')
            }
        }
    }
</script>

<style scoped>

</style>