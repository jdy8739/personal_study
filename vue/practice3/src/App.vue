<template>
  <div>
    <div class="header">
      <ul class="header-button-left">
        <li>Cancel</li>
      </ul>
      <ul class="header-button-right">
        <li>Next</li>
      </ul>
      <img src="./assets/logo.png" class="logo" />
    </div>

    <Container :posts="posts"/>

    <div class="footer">
      <ul class="footer-button-plus">
        <input type="file" id="file" class="inputfile" />
        <label for="file" class="input-plus">+</label>
      </ul>
    </div>
  </div>
</template>

<script>
import { posts } from './posts.js';
import Container from './components/Container.vue';

export default {
  name: 'App',
  components: {
    Container
  },
  data() {
    return {
      posts: posts
    }
  }
}
</script>

<style>
@import 'styles.css';

</style>
