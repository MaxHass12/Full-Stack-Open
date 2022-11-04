- at the very begining of the file we create a `Router` object. All routes are defined for the `Router` object. The paths in the Router handler have shortened.

- Router is a middleware used for defining 'related routes' in a single place, typically placed in its own module.

- `app.js` file which creates the final application, takes the router into use by `app.use`.

# B - TESTING THE BACKEND

- Unit Testing refers to testing individual units of source code are fit to use.
- When multiple components are tested together, its called integration testing.

- The convention in Node is to define the execution mode of the application with `NODE_ENV` environment variable. We change the script accordingly in `package.json`

- `runInBand` prevents Jest from running in parallel, becomes important when we start using database.

- ( `cross-env` package provides cross platform dependency. )

- Now we can modify the ways in which application runs in different mode. We can define the application to use a separate databases when its running tests.

- We can create our separate test database, but not optimal when many people are developing the same application. We do not want a single database to be used concurrently. Better to install a test database on local machine. We will keep it relatively simple by using every test execution has its own database. We will continue using MongoDB Atlas.

- `supertest` package helps us to write tests for API. It returns a 'super-agent' object which is assigned to `api` variables and we use it for making HTTP request to the backend.

- To make our tests more robust, we need to reset the database and generate the data before we run the test.

- `async` / `await` keywords makes it possible to use asynchronous functions that return a promise in a way that makes the code looks synchronous.

- With `async await` the standard way to deal with errors is the `try catch` mechanism.

# C - USER ADMINISTRATION

- Users should be stored in a DB and every note should be linked to user who created it. One-to-many relationship between user to notes.

- In case of relational DB, modelling this kind of relation is easy.

- In Document DB, we use users in their own collection. Use object id to refer to other object ids. Similar to foreign-key. MongoDB does not support it. We will implement it in out application code by making multiple queries.

- Generally speaking, relational DB offer more or less a suitable way of organizing data for many applications. Mongo requires developers to make radical design choices about data organization at the begining of the project.

- In the notes app we are storing the id of note in the user object.

- Test Driven Development (TDD) means where tests for new functionality are written before the functionality is implemented.

- We would ideally want our GET request to `/api/users/:id` to return an array of content of user's notes - not the note id. In relational DB this would be implemented by a join query.

- The mongoose join is done by the `populate` method. In mongoose, the state of the DB can change during the query.

- Database does not actually know that the ids stored in the `user` field of `Note` reference documents in `User` collection. Based on the fact that we can define the type of a field.

# D - TOKEN AUTHENTICATION

- Users must be able to log into our application. When a user is logged in, their info must automatically be attached to any new notes they create.

- When the user sends username/password from the frontend, the backend generates a token which is returned as a message and saved by browser. Now browser sends that TOKEN in subsequent request which enables backend to authenticate the user.

- Token based authentication has 1 big problem. Once the API user, ie React App, gets a token the API has to blindly trust the token holder.

- The easier solution is to limit the validity of token. However, a short expiration time forces users to login after given time.

- The other solution is to save info about each token to backend database. Each request checks if the token is still valid. This kind of solution is often called a server side session. The access rights can be revoked anytime. In this token is just a random string and contains no info about the user. For each API request the server fetches the relevant information about identity from the database. Quite usual that instead of Header, cookies are used as mechanism for transferring the token between client and the server.

- Server side session authentication is slow. Token validity needs to check for each API request and database access is considerably slow comparing to checking the validity. It is quite common to save session corresponding to a token to a specialized key-value database with limited functionality.
