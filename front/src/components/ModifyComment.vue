<template>
  <div id="modifyComment" v-if="isLoaded">
    <div class="row">
      <div class="col-12 justify-content-center form-group">
        <textarea
          v-on:keydown="isInvalid = false"
          class="form-control"
          v-model="comment.comment"
          id="comment"
          name="comment"
          rows="6"
          maxlength="300"
          placeholder="Saisissez votre commentaire. (300 caractères max)"
        ></textarea>
      </div>

      
    </div>
    <div>
      <button type="submit" @click.prevent="modifyComment" class="btn">
        Modifier le commentaire
      </button>
    </div>
    <router-link to="/PostList"> </router-link>
  </div>
</template>

<script>
import PostService from "../services/post.js";

export default {
  name: "modifyComment",

  data: function() {
    return {
      id: null,
     isLoaded: false,
    };
  },

  methods: {
    async modifyComment() {
      console.log(this.id);

      const newPost = new FormData();

      newPost.append("comment", this.comment.comment);
      newPost.append("userId", this.$store.state.auth.user.id);
      newPost.append("username", this.$store.state.auth.user.username);
      await PostService.modifyComment(this.id, newPost);
      this.$router.push("/");
    },
  },
  async mounted() {
    this.id = this.$route.params.id;
    console.log(this.id);
    const response = await PostService.getOneComment(this.id);
    this.comment = response.data;
    this.isLoaded = true;
    console.log(this.comment);
    console.log(this.$store.state.auth.user.id);
  },
};
</script>

<style scoped>
#modifyComment {
  max-width: 50%;
  border: 2px rgb(8, 8, 88) solid;
  margin: auto;
  margin-top: 20px;
  padding: 5px;
  border-radius: 8px;
}

.btn {
  background-color: #26207c;
  border-style: none;
  outline: none;
  width: 90%;
  border-radius: 8px;
  height: 40px;
  color: white;
}
.btn:hover {
  color: rgb(192, 204, 19);
}
textarea {
  width: 99%;
  height: 100px;
}
</style>