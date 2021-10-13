import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:3000/';

class PostService {
   getAllPosts() {
        return axios.get(API_URL + 'posts', { headers: authHeader() });
    }
    getOnePost(id) {
        return axios.get (API_URL + 'posts/' + id, { headers: authHeader() });
    }
    createPost(data) {
        return axios.post(API_URL + 'posts/', data, { headers: authHeader() })
    }
    modifyPost(id, data) {
        return axios.put (API_URL + 'posts/' + id , data, { headers: authHeader() })
    }
    deletePost(id) {
        return axios.put (API_URL + 'posts/' + id, { headers: authHeader() })
    }
    likePost(id) {
        return axios.post (API_URL + 'posts/' + id + '/like',{}, { headers: authHeader() })
    }
    getOneComment(id) {
        return axios.get (API_URL + 'comment/' + id, { headers: authHeader() });
    }
    commentAPost(id, data) {
        return axios.post (API_URL + 'posts/' + id + '/comment', data, { headers: authHeader() })
    }
    modifyComment(id,comment) {
        return axios.put (API_URL + 'comment/' + id, {comment: comment}, { headers: authHeader() })
    }
    deleteComment(commentId) {
        return axios.delete (API_URL + 'comment/' + commentId, { headers: authHeader() })
    }
}
export default new PostService();