<template>
        <tr>
            <th scope="row"><img class="circular-profile-image " :src="employee.value.profileImage!=='' ? employee.value.profileImage : defaultImage " width="25 " height="25 "></th>
            <td>{{employee.value.firstName}}</td>
            <td>{{employee.value.lastName}}</td>
            <td>{{employee.value.email}}</td>
            <td>{{employee.value.sex}}</td>
            <td>{{employee.value.dateOfBirth}}</td>
        </tr>
</template>

<script>
export default {
    name:"Row",
    data(){
        return{
            defaultImage:"https://th.bing.com/th/id/R.c7f96e6c1bc28aabc4586815ce30e2ae?rik=MWNj1NeNfEYWgQ&pid=ImgRaw&r=0"
        }
    },
    props:{
        employee:{
            type:Object,
            required:true,
            validator:function(value){
                if(!Object.keys(value).includes("id")||!Object.keys(value).includes("value")){
                    return false;
                }
                value=value.value;
                if(!Object.keys(value).includes("firstName")||!Object.keys(value).includes("lastName")||!Object.keys(value).includes("sex")||!Object.keys(value).includes("dateOfBirth")||!Object.keys(value).includes("email")){
                    return false;
                }
                return true;
            }
        }
    }
}
</script>

<style scoped lang="scss">
    .circular-profile-image {
    border-radius: 50%;
    object-fit: cover;
    }
</style>