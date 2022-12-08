<template>
    <div  class="container" >
    <form @submit.prevent="handleSubmit">
        <label class="form-label" for="articleAuthor" >Article Author:</label>
        <input class="form-control" name="articleAuthor" v-model="author">
        <br/>
        <br/>
        <label class="form-label" for="articleTitle" >Article Title:</label>
        <input class="form-control" name="articleTitle" v-model="title">
        <br/>
        <br/>
        <label class="form-label" for="articleText" >Article Text:</label>
        <textarea  class="form-control" id="exampleFormControlTextarea1" rows="3" name="articleText" v-model="article_text"></textarea>
        <br/>
        <button  class="btn btn-success" type="submit">Post Article</button>
    </form>
    <br/>
  <form @submit.prevent="addToDrafts" >
    
    <button class="btn btn-success"  type="submit">Add to Drafts</button>
  </form>
    <br/>
    <div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
        {{success}}
          
        </div>
   
    <div v-else-if="error"  class="alert alert-warning  " role="alert">
      {{error}}
   
      </div>

      </div>
      
</template>
<script>

import {
    articleService
} from '../../services/article.service'
export default ({
    data() {
        return {
            error: "",
            success: "",
            article_text: "",
            title: "",
            author: "",
            token: localStorage.getItem("session_token"),
            singleDraft: [],
            drafts: JSON.parse(localStorage.getItem("drafts"))

        }
    },
    methods: {
        handleSubmit(e) {
            this.submitted = true
            this.error = ""
            this.success = ""
            const {
                author,
                title,
                article_text
            } = this
            if (author === "" || title === "" || article_text === "") {
                this.error = "Please fill all the fields!"
                return;
            }
            articleService.addArticle(this.author, this.title, this.article_text, this.token)
                .then(resp => {
                    this.response = resp
                    this.author = ""
                    this.article_text = ""
                    this.title = ""
                    this.success = "Article has been posted!"
                    this.forceRenderer()
                })
                .catch(error => this.error = error)

        },
        addToDrafts() {
            this.error = ""
            this.success = ""
            const {
                author,
                title,
                article_text
            } = this
            if (author === "" || title === "" || article_text === "") {
                this.error = "Please fill all the fields!"
                return;
            }
            this.singleDraft = {
                author: this.author,
                title: this.title,
                article_text: this.article_text
            }
            let drafts = JSON.parse(localStorage.getItem("drafts"))
            drafts.push(this.singleDraft)
            localStorage.setItem("drafts", JSON.stringify(drafts))
            this.author = ""
            this.article_text = ""
            this.title = ""
            this.success = "Draft has been saved!";
            this.forceUpdater();
        }

    },
    props: ['forceRenderer', 'forceUpdater']
})
</script>
