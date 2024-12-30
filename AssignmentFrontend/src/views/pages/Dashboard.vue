<template>
<br/>
<br/>
<div class="container">
    <h1 class="  text-center padding"> Welcome to your dashboard,<span style="color:teal;"> {{" "+first_name}}</span>  </h1>
    <div class="container">
<div class="container-fluid">
    <div class="row" >
        <div class=" card col-sm d-flex justify-content-center">

        <img src="../../assets/userLogo.png" class="card-img-top" style="width:50%; margin:auto;" alt="User logo">
        <div class="card-body">
          <h5 class="card-title">About me:</h5>
       
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><b>Name:</b>  {{first_name +" "+ last_name}}</li>
          <li class="list-group-item"><b>Email: </b> {{email}}</li>
        </ul>
   <br/>
        <div v-if="error" class="container alert alert-warning alert-dismissible fade show"
 role="alert">
            {{error}}
            
          </div>
      </div>
    </div>
    <div class="col-sm d-flex justify-content-center card">
        <div class="card-body">
            <h5 class="card-title">Add Article:</h5>
            <br/>
        <ArticleForm  :forceRenderer="forceRenderUserArticlesOnAdd" :forceUpdater="forceRenderUserDraftsOnChange"/>
        </div>
    </div>

    </div>

    </div>
  </div>
    
    <div class="container-fluid">
        <div class="row">
   
        <ArticleByUser :key="componentKeyOnChange"  :forceRenderer="forceRenderUserArticlesOnChange"/>
    </div>
    </div>

    <div class="container-fluid">
        <div class="row">
   
        <Drafts :key="componentKeyOnDraftChange"  :forceRenderer="forceRenderUserDraftsOnChange" :forceUpdater="forceRenderUserArticlesOnChange"/>
    </div>
</div>
<br/>
<br/>
        <div class="container" >
            <h3>User Management:</h3>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm d-flex justify-content-center card">
                    <div class="card-body">
                    <h5 class=" card-title">Add User:</h5>
                    <br/>
                    <UserForm :forceRenderer="forceRenderAllUsers"/>
                </div>
            </div>
            <div class="col-sm d-flex justify-content-center card">
                <div class="card-body">
                <h5 class="card-title">User List:</h5>
                <br/>
        <AllUsers :key="componentKeyAllUsers" />
        </div>
            </div>
        
            </div>
            </div>
            
</div>
<button  class="btn btn-danger" v-on:click="logout">Logout</button>
<br/>
<br/>
</div>

</template>
<script>
import {
    userService
} from '../../services/user.service';

import ArticleForm from '../components/ArticleForm.vue';
import UserForm from '../components/UserForm.vue';
import AllUsers from '../components/AllUsers.vue';
import Drafts from '../components/Drafts.vue'
import ArticleByUser from '../components/ArticleByUser.vue'
export default {
    data() {
        return {
            first_name: "",
            last_name: "",
            email: "",
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
            isAdmin: false,
            componentKeyAddArticle: 0,
            componentKeyAllUsers: 0,
            componentKeyOnChange: 0,
            componentKeyOnDraftChange: 0
        }
    },
    methods: {
        forceRenderUserDraftsOnChange() {
            this.componentKeyOnDraftChange += 1

        },
        forceRenderUserArticlesOnAdd() {
            this.componentKeyAddArticle += 1
            this.componentKeyOnChange += 1
        },
        forceRenderAllUsers() {
            this.componentKeyAllUsers += 1
        },
        forceRenderUserArticlesOnChange() {
            this.componentKeyOnChange += 1
        },
        logout() {
            userService.logout()
                .then(this.$router.push('/'))
                .catch(error => this.error = error)


        }

    },
    mounted() {
        if (this.user_id == 1) {
            this.isAdmin = true;
        }

        if (localStorage.getItem("session_token")) {
            userService.getUser(this.user_id)
                .then(user => {

                    this.first_name = user.first_name
                    this.last_name = user.last_name
                    this.email = user.email
                })
                .catch(error => this.error = error)
        }
    },
    components: {
        ArticleForm,
        UserForm,
        AllUsers,
        ArticleByUser,
        Drafts
    }
}
</script>