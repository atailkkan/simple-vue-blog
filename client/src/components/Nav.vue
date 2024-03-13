<template>
    <nav class="w-full mb-10">
        <ul class="max-w-[900px] w-full m-auto flex flex-wrap items-center justify-between">
            <li class="duration-200 hover:opacity-45">
                <router-link to="/">Home</router-link>
            </li>
            <li v-for="category in categories" class="duration-200 hover:opacity-45">
                <router-link v-bind:to="'/category/' + category.slug">{{ category.title }}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                categories: []
            }
        },
        created() {
            fetch(`http://localhost:5000/api/category`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => this.categories = data);
        }
    }
</script>

<style scoped>

</style>