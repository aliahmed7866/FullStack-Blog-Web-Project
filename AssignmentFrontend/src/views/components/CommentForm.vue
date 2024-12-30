<template>
    <div>
       
        <form class="container"  @submit.prevent="handleSubmit">
            <h4><label class="form-label" for="newComment">Comment:</label></h4>
            <input class="form-control" name="newComment" v-model="commentText"/>
            <div v-show="submitted && !commentText" class="text-danger">Comment is required!</div>

      <br/>
 
    <button type="submit" class="btn btn-success">Add comment</button>
<br/><br/><div  v-if="error" class="container alert alert-warning alert-dismissible fade show"
 role="alert">
{{error}}
  
</div>
<div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
    {{success}}
      
    </div>
    <br/>
        </form>
    </div>
    <CommentList :forceRenderer="forceRenderer" :key="componentKey" />
</template>
<script>
import CommentList from './CommentList.vue';
import {
    commentService
} from '../../services/comments.service';
export default {

    data() {
        return {
            componentKey: 0,
            article_id: this.$route.params.id,
            error: "",
            success: "",
            commentText: "",
            response: "",
            submitted: false

        }
    },


    methods: {
        forceRenderer() {
            this.componentKey += 1;
        },


        handleSubmit(e) {
            this.submitted = true
            this.error = ""
            const {
                commentText
            } = this
            if (!(commentText)) {
                return;
            }
            commentService.addComment(this.article_id, this.commentText)
                .then(resp => {
                    this.response = resp
                    this.success = "Comment has been posted !"
                    this.forceRenderer();
                })

                .catch(error => this.error = error)

        }

    },
    components: {
        CommentList
    }

}

</script>