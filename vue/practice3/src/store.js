import { createStore } from 'vuex'

const store = createStore({
  state(){
    return {
      name: 'Jack',
      age: 28,
      likes: [ { liked: false, likes: 24 }, { liked: false, likes: 55 }, { liked: false, likes: 12 } ]
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
      }
  }
})

export default store