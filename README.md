## Vue-Unit-Testing

### Testing Demonstration Here Includes :

- Basic Component Test ( Increment.vue )
- Styling & Conditional Class Test ( FormComponent.vue )
- Props & Event from Component Test ( GlobalInput.vue )
- Form Test ( FormComponent.vue )
- Vuex Test (coming-soon)
- API Call Test ( FormComponentWithApi.vue )

### Sources :

- axios mocker for unit testing -> https://github.com/axios/moxios
- API call vue unit testing -> https://stackoverflow.com/questions/51983221/unable-to-get-moxios-stubrequest-to-work
- Javascript Unit Testing Blog -> https://medium.com/powtoon-engineering/a-complete-guide-to-testing-javascript-in-2017-a217b4cd5a2a
- `npm run test -- --coverage` to see coverage result -> https://scotch.io/tutorials/testing-react-and-redux-apps-with-jest
- free api service for testing purposes -> https://jsonplaceholder.typicode.com/

### Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Personal Notes :

- use `"console.log(wrapper.html())"` --- to see whole html of the component you chose

- If you are writing unit tests and want to test the functionality of a component individually, then setup the `"shallowMount"` function and test it.

If you want to test a nested component, then use the `"mount"` function.
