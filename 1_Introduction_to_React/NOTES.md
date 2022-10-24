# A - Intro to React

- React components are functions, stored in separate files, which return JSX objects which are rendered as HTML by React.

- While using React, all markup is usually defined as React components.

## JSX

- React Components do not return HTML. They return JSX. JSX Object are a way to write React 'elements' which are written like HTML. These are compiled to React Elements (which are JS objects) by Babel.

- Its possible to not use JSX with React, but it would be foolish.

- In JSX, any JS code within the curly braces is evaluated and the result of this evaluation is embedded into the defined places in the HTML produced.

- Either use curly braces or quote, but not both, while defining attributes in JSX elements. `class` attribute is called `className` in JSX.

- The attributes and children elements are stored in `props` key of the React elements.

- JSX is XML-like which means that every tag needs to be closed.

## Rendering Elements

- Unlike browser DOM elements, React elements are plain objects and easier to create.

- Applications build with React usually have a single root DOM node.

- React Elements are immutable, once you create elements - you cant change its children or attributes. (With our current knowledge, only way to update the UI is to create a new element, and pass it to `root.render()`).

- However, in practise most React apps only call `root.render()` once.

- React DOM compares the element and its children to the previous one and applies the DOM updates necessary to bring the change. We only need to think about how the UI should look at any given time.

## Multiple Components

- Components let you split the UI into independent, reusable pices and think about each piece in isolation.

- React component names must be capitalized. The content of React component needs to contain 1 root element. Instead of wrapping the JSX in a `div`, we can use fragments - empty tags.

- Using a component within a component is quite easy. A core philosophy of React is composing applications from many specialized reusable components.

- Another strong convention is the idea of a root component called App at the top of the component tree.

## props : passing data to components

- we pass data to components using props.

- The `props` parameter as an argument receives an object, with all the key-value pairs as the 'props' of the Component invocation.

- When React sees an element represeint a user-defined component, it passes JSX attributes and children to this components as a single object - `props`.

- ALL REACT COMPONENTS MUST ACT LIKE PURE FUNCTIONS WITH RESPECT TO THEIR PROPS.

# B - JavaScript

- A lot of code run in browsers has been transpiled from a newer version of JS to an older, more compatible version. The most popular way to do the transpiling is by using Babel.

- Node.js is a JS runtime environment based on Chrome's V8 engine and it works everywhere.

# C - Component, State and event-handlers

- State is similar to props but fully controlled by the component.
- Hooks are new addition to React. They let you use State and other React features without writing a class.

- 1. `import { useState } from 'react'` - imports the `useState` function
- 2. Within the component, `const [ counter, setCounter ] = useState(0)`.

  - `useState` returns a pair: The current state value and a function which lets you update it. The only argument to `useState` is the initial state.
  - `useState` is a Hook. They let you hook into lifecycle features from function components.
  - When we call the returned function, React re-renders that component and set the state to the variable passed.
    - Which component is re-rendered? The component within which the hook function is invoked.

- The event-handlers have to be either functions or function references.

- It is recommended to write React components that are small and resuable across the application and even across projects.

- One best practise in React is to lift the state up in component hierarchy.

# D - A more complex state, debugging React apps

- What if we want a more complex state? Easiest is by using the `useState` function multiple time to create separate 'pieces' of state.

- We can have a single state and design event-handlers to take care of the entire state.

- IT IS FORBIDDEN IN REACT TO MUTATE THE STATE DIRECTLY. CHANGING THE STATE SHOULD ALWAYS BE DONE BY SETTING THE STATE TO A NEW OBJECT.

- We can or can not store our application state in a complex data structure.

- Conditional Rendering means when a component renders different React elements depending upon the state of the application.

- The state hook, which is used to add state to our React components, which is part of the newer versions of React was not available before. Prior to 16.8, there was no way to add state to functional components. Components that rquired state had to be defined as class compnents.

## Rules of Hooks

- The hook based functions like `useState` and `useEffect` must not be called from any place that is not a function defining a component. Ideally just where the component function's definition starts.

- Event-handlers should always be function or a reference to a function, not variable assignment or function calls. Generally event-handlers are defined in a separate place, not directly in the attribute.

- We can use Partial Function Application or a function returning a function as event-handlers. Can be used to set the value of a state.

- NEVER DEFINE A COMPONENT WITHIN A COMPONENT.
