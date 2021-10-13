<template>

    <div class="main">


        <h1>message ici</h1>
        <div class="card gedf-card post-card" v-for="post of posts" :key="post.id">
            <div class="card-header">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="ml-2">
                            <div class="h5 m-0">{{ post.User.username }}</div>
                            <div class="h7 text-muted">{{ post.User.email }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-body">
                <p class="card-text"> {{post.text}}</p>

                <img :src="post.file" class="rounded img-fluid d-flex ml-auto mr-auto" accept="image/*" alt="image">
            </div>

            <div class="card-footer">
                <div class="right-footer">
                    <a class="card-link" @click="likePost(post)"><i class="fa fa-gittip"></i></a>
                    <a class="card-link" @click="commentPost(post)"><i class="fa fa-comment"></i></a>
                    <a class="card-link"
                        v-if="post.UserId === $store.state.user.userId || $store.state.user.isAdmin === 1"
                        @click="edit(post)"><i class="fa fa-edit"></i></a>
                    <a class="card-link"
                        v-if="post.UserId === $store.state.user.userId || $store.state.user.isAdmin === 1"
                        @click="deletePost(post)"><i class="fa fa-trash"></i></a>
                </div>

                <div class="left-footer">
                    <span class="like-number">{{ post.Likes.length }} Like(s)</span>
                </div>
            </div>


            <hr class="hr-text" data-content="COMMENTAIRES">


            <div class="card gedf-card comment-card" v-for="comment in post.Comments" :key="comment.id">

                <div class="card-header">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="ml-2">
                                <div class="h5 m-0">{{ comment.User.username }}</div>
                                <div class="h7 text-muted">{{ comment.User.email }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-body">
                    <p class="card-text"> {{comment.message}}</p>
                </div>

                <div class="card-footer">
                    <div class="right-footer">
                        <a class="card-link"
                            v-if="comment.UserId === $store.state.user.userId || $store.state.user.isAdmin === 1"
                            @click="editComment(comment)"><i class="fa fa-edit"></i></a>
                        <a class="card-link"
                            v-if="comment.UserId === $store.state.user.userId || $store.state.user.isAdmin === 1"
                            @click="deleteComment(comment)"><i class="fa fa-trash"></i></a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import PostService from "../services/post";
    import {
        mapState,
        mapGetters
    } from "vuex";

    export default {
        name: "Wall",
        props: {
            id: {
                type: Number,
                default: null,
                required: false
            }
        },
        data() {
            return {
                comment: {
                    message: "",
                },
            }
        },
        computed: {
            ...mapGetters(['currentUser','isAdmin']),

            ...mapState({
                posts: "posts",
            })
        },
        async mounted() {
            await this.$store.dispatch("getAllPosts")
        },

        methods: {
            async edit(post) {
                this.$router.push('/modify-post/' + post.id)
            },

            async deletePost(post) {
                if (confirm("Souhaitez-vous supprimer ce post?")) {
                    try {
                        await PostService.deletePost(post.id)
                        alert("Le post a bien été supprimé")
                        this.$store.dispatch("getAllPosts");
                    } catch (error) {
                        console.log(error)
                    }
                }
            },

            async likePost(post) {
                await PostService.likePost(post.id)
                this.$store.dispatch("getAllPosts");
            },

            async commentPost(post) {
                this.$router.push('/create-comment/' + post.id)
            },

            async editComment(comment) {
                this.$router.push('/modify-comment/' + comment.id)
            },

            async deleteComment(comment) {
                if (confirm("Souhaitez-vous supprimer ce commentaire?")) {
                    try {
                        await PostService.deleteComment(comment.id)
                        alert("Le commentaire a bien été supprimé")
                        this.$store.dispatch("getAllPosts");
                    } catch (error) {
                        console.log(error)
                    }
                }
            },

            onChangePage(pageOfPosts) {
                // update page of items
                this.pageOfPosts = pageOfPosts;
            },

        }
    };
</script>

<style scoped>
    .headerPost p {
        font-size: 10px;
    }

    h1 {
        margin: 30px;
        text-align: center;
        text-shadow: 2px 2px 2px black;
        color: white;
    }

    .hr-text {
        line-height: 1em;
        position: relative;
        outline: 0;
        border: 0;
        color: black;
        text-align: center;
        height: 1.5em;
        opacity: .5;

    }

    .card-footer {
        display: flex;
        justify-content: space-between;
    }

    .like-number {
        color: #007bff;
    }

    .h7 {
        font-size: 0.8rem;
    }

    .text-muted {
        color: black !important;
    }

    .gedf-wrapper {
        margin-top: 0.97rem;
    }

    #comments {
        margin-top: 20px;
    }

    .gedf-main {
        padding-left: 4rem;
        padding-right: 4rem;
    }

    .gedf-card {
        margin-bottom: 2.77rem;
        margin-top: 2.77rem;
    }

    .comment-card {
        margin-bottom: 0.1rem;
        margin-top: 0.1rem;
    }

    .dropdown-toggle::after {
        content: none;
        display: none;
    }
</style>