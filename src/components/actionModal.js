import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

//Components
import InputGroup from "./shared/inputGroup";
import Button from "./shared/button";
import Dropdown from "./shared/dropdown";
import DetailsList from "./detailsList";

//actions
import {
  addTransaction,
  editTransaction,
  deleteTransaction,
  detailsTransaction,
} from "../store/transaction/action";

//Constant
import { AppConfig } from "../constants/config";
import { dateFormat, showToast } from "../utils/Helper";

const ActionModal = ({ isShow, modalConfig, handleClose }) => {
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  const isDeleteModal = modalConfig.type.toLowerCase() === 'delete';
  const isDetailModal = modalConfig.type.toLowerCase() === 'details';

  useEffect(() => {
    if (isDetailModal) {
      dispatch(detailsTransaction(id))
        .then((res) => {setState(res)})
        .catch((err) => {
          showToast(err?.message ?? AppConfig.error, "error");
        });
    }
    return () => {
      setState({});
      setErrors({});
    }; //clears the state at unmounting
  }, []);

  useEffect(() => {
    if (modalConfig.data && Object.keys(modalConfig.data).length > 0) {
      setState(modalConfig.data); //set the state at edit transaction
    }
  }, [modalConfig.data]);

  const dropdownOptions = [AppConfig.debit, AppConfig.credit];

  const updateState = (e) => {
    const key = e?.target?.name.toLowerCase();
    const errorObj = errors;
    let update = {};
    if (key === AppConfig.merchantName.toLowerCase()) {
      update = { ["merchant"]: { ["name"]: e?.target?.value } };
      delete errorObj?.merchant;
    } else {
      update = { [key]: e?.target?.value ?? e?.target?.innerHTML };
      delete errorObj[key];
    }
    setState({ ...state, ...update });
    setErrors({ ...errorObj });
  };

  const mandatoryCheck = () => {
    if (isDeleteModal || isDetailModal) {
      return true;
    }
    const errorObj = {};
    if (!state?.amount || state?.amount <= 0 || isNaN(state?.amount)) {
      errorObj.amount = AppConfig.validAmount;
    }
    if (!(state?.merchant && state.merchant?.name)) {
      errorObj.merchant = AppConfig.validMerchant;
    }
    if (!state?.type) {
      errorObj.type = AppConfig.validType;
    }
    setErrors(errorObj);
    if (Object.keys(errorObj).length) {
      return false;
    } else {
      return true;
    }
  };

  const onSubmitActionDispatch = () => {
    switch (modalConfig.type) {
      case "add":
        dispatch(addTransaction(state))
          .then(() => {
            showToast(AppConfig.transactionAdded);
          })
          .catch((err) => {
            showToast(err?.message ?? AppConfig.error, "error");
          });
        break;
      case "edit":
        dispatch(editTransaction(state, modalConfig.id))
          .then(() => {
            showToast(AppConfig.transactionEdited);
          })
          .catch((err) => {
            showToast(err?.message ?? AppConfig.error, "error");
          });
        break;
      case "delete":
        dispatch(deleteTransaction(modalConfig.id))
          .then(() => {
            showToast(AppConfig.transactionDeleted);
          })
          .catch((err) => {
            showToast(err?.message ?? AppConfig.error, "error");
          });
        break;

      default:
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (mandatoryCheck()) {
      onSubmitActionDispatch();
      handleClose();
    }
  };

  const addEditModalBody = () => {
    return (
      <>
        <InputGroup
          name={AppConfig.amount}
          value={state["amount"]}
          error={errors?.amount}
          placeholder={`${AppConfig.enter} ${AppConfig.amount}`}
          onChangeInput={updateState}
        />
        <InputGroup
          name={AppConfig.merchantName}
          value={state["merchant"] && state["merchant"]["name"]}
          error={errors?.merchant}
          placeholder={`${AppConfig.enter} ${AppConfig.merchantName}`}
          onChangeInput={updateState}
        />
        <Dropdown
          name={AppConfig.type}
          placeholder={state.type ?? `${AppConfig.select} ${AppConfig.type}`}
          textClass={!state.type ? "placeholder-text" : ""}
          error={errors?.type}
          options={dropdownOptions}
          onChangeOption={updateState}
        />
        <InputGroup
          name={AppConfig.reference}
          value={state["reference"]}
          placeholder={`${AppConfig.enter} ${AppConfig.reference}`}
          onChangeInput={updateState}
        />
        <Form.Group className="mb-3">
          <Form.Label>{AppConfig.remarks}</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name={AppConfig.remarks}
            onChange={updateState}
          />
        </Form.Group>
      </>
    );
  };

  const deleteModalBody = () => {
    return <h5 className="text-center ff-rg m-3">{AppConfig.consentDelete}</h5>;
  };

  const detailsModalBody = () => {
    return (
      <>
        <DetailsList
          title={AppConfig.dateAndTime}
          value={dateFormat(state["datetime"], "DD MMM YYYY HH:MM")}
        />
        <DetailsList
          title={AppConfig.merchantName}
          value={state["merchant"] && state["merchant"]["name"]}
        />
        <DetailsList title={AppConfig.amountKhd} value={state["amount"]} />
        <DetailsList title={AppConfig.status} value={state["status"]} />
        <DetailsList title={AppConfig.reference} value={state["reference"]} />
        <DetailsList title={AppConfig.remarks} value={state["remarks"]} />
      </>
    );
  };

  const disableSubmitBtn = () => {
    if(isDeleteModal || isDetailModal) {
      return false;
    } else if(Object.keys(errors).length > 0){
      return true;
    }
  }

  const modalBody = () => {
    switch (modalConfig.type) {
      case "add":
      case "edit":
        return addEditModalBody();
      case "delete":
        return deleteModalBody();
      case "details":
        return detailsModalBody();

      default:
        return handleClose();
    }
  };

  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton className="ff-md">
            <Modal.Title>{modalConfig.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalBody()}</Modal.Body>
          <Modal.Footer>
            <Button
              title={modalConfig.buttonText}
              type="submit"
              disabled={disableSubmitBtn()}
            />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ActionModal;
