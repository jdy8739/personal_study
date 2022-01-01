<template>
    <div class="black-bg">
        <div class="modal-bg">
            <br>
            <p>{{ product.title }}</p>
            <p>{{ product.content }}</p>
            <p>{{ product.price }}원</p>
            <button id="modalBtn" @click="removeModal">cancel</button>
            <span>
                <span>계약 월</span> &ensp;
                <input v-model="month" type="number">
            </span>
            <p class="alert"></p>
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
            month: 0
        }
    },
    methods: {
        removeModal() {
            this.$emit('onRemoveModal');
        }
    },
    watch: {
        month(a, b) {
            console.log(a, b);
            const alert = document.querySelector('.alert');
            if(a < 3) {
                alert.innerText = `3달 이상 계약 가능!`;
            } else {
                alert.innerText = '';
            }
        }
    }
}
</script>

<style scoped>

input[type=number] {
    padding: 10px;
    width: 50px;
}
</style>