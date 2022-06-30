import { ActionTypes } from './action';

const initialState = {
  isLoading: false,
  isSpinner: false,
  tableData: []
};

const reducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ActionTypes.IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.IS_SPINNER:
      return {
        ...state,
        isSpinner: true,
      };
    case ActionTypes.FETCH_TRANSACTION_LIST:
      return {
        ...state,
        isLoading: false,
        isSpinner: false,
        tableData: action.payload,
      };
    case ActionTypes.ADD_TRANSACTION:
      const appendAddTransaction = (payload, data) => {
        data.unshift(payload);
        return data;
      }
      return {
        ...state,
        isLoading: false,
        isSpinner: false,
        tableData: appendAddTransaction(action.payload, state.tableData),
      };
    case ActionTypes.EDIT_TRANSACTION:
      const modifyEditTransaction = (payload, data) => {
        const index = data.findIndex(item => payload.id === item.id);
        data[index] = payload;
        return data;
      }
      return {
        ...state,
        isLoading: false,
        isSpinner: false,
        tableData: modifyEditTransaction(action.payload, state.tableData),
      };
    case ActionTypes.DELETE_TRANSACTION:
      const deleteTransaction = (id, data) => {
        const index = data.findIndex(item => id === item.id);
        data.splice(index, 1);
        return data;
      }
      return {
        ...state,
        isLoading: false,
        isSpinner: false,
        tableData: deleteTransaction(action.id, state.tableData),
      };
    case ActionTypes.ERROR_IN_TRANSACTION:
      return {
        ...state,
        isLoading: false,
        isSpinner: false,
      };
    default:
      return state;
  }
};

export default reducer;
