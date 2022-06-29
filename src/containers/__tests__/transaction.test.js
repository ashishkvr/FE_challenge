import React from "react";
import { Provider } from "react-redux";
import mockAxios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { render as rtlRender, fireEvent, waitFor, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

//components
import Transaction from "../transaction";
import store from "../../store";

const transactionData = [
  {"id":1,"amount":8972,"currency":"HKD","datetime":"2021-03-11T17:06:15.000Z","merchant":{"name":"OCEANICAIRWAYS"},"status":"COMPLETED","type":"DEBIT"},
  {"id":2,"amount":2795.99,"currency":"HKD","datetime":"2021-05-09T19:17:15.000Z","merchant":{"name":"RESERVECOM"},"status":"COMPLETED","type":"DEBIT"}
]

const render = (component) =>
  rtlRender(
    <Provider store={store()}>
      <Router>{component}</Router>
    </Provider>
);

jest.mock('axios', () => {
  return {
    get: jest.fn()
  };
});

describe("Transaction screen rendering", () => {
  test("renders the component with header", () => {
    const { getByTestId } = render(<Transaction />);
    const header = getByTestId("header");
    expect(header).toHaveTextContent("Transactions");
  });

  test("to be have table with columns headers", () => {
    const { getAllByRole } = render(<Transaction />);
    const headers = getAllByRole("columnheader");
    expect(headers[0]).toHaveTextContent("Date");
    expect(headers[1]).toHaveTextContent("Merchant");
    expect(headers[2]).toHaveTextContent("Amount(HKD)");
    expect(headers[3]).toHaveTextContent("Status");
    expect(headers[4]).toHaveTextContent("Action");
  });

  test("to have searchbar and add transaction button", () => {
    const { getByRole } = render(<Transaction />);
    const searchbox = getByRole("searchbox");
    const button = getByRole("button");
    expect(searchbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test("opens a modal on add transaction click", () => {
    const { getByRole, getByText } = render(<Transaction />);
    const button = getByRole("button");
    fireEvent.click(button);
    //After add transaction button click
    const addModalTitle = getByText("Add New Manual Transaction");
    expect(addModalTitle).toBeInTheDocument();
  });
});

describe("Transaction table rendering", () => {
  afterEach(async () => {
    cleanup();
  })

  test("renders the table with data", async () => {
    mockAxios.get.mockResolvedValue({ status: 200, data: transactionData });
    
    const { getByTestId } = render(<Transaction />);
    const rowFirst = await waitFor(() => getByTestId('tbody-row-1'));
    const rowSecond = await waitFor(() => getByTestId('tbody-row-2'));
    expect(rowFirst).toHaveTextContent("OCEANICAIRWAYS");
    expect(rowSecond).toHaveTextContent("RESERVECOM");
  });
})
