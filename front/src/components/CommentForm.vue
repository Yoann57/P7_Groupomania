<template>
  <div id="addComment">
    <div class="row">
      <div class="col-12 justify-content-center form-group">
        <textarea
          v-on:keydown="isInvalid = false"
          class="form-control"
          v-model="commentaire"
          id="commentaire"
          name="commentaire"
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
      commentaire: "",
      }
    };
  },
 async mounted() {
            this.post = await this.$store.dispatch("getOnePost", {
                id: this.$route.params.id
            })
        },
   methods: {

            addComment() {

                PostService.addComment(this.$route.params.id, {
                    userId:  this.$store.state.auth.user.id,
                    commentaire: this.commentaire
                }).then(() => {
                    alert("Le commentaire a bien été ajouté")
                    this.$router.push('/');
                });
            },
        },
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
