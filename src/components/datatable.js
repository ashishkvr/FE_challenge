import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

//actions
import { fetchTransactionTable } from "../store/transaction/action";

//components
import Table from "./shared/table";
import SearchBox from "./shared/searchbox";
import Pagination from "./shared/pagination";
import Button from "./shared/button";

//Constant
import { AppConfig } from "../constants/config";
import { showToast } from "../utils/Helper";

const Datatable = ({onShowModal}) => {
  const ITEMS_PER_PAGE = AppConfig.itemsPerPage;
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const sortByDateTime = (a, b) => {
    return a.datetime > b.datetime ? -1 : a.datetime < b.datetime ? 1 : 0;
  };
  const totalData = useSelector((state) =>
    state.transaction
  );

  useEffect(() => {
    dispatch(fetchTransactionTable()).catch(err => {
      showToast(err?.message ?? AppConfig.error, "error");
    });
  }, []);

  const transactionData = useMemo(() => {
    let allData = Array.isArray(totalData?.tableData) &&totalData.tableData.sort(sortByDateTime);

    if (searchValue.trim()) {
      setCurrentPage(1);
      allData = allData.filter((data) =>
        data["merchant"]["name"].toLowerCase().includes(searchValue)
      );
    }
    
    setFilteredData(allData);

    return allData.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
    );
  }, [totalData, currentPage, searchValue]);

  const invokeModalAction = ({type, id='', rowData={}}) => {
    onShowModal(type, id, rowData);
  }
  return (
    <>
      <Row>
        <Col xs="4">
          <SearchBox
            placeholder={AppConfig.merchantPlaceholder}
            onChangeSearch={(value) => setSearchValue(value)}
          />
        </Col>
        <Col xs="8">
          <Button
            title={AppConfig.addTransaction}
            onButtonClick={() => invokeModalAction({type: "add"})}
            icon="add-icon white-filter"
            altIcon="add"
            textClass="pl-1"
          />
        </Col>
      </Row>
      <Table data={transactionData} actionItem={(action) => invokeModalAction(action)} />
      <Pagination
        total={filteredData.length}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
};

export default Datatable;
