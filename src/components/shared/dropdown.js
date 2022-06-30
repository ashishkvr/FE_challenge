import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

const DropdownComponent = ({
  textClass,
  name,
  placeholder="",
  error="",
  options,
  onChangeOption,
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={name}>{name}</Form.Label>
      <Dropdown>
        <Dropdown.Toggle
          variant="primary"
          id={name}
          className={`${
            error ? "red-border" : ""
          } ${textClass} w-100 dropdown-button`}
        >
          {placeholder}
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-100" onClick={onChangeOption}>
          {options.map((item) => (
            <Dropdown.Item key={item} name={name}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {!!error && <Form.Text className="errorText">{error}</Form.Text>}
    </Form.Group>
  );
};

export default DropdownComponent;
