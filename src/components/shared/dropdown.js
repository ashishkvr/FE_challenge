import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

const DropdownComponent = ({name, placeholder, options, onChangeOption}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{name}</Form.Label>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100 dropdown-button">
            {placeholder}
        </Dropdown.Toggle>

        <Dropdown.Menu className="w-100" onClick={onChangeOption}>
					{options.map(item => <Dropdown.Item name={name}>{item}</Dropdown.Item>)}
        </Dropdown.Menu>
      </Dropdown>
    </Form.Group>
  );
};

export default DropdownComponent;
