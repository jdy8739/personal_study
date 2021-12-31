<template>
  <div>
    <Modal v-if="isModalShown" :product="products[targetIndex]" @onRemoveModal="removeModal"/>
    <div class="nav-bar">
      <div>
        <p>Ipsum Loren</p>
        <p>about us</p>
        <p>product</p>
        <p>contact</p>
      </div>
    </div>
    <div class="list">
      <div v-for="(product, idx) in products" :key="idx" class="list-box">
        <product v-bind:product="product" @showModal="showModal($event)"/>
      </div>
    </div>
  </div>
</template>

<script>
import importedProducts from './products.js'
import Product from './components/Product.vue'
import Modal from './components/Modal.vue'

export default {
  name: 'App',
  components: {
    Product,
    Modal
  },
  data() {
    return {
      isModalShown: false,
      products: importedProducts,
      targetIndex: -1
    }
  },
  methods: {
    removeModal() {
      this.isModalShown = false;
    },
    showModal($event) {
      this.targetIndex = $event;
      this.isModalShown = true;
    }
  }
}
</script>

<style>

html {
  height: 100%;
  overflow: auto;
}

body {
  margin: 0;
  height: 100%;
  overflow: auto;
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

.black-bg {
  width: 100vw;
  height: 100%;
  background: rgb(2, 2, 2, 0.5);
  position: absolute;
}

.modal-bg {
  width: 500px;
  height: 300px;
  background: white;
  position: fixed;
  top: 250px;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 12px;
  text-align: center;
}

#modalBtn {
  position: absolute;
  padding: 8px;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, 0%);
}

.list {
  display: flex;
  flex-wrap: wrap;
}

.list-box {
  width: 33%;
  padding: 20px;
  box-sizing: border-box;
}

.product-img {
  width: 100%;
}

@media screen and (max-width: 1200px) {
  .list-box {
    width: 50%;
  }
}

@media screen and (max-width: 768px) {
  .list-box {
    width: 100%;
  }
}

</style>
