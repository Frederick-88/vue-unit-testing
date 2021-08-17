import { shallowMount } from "@vue/test-utils";
import IncrementComponent from "@/components/Increment.vue";

describe("Increment.vue", () => {
  test("it increments / decrements based on clicked button", async () => {
    const wrapper = shallowMount(IncrementComponent);
    const incrementButton = wrapper.find("[data-testid='increment-btn']");
    const decrementButton = wrapper.find("[data-testid='decrement-btn']");
    const text = wrapper.find("[data-testid='total-click']");

    // ----------------------
    // Increment Testing
    // ----------------------
    expect(text.text()).toBe("Total Clicks: 0");
    await incrementButton.trigger("click");
    expect(text.text()).toBe("Total Clicks: 1");
    await incrementButton.trigger("click");
    expect(text.text()).toBe("Total Clicks: 2");

    // ----------------------
    // Decrement Testing
    // ----------------------
    await decrementButton.trigger("click");
    expect(text.text()).toBe("Total Clicks: 1");
    await decrementButton.trigger("click");
    expect(text.text()).toBe("Total Clicks: 0");
    await decrementButton.trigger("click");
    expect(text.text()).toBe("Total Clicks: -1");
    await decrementButton.trigger("click");
    expect(text.text()).toBe("Total Clicks: -2");
  });
});
