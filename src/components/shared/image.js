import React from "react";

const Image = ({icon, altIcon, onClick }) => {
  return (
    <>
      <img className={icon} alt={altIcon} onClick={onClick} />
    </>
  );
};

export default Image;
