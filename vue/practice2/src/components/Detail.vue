<template>
    <div>
        {{ $route.params }}
        <p>{{ item.title }}</p>
        <p>{{ item.content }}</p>
        <p>{{ item.title }}</p>
        <p>{{ item.title }}</p>
    </div>
    <router-view></router-view>
    <button @click="back">back</button>
    <button @click="seeAuthor">see author</button>
</template>


<script>
import { list } from '../list.js'

export default {
    name: 'Detail',
    props: {
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            item: list[this.id]
        }
    },
    methods: {
        back() {
            this.$router.push({
                name: 'list'
            });
        },
        seeAuthor() {
            this.$router.push({
                name: `detail/${this.id}/author`,
                params: { id: this.id }
            })
            //안된다..
            //직접 경로 입력해서 들어가야 나옴.
        }
    }
}
</script>