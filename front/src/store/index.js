import { createStore } from "vuex";
import { auth } from "./auth.module";
import { postModule } from "./post.module";
const store = createStore({
  modules: {
    auth,
    postModule,
  },
  state: {

  
  
},
getters: {
  currentUser(state) {
    return state.currentUser;
  },
  loggedIn(state) {
    return state.currentUser !== null;
  },
  notLogged(state) {
    return state.currentUser == null;
  },
  isAdmin(state) {
    return state.currentUser.isAdmin === 1;
  },
}, 


});

export default store;
