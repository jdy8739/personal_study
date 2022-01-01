<template>
  <div>
    <transition name="slideOut">
      <div class="hide" :class="{ show: isModalShown }">
        <Modal v-if="isModalShown" :product="products[targetIndex]" @onRemoveModal="removeModal"/>
      </div>
    </transition>
    <div class="nav-bar">
      <div>
        <p>Ipsum Loren</p>
        <p>about us</p>
        <p>product</p>
        <p>contact</p>
      </div>
    </div>
    <div class="banner" v-if="showBanner">
      <h2>Discout Rate <span>{{ discount }}</span>%</h2>
    </div>
    <div class="btn-sec">
      <button @click="highToLow">high to low</button>
      <button @click="lowToHigh">low to high</button>
      <button @click="reset">reset</button>
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
      copiedPro: '',
      targetIndex: -1,
      showBanner: true,
      discount: 30
    }
  },
  methods: {
    removeModal() {
      // const modal = document.getElementsByClassName('hide')[0];
      // modal.classList.toggle('show');

      this.isModalShown = false;
    },
    showModal($event) {
      // const modal = document.getElementsByClassName('hide')[0];
      // modal.classList.toggle('show');

      this.targetIndex = $event;
      this.isModalShown = true;
    },

    highToLow() {
      this.products.sort((a, b) => {
        return b.price - a.price;
      });
    },

    lowToHigh() {
      this.products.sort((a, b) => {
        return a.price - b.price;
      });
    },

    reset() {
      this.products = [...this.copiedPro];
    }
  },
  mounted() {
    this.copiedPro = [...this.products];

    setTimeout(() =>  { //화살표 함수 안쓰면 this가 window를 가르키게됨
      //this.showBanner = false;
    }, 2000);

    const disInterv = setInterval(() => {
      this.discount --;

      if(this.discount === 0) {
        clearInterval(disInterv);
        this.showBanner = false;
      }
    }, 1000);
  },
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

.hide {
  transition: all 1s;
  opacity: 0;
}

.show {
  opacity: 1;
}

.product-img {
  width: 100%;
}

.btn-sec {
  margin-top: 10px;
  text-align: center;
}

.btn-sec button {
  padding: 8px;
  margin: 5px;
}

.banner {
  background: cornflowerblue;
  color: white;
  text-align: center;
  padding: 12px;
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
