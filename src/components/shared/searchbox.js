import React from "react";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

const SearchBox = ({placeholder, onChangeSearch}) => {
  return (
    <>
      <InputGroup className="mb-3">
        <FormControl
          placeholder={placeholder}
          onChange={(e) => onChangeSearch(e.target.value.toLowerCase())}
          type="search"
        />
      </InputGroup>
    </>
  );
};

export default SearchBox;
