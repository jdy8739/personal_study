import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      name: 'Jack',
      age: 28,
      likes: [ { liked: false, likes: 24 }, { liked: false, likes: 55 }, { liked: false, likes: 12 }, { liked: false, likes: 7 },
        { liked: false, likes: 42 }, { liked: false, likes: 12 }, { liked: false, likes: 64 } ],
      more: {  },
      followers: []
    }
  },
  mutations: {
      plusAge(state, payload) {
        state.age += payload;
      },
      likeOrDislike(state, payload) {
        if(!state.likes[payload].liked) {
            state.likes[payload].likes ++;
            state.likes[payload].liked = true;
        } else {
            state.likes[payload].likes --;
            state.likes[payload].liked = false;
        }
      },
      showMore(state, payload) {
        state.more = payload;
      },

      putFollowers(state, payload) {
        state.followers = payload;
      }

  },
  actions: {
    getPost(context) {
      axios.get('https://codingapple1.github.io/vue/more0.json')
        .then((res) => {
            context.commit('showMore', res.data);
        });
    },
    getFollowers(context) {
      axios.get('follower.json')
        .then((res) => {
            context.commit('putFollowers', res.data);
        }).catch((err) => {
            console.log(err);
        });
    }
  }
})

export default store