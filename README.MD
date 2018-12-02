# React `useMiddleware` hook

[![npm version](https://img.shields.io/npm/v/react-usemiddleware.svg?style=flat-square)](https://www.npmjs.com/package/react-usemiddleware)


Redux compatible [middleware](https://redux.js.org/advanced/middleware) provider for React >=16.7 [Hooks](https://reactjs.org/docs/hooks-intro.html)

**react-useMiddleware** allows you to use [all existing Redux middlewares](https://github.com/xgrommx/awesome-redux#react---a-javascript-library-for-building-user-interfaces) with React's new feature called hooks.
It introduces new hook called `useMiddleware`, which is a wrapper arounf `useReducer`, but allows you to pass a list of middlewares to be used.

## Install
```
$ npm install react-usemiddleware --save
$ yarn add react-usemiddleware
```

## API

you can use `useMiddleware` as a straight replacement for `useReducer`, and optionally pass 3rd parameter - an array of middlewares to be applied to a dispatch function.

```
 const [state, dispatch] = useMiddleware(reducer, initialState, middlewares = []);

```

Takes 3 parameters:
 - `reducer`, same as passed into `useReducer` hook
 - `initialState`, same as passed into `useReducer` hook
 - `middlewares` - array of middlewares, eg, `[thunk, createLogger, saga]`

## Example

```
import React from 'react';
import useMiddleware from 'react-usemiddleware';
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const logger = createLogger();
const middlewares = [thunk, logger];

const reducer = (state, action) => {
  switch (action.type) {
    case "INC":
      return state + 1;
    case "DEC":
      return state - 1;
    case "SET":
      return action.payload;
    default:
      return state;
  }
};

const App = (props) => {
  const [count, dispatch] = useMiddleware(reducer, 0, middlewares);

  const thunkAction = dispatch(() => setTimeout(() => dispatch({ type: "SET", payload: 7 })), 1000);
  const incCount = () => dispatch({ type: "INC" });
  const decCount = () => dispatch({ type: "DEC" });

  return (
    <div className="App">
      <button onClick={decCount}>[-]</button>
      <span>{count}</span>
      <button onClick={incCount}>[+]</button>
      <button onClick={thunkAction}>Async</button>
    </div>
  );
}
```

## Live example

A [demo](https://codesandbox.io/s/48ovynqr97) can be found here


## Contributions

Please open an [Issue](https://github.com/venil7/react-usemiddleware/issues) or a [PR](https://github.com/venil7/react-usemiddleware/pulls)


