import http from "axios";
import endpoints from "../constants/endpoints";

export const fetchTransactionApi = () => {
  return http.get(`${endpoints.transactions}`);
};

export const addTransactionApi = (payload) =>
  http.post(endpoints.transactions, payload);

export const editTransactionApi = (payload, id) =>
  http.patch(endpoints.editDeleteTransaction(id), payload);

export const deleteTransactionApi = (id) => {
  return http.delete(endpoints.editDeleteTransaction(id));
};

export const detailsTransactionApi = (id) => {
  return http.get(endpoints.editDeleteTransaction(id));
};
