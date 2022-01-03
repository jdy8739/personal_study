<template>
    <div>
        <p>{{ $store.state.age }}</p>
        <button @click="plusAge">plusAge</button>
        <button @click="getPost">execute store action</button>
        <p>{{ $store.state.more }}</p>
        <div v-if="step == 0">
           <Post v-for="(post, idx) in posts" :key="idx" :post="post" :idx="idx"/>
        </div>
        
        <div v-if="step == 1">
            <!-- 필터선택페이지 -->
            <div v-for="(image, idx) in images" :key="idx" class="mb-5">
                <div :class="`upload-image ${ filterName }`" :style="{ backgroundImage: `url(${ image }` }"></div>
                <div class="filters">
                    <!-- <div class="filter-1"></div> -->
                    <FilterImage v-for="(filter, idx) in filters" :key="idx" :image="image" :filter="filters[idx]">
                        {{ filters[idx] }}
                    </FilterImage>
                </div>
            </div>
        </div>

        <div v-if="step == 2">
            <!-- 글작성페이지 -->
            <div v-for="(image, idx) in images" :key="idx" class="mb-5">
                <div :class="`upload-image ${ filterName }`" :style="{ backgroundImage: `url(${ image }` }"></div>
                <div class="write">
                    <textarea class="write-box" v-model="content">write!</textarea>
                </div>
            </div>
            <button @click="publish">publish</button>
        </div>
    </div>
</template>

<script>
import Post from './Post.vue';
import FilterImage from './FilterImage.vue';

export default {
    name: 'Container',
    components: {
        Post,
        FilterImage
    },
    props: {
        posts: {
            type: Array,
            required: true
        },
        step: {
            type: Number
        },
        images: {
            type: Array
        }
    },
    data() {
        return {
            filters: 
            [ 
                "aden", "_1977", "brannan", "brooklyn", "clarendon", "earlybird", "gingham", "hudson", 
                "inkwell", "kelvin", "lark", "lofi", "maven", "mayfair", "moon", "nashville", "perpetua", 
                "reyes", "rise", "slumber", "stinson", "toaster", "valencia", "walden", "willow", "xpro2"
            ],
            filterName: ''
        }
    },
    methods: {
        publish() {
            const pics = document.querySelectorAll('.upload-image');
            let urls = [];

            pics.forEach((item) => {
                const url = item.style.backgroundImage.replace('url("blob:', '').replace(')', '').replace('"', '');
                urls.push(url);
            });

            const writeBox = document.querySelectorAll('.write-box');
            let posts = [];

            let now = new Date();
            const date = now.getMonth() + ' ' + now.getDate();

            writeBox.forEach((item, i) => {
                let post = { 
                    name: "Kim Hyun",
                    userImage: "https://placeimg.com/100/100/arch",
                    postImage:  `blob:${urls[i]}`,
                    likes: 0,
                    date: date,
                    liked: false,
                    content: `${item.value}`,
                    filter: this.filterName
                };

                posts.push(post);
            });

            this.$emit('publish', posts);
        },

        plusAge() {
            this.$store.commit('plusAge', 2);
        },
        getPost() {
            this.$store.dispatch('getPost')
        }
    },
    mounted() {
        this.emitter.on('useFilter', (filter) => {
            this.filterName = filter;
        });
    }
}
</script>

<style>
@import 'styles3.css';

</style>