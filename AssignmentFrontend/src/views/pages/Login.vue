<template>
    <div class="container">
        <br/>
        <div class="card">
        <h1 class=" text-center padding card-header">Login</h1>
        <div class="card-body" >
        <form class="container"  @submit.prevent="handleSubmit">
            <label class="form-label" for="email">Email:</label>
            <input class="form-control" name="email" v-model="email"/>
            <div v-show="submitted && !email" class="text-danger">Email is required!</div>

      <br/>
    <br/>
    <label class="form-label" for="password">Password:</label>
            <input class="form-control" type="password" name="password" v-model="password"/>
            <div v-show="submitted && !password" class="text-danger">Password is required!</div>
            <br/>
    <br/>
    <button  class="btn btn-success" >Login</button>
<br/>


        </form>
    </div>
    </div>
        <br/>
<div  v-if="error" class="container alert alert-warning alert-dismissible fade show"
 role="alert">

{{error}}
<div v-if="redirecting" class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  
</div>
    </div>
</template>
<script>
import * as validator from 'email-validator';
import {
    userService
} from '../../services/user.service';
export default {

    data() {
        return {
            email: "",
            password: "",
            submitted: false,
            error: "",
            success: "",
            token:localStorage.getItem("session_token"),
            redirecting:false
        }
    },
    methods: {
        async handleSubmit(e) {
            if(this.token){
                this.redirecting=true
                this.error="You are already logged in - Dont worry, We will redirect you to the right place! "
                await new Promise(resolve => setTimeout(resolve, 2000)); 
                this.$router.push('/dashboard')
                return;
            }
            this.submitted = true
            this.error = ""
            const {
                email,
                password
            } = this
            if (!(email && password)) {
                return;
            }
            if (!(validator.validate(email))) {
                this.error = "Email must be a valid email"
                this.email = ""
                this.submitted = false
                return;
            }
            const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/

            if (!(password_pattern.test(password))) {
                this.error = "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character "
                this.password = ""
                this.submitted = false
                return;

            }
            userService.login(this.email, this.password)
                .then(() => {
                    this.$router.push('/dashboard')
                })
                .catch(error => this.error = error)
            this.email = ""
            this.password = ""
            this.submitted = false


        }

    },
    mounted(){
 
}
}
</script>