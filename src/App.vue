<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <FormComponentWithApi />
    <Increment />
    <FormComponent />
  </div>
</template>

<script>
import Increment from "./components/Increment";
import FormComponent from "./components/FormComponent";
import FormComponentWithApi from "./components/FormComponentWithApi";

export default {
  name: "App",
  components: {
    Increment,
    FormComponent,
    FormComponentWithApi,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
