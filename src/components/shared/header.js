import React from "react";

const Header = ({title}) => {
  return (
    <>
      <h2 data-testid="header" className="ff-md mt-3 mb-3">{title}</h2>
    </>
  );
};

export default Header;
