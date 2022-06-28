// Modules
import React from "react";
import ActionModal from "../components/actionModal";
import { useNavigate } from "react-router-dom";
//Constants
import { AppConfig } from "../constants/config";

const TransactionDetails = () => {
  const navigate = useNavigate();
  return (
    <>
      <ActionModal
        isShow={true}
        handleClose={() => navigate(-1)}
        modalConfig={{ type: "details", title: AppConfig.transactionDetails }}
      />
    </>
  );
};

export default TransactionDetails;
