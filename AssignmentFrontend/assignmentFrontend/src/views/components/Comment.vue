<template>
    <div class="card">
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>{{comment_text}}</p>
          </blockquote>
        </div>
        <div class="card-footer text-muted">
            Posted on: {{date_published}}
          </div>
      </div>
    

    <div v-if="error" class="container alert alert-warning alert-dismissible fade show"
 role="alert">
        {{error}}
        
      </div>
    
</template>
<script>
import {
    commentService
} from '../../services/comments.service';

export default {
    data() {
        return {
            error: "",
            success: "",
            token: localStorage.getItem("session_token")
        }
    },
    props: {
        comment_text: String,
        date_published: String,
        comment_id: Number
    },
    methods: {
        deleteComment(comment_id) {
            commentService.deleteComment(comment_id, this.token)
                .catch(error => this.error = error)

        }
    }
}
</script>
