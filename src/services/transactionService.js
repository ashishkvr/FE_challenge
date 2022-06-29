import axios from "axios";
import endpoints from "../constants/endpoints";

export const fetchTransactionApi = () => {
  return axios.get(`${endpoints.transactions}`);
};

export const addTransactionApi = (payload) =>
  axios.post(endpoints.transactions, payload);

export const editTransactionApi = (payload, id) =>
  axios.patch(endpoints.editDeleteTransaction(id), payload);

export const deleteTransactionApi = (id) => {
  return axios.delete(endpoints.editDeleteTransaction(id));
};

export const detailsTransactionApi = (id) => {
  return axios.get(endpoints.editDeleteTransaction(id));
};
