import PostService from "../services/post";

export const postModule = {

    state: {

        posts: [],
        post:null,
        comments: [],
    },
    getters: {
      getPosts:(state) => state.posts
    },
      mutations: {
    
        setPosts(state, posts) {
        state.posts = [...posts]
        },
    
        setPost(state, post) {
        state.post = post
        },
    
        setComment(state, comment) {
        state.comment = comment
        },

        addPost(state,post) {
          state.posts = [...state.posts, post]
        }

    
      },
    
      actions: {
  
        async getAllPosts({ commit }) {
          try{
          const response = await PostService.getAllPosts();
            commit("setPosts", response.data);
          }catch(error){
            console.log(error.response);
          }
        },
    
        async createPost({ commit }, formData) {
          const res = await PostService.createPost(formData);
          console.log(res)
          commit("addPost", res.data);
        },
    
        async getOnePost({ commit },{id}) {
          try{
          const response = await PostService.getOnePost(id);
            commit("setPost", response.data);
            return response.data;
          }catch(error){
            console.log(error.response);
          }
        },
    
        async modifyPost({ commit },{id, text, file}) {
          try{
          const response = await PostService.modifyPost(id,{
            post:{
            text,
            file
          }});
            commit(response.data);
            return response.data;
          }catch(error){
            console.log(error.response);
          }
        },
    
        async deletePost({ commit },{id}) {
          try{
          const response = await PostService.deletePost(id);
            commit(response.data);
            return response.data;
          }catch(error){
           throw new Error(error.message)
          }
        },
    
        async getOneComment({ commit },{id}) {
          try{
          const response = await PostService.getOneComment(id);
            commit("setComment", response.data);
            return response.data;
          }catch(error){
            console.log(error.response);
          }
        },
    
        async modifyComment({ commit },{id,comment}) {
          try{
          const response = await PostService.modifyComment(id,comment);
            commit(response.data);
            return response.data;
          }catch(error){
            console.log(error.response);
          }
        },
      }
}