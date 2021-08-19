import { shallowMount } from "@vue/test-utils";
import GlobalInput from "@/components/GlobalInput.vue";

const factory = (values = {}) => {
  return shallowMount(GlobalInput, {
    propsData: {
      ...values,
    },
  });
};

describe("GlobalInput.vue", () => {
  it("it mounts", () => {
    const wrapper = factory();
    expect(wrapper.findComponent(GlobalInput).exists()).toBeTruthy();
  });

  it("the input gets the correct attributes", () => {
    const defaultWrapper = factory();
    const defaultInputAttribute = defaultWrapper
      .find("[data-testid='input']")
      .attributes();
    expect(defaultInputAttribute.type).toBe("");
    expect(defaultInputAttribute.disabled).toBeFalsy();
    expect(defaultInputAttribute.readonly).toBeFalsy();

    const wrapperWithAttributeProps = factory({
      type: "password",
      isDisabled: true,
      isReadOnly: true,
    });
    const inputAttribute = wrapperWithAttributeProps
      .find("[data-testid='input']")
      .attributes();
    expect(inputAttribute.type).toBe("password");
    expect(inputAttribute.disabled).toBeTruthy();
    expect(inputAttribute.readonly).toBeTruthy();
  });

  it("the input gets the correct value & placeholder", () => {
    const defaultWrapper = factory();
    const defaultInputElement = defaultWrapper.find("[data-testid='input']")
      .element;
    expect(defaultInputElement.placeholder).toBe("");
    expect(defaultInputElement.value).toBe("");

    const wrapperWithProps = factory({
      value: "abc123",
      placeholder: "the placeholder",
    });
    const inputElement = wrapperWithProps.find("[data-testid='input']").element;
    expect(inputElement.placeholder).toEqual("the placeholder");
    expect(inputElement.value).toEqual("abc123");
  });

  it("it applies the correct classes based on input type", () => {
    const successWrapper = factory({ isSuccess: true });
    const warnWrapper = factory({ isWarning: true });
    const errorWrapper = factory({ isError: true });

    expect(
      successWrapper
        .find("[data-testid='input']")
        .classes("global-input--success")
    ).toBeTruthy();
    expect(
      warnWrapper.find("[data-testid='input']").classes("global-input--warning")
    ).toBeTruthy();
    expect(
      errorWrapper.find("[data-testid='input']").classes("global-input--error")
    ).toBeTruthy();
  });

  it("it shows the right message & icon based on message & input type", () => {
    const defaultWrapper = factory();
    const successWrapper = factory({
      isSuccess: true,
      message: "input success message",
    });
    const warnWrapper = factory({
      isWarning: true,
      message: "input warning message",
    });
    const errorWrapper = factory({
      isError: true,
      message: "input error message",
    });

    expect(
      defaultWrapper.find("[data-testid='input-message-wrapper']").exists()
    ).toBeFalsy();

    expect(
      successWrapper.find("[data-testid='input-message-wrapper']").exists()
    ).toBeTruthy();
    expect(
      successWrapper
        .find("[data-testid='input-message-icon']")
        .classes("icon-tick-circle")
    ).toBeTruthy();
    expect(successWrapper.find("[data-testid='input-message']").text()).toBe(
      "input success message"
    );

    expect(
      warnWrapper.find("[data-testid='input-message-wrapper']").exists()
    ).toBeTruthy();
    expect(
      warnWrapper
        .find("[data-testid='input-message-icon']")
        .classes("icon-notice")
    ).toBeTruthy();
    expect(warnWrapper.find("[data-testid='input-message']").text()).toBe(
      "input warning message"
    );

    expect(
      errorWrapper.find("[data-testid='input-message-wrapper']").exists()
    ).toBeTruthy();
    expect(
      errorWrapper
        .find("[data-testid='input-message-icon']")
        .classes("icon-close-solid")
    ).toBeTruthy();
    expect(errorWrapper.find("[data-testid='input-message']").text()).toBe(
      "input error message"
    );
  });

  it("it applies the correct input-height classes based on input-height type", () => {
    const tallWrapper = factory({ isTall: true });
    const shortWrapper = factory({ isShort: true });

    expect(
      tallWrapper.find("[data-testid='input']").classes("global-input--tall")
    ).toBeTruthy();
    expect(
      shortWrapper.find("[data-testid='input']").classes("global-input--short")
    ).toBeTruthy();
  });

  it("it gets the correct label & update the styling of input", () => {
    const defaultWrapper = factory();
    const wrapperWithLabel = factory({ label: "input label" });

    expect(
      defaultWrapper.find("[data-testid='input-label']").exists()
    ).toBeFalsy();
    expect(
      wrapperWithLabel.find("[data-testid='input-label']").exists()
    ).toBeTruthy();
    expect(wrapperWithLabel.find("[data-testid='input-label']").text()).toBe(
      "input label"
    );

    expect(
      defaultWrapper.find("[data-testid='input-wrapper']").classes("has-label")
    ).toBeFalsy();
    expect(
      wrapperWithLabel
        .find("[data-testid='input-wrapper']")
        .classes("has-label")
    ).toBeTruthy();
  });

  it("it emits the correct events", () => {
    const wrapper = factory();
    const inputElement = wrapper.find("[data-testid='input']");

    inputElement.element.value = "xyz789";
    inputElement.trigger("change");
    inputElement.element.value = "xyz78";
    inputElement.trigger("input");

    inputElement.trigger("blur");
    inputElement.trigger("focus");
    inputElement.trigger("keyup");
    inputElement.trigger("keypress", {
      key: "Enter",
    });

    expect(wrapper.emitted().change[0]).toEqual(["xyz789"]);
    expect(wrapper.emitted().input[0]).toEqual(["xyz78"]);
    expect(wrapper.emitted().focus[0]).toBeTruthy();
    expect(wrapper.emitted().keyup[0]).toBeTruthy();
    expect(wrapper.emitted().blur[0]).toBeTruthy();
    expect(wrapper.emitted().blur[1]).toBeTruthy();
  });
});
