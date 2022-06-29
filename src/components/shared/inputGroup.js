import React from "react";
import Form from "react-bootstrap/Form";

const InputGroup = ({ placeholder, name, type="", value="", onChangeInput, isRequired=false }) => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>{name}</Form.Label>
        <Form.Control
          placeholder={placeholder}
          autoFocus
          onChange={onChangeInput}
          type={type}
          name={name}
          required={isRequired}
          value={value}
          autoComplete='off'
        />
      </Form.Group>
    </>
  );
};

export default InputGroup;
