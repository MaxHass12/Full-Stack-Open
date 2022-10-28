# A - Rendering a collection, modules

- When using `console.log` for debugging pass objects as distinct arguments, not concatenating them with `+` : this will output `[Object object]`

- An array of `li` elements can be placed directly inside an `ul` in JSX - wrapping it in curly braces off-course.

- These `li` items must each have a unique key value.

- Using array indices as keys is not recommended and can create undesired problems.

- "Note that the key attribute must now be defined for the Note components, and not for the li tags like before."

- Common practise is to declare each component in their own file as an ES6-module.

  - An ES6 module is a file containing JS code. There is no special `module` keyword.
  - ES6 modules are automatically `strict-mode` code.
  - We can use `import` and `export` in modules.

  - We can `export` any top-level `function`, `class`, `var`, etc.
  - We import using `import {names} from 'file.js'`
  - We can also export stuff as a list enclosed in curly braces.

- Quite often the root of subtle bugs in React apps are that props are expected to be of a different type or different name than they actually are.

- The `submit` event fires when a `<form>` is submitted. `submit` event fires on the `<form>` element itself and not on any `<button>` or `<input>` element within it.

- How do we access the data contained in the form's input element?
  - pretty simple

# C - Getting Data From Server

- JS engines are single-threaded, they can not execute code in parallel. If some code execution takes up a lot of time, the browser will get stuck for the duration of the execution.

- Instead of promise base `fetch`, we wil use `axios` library for communication between browser and server.

- Nowdays practically all JS projects are defined using the `npm`. A clear indicator that the project uses `npm` is the `package.json` file located at the root of the project.

- Dependecies mean what external libraries the project uses.

- We install libraries by running the command `npm install axios` from the project root directory. It downloads the library and adds it to the dependency.

- We use the `--save-dev` argument to install a library as a development dependency.

- NPM scripts are terminal commands that perform a set of actions. We add the command to run the json server in scripts - which can be run by the command `npm run server`.

- In our case, running the axios command is the runtime dependency of the application as the execution of the program depends on the existence of the library. `json-server` is a development dependency, it is used for assistance during software development.

- Make a file `.env` with `FAST_REFRESH=false` to make `index.js` refresh everytime we save the file.

- A promise is an object that represents an async operation. It can have 3 states - pending, fulfilled and rejected.

- If we want to access the result of the operation represented by the promise, we need to register an event-handler as an argument to the `then` method on the promise. The response is passed to the callback as the argument.

- How to place `axios.get` within the `App` component?

## `useEffect`

- It is used to tell our components to do something after render eg data-fetching, setting up a subscription and manually changing the DOM in React components.

- Placing it inside a component lets us access the state.

- The callback function which is the first argument to `useEffect` is simply called effect in React parlance.

- The effect callback runs after every render, unless we provide it a second argument `[]`. If the second parameter is `[]` then the effect is executed after only the first rendering of the component.

- The browser, which runs the JS code, gets the JS from React-dev server, the application which is started by `npm start`. The dev-server transforms the source-code into the format understood by the browser ie stitching together different files into 1 file.

- The React application running in the browser fetches the JSON formatted data from the json-server.

- At this point, all parts of application are local at the localhost.

- We save sensitive data like API_KEY is environment variables.

# D - Altering Data in Server

- REST

- In REST terminology we refer to individual data objects as resources. Every resource has a unique URL.
- According to REST convention we are able to locate an individual note with id 3 by the URL `/note/3`
- Resources are fetched from the server using the HTTP GET requests.
- Creating a new resource for storing a note is done by making a HTTP POST reques to the `/notes`. The data is sent in the body of the request.
- If data is to be send in JSON format - means that the data must be a correctly formatted string and the `Content-Type` request header must be set with the value `application/json`

- Once the data returned by server starts to have an effect on the behaviour of our web applications, we are immediately faced with a whole new set of challenges wrt debugging because of asynchronicity of communication.

- Promises

  - 2 main problems with using callbacks to manage asynchronity is lack of sequentiallity and lack of trustability.
  - A Promise is an object representing the eventual completion or failure of an async operation.

  - Guarantees

    - callbacks added with `then()` will never be invoked before completion of the (current) event-loop
    - callbacks will be invoked even if they were added after the success or failure of the async operation.
    - multiple callbacks may be added by calling `then()` several times.

  - allways return results, else callbacks won't catch the result of a previous promise.

  - A Promise is one of 3 states - pending, fulfilled, rejected.
  - If already fulfilled or rejected, then the handlers are called.

  - `Promise.prototype.then()` takes 2 arguments - callbacks for success and failure case.
  - the success callback has 1 argument - the value of the promise on fulfillment. The reject callback takes 1 argument, the rejection reasion.
  - Once a `Promise` is fulfilled or rejected, the respective handler function will be called asynchronously - ie places in the current thread of loop.
  - If the handler returns a value, the promise returns by `then` gets resolved with the returned value as its value.

# E - Adding Styles to React App

- In react, the structural units that make up the app's functional entities are React components. It defines the HTML, CSS and JS at 1 place - hence inline stylings is recommended. In order to make individual components that are as independent and reusable as possible.
