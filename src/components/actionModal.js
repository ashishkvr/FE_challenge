import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

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

const ActionModal = ({ isShow, modalConfig, handleClose }) => {
  const [state, setState] = useState({});
  const dispatch = useDispatch();
  const { id } = useParams();
  
  useEffect(() => {
    if(modalConfig.type === 'details') {
      dispatch(detailsTransaction(id)).then(res => setState(res))
    }
    return () => setState({}); //clears the state at unmounting
  }, []);
  
  useEffect(() => {
    if (modalConfig.data && Object.keys(modalConfig.data).length > 0) {
      setState(modalConfig.data); //set the state at edit transaction
    }
  }, [modalConfig.data]);
  
  const dropdownOptions = [AppConfig.debit, AppConfig.credit];
  const isDeleteModal = modalConfig.type === 'delete';

  const updateState = (e) => {
    const key = e.target.name.toLowerCase();
    let update = {};
    if (key === AppConfig.merchantName.toLowerCase()) {
      update = { ["merchant"]: { ["name"]: e.target.value } };
    } else {
      update = { [key]: e.target.value ?? e.target.innerText };
    }
    setState({ ...state, ...update });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleClose();
    switch (modalConfig.type) {
      case "add":
        dispatch(addTransaction(state));
        break;
      case "edit":
        dispatch(editTransaction(state, modalConfig.id));
        break;
      case "delete":
        dispatch(deleteTransaction(modalConfig.id));
        break;

      default:
        break;
    }
  };

  const addEditModalBody = () => {
    return (
      <>
        <InputGroup
          name={AppConfig.amount}
          value={state["amount"]}
          placeholder={`${AppConfig.enter} ${AppConfig.amount}`}
          onChangeInput={updateState}
          isRequired={true}
          type="number"
        />
        <InputGroup
          name={AppConfig.merchantName}
          value={state["merchant"] && state["merchant"]["name"]}
          placeholder={`${AppConfig.enter} ${AppConfig.merchantName}`}
          onChangeInput={updateState}
          isRequired={true}
        />
        <Dropdown
          name={AppConfig.type}
          placeholder={state.type ?? `${AppConfig.select} ${AppConfig.type}`}
          options={dropdownOptions}
          onChangeOption={updateState}
          isRequired={true}
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
    return (
      <h5 className="text-center">{AppConfig.consentDelete}</h5>
    )
  }

  const detailsModalBody = () => {
    return (
      <>
        <DetailsList title={AppConfig.dateAndTime} value={moment(state["datetime"]).format("DD MMM YYYY HH:MM")} />
        <DetailsList title={AppConfig.merchantName} value={state['merchant'] && state['merchant']['name']} />
        <DetailsList title={AppConfig.amountKhd} value={state['amount']} />
        <DetailsList title={AppConfig.status} value={state['status']} />
        <DetailsList title={AppConfig.reference} value={state['reference']} />
        <DetailsList title={AppConfig.remarks} value={state['remarks']} />
      </>
    )
  }
  const modalBody = () => {
    console.log(modalConfig.type)
    switch (modalConfig.type) {
      case "add":
      case "edit":
        return addEditModalBody();
      case "delete":
        return deleteModalBody();
      case "details":
        return detailsModalBody();

      default:
        break;
    }
  }
  console.log("state", state);

  return (
    <>
      <Modal show={isShow} onHide={handleClose}>
        <Form onSubmit={onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{modalConfig.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalBody()}
          </Modal.Body>
          <Modal.Footer>
            <Button title={isDeleteModal ? AppConfig.delete : AppConfig.submit} type="submit" />
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default ActionModal;
