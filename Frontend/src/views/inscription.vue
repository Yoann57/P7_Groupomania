<template>
  <div id="containerP">
    <div id="nav">
      <img
        id="imggroupomania"
        alt="image groupomania"
        src="../assets/icon-left-font.png"
      />
      <h1>Inscription</h1>
    </div>
    <form>
      <div class="formulaire">
        <label for="email">Email </label>
        <input type="email" class="forminput" id="email" v-model="email" />
      </div>
      <div class="formulaire">
        <label for="username">Pseudonyme</label>
        <input type="text" class="forminput" id="username" v-model="username" />
      </div>
      <div class="formulaire">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          class="forminput"
          id="password"
          v-model="password"
        />
      </div>
      <button @click="envoi()" class="btnvalid">S'inscrire</button>
       <p>Déjà inscrit ? <router-link to="/connection">Se Connecter</router-link></p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    async envoi() {
      if (this.email == "" || this.username == "" || this.password == "") {
        alert("remplissez tout les champs avant d'envoyer le formulaire !");
        return;
      } 
      try {
        const res = await axios.post('http://localhost:3000/api/signup', {
          email: this.email,
          username: this.username,
          password: this.password,
        })

        console.log("Inscription ok", res);
      
        alert("Vous êtes inscrit");

        this.$router.push('/connection')
      } catch (err) {
        console.log("Echec de l'inscription", err);
      } 
    },
  },
};
</script>

<style lang="scss" scoped>
.formulaire {
  padding: 10px;
  width: 180px;
  margin: auto;
}
.forminput {
  width: 200px;
}
button {
  margin: 20px;
  padding: 10px 12px 10px 12px;
}
</style>