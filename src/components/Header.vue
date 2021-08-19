<template>
  <div class="header">
    <h1>{{ headerText }}</h1>
  </div>
</template>

<script>
export default {
  props: {
    headerText: String,
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Style+Script&display=swap");
.header {
  padding: 25px;
  box-sizing: border-box;
  background-color: rgb(17, 42, 121);
  margin-bottom: 15px;
  position: sticky;
  box-shadow: 1px 2px 20px rgba(0, 0, 0, 0.5);
  top: 0;
  h1 {
    color: white;
    font-family: "Style Script", cursive;
    font-size: 4rem;
  }
}
</style>
