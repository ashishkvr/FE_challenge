import React from "react";
import { Provider } from "react-redux";
import mockAxios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import {
  render as rtlRender,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom";

//components
import Transaction from "../transaction";
import App from "../../App";
import store from "../../store";

const transactionData = [
  {
    id: 1,
    amount: 8972,
    currency: "HKD",
    datetime: "2021-03-11T17:06:15.000Z",
    merchant: { name: "OCEANICAIRWAYS" },
    status: "COMPLETED",
    type: "DEBIT",
  },
  {
    id: 2,
    amount: 2795.99,
    currency: "HKD",
    datetime: "2021-05-09T19:17:15.000Z",
    merchant: { name: "RESERVECOM" },
    status: "COMPLETED",
    type: "DEBIT",
  },
];

const renderWithRoute = (component) => <Router>{component}</Router>;
const renderWithoutRoute = (component) => component;

const render = (component, route=renderWithRoute) =>
rtlRender(<Provider store={store()}>{route(component)}</Provider>);


jest.mock("axios", () => {
  return {
    get: jest.fn(),
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
    expect(headers[4]).toHaveTextContent("");
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
  });

  test("renders the table with data", async () => {
    mockAxios.get.mockResolvedValue({ status: 200, data: transactionData });

    const { getByTestId } = render(<Transaction />);
    const rowFirst = await waitFor(() => getByTestId("tbody-row-1"));
    const rowSecond = await waitFor(() => getByTestId("tbody-row-2"));
    expect(rowFirst).toHaveTextContent("OCEANICAIRWAYS");
    expect(rowSecond).toHaveTextContent("RESERVECOM");
  });

  test("open the transaction detail dialog", async () => {
    mockAxios.get.mockResolvedValue({ status: 200, data: transactionData });

    const { getByTestId, getByText } = render(<App />, renderWithoutRoute);
    const rowFirst = await waitFor(() => getByTestId("tbody-row-1"));
    await fireEvent.click(rowFirst);
    //On transaction data row click
    const transactionDetailText = getByText("Transactions Details");
    expect(transactionDetailText).toBeInTheDocument();
  });

  test("open the transaction edit dialog", async () => {
    mockAxios.get.mockResolvedValue({ status: 200, data: transactionData });

    const { getByTestId, getByText } = render(<Transaction />);
    const editButton = await waitFor(() => getByTestId("edit-btn-1"));
    await fireEvent.click(editButton);
    //On transaction edit data
    const transactionEditTitle = getByText("Edit Transaction");
    expect(transactionEditTitle).toBeInTheDocument();
  });

  test("open the transaction delete dialog", async () => {
    mockAxios.get.mockResolvedValue({ status: 200, data: transactionData });

    const { getByTestId, getByText } = render(<Transaction />);
    const deleteButton = await waitFor(() => getByTestId("delete-btn-1"));
    await fireEvent.click(deleteButton);
    //On transaction delete data
    const transactionDeleteTitle = getByText("Delete Transaction");
    expect(transactionDeleteTitle).toBeInTheDocument();
  });
});

describe("search data based on search", () => {
  beforeEach(() => {
    cleanup();
    mockAxios.get.mockResolvedValue({ status: 200, data: transactionData });
  });

  afterEach(() => {
    cleanup();
  })

  test("search data based on valid merchant name", async () => {
    const { getByRole, getByTestId } = render(<Transaction />);
    const searchbox = getByRole("searchbox");
    fireEvent.change(searchbox, { target: { value: "OCEAN" }})
    await waitFor(() => {
      const filterData = getByTestId('tbody-row-1');
      expect(filterData).toHaveTextContent("OCEANICAIRWAYS");
      expect(filterData).not.toHaveTextContent("RESERVECOM");
    })
  })
  
  test("search data based on invalid merchant name", async () => {
    const { getByRole, getAllByRole } = render(<Transaction />);
    const searchbox = getByRole("searchbox");
    fireEvent.change(searchbox, { target: { value: "XYZ" }})
    await waitFor(() => {
      const filterData = getAllByRole('row')[1];
      expect(filterData).toHaveTextContent("No Data Found");
      expect(filterData).not.toHaveTextContent("RESERVECOM");
      expect(filterData).not.toHaveTextContent("OCEANICAIRWAYS");
    })
  })
})
