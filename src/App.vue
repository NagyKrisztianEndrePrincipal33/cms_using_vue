<template>
  <Form></Form>
  <Table></Table>
</template>

<script>
import Form from "./components/Form";
import Table from './components/Table/Table.vue';

export default {
  name: 'App',
  components: {
    Form,
    Table
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
