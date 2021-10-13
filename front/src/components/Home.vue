<template>
  <div class="home" v-if="disconnected()">
    <img
      class="rounded img-fluid d-flex ml-auto mr-auto"
      src="../assets/icon-left-font.png"
      alt="Logo Groupomania"
    />
    <div class="bienvenue">
      Bienvenue sur le réseau social de Groupomania
    </div>
    <div class="annonce">
     <router-link to="login">Connectez vous</router-link>  ou <router-link to="register">créez un compte</router-link> pour poster vos messages
    </div>
  </div>

  <div class="home" v-else>
    <PostForm />
     <PostList /> 
  </div>
</template>

<script>
import PostForm from "@/components/PostForm.vue";
 import PostList from "@/components/PostList.vue";

export default {
  name: "home",
  components: {
    PostForm,
     PostList
  },

  methods: {
    disconnected() {
      let disconnected = localStorage.getItem("user");
      if (disconnected == null) {
          
        return true;
      } else {
         
        return false;
      }
    },
  },
};
</script>

<style scoped>
.bienvenue {
  text-align: center;
  margin: auto;
  font-size: 40px;
  background-color: #c51818e0;
  padding: 20px 1px 20px 1px;
  color: white;
}
.annonce {
  text-align: center;
  margin-top: 80px;
  font-size: 22px;
}
</style>
