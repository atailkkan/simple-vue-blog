<template>
    <div class="w-full min-h-screen p-6 py-10 global-container">
        <Nav></Nav>
        <router-view></router-view>
    </div>
</template>

<script>
    import { uid } from 'uid';
    import Nav from './components/Nav.vue';
    export default {
        data() {
            return {
                uid: uid(32)
            }
        },
        components: { Nav }
    }
</script>

<style scoped>

</style>
