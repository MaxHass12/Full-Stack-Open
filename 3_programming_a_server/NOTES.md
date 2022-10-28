# A - NODE AND EXPRESS

- NodeJS is a JS runtime based on Google's Chrome V8 JS engine.

- Browsers do not yet support the newest features of JS, hence the code running in the browser must be transpiled with (say) babel. Node supports the latest features of JS.

- `node index.js` is how we run the program. It is customary to run through script ie `npm start`. `npm test` is another common script.

- Code that runs in browser user ES6 modules - which are defined with `export` and taken into use with an `import` statement. NodeJS uses 'CommonJS' modules which we use with `require` function and not `import` keyword.

- we use the command `npm install express` to define `express` as a project dependency.

- Dependency of a dependency is called transitive dependency. In NPM, the transitive dependencies are not shared.

- `^4.17.2` is the semantic versioning ie when the dependencies are updated, the version of express will atleast be that however the major number ie the first number will be the same.

- `npm update` the dependencies of the project.

- `npm install` installs up-to-date dependencies of the project defined in `package.json` if we start working on the project on another computer.

- If the major number of dependency does not change, then the newer version should be backward compatible.

- JSON is a string, not a JS object. `JSON.stringify()` converts a JS object to a JSON string.

- Nodemon tracks the files in the directoy and automatically restarts the node application when it started.

- `npm install --save-dev nodemon` adds nodemon as a dev-dependecy. These tools are only needed duing development of the application.

## REST

- Singular things, like notes in our app, are called resources in RESTful thinking. Every resource has an associated URL.
- The convention is to create unique address for resources by combining the name of the resource type with the resource's unique identifier.
- Thus, REST provides a uniform-interface, ie a consistent way of defining interfaces that makes it possible for systems to cooperate.

- HTTP GET requests are easy to make from browser. How do we test DELETE requests. CLI tools like `curl` or GUI tools like Postman.

- `json-parser` takes the JSON data of a request, transforms it into JS object and then attacjes it to the body property of the `request` before route handler is called. With the parser, the body property of the request would be `undefined`.

- One potential source of bug while sending requests is setting the incorrect `Content-Type` header.

- Once we make sure that the application receives data correctly, it is time to finalize the handling of the request.

- HTTP GET and HEAD method should be safe - they should have no side-effects in the server.
- All HTTP requests except POST should be idempotent ie side-effect of n > 0 identical requests is same as a single request. As per REST principles, GET, HEAD, PUT, DELETE are used in such a way that they are idempotent.
- POST is the only request which is neither safe nor idempotent.

- `json-parser` is an example of middleware. Middleware are used for handling request and response object.
- This parser takes raw data from the `request` object, parses it as JS object and assigns it to the `request` object as the new body.
- If we have several middleware, they are executed sequentially.
- middleware takes 3 arguments, request, response and next. The next function yields control to the next middleware.
- middleware functions have to be taken into use before routes if we want them to be executed before the route handlers are called.
- we can also define middleware after the routes, ie they are called only if no route handles the HTTP request.