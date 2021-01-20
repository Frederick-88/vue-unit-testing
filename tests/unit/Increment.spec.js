import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("Increment.vue", () => {
  test("increments counter value on click", async () => {
    const wrapper = shallowMount(HelloWorld);
    const button = wrapper.find("button");
    const text = wrapper.find("p");

    expect(text.text()).toContain("Total clicks: 0");

    await button.trigger("click");

    expect(text.text()).toContain("Total clicks: 1");
  });
});
