<template>
  <div>
    <div class="nav-bar" @click="toOtherPage($event)">
      <h4>NAV BAR</h4>
      <p>home</p>
      <p>news</p>
      <p>contact</p>
      <p>product</p>
      <p>about us</p>
      &emsp;
    </div>
    <h1 class="mt-4">Hello World!</h1>
    <button type="button" class="btn btn-primary mt-5">Click Me!</button>
    <!-- <List :listItem="listItem"/> -->
    <router-view :listItem="listItem"></router-view>
  </div>
</template>

<script>
import { list } from './list.js'
//import List from './components/List.vue'

export default {
  name: 'App',
  components: {
    //List
  },
  data() {
    return {
      listItem: list
    }
  },
  methods: {
    toOtherPage(e) {
      let page;
      if(e.target.innerText == 'product') page = 'list';
      if(e.target.innerText == 'contact') page = 'contact';
      
      this.$router.push({
        name: `${page}`
      });
      
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav-bar {
  width: 100%;
  height: 50px;
  background: cadetblue;
  display: flex;
  align-items: center;
  color: white;
  max-width: 2000px;
  min-width: 500px;
  margin: auto;
}

.nav-bar h4 {
  margin: 0px 25px;
  flex-grow: 1;
  text-align: left;
}

.nav-bar p {
  margin: 0;
  cursor: pointer;
  padding: 8px;
}

h1 {
  color: cadetblue;
}

</style>
