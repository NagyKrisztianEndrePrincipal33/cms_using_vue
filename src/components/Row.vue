<template>
  <teleport to="#app">
    <div v-if="showQuestionWindow" class="question-modal">
      <p>Do you really want to delete this employee?</p>
      <p>
        Email: <b>{{ employee.value.email }}</b>
      </p>
      <div class="modal-buttons">
        <button @click="unShowModal" class="btn btn-cancel">Cancel</button>
        <button @click="deleteEmployee" class="btn btn-yes">Yes</button>
      </div>
    </div>
  </teleport>
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
    <td>{{ formatedDate }}</td>
    <td class="action-buttons">
      <button @click="editEmployee" class="btn-edit">
        <i class="fas fa-user-edit"></i>
      </button>
      <button class="btn-delete" @click="showModal">
        <i class="fas fa-user-times"></i>
      </button>
    </td>
  </tr>
</template>

<script>
import db from "../database/database";
import moment from "moment";

moment.locale("ro");

export default {
  name: "Row",
  emits: ["edit-employee", "delete-employee"],
  data() {
    return {
      defaultImage:
        "https://th.bing.com/th/id/R.3767af5c322c568ff03e7ce15f627279?rik=qdJkz%2fubzVeGLw&pid=ImgRaw&r=0",
      showQuestionWindow: false,
      formatedDate:"",
    };
  },
  beforeMount(){
    this.formatedDate = moment(this.employee.value.dateOfBirth).format('LL');
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
    showModal() {
      this.showQuestionWindow = true;
    },
    unShowModal() {
      this.showQuestionWindow = false;
    },
    async deleteEmployee() {
      try {
        await db
          .collection("employees")
          .doc(this.employee.id)
          .delete();
        this.unShowModal();
        this.$emit("delete-employee", this.employee);
      } catch (error) {
        console.log(error);
      }
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

.action-buttons {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.btn-edit {
  border: none;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba($color: #000000, $alpha: 0.5);
  background-color: rgb(17, 42, 121);
  i {
    color: white;
  }
}

.btn-edit:hover {
  background-color: #15172b;
}

.btn-delete {
  border: none;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba($color: #000000, $alpha: 0.5);
  background-color: orangered;
  i {
    color: white;
  }
}

.btn-delete:hover {
  background-color: red;
}

.question-modal {
  background-color: orangered;
  border-radius: 25px;
  position: fixed;
  padding: 15px;
  top: 5%;
  right: 50%;
  transform: translateX(50%);
  p {
    color: white;
    font-size: 1.5rem;
    cursor: default;
  }
}

.modal-buttons {
  display: flex;
  justify-content: space-evenly;
  margin-top: 1.5rem;
  .btn {
    min-width: 25%;
    border: none;
    border-radius: 25px;
    background-color: white;
    font-size: 1.5rem;
    box-shadow: 1px 1px 10px rgba($color: #000000, $alpha: 0.5);
  }

  .btn-cancel {
    color: red;
  }
}
</style>
