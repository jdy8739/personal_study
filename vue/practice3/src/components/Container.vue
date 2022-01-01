<template>
    <div>
        <Post v-for="(post, idx) in posts" :key="idx" :post="post"/>
    </div>
</template>

<script>
import Post from './Post.vue'

export default {
    name: 'Container',
    components: {
        Post
    },
    props: {
        posts: {
            type: Array,
            required: true
        }
    }
}
</script>