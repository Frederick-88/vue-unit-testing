<template>
  <section>
    <label for="post-title">Your Post Title</label>
    <input
      type="text"
      id="post-title"
      name="post-title"
      placeholder="Enter your post-title"
      data-testid="post-title-input"
      v-model="postTitleInput"
    />

    <button type="submit" data-testid="submit-btn" @click="submitForm">
      Submit
    </button>

    <h1 data-testid="form-result">
      here is your post title: {{ apiCallResult.title }}
    </h1>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "FormComponentWithApi",
  data() {
    return {
      postTitleInput: "",
      apiCallResult: {},
    };
  },
  mounted() {
    const url = "https://jsonplaceholder.typicode.com/posts/1";
    axios
      .get(url)
      .then((response) => {
        // console.log(response);
        this.apiCallResult = response.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    submitForm() {
      const postUrl = "https://jsonplaceholder.typicode.com/posts";
      axios({
        url: postUrl,
        method: "POST",
        data: {
          title: this.postTitleInput,
        },
      })
        .then((response) => {
          // console.log("post", response);
          this.apiCallResult = response.data;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
.form-result--hidden {
  opacity: 0;
}
</style>
