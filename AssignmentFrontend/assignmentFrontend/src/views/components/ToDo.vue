<template>
    <div>
        <h1>To-Do</h1>
        <form class="container"  @submit.prevent="addItem">
            <label class="form-label" for="taskInput">Task:</label>
            <input class="form-control" name="taskInput" v-model="task"/>
    <br/>
    <br/>
    
    <input class="form-control" name="editTaskInput" v-show="editable" v-model="editTask"/>
    <br/>
    <br/>
    <button>Add</button>
  
        </form>
        <ul>
            <li  v-for="(item,index) in taskList" :key="index" >{{item}}  <button  class="btn btn-success" v-on:click="edit(index)">EDIT</button> <button  class="btn btn-success" v-on:click="deleteItem(index)">Delete</button></li>
        </ul>
        <div v-if="error" class="container alert alert-warning alert-dismissible fade show"
 role="alert">
            {{error}}
            
          </div>
    </div>



</template>
<script>
export default {

data() {
    return {
        task: "",
        taskList: [],
        error:"" , success:"",
        editTask: "",
        editable: false
    }
},
methods: {
    addItem(e) {
        if (this.task !== "") {
            this.error = ""
            this.taskList.push(this.task);
        } else {
            this.error = "The task cannot be empty, please enter something!"
        }
    },
    deleteItem(index) {
        if (this.taskList[index] !== "") {
            this.error = ""
            delete this.taskList[index];
        } else {
            this.error = "The task cannot be empty, please enter something!"
        }
    },
    edit(index) {
        if (this.taskList[index] !== "") {
            this.editable = true;
            this.error = ""
            this.taskList[index] = this.editTask;

        } else {
            this.error = "The task cannot be empty, please enter something!"
        }
        this.editable = false;
    }
}
}

</script>