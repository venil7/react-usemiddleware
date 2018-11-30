# REACT-USEMIDDLEWARE

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
 - middlewares - array of middlewares, eg, `[thunk, createLoggers, ...]`
 - reducer, same as passed into `useReducer` hook
 - initialState, same as passed into `useReducer` hook

## Example

```
import React from "react";
import ReactDOM from "react-dom";
import { useReducer, useEffect, useState } from "react";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { useMiddleware } from "react-usemiddleware";

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

function App() {
  const [state, dispatch] = useMiddleware(middlewares, reducer, 0);
  const [fetched, setFetched] = useState(false);
  const loadInit = () =>
    setTimeout(() => dispatch({ type: "SET", payload: 15 }), 1000);
  const incCount = () => dispatch({ type: "INC" });
  const decCount = () => dispatch({ type: "DEC" });
  const setCount = payload => dispatch({ type: "SET", payload });
  useEffect(
    () => {
      if (!fetched) {
        dispatch(loadInit());
        setFetched(true);
      }
    },
    [fetched]
  );
  return (
    <div className="App">
      <button onClick={decCount}>[-]</button>
      <span>{state}</span>
      <button onClick={incCount}>[+]</button>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

```

## Live example

A [demo](https://codesandbox.io/s/48ovynqr97) can be found here


## Contributions

Please open an [Issue](https://github.com/venil7/react-usemiddleware/issues) or a [PR](https://github.com/venil7/react-usemiddleware/pulls)


