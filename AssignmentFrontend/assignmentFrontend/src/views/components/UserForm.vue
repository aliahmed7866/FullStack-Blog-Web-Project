<template>
    <form class="container"  @submit.prevent="handleSubmit">
        <label class="form-label" for="firstName" >Forename:</label>
        <input class="form-control" name="firstName" v-model="forename">
        <div v-show="(submitted && !forename)" class="text-danger">Forename is required!</div>
        <br/>
        <br/>
        <label class="form-label" for="lastName" >Surname:</label>
        <input class="form-control" name="lastName" v-model="surname">
        <div v-show="(submitted && !surname)" class="text-danger">Surname is required!</div>
        <br/>
        <br/>
        <label class="form-label" for="email" >Email:</label>
        <input class="form-control" name="email" v-model="email">
        <div v-show="(submitted && !surname)" class="text-danger">Surname is required!</div>
        <br/>
        <br/>
        <label class="form-label" for="password" >Password:</label>
        <input class="form-control" name="password" v-model="password">
        
        <div v-show="submitted && !password" class="text-danger">Password is required!</div>
        <br/>
        <br/>
        <button  class="btn btn-success" type="submit">Create User</button>
    <br/><br/><div  v-if="error" class="container alert alert-warning alert-dismissible fade show"
 role="alert">

{{error}}
  
</div>
<div v-if="success" class="alert alert-success alert-dismissible fade show" role="alert">
    {{success}}
      
    </div>
    </form>
</template>
<script>
import * as validator from 'email-validator';
import {
    userService
} from '../../services/user.service';
export default ({
    data() {
        return {
            forename: "",
            surname: "",
            email: "",
            password: "",
            newUserId: null,
            submitted: false,
            user_id: localStorage.getItem("user_id"),
            token: localStorage.getItem("session_token"),
            error: "",
            success: ""
        }
    },
    methods: {
        handleSubmit(e) {
            if (this.token && this.user_id == 1) {
                this.submitted = true;
                this.error = ""
                this.success = ""
                const {
                    email,
                    password,
                    forename,
                    surname
                } = this
                if (!(email || password || forename || surname)) {
                    this.error = "Please fill all the fields!"
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

                userService.createUser(this.forename, this.surname, this.email, this.password, this.token)
                    .then(userId => {
                        this.newUserId = userId
                        this.success = "User has been created successfully!"
                        this.forceRenderer();
                    })
                    .catch(error => this.error = error)

            } else {
                this.error = "You do not have the permission to access this section!"
            }

        }

    },
    props: ['forceRenderer']
})
</script>
