# React `useMiddleware` hook

[![npm version](https://img.shields.io/npm/v/react-usemiddleware.svg?style=flat-square)](https://www.npmjs.com/package/react-usemiddleware)


Redux compatible [middleware](https://redux.js.org/advanced/middleware) provider for React >=16.7 [Hooks](https://reactjs.org/docs/hooks-intro.html)

**React-useMiddleware** allows you to use Redux existing middleware with React's new feature called hooks.
It introduces new hook called `useMiddleware`

## Install
```
$ npm install react-usemiddleware --save
$ yarn add react-middleware
```

## API

```
 const [state, dispatch] = useMiddleware(middlewares, reducer, initialState);

```

Takes 3 parameters:
 - `middlewares` - array of middlewares, eg, `[thunk, createLogger, saga]`
 - `reducer`, same as passed into `useReducer` hook
 - `initialState`, same as passed into `useReducer` hook

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
  const [count, dispatch] = useMiddleware(middlewares, reducer, 0);
  const asyncSetCount = () => setTimeout(() => dispatch({ type: "SET", payload: 15 }), 1000);
  const incCount = () => dispatch({ type: "INC" });
  const decCount = () => dispatch({ type: "DEC" });

  return (
    <div className="App">
      <button onClick={decCount}>[-]</button>
      <span>{count}</span>
      <button onClick={incCount}>[+]</button>
      <button onClick={asyncSetCount}>Async</button>
    </div>
  );
}
```

## Live example

A [demo](https://codesandbox.io/s/48ovynqr97) can be found here


## Contributions

Please open an [Issue](https://github.com/venil7/react-usemiddleware/issues) or a [PR](https://github.com/venil7/react-usemiddleware/pulls)


