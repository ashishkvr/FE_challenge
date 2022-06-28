import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

//actions
import { fetchTransactionTable } from "../store/transaction/action";

//components
import Table from "./shared/table";
import SearchBox from "./shared/searchbox";
import Pagination from "./shared/pagination";
import Button from "./shared/button";

//Constant
import { AppConfig } from "../constants/config";

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
    state.transaction.tableData.sort(sortByDateTime)
  );

  useEffect(() => {
    dispatch(fetchTransactionTable());
  }, []);

  const transactionData = useMemo(() => {
    let allData = totalData;

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
      <SearchBox
        placeholder={AppConfig.merchantPlaceholder}
        onChangeSearch={(value) => setSearchValue(value)}
      />
      <Button
        title={AppConfig.addTransaction}
        onButtonClick={() => invokeModalAction({type: "add"})}
        icon="edit-icon"
        altIcon="add"
      />
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
