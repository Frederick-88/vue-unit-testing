<template>
  <div
    class="global-input__wrapper"
    :class="{ 'has-label': label !== '' }"
    data-testid="input-wrapper"
  >
    <label v-if="label" data-testid="input-label">{{ label }}</label>
    <input
      :class="inputClassList"
      :type="type"
      data-testid="input"
      :disabled="isDisabled"
      :value="value"
      :placeholder="placeholder"
      :readonly="isReadOnly"
      @blur="$emit('blur', $event)"
      @input="onInputEvent"
      @change="onChangeEvent"
      @focus="$emit('focus', $event)"
      @keyup="$emit('keyup', $event)"
      @keypress.enter="$emit('blur', $event)"
    />

    <section v-if="message && (isSuccess || isWarning || isError)">
      <div :class="messageClassList" data-testid="input-message-wrapper">
        <div v-if="isSuccess">
          <i class="icon icon-tick-circle" data-testid="input-message-icon"></i>
        </div>
        <div v-else-if="isWarning">
          <i class="icon icon-notice" data-testid="input-message-icon"></i>
        </div>
        <div v-else-if="isError">
          <i class="icon icon-close-solid" data-testid="input-message-icon"></i>
        </div>
        <span v-html="message" data-testid="input-message"></span>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "GlobalInput",
  props: {
    type: { type: String, default: "" },
    label: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    value: { type: String, default: "" },
    isDisabled: { type: Boolean, default: false },
    isReadOnly: { type: Boolean, default: false },
    /**
     * Tall Height of the input
     */
    isTall: { type: Boolean, default: false },
    /**
     * Short Height of the input
     */
    isShort: { type: Boolean, default: false },

    isWarning: { type: Boolean, default: false },
    isSuccess: { type: Boolean, default: false },
    isError: { type: Boolean, default: false },
    /**
     * When you set isWarning / isError / isSuccess props become 'true', you need to give add 'message' props.
     */
    message: { type: String, default: "" },
  },

  computed: {
    inputClassList() {
      const classList = ["global-input"];

      if (this.isTall) classList.push("global-input--tall");
      if (this.isShort) classList.push("global-input--short");
      if (this.isSuccess) classList.push("global-input--success");
      if (this.isError) classList.push("global-input--error");
      if (this.isWarning) classList.push("global-input--warning");

      return classList;
    },

    messageClassList() {
      const classList = ["global-input__message"];

      if (this.isSuccess) classList.push("is-success");
      if (this.isWarning) classList.push("is-warning");
      if (this.isError) classList.push("is-error");

      return classList;
    },
  },

  methods: {
    onInputEvent(event) {
      this.$emit("input", event.target.value);
    },

    onChangeEvent(event) {
      this.$emit("change", event.target.value);
    },
  },
};
</script>

<style lang="scss">
.global-input__wrapper {
  position: relative;

  &.has-label {
    margin-bottom: 10px;

    label {
      color: $grey;
      margin-bottom: 5px;
      display: block;
      font-size: 0.875rem;
      float: left;
    }
  }

  .global-input {
    display: inline-block;
    width: 100%;
    padding: 10px 15px;
    border-radius: 4px;
    border: 1px solid $disabledGrey;
    font-weight: 500;
    font-size: 0.875rem;
    color: $black;
    margin: 0;
    outline: 0;
    box-sizing: border-box; //make sure input doesn't overflowing parent

    &:disabled {
      color: $lightGrey5;
    }

    &:focus {
      border-color: $primary1;
    }
  }

  .global-input--success {
    border: 1px solid $success1;
  }

  .global-input--error {
    border: 1px solid $danger1;
  }

  .global-input--warning {
    border: 1px solid $warning3;
  }

  .global-input--tall {
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .global-input--short {
    padding: 8px 15px;
  }

  .global-input__message {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: absolute;
    font-size: 0.75rem;
    width: 100%;
    background: $white;
    padding: 10px;
    z-index: 1;

    .icon {
      margin-right: 10px;
      font-size: 1.25rem;
    }

    &.is-success {
      color: $success1;
    }

    &.is-warning {
      color: $warning3;
    }

    &.is-error {
      color: $danger1;
    }
  }
}
</style>
