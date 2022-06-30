import React from "react";
import Form from "react-bootstrap/Form";

const InputGroup = ({
  placeholder,
  name,
  type = "",
  value = "",
  onChangeInput,
  error = ""
}) => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label htmlFor={name}>{name}</Form.Label>
        <Form.Control
          id={name}
          placeholder={placeholder}
          className={`${error ? 'red-border' : ''}`}
          autoFocus
          onChange={onChangeInput}
          type={type}
          name={name}
          value={value}
          autoComplete="off"
        />
        {error && (
            <Form.Text className="errorText">
              {error}
            </Form.Text>
          )}
      </Form.Group>
    </>
  );
};

export default InputGroup;
