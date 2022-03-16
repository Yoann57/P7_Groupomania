<template>
  <div id="addComment">
    <div class="row">
      <div class="col-12 justify-content-center form-group">
        <textarea
          v-on:keydown="isInvalid = false"
          class="form-control"
          v-model="comment"
          id="comment"
          name="comment"
          rows="6"
          maxlength="300"
          placeholder="Saisissez votre commentaire. (300 caractères max)"
        ></textarea>
      </div>

      
      
    </div>
    <div>
      <button type="submit" @click.prevent="addComment" class="btn">
        Commenter
      </button>
    </div>
    <router-link to="/PostList"> </router-link>
  </div>
</template>

<script>
import PostService from "../services/post.js";

export default {
  name: "addComment",

  data: function() {
    return {
      Comment: {
      userId:null,
      PostId:null,
      comment: "",
      }
    };
  },
 async mounted() {
            this.post = await this.$store.dispatch("getOnePost", {
                id: this.$route.params.id
            })
        },
   methods: {

            addComment(post) {
                PostService.addComment(post.id, {
                    comment: this.comment
                }).then(() => {
                    alert("Le commentaire a bien été ajouté")
                    this.$router.push('/');
                });
            },


        },
  // async mounted() {
  //   this.id = this.$route.params.id;
  //   console.log(this.id);
  //   const response = await PostService.getOnePost(this.id);
  //   this.post = response.data;
  //   console.log(this.post);
  //   console.log(this.$store.state.auth.user.id);
  // },
};
</script>

<style scoped>
#addComment {
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
  width: 30%;
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
