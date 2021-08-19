<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            {{ formName }}
          </slot>
          <button type="button" class="btn-close" @click="closeForm">
            X
          </button>
        </header>
        <p v-if="msg !== ''">
          <b
            >Please correct the following error:
            <i v-text="msg" class="error-message"></i
          ></b>
        </p>
        <form @submit.prevent="submitForm" ref="theForm">
          <div class="form">
            <div class="row-2">
              <div class="input-field">
                <input
                  type="text"
                  v-model="firstName"
                  required
                  placeholder=" "
                />
                <label>Firstname</label>
              </div>
              <div class="input-field">
                <input
                  type="text"
                  v-model="lastName"
                  required
                  placeholder=" "
                />
                <label>Lastname</label>
              </div>
            </div>
            <div class="input-field">
              <input type="email" v-model="email" required placeholder=" " />
              <label>Email</label>
            </div>
            <div class="row-2">
              <div class="input-field with-select">
                <select v-model="sex" :required="true">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div class="input-field">
                <input
                  type="date"
                  v-model="dateOfBirth"
                  :max="maxDate"
                  required
                />
                <label>Birth day</label>
              </div>
            </div>
            <div class="image-part">
              <div v-if="url" id="preview">
                <img :src="url" width="45" height="45" />
              </div>
              <div class="input-field">
                <input type="file" accept="image/*" @change="changeFile" />
                <label>Profile Image</label>
              </div>
            </div>
            <button
              v-if="isEditForm"
              class="btn-subbmit btn-reset"
              @click.prevent="closeForm"
            >
              Cancel
            </button>
            <button
              v-else
              class="btn-subbmit btn-reset"
              @click.prevent="resetForm"
            >
              Reset
            </button>
            <button v-if="isEditForm" class="btn-subbmit">Edit</button>
            <button v-else class="btn-subbmit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>
<script>
import moment from "moment";
import db from "../database/database";
import storage from "../database/storage";
export default {
  name: "Form",
  emits: ["close-form", "add-new-employee","edit-employee"],
  props: {
    formType: {
      type: String,
      default() {
        return "New";
      },
    },
    employee: {
      type: Object,
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
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      isEditForm: false,
      formName: "",
      firstName: "",
      lastName: "",
      email: "",
      sex: "Male",
      dateOfBirth: "",
      maxDate: "",
      msg: "",
      emailRegex: null,
      url: null,
      file: null,
    };
  },
  watch: {},
  methods: {
    closeForm() {
      this.resetForm();
      this.$emit("close-form");
    },
    async submitForm() {
      let textRegex = /^[A-Za-z]+$/;
      if (!textRegex.test(this.firstName)) {
        this.msg = "The firstname should contain only alphanumeric characters!";
        setTimeout(
          function() {
            this.msg = "";
          }.bind(this),
          3000
        );
        return;
      }
      if (!textRegex.test(this.lastName)) {
        this.msg = "The lastName should contain only alphanumeric characters!";
        setTimeout(
          function() {
            this.msg = "";
          }.bind(this),
          3000
        );
        return;
      }
      const validRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!validRegex.test(this.email)) {
        this.msg = "The email should be a real email!";
        setTimeout(
          function() {
            this.msg = "";
          }.bind(this),
          3000
        );
        return;
      }
      if (!this.isEditForm) {
        const result = await db
          .collection("employees")
          .where("email", "==", this.email)
          .get();
        if (result.docs.length > 0) {
          this.msg = "There already is an employee with this email!";
          setTimeout(
            function() {
              this.msg = "";
            }.bind(this),
            3000
          );
          return;
        }
      }

      try {
        if (this.url && this.file) {
          let storageRef = storage.ref("images/" + this.email);
          let snapShot = await storageRef.put(this.file);
          if (snapShot.state !== "success") {
            return;
          }
          this.url = await snapShot.ref.getDownloadURL();
        }
        let newEmployee = {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          sex: this.sex,
          dateOfBirth: this.dateOfBirth,
          profileImage: this.url,
        };
        if (this.isEditForm) {
          await db
            .collection("employees")
            .doc(this.employee.id)
            .set(newEmployee);
          newEmployee.id = this.employee.id;
          this.editData(newEmployee);
          this.resetForm();
          this.closeForm();
        } else {
          let result = await db.collection("employees").add(newEmployee);
          newEmployee.id = result.id;
          this.resetForm();
          this.addNewData(newEmployee);
          this.closeForm();
        }
      } catch (error) {
        this.msg = error;
        setTimeout(
          function() {
            this.msg = "";
          }.bind(this),
          3000
        );
      }
    },
    editData(editedEmployee){
      this.$emit('edit-employee',editedEmployee);
    }
    ,
    addNewData(newEmployee) {
      this.$emit("add-new-employee", newEmployee);
    },
    changeFile(e) {
      const file = e.target.files[0];
      this.file = file;
      this.url = URL.createObjectURL(file);
    },
    resetForm() {
      this.file = null;
      this.url = null;
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.sex = "Male";
      this.dateOfBirth = "";
      this.$refs.theForm.reset();
    },
  },
  beforeMount() {
    if (this.formType === "New") {
      this.formName = "Add a new employee to the table:";
    } else {
      this.formName = "Edit an existing user:";
    }
    let date = moment().subtract(16, "years");
    this.maxDate = date.format("YYYY-MM-DD");
    if (this.employee) {
      this.firstName = this.employee.value.firstName;
      this.lastName = this.employee.value.lastName;
      this.email = this.employee.value.email;
      this.dateOfBirth = this.employee.value.dateOfBirth;
      this.sex = this.employee.value.sex;
      this.url = this.employee.value.profileImage;
      this.isEditForm = true;
    }
  },
};
</script>

