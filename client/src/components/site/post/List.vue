<template>
    <div class="max-w-[700px] w-full m-auto post-list">
        <div class="mb-12 post-card" v-for="post in posts">
            <div class="post-image mb-6">
                <img src="https://placehold.jp/800x600.png" class="w-full rounded-2xl" alt="" />
            </div>
            <div class="post-title mb-4">
                <h2 class="text-[32px] font-bold leading-[1.4] cursor-pointer duration-200 hover:opacity-45">
                    <router-link v-bind:to="'/post/' + post.slug" class="block">{{ post.title }}</router-link>
                </h2>
            </div>
            <div class="post-content">
                <p>{{ post.detail.length > 150 ? post.detail.slice(0, 150) + ' [...]' : post.detail }}</p>
            </div>
            <div class="text-right text-blue-500 read-more">
                <router-link v-bind:to="'/post/' + post.slug" class="inline-flex items-center font-semibold cursor-pointer">
                    <small>Read More</small>
                    <i class="ri-arrow-right-wide-line"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                posts: []
            }
        },
        methods: {

        },
        created() {
            fetch(`http://localhost:5000/api/post`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => this.posts = data);
        }
    }
</script>