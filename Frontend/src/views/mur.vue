<template>
  <div id="pageacceuil">
  <h1>Bienvenue sur le réseau social de Groupomania</h1>
   <button v-if="createPost" @click="toggleBtn" class="btn">Retour au mur</button>
    <button v-else @click="toggleBtn" class="btn">Publier un message</button>       
    <CreatePost v-show="createPost" @toggle-btn="toggleBtn" @add-Post="addPostFrontend" />
     <p>retour connection <router-link to="/connection">Se Connecter</router-link></p>
      </div>
         
</template>

<script>
import CreatePost from "../components/CreatePost.vue"
export default {
    name:"mur",
    components: {
        CreatePost,
    },
    data() {
        return {
            posts:[],
            createPost: false,
            postId:null,
        }
    },
    methods: {
        toggleBtn() {
            this.createPost = !this.createPost
        },
        async addPost() {
            this.posts = await this.fetchPosts()      
        },
        async fetchPosts() {
            const resPosts = await fetch('http://localhost:3000/api/posts')
            const dataPosts = await resPosts.json()
            dataPosts.forEach(post => {
                post.createdAt = post.createdAt.split('T')[0]
            });
            dataPosts.reverse()
            return dataPosts
        }
    },
    async created() {
        this.posts = await this.fetchPosts()
    }
}
</script>

<style scoped>
p{
    margin-top: 50px;
}
.btn {
    margin-top: 50px;
    color: white;
    background: blue;
    border: none;
    padding: 20px;
    border-radius: 10px;
   
}
.btn:hover {
    box-shadow: 2px 2px 3px 1px yellow;
}

</style>