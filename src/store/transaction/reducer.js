import { ActionTypes } from './action';

const initialState = {
  isLoading: false,
  tableData: []
};

const reducer = (state = initialState, action) => {
  const { type } = action;
  console.log("type", type)
  console.log("payload", action.payload)
  switch (type) {
    case ActionTypes.FETCH_TRANSACTION_LIST:
      return {
        ...state,
        isLoading: false,
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
        tableData: appendAddTransaction(action.payload, state.tableData),
      };
    default:
      return state;
  }
};

export default reducer;
