<template>
    <div class="post">
        <div class="post-header">
            <div class="profile" :style="{ backgroundImage: `url(${ post.userImage })` }"></div>
            <span class="profile-name">{{ post.name }}</span>
        </div>
        <div :class="`post-body ${post.filter} `" :style="{ backgroundImage: `url(${ post.postImage })` }" @click="likeOrDislike"></div>
        <div class="post-content">
            <p>{{ $store.state.likes[idx].likes }} &ensp; Likes</p>
            <p><strong>{{ post.name }}</strong> {{ post.content }}</p>
            <p class="date">{{ post.date }}</p>
        </div>
    </div> 
</template>

<script>
export default {
    name: 'Post',
    props: {
        post: {
            type: Object,
            required: true
        },
        idx: {
            type: Number,
            required: true
        }
    },
    methods: {
        likeOrDislike() {
            this.$store.commit('likeOrDislike', this.idx);
        }
    }
}
</script>
<style>
@import 'styles2.css';

</style>