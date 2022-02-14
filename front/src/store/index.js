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


});

export default store;
