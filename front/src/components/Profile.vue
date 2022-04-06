<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Nom d'utilisateur:</strong>
      {{currentUser.username}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p> 
       <button class="badge badge-danger mr-2" @click="deleteProfil()">
      Supprimer votre compte
       </button>
  </div>
</template>

<script>

export default {
  name: 'Profile',
  data(){
    return {
      user: null
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },
   methods: {
           
   async deleteProfil() {
    
    if (confirm("Souhaitez-vous supprimer votre compte?")) {
     try {

       await this.$store.dispatch('auth/deleteUser',this.currentUser);
       window.localStorage.removeItem("user");
       alert("votre profil a bien été supprimé");
       this.$router.push("/");
      } catch (error) {
       console.log(error);
      }
     }
    },         
  }
};

</script>

