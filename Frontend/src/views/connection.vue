<template>
  <div id="form">
    <div id="nav">
      <img id="imglogo" alt="logo" src="../assets/icon-left-font.png" />
      <h1>Connectez-Vous</h1>
    </div>
    <form method="POST" id="formulaire" @submit.prevent="envoi">
      <div class="entreeformulaire">
        <label for="email">Votre Email </label>
        <input
          type="text"
          name
          value
          id="pseudo"
         
          v-model="username"
        />
      </div>
      <div class="entreeformulaire">
        <label for="password">Mot de passe </label>
        <input
          type="password"
          name
          value
          id="password"
          v-model="password"
        />
      </div>
      <button type="submit" class="btnconnection">Connection</button>
      <p>
        Pas encore inscrit ?
       <router-link to="/">S'inscrire</router-link>
      </p>
      <p>
        mur temporaire
        <router-link to="/mur">mur</router-link>
        </p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
    form: { email: "",
      password: "",
    }
    };
  },
  methods: {
    async envoi() {
      if (this.email == "" || this.password == "") {
        alert(
          "Veuillez entrer votre email et votre mot de passe pour vous connecter"
        );
        return;
      }
       try{
          await axios.post('/login', this.form);
           
           let response = await axios.get('/api/user')
     
            console.log("Connection réussi", response);
          
             this.$router.push("/mur");
         
       }
          catch (error) {
            this.errors = error.response.data.errors;
          };
      }
    },
};
</script>

<style lang="scss" scoped>
.btnconnection {
  padding: 10px;
  font-size: 15px;
}
.entreeformulaire {
  margin-bottom: 20px;
  padding-bottom: 15px;
}
p {
  margin-top: 30px;
}
</style>
