import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Status from "./shared/status";
import Skeleton from "./shared/skeleton";

const DetailsList = ({title="", value}) => {
  const detailsValue = (title) => {
    if(value === undefined) {
      return <Skeleton size={3} />
    }
    if(title.toLowerCase() === 'status') {
      return <Status value={value} />
    }
    return <span>{value}</span>
  }

  return (
    <Row className="border-bottom m-2 p-2 flex-center ff-lt">
      <Col>
        <span className="font-weight-bold ff-bl">{title}</span>
      </Col>
      <Col>
        {detailsValue(title, value)}
      </Col>
    </Row>
  );
};

export default DetailsList;
