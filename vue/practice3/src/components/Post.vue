<template>
    <div class="post">
        <div class="post-header">
            <div class="profile" :style="{ backgroundImage: `url(${ post.userImage })` }"></div>
            <span class="profile-name">{{ post.name }}</span>
        </div>
        <div class="post-body" :style="{ backgroundImage: `url(${ post.postImage })` }"></div>
        <div class="post-content">
            <p>{{ post.likes }} &ensp; Likes</p>
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
        }
    }
}
</script>
<style>
@import 'styles2.css';

</style>