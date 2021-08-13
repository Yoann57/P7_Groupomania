
import Vuex from 'vuex'



export default new Vuex.Store({
    state: {
         authenticated: false,
         user:null

    },
    mutations: {
            setAuth(state, user){
                localStorage.setItem('auth', JSON.stringify(user));
                state.authenticated = true;
                state.user = user;
            },
            initializeAuth(state){

                //initialise l'authentification si l'utilisateur est bien connecté
                if (localStorage.getItem('auth')){
                    state.authenticated = true;
                    state.user = JSON.parse(localStorage.getItem('auth'));
                }
            }

    },
    actions: {


    },
    modules: {


    },
  });