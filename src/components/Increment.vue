<template>
  <div>
    <button class="increment-btn" @click="count++">Add up</button>
    <p>Total clicks: {{ count }}</p>
  </div>
</template>

<script>
export default {
  name: "Increment",
  data() {
    return {
      count: 0,
    };
  },
};
</script>

<style>
.increment-btn {
  padding: 10px 25px;
  cursor: pointer;
  background-color: rgb(7, 85, 110);
  outline: none;
  border: none;
  border-radius: 4px;
  color: #ffffff;
}
</style>
