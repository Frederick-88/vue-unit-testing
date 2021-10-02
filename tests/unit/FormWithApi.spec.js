import moxios from "moxios";
import axios from "axios";
import sinon from "sinon";

import { shallowMount } from "@vue/test-utils";
import FormComponentWithApi from "@/components/FormComponentWithApi.vue";

const factory = (values = {}) => {
  return shallowMount(FormComponentWithApi, {
    propsData: {
      ...values,
    },
  });
};

describe("FormComponentWithApi", () => {
  let axiosInstance;
  let onFulfilled;
  let onRejected;

  beforeEach(() => {
    axiosInstance = axios.create();
    moxios.install(axiosInstance);
    onFulfilled = sinon.spy();
    onRejected = sinon.spy();
  });

  afterEach(() => {
    moxios.uninstall(axiosInstance);
  });

  const mockDataSingleProduct = {
    body:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    userId: 1,
  };

  it("it mounts/exists", () => {
    const wrapper = factory();
    expect(wrapper.findComponent(FormComponentWithApi).exists()).toBeTruthy();
  });

  it("get a post-title from API call upon first load", (done) => {
    const API_URL = `https://jsonplaceholder.typicode.com/posts/1`;
    const wrapper = factory();
    const formResult = wrapper.find('[data-testid="form-result"]');

    expect(formResult.text()).toBe("here is your post title:");

    // --------------
    // after Get API call
    // --------------
    moxios.stubRequest(API_URL, {
      status: 200,
      response: mockDataSingleProduct,
    });

    axios.get(API_URL, mockDataSingleProduct).then(onFulfilled);

    moxios.wait(() => {
      const response = onFulfilled.getCall(0).args[0];

      expect(response.status).toBe(200);
      expect(formResult.text()).toBe(
        "here is your post title: sunt aut facere repellat provident occaecati excepturi optio reprehenderit"
      );
      done();
    });
  });

  it("it successfully receive a new post-title after send a post-title via a POST API call", (done) => {
    const wrapper = factory();
    const postTitleInput = wrapper.find('[data-testid="post-title-input"]');
    const submitButton = wrapper.find('[data-testid="submit-btn"]');
    const formResult = wrapper.find('[data-testid="form-result"]');

    expect(formResult.text()).toBe("here is your post title:");

    postTitleInput.element.value = "new title";
    postTitleInput.trigger("input");
    submitButton.trigger("click");

    setTimeout(() => {
      expect(formResult.text()).toBe("here is your post title: new title");
      done(); // jest timeout details -> https://github.com/facebook/jest/issues/3211
    }, 2000);
  });
});
