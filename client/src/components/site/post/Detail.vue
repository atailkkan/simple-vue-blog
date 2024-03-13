<template>
    <div class="max-w-[700px] w-full m-auto text-center error-message">{{ blog.message }}</div>
    <div class="max-w-[700px] w-full m-auto post-detail">
        <div class="post-title mb-6">
            <h2 class="text-[48px] font-bold leading-[1.4]">{{ blog.title }}</h2>
        </div>
        <div class="post-image mb-6">
            <img v-bind:src="blog.image" class="w-full rounded-2xl" alt="" />
        </div>
        <div class="post-content">{{ blog.detail }}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                slug: this.$route.params.slug,
                blog: {}
            }
        },
        created() {
            fetch(`http://localhost:5000/api/post/slug/${this.slug}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => res.json())
                .then(data => this.blog = data)
                
        }
    }
</script>