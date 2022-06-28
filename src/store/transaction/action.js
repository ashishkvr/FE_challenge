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
  FETCH_TRANSACTION_LIST: `fetch-transaction-data`,
  ADD_TRANSACTION: `add-transaction`,
  EDIT_TRANSACTION: `edit-transaction`,
  DELETE_TRANSACTION: `delete-transaction`
};

export const fetchTransactionTable = () => async dispatch => {
  const [err, response] = await to(fetchTransactionApi());
  if (err) {
    throw err;
  }
  if(response?.status === 200) {
    dispatch({ type: ActionTypes.FETCH_TRANSACTION_LIST, payload: response.data });
  }
};

export const addTransaction = (payload) => async dispatch => {
  const [err, response] = await to(addTransactionApi(payload));
  if (err) {
    throw err;
  }
  if(response?.status === 200) {
    dispatch({ type: ActionTypes.ADD_TRANSACTION, payload: response.data });
  }
};

export const editTransaction = (payload, id) => async dispatch => {
  const [err, response] = await to(editTransactionApi(payload, id));
  if (err) {
    throw err;
  }
  if(response?.status === 200) {
    dispatch({ type: ActionTypes.EDIT_TRANSACTION, payload: response.data });
  }
};

export const deleteTransaction = (id) => async dispatch => {
  const [err, response] = await to(deleteTransactionApi(id));
  if (err) {
    throw err;
  }
  if(response?.status === 200) {
    dispatch({ type: ActionTypes.DELETE_TRANSACTION, payload: response.data });
  }
};

export const detailsTransaction = (id) => async dispatch => {
  const [err, response] = await to(detailsTransactionApi(id));
  if (err) {
    throw err;
  }
  if(response?.status === 200) {
    return response.data;
  }
};
