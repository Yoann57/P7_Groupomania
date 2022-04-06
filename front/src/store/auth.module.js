import AuthService from '../services/auth.service';
import UserService from '../services/user.service';

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {
          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
     deleteUser({ commit }, {id}) {
     return UserService.deleteUser(id).then(
       response => {
      commit('removeCurrentUser');
        return Promise.resolve(response.data);
      },
      error => {
       return Promise.reject(error);
      }
     );
   },
 },

  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    removeCurrentUser(state){
      localStorage.removeItem('currentUser');
      localStorage.removeItem('userDetails');
      state.currentUser = null;
      state.userDetails = null;
      state.status.loggedIn = false;
      state.user = null;
  },
  },
  getters: {
    currentuser(state) {
      return state.user;
    },
    loggedIn(state) {
      return state.user !== null;
    },
    notLogged(state) {
      return state.user == null;
    },
    isAdmin(state) {
      return state.user.isAdmin === 1;
    },
  }, 
};
