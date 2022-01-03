import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state() {
    return {
      name: 'Jack',
      age: 28,
      likes: [ { liked: false, likes: 24 }, { liked: false, likes: 55 }, { liked: false, likes: 12 } ],
      more: {  }
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
      }
  },
  actions: {
    getPost(context) {
        axios.get('https://codingapple1.github.io/vue/more0.json')
            .then((res) => {
                context.commit('showMore', res.data);
            });
    }
  }
})

export default store