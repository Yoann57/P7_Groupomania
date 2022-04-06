<template>
  <div id="modifyPost" v-if="isLoaded">
    <div class="row">
      <div class="col-12 justify-content-center form-group">
        <textarea
          v-on:keydown="isInvalid = false"
          class="form-control"
          v-model="post.text"
          id="text"
          name="text"
          rows="6"
          maxlength="300"
          placeholder="Saisissez votre message. (300 caractères max)"
        ></textarea>
      </div>

      <div class="col-12 justify-content-center">
        <div class="form-group justify-content-center">
          <input
            @change="selectFile"
            type="file"
            ref="file"
            name="image"
            class="form-control-file"
            id="File"
            accept=".jpg, .jpeg, .gif, .png"
          />
        </div>
      </div>
    </div>
    <div>
      <button type="submit" @click.prevent="modifyPost" class="btn">
        Modifier
      </button>
    </div>
    <router-link to="/PostList"> </router-link>
  </div>
</template>

<script>
import PostService from "../services/post.js";

export default {
  name: "modifyPost",

  data: function() {
    return {
      id: null,
      isLoaded: false,
      file: null,
    };
  },

  methods: {
    async modifyPost() {

      const newPost = new FormData();

      newPost.append("text", this.post.text);
      newPost.append("userId", this.$store.state.auth.user.id);
      this.file = this.$refs.file.files[0];
      if (this.file !== null && this.file !== undefined) {
        newPost.append("image", this.file);
      }
      await PostService.modifyPost(this.id, newPost);
      this.$router.push("/");
    },
  },
  async mounted() {
    this.id = this.$route.params.id;
    const response = await PostService.getOnePost(this.id);
    this.post = response.data;
    this.isLoaded = true;
  },
};
</script>

<style scoped>
#modifyPost {
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
