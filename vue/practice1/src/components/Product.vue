<template>
    <div>
        <img :src="product.image" class="product-img">
        <p @click="showModal(product.id)">{{ product.title }}</p>
        <p>{{ product.price }}</p>
    </div>
</template>

<script>
export default {
    name: 'Product',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        showModal(id) {
            this.$emit('showModal', id)
        }
    },
}
</script>

