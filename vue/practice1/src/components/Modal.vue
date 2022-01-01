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
                <input v-model="month" type="number" min="1" max="12">
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
            month: 0,
            alert: ''
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
            //const alert = document.querySelector('.alert');
            if(a < 3) {
                this.alert.innerText = `3달 이상 계약 가능!`;
            } else {
                this.alert.innerText = '';
            }
        }
    },
    mounted() {
        const alert = document.querySelector('.alert');
        this.alert = alert;
    },
}
</script>

<style scoped>

input[type=number] {
    padding: 10px;
    width: 50px;
}

.alert {
    color: red;
}
</style>