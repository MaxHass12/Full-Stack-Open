- `window.localStorage` is a key-value database in the browser. Very easy to use. Set value by `setItem` and retrieve by `getItem`.

- Values in the local storage are persisted even when the page is rerendered.

- The value saved to storage are DOMstrings - need to parse them.

- Possible to logout the user using the console, you can log out with the command.

- What to choose between saving limiting the validity of the token or save the information of each token to backend ie a server side session.

- Saving a token in the local storage might contain a security risk. If the app has security vulnerability like Cross Site Scripting. XSS attack happens when app allows user to inject arbitrary JS code.

- One way is the JS code should not have access to token. Save it as httpOnly cookies. Need to implement a separate page for logging in. Some say the httpOnly cookie are not any safer than the use of local storage.

# B - PROPS.CHILDREN AND PROTOTYPES

- `props.children` is available on every component. It contains the content between the opening and closing tags of the component - we write JSX with opening and closing component when the component has children component.

- In React components that contain both an opening and a closing tag, the content between those tags is passed as a special prop `prop.childrenx `. In those with self closing tags, the `props.children` is an empty array.

- When several components need to reflect the same changing data, we recommned lifting the shared state up to their closest common ancestor. 