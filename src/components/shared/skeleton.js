import React from "react";
import Placeholder from "react-bootstrap/Placeholder";

const Skeleton = ({size}) => {
    return (
      <Placeholder as="p" animation="glow">
        <Placeholder xs={size} bg="secondary" />
      </Placeholder>
    );
  };

export default Skeleton;
