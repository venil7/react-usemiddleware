import { useReducer } from 'react';
import { applyMiddleware } from 'redux';

const useMiddleware = (middlewares, reducer, initState) => {
  const [state, dispatch] = useReducer(reducer, initState);
  const getStore = () => ({ dispatch, getState: () => state });
  const store = applyMiddleware(...middlewares)(getStore)();
  const { dispatch: dispatch_, getState } = store;
  return [getState(), dispatch_];
};

export default useMiddleware;