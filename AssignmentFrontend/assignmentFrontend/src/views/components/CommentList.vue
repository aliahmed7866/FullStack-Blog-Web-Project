<template>
    <br/>
    <div class="container">
            <h4>Comments ( {{comments.length}} ):</h4>
          <div v-for="(comment,index) in comments">
            <Comment  :key="index"
            :comment_text="comment.comment_text"
            :date_published="comment.date_published"
            :comment_id="comment.comment_id"/>
            <form class="container"  @submit.prevent="deleteComment(comment.comment_id)">
            <button  class="btn btn-warning text-danger" type="submit">Delete</button>
            <br/>
            <br/>
            </form>
        </div>
        <br/>
        <div v-if="error" class="container alert alert-warning alert-dismissible fade show"
 role="alert">
            {{error}}
            
          </div>
      
    </div>
  
    
</template>
<script>
import {
    commentService
} from "../../services/comments.service"
import Comment from "./Comment.vue"
export default {

    data() {
        return {
            token: localStorage.getItem("session_token"),
            comments: {},
            article_id: this.$route.params.id,
            error: ""
        }
    },
    mounted() {

        commentService.getAllComments(this.article_id)
            .then(comments => {
                this.comments = comments;
            })
            .catch(error => this.error = error)
    },
    methods: {


        deleteComment(comment_id) {
            this.error = ""
            this.success = ""
            commentService.deleteComment(comment_id, this.token)
                .then(() => {
                    this.forceRenderer()
                })
                .catch(error => this.error = error)


        }

    },

    components: {
        Comment
    },
    props: ['forceRenderer']
}
</script>
