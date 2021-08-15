<template>
  <div>
    <button class="increment-btn" data-testid="increment-btn" @click="count++">
      Increase
    </button>
    <button class="increment-btn" data-testid="decrement-btn" @click="count--">
      Decrease
    </button>
    <p data-testid="total-click">Total Clicks: {{ count }}</p>
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
  margin: 0 10px;
  padding: 10px 25px;
  cursor: pointer;
  background-color: rgb(7, 85, 110);
  outline: none;
  border: none;
  border-radius: 4px;
  color: #ffffff;
}
</style>
