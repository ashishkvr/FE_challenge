import React, { Component } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
//Components
import Image from "./image";
//utils
import { stopPropagation, dateFormat } from "../../utils/Helper";
import {
  AppConfig,
  tableHeader,
  tablePlaceholder,
} from "../../constants/config";
import Skeleton from "./skeleton";
import Status from "./status";

const TableContainer = ({ data, actionItem }) => {
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.transaction.isLoading);

  const isManual = (status) => {
    return status.toLowerCase() === "manual";
  };

  const loadSkeleton = () => {
    return tablePlaceholder.map((d) => {
      return (
        <tr key={d}>
          {tablePlaceholder.map((i) => (
            <td key={i}>
              <Skeleton size={4} />
            </td>
          ))}
        </tr>
      );
    });
  };

  const dataBody = (data) => {
    return data.map((d) => {
      const isDebit = d["type"].toLowerCase() === "debit";
      return (
        <tr
          className="table-row c-pointer"
          data-testid={`tbody-row-${d["id"]}`}
          key={d["id"]}
          onClick={() => navigate(`/transactions/${d["id"]}`)}
        >
          <td>{dateFormat(d["datetime"], "DD MMM YYYY")}</td>
          <td>{d["merchant"]["name"]}</td>
          <td style={{ color: isDebit ? "red" : "green" }}>{`${
            isDebit ? "-" : ""
          }${d["amount"].toFixed(2)}`}</td>
          <td>
            <Status value={d["status"]} />
          </td>
          <td
            onClick={stopPropagation}
            className={`${
              !isManual(d["status"]) && "opacity-5 pointer-events-none"
            }`}
          >
            <div className="flex-space">
              <Image
                icon="edit-icon"
                dataTestId={`edit-btn-${d["id"]}`}
                altIcon="edit"
                onClick={() =>
                  actionItem({ type: "edit", id: d["id"], rowData: d })
                }
              />
              <Image
                icon="delete-icon red-filter"
                dataTestId={`delete-btn-${d["id"]}`}
                altIcon="delete"
                onClick={() => actionItem({ type: "delete", id: d["id"] })}
              />
            </div>
          </td>
        </tr>
      );
    });
  };

  const noRowTable = () => {
    if(isLoading) {
      return;
    }
    return (
      <tr>
        <td colSpan={5} className="center ff-bl">
          {AppConfig.noDataFound}
        </td>
      </tr>
    );
  };

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr className="table-header ff-bl">
            {tableHeader &&
              tableHeader.map((h) => (
                <th key={h.label} className="p-2">
                  {h.label}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="ff-rg">
          {isLoading && loadSkeleton()}
          {data?.length ? dataBody(data) : noRowTable()}
        </tbody>
      </Table>
      <Outlet />
    </>
  );
};

export default TableContainer;
