<template>
    <div v-if="loading">
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    <table class="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Forename</th>
            <th scope="col">Surname</th>
          </tr>
        </thead>
        <tbody v-if="users.length">
          <tr  v-for="user in users" :key="user.user_id">
            <th scope="row">{{user.user_id}}</th>
            <td>{{user.first_name }}</td>
            <td>{{user.last_name}}</td>
          </tr>
        </tbody>
    </table>
<br/><br/><div  v-if="error" class="container alert alert-warning alert-dismissible fade show"
 role="alert">
       {{error}}
        
      </div>
</template>
<script>
import {
    userService
} from '../../services/user.service';
export default {
    data() {
        return {
            loading: true,
            error: "",
            success: "",
            users: {},
            token: localStorage.getItem("session_token"),
            user_id: localStorage.getItem("user_id")
        }
    },
    mounted() {
        if (this.token && this.user_id == 1) {
            userService.getAllUsers()
                .then(users => {
                    this.users = users
                    this.loading = false
                })
                .catch(error => this.error = error)

        } else {
            this.loading = false
            this.error = "You do not have the pemission to access this content!"
        }
    },
}
</script>