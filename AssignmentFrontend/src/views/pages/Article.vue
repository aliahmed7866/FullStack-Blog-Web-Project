<template>
<div class="container">
    <br/>
    <br/>
    <hr/>
<h1 class="text-center">{{article.title}}</h1>
<hr/>
<div class="card">
  <div class="card-body"> 
    <i class=" btn btn-outline-dark bi bi-zoom-in" v-on:click="increaseFont" ></i>
    <i class=" btn btn-outline-dark bi bi-zoom-out" v-on:click="decreaseFont"></i>
<h6 class="text-center" :style="{'font-size':fontSize+'pt'}"><b>Author:</b> {{article.author}}</h6>
<h6 class="text-center" :style="{'font-size':fontSize+'pt'}"><b>Published:</b> {{article.date_published}}</h6>
<p :style="{'font-size':fontSize+'pt'}">{{article.article_text}}</p>
</div> 

<br/>
<div v-if="error" class="container alert alert-warning alert-dismissible fade show"
 role="alert">
    {{error}}
    
  </div>
</div>
<div>
  <CommentForm/>
</div>
 </div>
</template>
<script>
import CommentForm from '../components/CommentForm.vue';
import {
    articleService
} from '../../services/article.service';
import { pauseTracking } from '@vue/reactivity';
export default {
    data() {
        return {
            article_id: this.$route.params.id,
            article: {},
            num_comments: null,
            comments: {},
            error: "",
            success: "",
            fontSize:14
        }
    },
    methods: {
        increaseFont(){
            if(this.fontSize<=38){
            this.fontSize++
            }
        },
        decreaseFont(){
            if(this.fontSize>=12){
            this.fontSize--
        }
    }

    },
    mounted() {
        articleService.getOne(this.article_id)
            .then(article => {
                this.article = article;

            })

            .catch(error => this.error = error)
    },
    components: {
        CommentForm
    }
}
</script>