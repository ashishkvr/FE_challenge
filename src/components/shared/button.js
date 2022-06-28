import React from "react";
import Button from "react-bootstrap/Button";
//Components
import Image from "./image";

const ButtonComponent = ({title, type="", onButtonClick, icon, altIcon }) => {
  const showIcon = () => {
    if(!icon) {
      return;
    }
    return <Image icon={icon} altIcon={altIcon} />;
  }

  return (
    <>
      <Button variant="primary" onClick={onButtonClick} type={type}>
        {showIcon()}
        {title}
      </Button>
    </>
  );
};

export default ButtonComponent;