<style scoped lang="scss">
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

$modal-width: 80vw;
$modal-height: 80vh;
.modal {
  width: $modal-width;
  height: $modal-height;
  background-color: #15172b;
  left: 50%;
  top: 50%;
  margin-top: calc(-1 * 80vh / 2);
  margin-left: calc(-1 * 80vw / 2);
  box-shadow: 2px 2px 20px 1px;
  padding: 10px;
  border-radius: 25px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 15px;
  display: flex;
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #eee;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  font-size: 20px;
  padding: 10px;
  padding-right: 15px;
  cursor: pointer;
  font-weight: bold;
  color: #eee;
  background: transparent;
  outline: none;
}

.btn-close:hover {
  color: red;
}

.btn-close:focus {
  outline: none;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

.form {
  widows: 100%;
  height: 100%;
  padding: 10px;
  // box-sizing: border-box;
  // display: grid;
  // gap: 2%;
  // grid-template-columns: 1fr 3fr;
  // color: #eee;
}

.row-2 {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.input-field {
  margin: 20px 0 0 0;
  width: 100%;
  position: relative;
  display: inline-block;
  label {
    padding: 10px;
    pointer-events: none;
    position: absolute;
    left: 25px;
    top: 1px;
    transition: 0.2s;
    transition-timing-function: ease;
    transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
    opacity: 0.5;
    background: #15172b;
    color: white;
  }

  input,
  select {
    padding: 10px;
    background-color: #15172b;
    width: 100%;
    border-radius: 25px;
    border: white 1px solid;
    color: white;
  }

  select {
    box-sizing: border-box;
    height: 46px;
  }

  select:focus {
    outline: none;
  }

  .with-select {
    label {
      opacity: 1;
      transform: scale(0.75) translateY(-70%) translateX(-14px);
    }
  }

  input:focus {
    outline: none;
  }
  input:focus + label,
  input:not(:placeholder-shown) + label {
    opacity: 1;
    transform: scale(0.75) translateY(-70%) translateX(-14px);
  }
}

.btn-subbmit {
  margin-top: 20px;
  padding: 10px;
  border-radius: 25px;
  outline: none;
  margin-left: 5px;
  margin-right: 5px;
  border: none;
  min-width: 25%;
  font-weight: bold;
  transition: all 2s;
}

.btn-subbmit:hover {
  background-color: rgb(17, 42, 121);
  color: white;
}
.error-message {
  color: red;
}
.image-part {
  display: flex;
  align-items: center;
  .input-field {
    width: 100%;
  }
}

#preview {
  margin-top: 20px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
}

.btn-reset {
  background-color: orangered;
  transition: 2s all;
  color: white;
}

.btn-reset:hover {
  background-color: red;
  color: white;
}
</style>
