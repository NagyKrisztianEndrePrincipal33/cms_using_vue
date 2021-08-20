<template src="./Table.html"> </template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import db from "../../database/database";
import Row from "../Row.vue";
import Form from "../Form.vue";
import moment from "moment";
export default {
  name: "Table",
  components: {
    Row,
    Form,
  },
  data() {
    return {
      employees: [],
      firstNameSorted: null,
      lastNameSorted: null,
      emailSorted: null,
      sexSorted: null,
      birthDateSorted: null,
      formIsVisible: false,
      editFormIsVisible: false,
      seditEmployee: null,
      searchText: "",
      backupData: [],
    };
  },
  async created() {
    await this.fetchData();
    this.backupData = this.employees;
  },
  watch: {
    searchText(value) {
      if(value.length>=3){
      this.employees = this.backupData;
      let tempData = this.employees;
      let filteredData = [];
      for (let x of tempData) {
        let tempText = x.value;
        if (
          tempText.email.includes(value) ||
          tempText.firstName.includes(value) ||
          tempText.lastName.includes(value)
        ) {
          filteredData.push(x);
        }
      }
      this.employees = filteredData;
      }
      else{
        this.employees = this.backupData;
      }
    },
  },
  methods: {
    editEmployeeBack(employee) {
      let tempObj = {
        id: employee.id,
        value: {
          firstName: employee.firstName,
          lastName: employee.lastName,
          sex: employee.sex,
          dateOfBirth: employee.dateOfBirth,
          profileImage: employee.profileImage,
          email: employee.email,
        },
      };
      let index = this.employees.findIndex(
        (employee) => employee.id === tempObj.id
      );
      let index2 =  this.backupData.findIndex((employee) => employee.id === tempObj.id);
      this.backupData[index2] = tempObj;
      this.employees[index] = tempObj;
    },
    deleteEmployee(employee) {
      let index = this.employees.findIndex(
        (oemployee) => oemployee.id === employee.id
      );
      this.employees.splice(index, 1);
      let index2 = this.backupData.findIndex(
        (oemployee) => oemployee.id === employee.id
      );
      this.backupData.splice(index2,1);
    },
    editEmployee(employee) {
      this.seditEmployee = employee;
      this.editFormIsVisible = true;
    },
    async fetchData() {
      let querrySnaphsot = await db.collection("employees").get();
      querrySnaphsot.forEach((doc) => {
        let temp = {};
        temp.id = doc.id;
        temp.value = doc.data();
        this.employees.push(temp);
      });
    },
    showForm() {
      this.formIsVisible = true;
    },
    closeForm() {
      this.formIsVisible = false;
      this.editFormIsVisible = false;
    },
    newEmployee(data) {
      let temp = {};
      temp.id = data.id;
      temp.value = data;
      this.backupData.push(temp);
      if(this.searchText.length>3){
        let temp2 = Object.assign({},temp);
        this.employees.push(temp2);
      }
    },
    sortByFirstname() {
      let modifier = 1;
      if (!this.firstNameSorted) {
        this.firstNameSorted = "Asc";
      } else {
        if (this.firstNameSorted === "Asc") {
          modifier = -1;
          this.firstNameSorted = "Desc";
        } else {
          modifier = 1;
          this.firstNameSorted = "Asc";
        }
      }
      this.employees.sort((a, b) => {
        return modifier * a.value.firstName.localeCompare(b.value.firstName);
      });
    },
    sortByLastname() {
      let modifier = 1;
      if (!this.lastNameSorted) {
        this.lastNameSorted = "Asc";
      } else {
        if (this.lastNameSorted === "Asc") {
          modifier = -1;
          this.lastNameSorted = "Desc";
        } else {
          modifier = 1;
          this.lastNameSorted = "Asc";
        }
      }
      this.employees.sort((a, b) => {
        return modifier * a.value.lastName.localeCompare(b.value.lastName);
      });
    },
    sortByEmail() {
      let modifier = 1;
      if (!this.emailSorted) {
        this.emailSorted = "Asc";
      } else {
        if (this.emailSorted === "Asc") {
          modifier = -1;
          this.emailSorted = "Desc";
        } else {
          modifier = 1;
          this.emailSorted = "Asc";
        }
      }
      this.employees.sort((a, b) => {
        return modifier * a.value.email.localeCompare(b.value.email);
      });
    },
    sortBySex() {
      let modifier = 1;
      if (!this.sexSorted) {
        this.sexSorted = "Asc";
      } else {
        if (this.sexSorted === "Asc") {
          modifier = -1;
          this.sexSorted = "Desc";
        } else {
          modifier = 1;
          this.sexSorted = "Asc";
        }
      }
      this.employees.sort((a, b) => {
        return modifier * a.value.sex.localeCompare(b.value.sex);
      });
    },
    sortByBirthDate() {
      let modifier = 1;
      if (!this.birthDateSorted) {
        this.birthDateSorted = "Asc";
      } else {
        if (this.birthDateSorted === "Asc") {
          modifier = -1;
          this.birthDateSorted = "Desc";
        } else {
          modifier = 1;
          this.birthDateSorted = "Asc";
        }
      }
      this.employees.sort((a, b) => {
        if (moment(a.value.dateOfBirth).isAfter(b.value.dateOfBirth)) {
          return modifier * 1;
        } else {
          return modifier * -1;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss" src="./Table.scss"></style>
