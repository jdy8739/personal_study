<template>
    <div class="card-wrapper">
        <div v-for="(item, idx) in listItem" :key="idx" class="card box" style="min-width: 250px;" @click="toDetail(idx)">
            <p>{{ item.title }}</p>
            <p>{{ item.content }}</p>
            <p>{{ item.date }}</p>
            <p>{{ item.number }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'List',
    props: {
        listItem: {
            type: Array,
            required: true
        }
    },
    methods: {
        toDetail(idx) {
            const id = this.listItem[idx].number;
            
            this.$router.push({
                name: 'detail',
                params: { id: id.toString() }
            });
        }
    }
}
</script>

<style>
.card-wrapper {
    display: flex;
}

.box {
    width: 33.33%;
    padding: 10px;
    margin: 5px;
}

@media screen and (max-width: 768px) {
    .card-wrapper {
        flex-direction: column;
        display: block;
    }

    .box {
        margin: 5px auto;
        display: block;
    }

}
</style>