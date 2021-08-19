<template>
  <tr>
    <th scope="row">
      <img
        class="circular-profile-image "
        :src="
          employee.value.profileImage !== null
            ? employee.value.profileImage
            : defaultImage
        "
        width="25 "
        height="25 "
      />
    </th>
    <td>{{ employee.value.firstName }}</td>
    <td>{{ employee.value.lastName }}</td>
    <td>{{ employee.value.email }}</td>
    <td>{{ employee.value.sex }}</td>
    <td>{{ employee.value.dateOfBirth }}</td>
    <td>
      <button @click="editEmployee" class="btn-edit">
        <i class="fas fa-user-edit"></i>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Row",
  emits: ["edit-employee"],
  data() {
    return {
      defaultImage:
        "https://th.bing.com/th/id/R.3767af5c322c568ff03e7ce15f627279?rik=qdJkz%2fubzVeGLw&pid=ImgRaw&r=0",
    };
  },
  props: {
    employee: {
      type: Object,
      required: true,
      validator: function(value) {
        if (
          !Object.keys(value).includes("id") ||
          !Object.keys(value).includes("value")
        ) {
          return false;
        }
        value = value.value;
        if (
          !Object.keys(value).includes("firstName") ||
          !Object.keys(value).includes("lastName") ||
          !Object.keys(value).includes("sex") ||
          !Object.keys(value).includes("dateOfBirth") ||
          !Object.keys(value).includes("email")
        ) {
          return false;
        }
        return true;
      },
    },
  },
  methods: {
    editEmployee() {
      this.$emit("edit-employee", this.employee);
    },
  },
};
</script>

<style scoped lang="scss">
.circular-profile-image {
  border-radius: 50%;
  object-fit: cover;
}
$fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
@import "~@fortawesome/fontawesome-free/scss/fontawesome";
@import "~@fortawesome/fontawesome-free/scss/solid"; // fas
@import "~@fortawesome/fontawesome-free/scss/regular"; // far
@import "~@fortawesome/fontawesome-free/scss/brands"; // fab
.btn-edit{
    border:none;
    border-radius: 10px;
    box-shadow:1px 1px 10px rgba($color: #000000, $alpha: 0.5);
}
</style>
