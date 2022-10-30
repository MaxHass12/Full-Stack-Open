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

# B - DEPLOYING APP TO INTERNET

- Cross-Origin Resource Sharing (CORS) allows only restricted resources from another domain outside the domain from which the resource was served. 2 URLs have same origin if protocol, host and port are same.

- We deployed the backend using fly

- In the dev mode, the react application is configured to give clear error messages, immediately render code changes to browser, etc. For production, we need to create a production build.

- `npm run build` builds a production build.

- This creates the build directory which stores all the static files of our application. We will end up with 1 html file and 1 JS file (compiled from a combination of all source files and dependencies).

- One option is to copy the build directory to the root of the backend and serve the HTML as the home route from the application.

- To make express show static content, we need a built-in middleware from express called static.

- To make the data permanent, we need a database. Else everytime we restart the app or the app crashes, the database will be reloaded.

# C - Saving data to MongoDB

- MongoDB is a document database. In RDB, data is stored in separate tables and information related to a single object is spreaded across tables.

- MongoDB stores data as documents (BSON document ie Binary version of JSON) which are gathered together in collections. A database stores 1 or more collections. A collection is analogous to table in RDB.

- We will use internet based MongoDB provider MongoDB Atlas.

- After the cloud database setup, we will use `mongoose` library. Mongoose can be described as Object Document Mapper (ODM) - saving JS objects as Mongo Documents is relatively straightforward with this library.

- Everything in mongoose starts with a Schema. Each Schema maps to a MongoDB collection and defines the shape of the document within that collection. Defined by `new Mongoose.Schema`

- Then, Models are made from Schema. Model are fancy constructor compiled from Schema. An instance of a Model is called a Document. Responsible for creating documents. Models are created by `mongoose.model`. Models are constructor functions which create new JS objects based on the params. Since the objects are created with model's constructor function - they have all the properties of the model.

- Document Databases are schema-less, it is possible to store documents with completely different fields in the same collection. The idea is that the schema is defined at the level of the application. Saving the object to DB happens with `save` method.

- If the `mongoose.connection().close()` closes the collection - if the connection is not closed, the program will never finish its execution.

- The frontend assumes that every object has a unique id in the id field. The id in MongoDB only looks like a string, however its an object. Also we dont want `_v` in our objects. The only way to format the objects returned by mongoose is to modify the `toJSON` method of the schema - which is used on all instances of the models produced with that schema.

- `notes` variable refers an array of objects (models) returned by Mongo. When the response is send in json format, the `toJSON` method of each object in array is called automatically.

- Exporting modules in node is a bit different. Public interface is defined by setting a value to `module.exports` variable. We will set it to be `Note` model. Other things inside the module will not be visible from outside.

- FIRST TEST THE BACKGROUND IN ISOLATION. TESTING BACKEND THROUGH FRONTEND IS VERY INEFFICIENT.

- Its commong to have all error handling at a single place. We often want to implement all error handling in a single place. `next` function is passed to the route handler as a third parameter.

- If the `next` is called without arguments, then the execution moves to next middlware or route. If `next` is called with arguments then the execution moves to error-handler middleware.

- Express error-handlers are middleware that are defined with a functions that accept 4 parameters.

- The execution order of middleware is same as that in which they are loaded in the express `app.use` function. The json-parser should be among the very first middlware loaded into Express, else `request.body` will be `undefined` for future routes. Middleware for handling unsupported routes is the second-last just before the error-handler. That would nullify all future routes.

# D - VALIDATION AND ESLINT

- Till now we are validating the input in the route handler. One smarter way of validating the format of data before its stored in DB is to use the validation functionality in Mongoose.

- `minLength`, `required` validators are built-in and provided by Mongoose. We can create custom validators if the built-in validators do not fulfill our need.

- Validations are not done when updating the entries. Need to do it manually.

## LINT

- Linter is a tool which detects and flags errors in programming languages, including stylistic errors. Generally perform static analysis of source code.

-
