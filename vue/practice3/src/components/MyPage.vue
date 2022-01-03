<template>
    <div style="padding : 10px">
        <h4>팔로워</h4>
        <input placeholder="?" @input="filterFollowers($event)"/>
        <div class="post-header follower-window">
            <div v-for="(follower, idx) in followers" :key="idx" class="follower">
                <div class="profile" :style="`background-image: url(${follower.image})`"></div>
                <span class="profile-name">{{ follower.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MyPage',
    props: {
        followers: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            followersNameCopied: []
        }
    },
    methods: {
        filterFollowers(event) {
            const keyword = event.target.value;

            const foll = document.querySelectorAll('.follower');
            let idx = 0;

            for(let follower of this.followers) {
                if(!follower.name.includes(keyword)) {
                    foll[idx].classList.add('hide');
                } else {
                    foll[idx].classList.remove('hide');

                    const name = foll[idx].querySelector('.profile-name');
                    name.innerHTML = this.followersNameCopied[idx];

                    const replaced = name.innerHTML.replaceAll(keyword, `<span style="background-color: yellow; color: red;">${keyword}</span>`);
                    name.innerHTML = replaced;
                }
                idx ++;
            }
        }
    },
    mounted() {
        setTimeout(() => {
            const names = document.querySelectorAll('.profile-name');

            Array.from(names).forEach(name => {
                this.followersNameCopied.push(name.innerText);
            });
        }, 1000);
    }
}
</script>

<style scoped>
.follower-window {
    height: 300px;
}

.follower {
    display: flex; 
    padding: 10px;
}

.hide {
    display: none;
}

.highlight {
    background-color: yellow;
    color: red;
}
</style>
