const baseRoute = "https://psl-mock-api.herokuapp.com";

const endpoints = {
  transactions: `${baseRoute}/transactions`,
  editDeleteTransaction: (id) => `${baseRoute}/transactions/${id}`,
};

export default endpoints;
