<template src="./Table.html">
    
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import db from "../../database/database";
export default {
    name:"Table",
    data(){
        return{
            employees:[],
        }
    },
    async created(){
        this.fetchData();
    },
    methods:{
        async fetchData(){
            let querrySnaphsot = await db.collection('employees').get();
            querrySnaphsot.forEach((doc)=>{
                let temp = {};
                    temp.id = doc.id;
                    temp.value = doc.data();
                    this.employees.push(temp);
            });

        }
    }
}
</script>

<style scoped lang="scss" src="./Table.scss">

</style>