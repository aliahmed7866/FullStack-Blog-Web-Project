

<template>
    <div>
<br/>
 <h1 class=" text-center padding "> Welcome to my blog!</h1>


    <div v-if="loading">
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class=" visually-hidden">Loading...</span>
        </div>
      </div>
    </div>

 
    </div>
    <div v-if="articles.length" class="container-fluid">
      <ul v-for="article in articles" :key="article.article_id" >
       <hr/>
          <h6 class=" text-center"><b><i>{{article.title + ' By ' +article.author}} </i></b></h6>
          <hr/>
        <div class="row">
          <div class="col">
           
              <div class="card card-body">
                {{article.article_text}}
                <br/>
                <br/>
                <router-link :to="'/article/'+article.article_id" class="btn btn-success"> Go to article</router-link>
         
            </div>
          </div>
          </div>
      </ul>
    </div>
    <div v-if="error" class="container alert alert-warning alert-dismissible fade show"
 role="alert">
      {{error}}
  
      </div>

  </template>
  <script>
import {
    articleService
} from '../../services/article.service';
export default {
    data() {
        return {
            articles: [],
            error: "",
            success: "",
            loading: true
        }
    },
    mounted() {
        articleService.getAll()
            .then(articles => {
                this.articles = articles
                this.loading = false
            })
            .catch(error => this.error = error)
    }
}
  </script>
  <style scoped>
  </style>