<template>
    <div class="container">
    <div class="round padding" style="background-color:rgba(38, 38, 38,0.5);">
        <h3>Your Articles: </h3>
    <div  v-if="articles.length">
        <ul v-for="article in articles" :key="article.article_id">
            
        
          <div class="row">
            <div class="col">
             
                <div class="card card-body">
                 <h5 class="cart-title">{{article.title + ' By ' +article.author}}</h5>
                  <router-link :to="'/article/'+article.article_id" class="btn btn-success"> Go to article</router-link>
           
              </div>
            </div>
            <br/>
            </div>
<br/>
              <button  class="btn btn-success" v-on:click="getCurrentArticleInfo(article.article_id)" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit </button>
   <br/>
   <div v-if="error" class="container alert alert-warning alert-dismissible fade show"
   role="alert">
                 {{error}}
                  
                </div>
          </ul>
          
          <div  v-if="editMode" class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class=" modal-title fs-5" id="staticBackdropLabel">Editing panel</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <form class="container"  @submit.prevent="updateArticle">
                        <label class="form-label" for="articleAuthor" >Article Author:</label>
                        <input class="form-control" name="articleAuthor" v-model="newAuthor" >
                        <br/>
                        <br/>
                        <label class="form-label" for="articleTitle" >Article Title:</label>
                        <input class="form-control" name="articleTitle" v-model="newTitle">
                        <br/>
                        <br/>
                        <label class="form-label" for="articleText" >Article Text:</label>
                        <textarea   class="form-control" id="exampleFormControlTextarea1" rows="3" name="articleText" v-model="newArticle_text"></textarea>
                        <br/>
                        <button  class="btn btn-success" type="submit" data-bs-dismiss=modal>Update Article</button>
                    
                    </form>
                    <br/>
                    <form class="container"  @submit.prevent="deleteArticle(articleTobeEdited)">
                        <button type="submit" class="btn btn-warning text-danger" data-bs-dismiss="modal">Delete</button>
                      </form>
                  </div>
                  <br/>
                  <div v-if="error" class="container alert alert-warning alert-dismissible fade show"
 role="alert">
                   {{error}}
                    
                  </div>
                </div>
            
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
        
    </div>
    <div v-else>
        <h6> You have not posted any articles yet!</h6>
    </div>
</div>
</div>
</template>
<script>
import {
    articleService
} from '../../services/article.service'

export default {
    data() {
        return {
            error: "",
            success: "",
            articleTobeEdited: null,
            articles: {},
            token: localStorage.getItem("session_token"),
            user_id: localStorage.getItem("user_id"),
            newAuthor: "",
            newTitle: "",
            newArticle_text: "",
            editMode: false,
            componentKey: 0
        }
    },
    methods: {

        deleteArticle(article_id) {
            articleService.deleteArticle(article_id, this.token)
                .then(() => {
                    this.forceRenderer()
                    this.editMode = false;
                })
                .catch(error => this.error = error)
        },

        getCurrentArticleInfo(article_id) {
            this.editMode = true;
            articleService.getOne(article_id)
                .then(article => {
                    this.newAuthor = article.author
                    this.newArticle_text = article.article_text
                    this.newTitle = article.title
                    this.articleTobeEdited = article.article_id

                })
                .catch(error => this.error = error)
        },
        updateArticle(e) {

            const article = {
                author: this.newAuthor,
                title: this.newTitle,
                article_text: this.newArticle_text
            }

            articleService.updateArticle(this.articleTobeEdited, article, this.token)
                .then(() => {
                    this.forceRenderer()
                })
                .catch(error => this.error = error)
            this.editMode = false;
        }
    },
    mounted() {
        if (this.token) {
            articleService.getArticlesByUser(this.user_id)
                .then(articles => {
                    this.articles = articles
                })
                .catch(error => this.error = error)
        }
    },
    props: ['forceRenderer']
}
</script>