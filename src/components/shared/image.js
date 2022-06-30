import React from "react";

const Image = ({icon, altIcon, onClick, dataTestId }) => {
  return (
    <>
      <img data-testid={dataTestId} className={icon} alt={altIcon} onClick={onClick} />
    </>
  );
};

export default Image;
