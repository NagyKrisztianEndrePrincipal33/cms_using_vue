<template>
  <Table></Table>
  
</template>

<script>
import Table from './components/Table/Table.vue';

export default {
  name: 'App',
  components: {
    Table
  },
  data(){
    return{
      formIsVisible:false,
    }
  },
  methods:{
    
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
