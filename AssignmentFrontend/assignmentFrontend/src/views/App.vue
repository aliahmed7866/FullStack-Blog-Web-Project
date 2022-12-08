
<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <div class="container-fluid">
      <img class="navbar-brand" src="../assets/logo.png" style="width:70px">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
          <li class="nav-item padding-left ">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item padding-left">
            <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
          </li>
          <li class="nav-item padding-left" >
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item padding-left" >
<input type="color"  style=" outline:none; border:none; background:transparent; padding:0"  class=" form-control-color" id="exampleColorInput"  title="Choose your color" v-model="userColorSelection" v-on:change="updateBackground">
          </li>

      

</ul>
    </div>
    </div>
  </nav>

<router-view/>
  <div>
  

</div>
</template>
<script>
export default{
  data(){
    return{
      lightMode:true,
      darkMode:false,
      userColorSelection:"white"
    }
  },
methods:{
  updateBackground(){
    console.log(this.userColorSelection)
    document.body.style.backgroundColor = this.userColorSelection;
  }

},

}
</script>
<style>
.shadow{
  box-shadow: 2px 2px 4px 4px !important;
}
.padding-left{
  padding-left: 20px;
}
.padding{
  padding: 20px;
}

.round{
  border-radius: 6px;
}
ul{
  list-style-type: none;
  padding:0;
}

body{
  margin: 0%;
}
#app .nav-item{
  margin-left:10px;

}
hr{
  border: 2px solid;
}
#app .nav-item>a{
  color:white;
}
a{
  text-decoration: none;

}
label{
  font-weight: bold;
}
#app .nav-link:hover{
  color:rgb(102, 101, 101);
}
.container-fluid{
  margin-bottom: 20px;
}
.card{
  margin:1%;
  background-color:#f2f2f2;
}
.btn-success{
background-color:teal;
}
.pointer{
  cursor:pointer;
}

</style>
