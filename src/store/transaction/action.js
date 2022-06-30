import to from 'await-to-js';
import {
  fetchTransactionApi,
  addTransactionApi,
  editTransactionApi,
  deleteTransactionApi,
  detailsTransactionApi,
} from '../../services/transactionService';

export const ActionTypes = {
  // FETCH
  IS_LOADING: 'loading',
  IS_SPINNER: 'spinner',
  FETCH_TRANSACTION_LIST: `fetch-transaction-data`,
  ADD_TRANSACTION: `add-transaction`,
  EDIT_TRANSACTION: `edit-transaction`,
  DELETE_TRANSACTION: `delete-transaction`,
  // ERROR
  ERROR_IN_TRANSACTION: 'error-transaction'
};

export const fetchTransactionTable = () => async dispatch => {
  dispatch({ type: ActionTypes.IS_LOADING });
  const [err, response] = await to(fetchTransactionApi());
  if (err) {
    dispatch({ type: ActionTypes.ERROR_IN_TRANSACTION });
    throw err;
  }
  if(response?.status === 200) {
    dispatch({ type: ActionTypes.FETCH_TRANSACTION_LIST, payload: response.data });
  }
};

export const addTransaction = (payload) => async dispatch => {
  dispatch({ type: ActionTypes.IS_SPINNER });
  const [err, response] = await to(addTransactionApi(payload));
  if (err) {
    dispatch({ type: ActionTypes.ERROR_IN_TRANSACTION });
    throw err;
  }
  if(response?.status === 200) {
    dispatch({ type: ActionTypes.ADD_TRANSACTION, payload: response.data });
    return response;
  }
};

export const editTransaction = (payload, id) => async dispatch => {
  dispatch({ type: ActionTypes.IS_SPINNER });
  const [err, response] = await to(editTransactionApi(payload, id));
  if (err) {
    dispatch({ type: ActionTypes.ERROR_IN_TRANSACTION });
    throw err;
  }
  if(response?.status === 200) {
    dispatch({ type: ActionTypes.EDIT_TRANSACTION, payload: response.data });
    return response;
  }
};

export const deleteTransaction = (id) => async dispatch => {
  dispatch({ type: ActionTypes.IS_SPINNER });
  const [err, response] = await to(deleteTransactionApi(id));
  if (err) {
    dispatch({ type: ActionTypes.ERROR_IN_TRANSACTION });
    throw err;
  }
  if(response?.status === 200) {
    dispatch({ type: ActionTypes.DELETE_TRANSACTION, payload: response.data, id: id });
    return response;
  }
};

export const detailsTransaction = (id) => async dispatch => {
  const [err, response] = await to(detailsTransactionApi(id));
  if (err) {
    dispatch({ type: ActionTypes.ERROR_IN_TRANSACTION });
    throw err;
  }
  if(response?.status === 200) {
    return response.data;
  }
};
