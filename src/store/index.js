import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import transaction from './transaction/reducer';

const appReducer = combineReducers({
  transaction,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default function store() {
  return createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware),
  );
}
