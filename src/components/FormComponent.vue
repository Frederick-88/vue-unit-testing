<template>
  <section>
    <label for="username">Your Username</label>
    <input
      type="text"
      id="username"
      name="username"
      placeholder="Enter your username"
      data-testid="username-input"
      v-model="formInput.username"
    />
    <label for="password">Your Password</label>
    <input
      type="text"
      id="password"
      name="password"
      placeholder="Enter your password"
      data-testid="password-input"
      v-model="formInput.password"
    />

    <button type="submit" data-testid="submit-btn" @click="submitForm">
      Submit
    </button>

    <br />
    <p>The Line will show red if there is no any submitted form</p>
    <hr data-testid="form-line" :style="{ borderColor: activeColor }" />

    <h1
      :class="{ 'form-result--hidden': isEmptyFormResult }"
      data-testid="form-result"
    >
      hello my username is {{ formResult.username }} and my password is {{ formResult.password }}
    </h1>
  </section>
</template>

<script>
export default {
  name: "FormComponent",
  data() {
    return {
      formResult: {
        username: "",
        password: "",
      },
      formInput: {
        username: "",
        password: "",
      },
    };
  },
  computed: {
    isEmptyFormResult() {
      return !this.formResult.username && !this.formResult.password;
    },
    activeColor() {
      return this.isEmptyFormResult ? "red" : "lightgreen";
    },
  },
  methods: {
    submitForm() {
      this.formResult = {
        username: this.formInput.username,
        password: this.formInput.password,
      };
    },
  },
};
</script>

<style>
.form-result--hidden {
  opacity: 0;
}
</style>
