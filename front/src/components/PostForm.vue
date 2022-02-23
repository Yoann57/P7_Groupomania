<template>

  <div id="createPost">
     <div class="row">
					<div class="col-12 justify-content-center form-group">
						<textarea
							v-on:keydown="isInvalid = false"
							class="form-control"
							v-model="text"
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
								@change="selectFile()"
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
					<div><button type="submit" @click.prevent="submitForm" class="btn">Publier</button></div>
					<router-link to="/PostList">
					</router-link
					>
				
  </div>

</template>

<script>
 import {
        
        mapGetters
    } from "vuex";

export default {
  name: "createPost",
  data: function() {
    return {
      post: {
        text: "",
        file: null,
      },
    };
  },
  methods: {
   async submitForm() {
     console.log(this.$store.state.auth.user);
      const newPost = new FormData();
      newPost.append("text", this.text);
       newPost.append("userId", this.$store.state.auth.user.id);
        newPost.append("username", this.$store.state.auth.user.username);
      this.file = this.$refs.file.files[0];
      if (this.file !== null && this.file !== undefined) {
          newPost.append("image", this.file);
      }
      console.log('message'+newPost.get('text'));
      await this.$store.dispatch('createPost', newPost)
      
    },
    computed: {
            ...mapGetters(['auth/currentUser'
            ]),
        },
  },
};
</script>

<style scoped>
#createPost {
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
  width: 20%;
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
