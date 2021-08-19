<template>
  <Form v-show="formIsVisible" @close-form="closeForm" @add-new-employee="newEmployee"></Form>
  <Table></Table>
  <button @click="showForm">Add new employee</button>
</template>

<script>
import Form from "./components/Form.vue";
import Table from './components/Table/Table.vue';

export default {
  name: 'App',
  components: {
    Form,
    Table
  },
  data(){
    return{
      formIsVisible:false,
    }
  },
  methods:{
    showForm(){
      this.formIsVisible=true;
    },
    closeForm(){
      this.formIsVisible = false;
    },
    newEmployee(data){
      console.log(data);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
