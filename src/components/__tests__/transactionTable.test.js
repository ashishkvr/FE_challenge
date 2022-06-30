import React from "react";
import { Provider } from "react-redux";
import mockAxios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import {
  render as rtlRender,
  fireEvent,
  waitFor,
  cleanup,
  screen
} from "@testing-library/react";
import "@testing-library/jest-dom";

//components
import TransactionTable from "../transactionTable";
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
  }
];

const renderWithRoute = (component) => <Router>{component}</Router>;
const renderWithoutRoute = (component) => component;

const render = (component, route = renderWithRoute) =>
  rtlRender(<Provider store={store()}>{route(component)}</Provider>);

jest.mock("axios", () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  };
});

describe("Transaction Table validation", () => {
  test("validation enabled for amount field", async () => {
    const { getByRole, getByLabelText } = render(<TransactionTable />);
    const button = getByRole("button");
    fireEvent.click(button);
    const amountInput = getByLabelText("Amount").closest("input");
    fireEvent.change(amountInput, { target: { value: "" } });
    const submitBtn = getByRole("button", { name: "Submit" });
    await fireEvent.click(submitBtn);
    expect(submitBtn).toHaveAttribute("disabled");
  });

  test("validation enabled for merchant field", async () => {
    const { getByRole, getByLabelText } = render(<TransactionTable />);
    const button = getByRole("button");
    fireEvent.click(button);
    const merchantInput = getByLabelText("Merchant Name").closest("input");
    fireEvent.change(merchantInput, { target: { value: "" } });
    const submitBtn = getByRole("button", { name: "Submit" });
    await fireEvent.click(submitBtn);
    expect(submitBtn).toHaveAttribute("disabled");
  });

  test("validation enabled for type field", async () => {
    const { getByRole, getByLabelText } = render(<TransactionTable />);
    const button = getByRole("button");
    fireEvent.click(button);
    const typeBtn = getByLabelText("Type").closest("button");
    fireEvent.click(typeBtn, { target: { innerText: "" } });
    const submitBtn = getByRole("button", { name: "Submit" });
    await fireEvent.click(submitBtn);
    expect(submitBtn).toHaveAttribute("disabled");
  });
});

describe("create, read, update and delete from transaction table", () => {

  afterEach(() => {
    cleanup();
  })

  test("able to read the table row", async () => {
    mockAxios.get.mockResolvedValue({ status: 200, data: transactionData });

    const { getByTestId } = render(<TransactionTable />);
    const rowFirst = await waitFor(() => getByTestId("tbody-row-1"));
    expect(rowFirst).toHaveTextContent("11 Mar 2021");
    expect(rowFirst).toHaveTextContent("OCEANICAIRWAYS");
    expect(rowFirst).toHaveTextContent("-8972.00");
    expect(rowFirst).toHaveTextContent("COMPLETED");
  });

  test("able to add new table row", async () => {
    const postData = {
      id: 1,
      amount: 1000,
      currency: "HKD",
      merchant: { name: "TEST MERCHANT" },
      status: "COMPLETED",
      type: "DEBIT",
    };
    mockAxios.post.mockResolvedValue({ status: 200, data: postData });

    const { getByRole, getByText, getByLabelText, getByTestId } = render(<TransactionTable />);
    const button = getByRole("button");
    fireEvent.click(button);
    const merchantInput = getByLabelText("Merchant Name").closest("input");
    const amountInput = getByLabelText("Amount").closest("input");
    const typeDropdownBtn = getByLabelText("Type").closest("button");
    
    fireEvent.change(amountInput, { target: { value: "1000" } });
    fireEvent.change(merchantInput, { target: { value: "TEST MERCHANT" } });
    fireEvent.click(typeDropdownBtn);
    fireEvent.click(getByText("DEBIT"));

    const submitBtn = getByRole("button", { name: "Submit" });
    fireEvent.click(submitBtn);

    const rowFirst = await waitFor(() => getByTestId("tbody-row-1"));
    expect(rowFirst).toHaveTextContent("TEST MERCHANT");
    expect(rowFirst).toHaveTextContent("-1000");
  });

  test("able to update the table row", async () => {
    const updatedTransactionData = {
      ...transactionData[0],
      amount: 1000,
      merchant: { name: "TEST MERCHANT" }
    }
    mockAxios.get.mockResolvedValue({ status: 200, data: transactionData });
    mockAxios.patch.mockResolvedValue({ status: 200, data: updatedTransactionData });

    const { getByTestId, getByLabelText, getByRole } = render(<TransactionTable />);

    //Opening Edit dialog to update
    const editButton = getByTestId("edit-btn-1");
    await fireEvent.click(editButton);
    // updating the merchant and amount
    const merchantInput = getByLabelText("Merchant Name").closest("input");
    const amountInput = getByLabelText("Amount").closest("input");
    fireEvent.change(amountInput, { target: { value: "1000" } });
    fireEvent.change(merchantInput, { target: { value: "TEST MERCHANT" } });

    const updateBtn = getByRole("button", { name: "Update" });
    await fireEvent.click(updateBtn);

    await waitFor(() => {
      const updatedRow = screen.getByTestId('tbody-row-1');
      expect(updatedRow).toHaveTextContent("TEST MERCHANT");
      expect(updatedRow).toHaveTextContent("-1000");
    });
  });

  test("able to delete the table row", async () => {
    mockAxios.get.mockResolvedValue({ status: 200, data: transactionData }); //Fetch mock data
    mockAxios.delete.mockResolvedValue({ status: 200, data: transactionData[0] }); //Delete mock data

    const { getByTestId, getByRole } = render(<TransactionTable />);
    await waitFor(() => {
      const initialRow = screen.getByTestId("tbody-row-1");
      expect(initialRow).toHaveTextContent("11 Mar 2021");
      expect(initialRow).toHaveTextContent("OCEANICAIRWAYS");
    })

    //Opening delete dialog to delete the data
    const deleteBtn = getByTestId("delete-btn-1");
    await fireEvent.click(deleteBtn);

    const handleDelete = getByRole("button", { name: "Delete" });
    fireEvent.click(handleDelete);

    await waitFor(() => {
      const merchantName = screen.queryByText('OCEANICAIRWAYS');
      const date = screen.queryByText('11 Mar 2021');
      expect(merchantName).not.toBeInTheDocument();
      expect(date).not.toBeInTheDocument();
    });
  });
});
