<template>
    <div>
        <navbar></navbar>
        <div class="container">
            <router-view></router-view>

        </div>
    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.min.css'
    import 'jquery/src/jquery.js'
    import 'bootstrap/dist/js/bootstrap.min.js'

    import Navbar from "@/components/Navbar";

    export default {
        name: 'App',
        components: {
            Navbar
        }

    }
</script>

<style>
    * {
        font-family: 'Poppins', sans-serif;
        border-radius: 0 !important;
    }

    body {

        background-color: #f5f3fe;
    }
</style>
