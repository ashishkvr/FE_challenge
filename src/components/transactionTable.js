import React, { useState } from "react";
import Datatable from "./datatable";
//Components
import ActionModal from "./actionModal";
import { AppConfig } from "../constants/config";

const Transaction = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({});

  const onShowModal = (action, itemId, itemData) => {
    setShowModal(true);
    switch (action.toLowerCase()) {
      case "add":
        setModalConfig({ type: "add", title: AppConfig.addNewTransaction, buttonText: AppConfig.submit });
        break;
      case "edit":
        setModalConfig({
          type: "edit",
          title: AppConfig.editTransaction,
          buttonText: AppConfig.update,
          id: itemId,
          data: itemData,
        });
        break;
      case "delete":
        setModalConfig({
          type: "delete",
          title: AppConfig.deleteTransaction,
          buttonText: AppConfig.delete,
          id: itemId,
        });
        break;

      default:
        break;
    }
  };

  const onCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <Datatable onShowModal={onShowModal} />
      {showModal && (
        <ActionModal
          isShow={showModal}
          handleClose={onCloseModal}
          modalConfig={modalConfig}
        />
      )}
    </>
  );
};

export default Transaction;
