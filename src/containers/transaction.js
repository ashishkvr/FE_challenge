import React from "react";
import TransactionTable from "../components/transactionTable";
import Header from "../components/shared/header";
//Constants
import { AppConfig } from "../constants/config"

const Transaction = () => {
  return (
    <div className="bg-color">
      <Header title={AppConfig.transactionTitle} />
      <TransactionTable />
    </div>
  );
};

export default Transaction;
