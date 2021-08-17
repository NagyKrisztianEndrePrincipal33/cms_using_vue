<template src="./Table.html"> </template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import db from "../../database/database";
export default {
  name: "Table",
  data() {
    return {
      employees: [],
      firstNameSorted: null,
      lastNameSorted: null,
      emailSorted: null,
      sexSorted: null,
      birthDateSorted: null,
    };
  },
  async created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      let querrySnaphsot = await db.collection("employees").get();
      querrySnaphsot.forEach((doc) => {
        let temp = {};
        temp.id = doc.id;
        temp.value = doc.data();
        this.employees.push(temp);
      });
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
        if (a.value.firstName < b.value.firstName) {
          return modifier * 1;
        } else {
          return modifier * -1;
        }
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
        if (a.value.lastName < b.value.lastName) {
          return modifier * 1;
        } else {
          return modifier * -1;
        }
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
        if (a.value.email < b.value.email) {
          return modifier * 1;
        } else {
          return modifier * -1;
        }
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
        if (a.value.sex < b.value.sex) {
          return modifier * 1;
        } else {
          return modifier * -1;
        }
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
      //TODO: Sorting with moment
      this.employees.sort((a, b) => {
          console.log(a.value);
        if (a.value.dateOfBirth < b.value.dateOfBirth) {
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
