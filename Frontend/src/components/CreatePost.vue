<template>
    <div id="createPost">
        <form @submit.prevent="createPost">
            <div id="text">
                <textarea name="textarea" placeholder="Ecriver votre message ici" v-model="text"></textarea>
            </div>
            <div id="preview" v-if="preview">
                <img :src="preview" :alt="preview">
            </div>         
            <div id="boutons">                
                <input type="file" ref="file" name="file" class="upload" id="file" @change="selectFile">             
                <input type="submit" value="Publier" class="btn">
            </div>
            <p>{{errMsg}}</p>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'CreatePost',
    data() {
        return {
            text: null,
            file: '',
            preview: null,
            errMsg: null
        }
    },
    methods: {
        selectFile(event) {
            this.file = this.$refs.file.files[0]
            let input = event.target
            if(input.files) {
                let reader = new FileReader()
                reader.onload = (e) => {
                    this.preview = e.target.result
                }
                reader.readAsDataURL(input.files[0])
            }
        },
        createPost() {
            if (!this.text) {
                this.errMsg = "Ecriver quelque chose pour publier"
                return
            }
            let formData = new FormData()
            formData.append('text', this.text)
            formData.append('file', this.file)
            formData.append('userId', localStorage.getItem('userId'))

            axios.post('http://localhost:3000/api/posts/create', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            })  
                .then(res => this.$emit('add-Post', res.data))
                .catch(error => console.log(error))
          
            this.$emit('toggle-Btn')
            this.text = ''
            this.file = ''
        }
    }
}
</script>

<style scoped>
#createPost {
   max-width: 50%;
    border: 2px rgb(8, 8, 88) solid;
    margin: auto;
    margin-top: 20px;
   padding:5px;
    border-radius: 8px;
}
form {
    display: flex;
    flex-direction: column;
}
#preview {
    overflow: hidden;
    max-width: 20%;
}
img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}
#boutons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    padding: 1%;
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
textarea{
    width:99%;
    height:100px;
}
</style>