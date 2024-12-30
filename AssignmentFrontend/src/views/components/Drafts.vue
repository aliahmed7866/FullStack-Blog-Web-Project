<template>
    <div class="container">
    <div class="round padding" style="background-color:rgba(38, 38, 38,0.5);">
        <h3>Your Drafts: </h3>
    <div  v-if="articles.length">
        <ul v-for="(article,index) in articles" :key="index">
          <div class="row">
            <div class="col">
             
                <div class="card card-body">
                 <h5 class="cart-title">{{article.title + ' By ' +article.author}}</h5>
           
              </div>
            </div>
            <br/>
            
            </div>

             <br/>
            <button  class="btn btn-success" v-on:click="getCurrentArticleInfo(index)" data-bs-toggle="modal" data-bs-target="#staticBackdropdraft">Edit </button>
              <br/>
            <div v-if="error" class="container alert alert-warning alert-dismissible fade show"
              role="alert">
                            {{error}}
                             
                           </div>
          </ul>
          
          <div  v-if="editModeDraft" class="modal fade" id="staticBackdropdraft" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropDraftLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class=" modal-title fs-5" id="staticBackdropDraftLabel">Draft Editing Panel</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>
                        <form class="container"  @submit.prevent="updateDraft">
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
                        <button  class="btn btn-success" type="submit" data-bs-dismiss="modal">Update Draft</button>
                    
                    </form>
                    <br/>
                    
                    <form class="container"  @submit.prevent="postDraft">
                    <button  class="btn btn-success" data-bs-dismiss="modal">Post draft</button>
                    </form>
                    <br/>
                    <form class="container"  @submit.prevent="deleteDraft">
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
        <h6> You have not saved any draft articles yet!</h6>
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
            submitted: false,
            articleTobeEdited: null,
            articles: JSON.parse(localStorage.getItem("drafts")),
            token: localStorage.getItem("session_token"),
            user_id: localStorage.getItem("user_id"),
            newAuthor: "",
            newTitle: "",
            newArticle_text: "",
            editModeDraft: false,
            componentKey: 0,
            articleIndex: null
        }
    },
    methods: {

        deleteDraft() {
            this.articles.splice(this.articleIndex, 1)
            localStorage.setItem("drafts", JSON.stringify(this.articles))
            this.forceRenderer();

        },

        getCurrentArticleInfo(index) {
            this.editModeDraft = true;
            this.articleIndex = index;
            this.articleTobeEdited = this.articles[index]
            this.newAuthor = this.articleTobeEdited.author
            this.newArticle_text = this.articleTobeEdited.article_text
            this.newTitle = this.articleTobeEdited.title

        },
        updateDraft() {

            const article = {
                author: this.newAuthor,
                title: this.newTitle,
                article_text: this.newArticle_text
            }
            this.articles[this.articleIndex] = article
            localStorage.setItem("drafts", JSON.stringify(this.articles))
            this.forceRenderer();

        },
        postDraft(e) {
            this.submitted = true
            this.error = ""

            if (!(this.newAuthor || this.newTitle || this.newArticle_text)) {
                this.error = "Please fill all the fields!"
                return;
            }
            articleService.addArticle(this.newAuthor, this.newTitle, this.newArticle_text, this.token)
                .then(resp => {
                    this.response = resp
                    this.forceUpdater()
                    this.deleteDraft()

                })
                .catch(error => this.error = error)
        }
    },
    mounted() {

    },
    props: ['forceRenderer', 'forceUpdater']
}
</script>