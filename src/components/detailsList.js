import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DetailsList = ({title="", value=""}) => {
  return (
    <Row className="border-bottom">
      <Col>
        <span className="font-weight-bold">{title}</span>
      </Col>
      <Col>
        <span>{value}</span>
      </Col>
    </Row>
  );
};

export default DetailsList;
