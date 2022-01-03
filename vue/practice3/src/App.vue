<template>
  <div>
    <div class="header" @click="moveStep($event)">
        <ul class="header-button-left" v-if="step > 0">
          <li>Cancel</li>
        </ul>
        <ul class="header-button-right" v-if="step > 0 && step < 2">
          <li>Next</li>
        </ul>
      <img src="./assets/logo.png" class="logo" />
      <button @click="step = 3">show followers</button>
    </div>

    <Container :posts="posts" :step="step" :images="images" @publish="onPublish($event)"/>

    <button @click="showMore" v-if="step === 0">show more</button>
    <div class="footer">
      <ul class="footer-button-plus">
        <input type="file" id="file" class="inputfile" @input="uploadImg($event)"/> <!-- @change도 상관없음 -->
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
      posts: posts,
      clickCnt: 0,
      step: 0,
      images: ''
    }
  },
  methods: {
    showMore() {
      this.axios.get(`https://codingapple1.github.io/vue/more${this.clickCnt}.json`)
        .then((res) => {
          this.posts.push(res.data);
          this.clickCnt ++;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    uploadImg(event) {
      let images = event.target.files;
      console.log(images);

      let urls = [];
      for(let image of images) {
        console.log(image.type)
        if(image.type.includes('image')) {
          urls.push(URL.createObjectURL(image));
        } else {
          alert('Image file is only uploadable!');
          return false;
        }
      }
      console.log(urls);

      this.images = urls

      this.step = 1;
    },

    moveStep(event) {
      const btn = event.target.innerText;

      if(btn === 'Cancel') this.step --;
      if(btn === 'Next' && this.step === 2) this.step = 0;
      else if(btn === 'Next') this.step ++;
    },

    onPublish(event) {
      console.log(JSON.stringify(event));

      event.forEach((post) => {
        this.posts.push(post);
        console.log(post.postImage);
      });

      this.step = 0;
    }
  },
  mounted() {
    //alert(this.$store.state.name)
  }
}
</script>

<style>
@import 'styles.css';

button {
  border: none;
  color: white;
  background-color: rgb(243, 141, 243);
}

</style>
