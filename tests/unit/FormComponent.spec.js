import { shallowMount } from "@vue/test-utils";
import FormComponent from "@/components/FormComponent.vue";

const factory = (values = {}) => {
  return shallowMount(FormComponent, {
    propsData: {
      ...values,
    },
  });
};

describe("FormComponent", () => {
  it("it mounts/exists", () => {
    const wrapper = factory();
    expect(wrapper.findComponent(FormComponent).exists()).toBeTruthy();
  });

  it("horizontal line shows the right color styling", async () => {
    const wrapper = factory();
    const horizontalLine = wrapper.find('[data-testid="form-line"]');
    expect(horizontalLine.element.style.borderColor).toBe("red");

    // ----------------------
    // exist form result case
    // ----------------------
    const usernameInput = wrapper.find('[data-testid="username-input"]');
    const passwordInput = wrapper.find('[data-testid="password-input"]');
    const submitButton = wrapper.find('[data-testid="submit-btn"]');

    usernameInput.element.value = "fred";
    usernameInput.trigger("input");

    passwordInput.element.value = "new-password";
    passwordInput.trigger("input");

    await submitButton.trigger("click");

    expect(horizontalLine.element.style.borderColor).toBe("lightgreen");
  });

  it("form result section is hidden while there are no any result", async () => {
    const wrapper = factory();
    const formResult = wrapper.find('[data-testid="form-result"]');
    expect(formResult.classes()).toContain("form-result--hidden");

    // ----------------------
    // exist form result case
    // ----------------------
    const usernameInput = wrapper.find('[data-testid="username-input"]');
    const passwordInput = wrapper.find('[data-testid="password-input"]');
    const submitButton = wrapper.find('[data-testid="submit-btn"]');

    usernameInput.element.value = "fred";
    usernameInput.trigger("input");

    passwordInput.element.value = "new-password";
    passwordInput.trigger("input");

    await submitButton.trigger("click");

    expect(formResult.classes()).not.toContain("form-result--hidden");
  });

  it("it successfully submit form", async () => {
    const wrapper = factory();
    const usernameInput = wrapper.find('[data-testid="username-input"]');
    const passwordInput = wrapper.find('[data-testid="password-input"]');
    const submitButton = wrapper.find('[data-testid="submit-btn"]');
    const formResult = wrapper.find('[data-testid="form-result"]');

    usernameInput.element.value = "fred";
    usernameInput.trigger("input");

    passwordInput.element.value = "new-password";
    passwordInput.trigger("input");

    await submitButton.trigger("click");
    expect(formResult.text()).toBe(
      "hello my username is fred and my password is new-password"
    );
  });
});
