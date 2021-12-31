<template>
    <div class="black-bg">
        <div class="modal-bg">
            <br>
            <p>{{ product.title }}</p>
            <p>{{ product.content }}</p>
            <p>{{ product.price }}원</p>
            <button id="modalBtn" @click="removeModal">cancel</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        product: {
            type: Object
        }
    },
    data() {
        return {
            
        }
    },
    methods: {
        removeModal() {
            this.$emit('onRemoveModal');
        }
    },
}
</script>