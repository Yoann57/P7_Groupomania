<template>
  <div class="main">
    <div
      class="card gedf-card post-card"
      v-for="post in getPosts.slice().reverse()"
      :key="post.id"
    >
      <div class="card-header">
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex justify-content-between align-items-center">
            <div class="ml-2">
              <div class="h5 m-0">
                message de {{ post.user && post.user.username }} posté le :
                {{ dateFormat(post.createdAt) }}            
              </div>
            </div> 
          </div>
        </div>
      </div>

      <div class="card-body">
        <p class="card-text">{{ post.text }}</p>
        <img
          :src="post.file"
          class="rounded img-fluid d-flex ml-auto mr-auto"
          alt="image"
        />
      </div>    
      <div class="card gedf-card comment-card">
     <div class="h6 m-0">
          <p>Commentaires</p>
        <div class="card-body" v-for="comment in getComments" :key="comment.id">
          <div class="card-body" v-if="comment.postId === post.id">
        <div class="card gedf-card comment-card"> 
           <div class="h7 m-0">
                commentaire de {{ comment.user && comment.user.username }} posté le :
                {{ dateFormat(comment.createdAt) }}
            </div>   
          <p class="card-text">{{ comment.commentaire }}</p>        
</div> 
          <button
            class="badge badge-danger mr-2" v-if="currentUser && (currentUser.id == comment.userId || currentUser.isAdmin)"
            @click="deleteComment(comment)"
          >
            Supprimer le commentaire
          </button>
          </div>
       </div>
      </div>
    </div>

      <button class="badge badge badge-success mr-2" @click="addComment(post)">
        Commenter
      </button>

      <button class="badge badge-warning mr-2" v-if="currentUser && (currentUser.id == post.userId || currentUser.isAdmin)" @click="modifyPost(post)">
        Modifier
      </button>
     
      <button class="badge badge-danger mr-2" v-if="currentUser && (currentUser.id == post.userId || currentUser.isAdmin)" @click="deletePost(post)">
        Supprimer
      </button>
    </div>
  </div>
</template>

<script>
import PostService from "../services/post";
import { mapGetters } from "vuex";

export default {
  name: "Wall",
  props: {
    id: {
      type: Number,
      default: null,
      required: false,
    },
  },
 
  computed: {
  
    currentUser() {
      return this.$store.state.auth.user;
    },
    ...mapGetters(["getPosts"]),
    ...mapGetters(["getComments"]),
  },

  async mounted() {
    console.log("mouted");
    await this.$store.dispatch("getAllPosts");
    await this.$store.dispatch("getAllComments");
  },

  methods: {
    async modifyPost(post) {
      this.$router.push("/modifyPost/" + post.id);
    },

    async deletePost(post) {
      if (confirm("Souhaitez-vous supprimer ce post?")) {
        try {
          await PostService.deletePost(post.id);
          alert("Le post a bien été supprimé");
          this.$store.dispatch("getAllPosts");
        } catch (error) {
          console.log(error);
        }
      }
    },

    async addComment(post) {
      this.$router.push("/commentForm/" + post.id);
    },

    async deleteComment(comment) {
      if (confirm("Souhaitez-vous supprimer ce commentaire?")) {
        try {
          await PostService.deleteComment(comment.id);
          alert("Le commentaire a bien été supprimé");
          this.$store.dispatch("getAllComments");
        } catch (error) {
          console.log(error);
        }
      }
    },
    
    dateFormat(date) {
      const event = new Date(date);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      return event.toLocaleDateString("fr-FR", options);
    },
  },
};
</script>

<style scoped>
img {
  width: 250px;
  height: 250px;
}

.headerPost p {
  font-size: 10px;
}

h1 {
  margin: 30px;
  text-align: center;
  text-shadow: 2px 2px 2px black;
  color: white;
}

.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: 0.5;
}

.card-footer {
  display: flex;
  justify-content: space-between;
}

.like-number {
  color: #007bff;
}

.h7 {
  font-size: 0.8rem;
}

.text-muted {
  color: black !important;
}

.gedf-wrapper {
  margin-top: 0.97rem;
}

#comments {
  margin-top: 20px;
}

.gedf-main {
  padding-left: 4rem;
  padding-right: 4rem;
}

.gedf-card {
  margin-bottom: 2.77rem;
  margin-top: 2.77rem;
}

.comment-card {
  margin-bottom: 0.1rem;
  margin-top: 0.1rem;
  border-top: 2px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
}

.dropdown-toggle::after {
  content: none;
  display: none;
}
.card-body{
  padding:0;
}

.h6{
  text-align: center;
  background-color: lightblue;
}
.mr-2, .mx-2 {
    margin: 0.3rem;
}
.card-text:last-child {
    margin-bottom: 0.6rem;
}
p {
    margin: 0.6rem;
}
</style>
