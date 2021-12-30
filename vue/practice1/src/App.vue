<template>
  <div>
    <div class="nav-bar">
      <div>
        <p>Ipsum Loren</p>
        <p>about us</p>
        <p>product</p>
        <p>contact</p>
      </div>
    </div>

    <h1 class="main-letter">{{ greetings }}</h1>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  
  },
  data() {
    return {
      greetings: 'NEW START!'   
    }
  }
}
</script>

<style>

body {
  margin: 0;
}

.nav-bar {
  width: 100%;
  height: 60px;
  background-color: antiquewhite;
}

.nav-bar>div {
  width: 100%;
  max-width: 2000px;
  display: flex;
  margin: auto;
}

p {
  padding: 0px 10px;
  cursor: pointer;
}

.nav-bar p:first-child {
  font-weight: bolder;
  font-size: 18px;
  flex-grow: 1;
}

.main-letter {
  text-align: center;
}
</style>
