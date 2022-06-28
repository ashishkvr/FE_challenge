import React, { Component } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import moment from "moment";
//Components
import Image from "./image";
//utils
import { stopPropagation } from "../../utils/Helper";
import { tableHeader, tablePlaceholder } from "../../constants/config";
import Skeleton from "./skeleton";

const TableContainer = ({ data, actionItem }) => {
  const navigate = useNavigate();

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr className="table-header">
            {tableHeader &&
              tableHeader.map((h) => (
                <th className="table-header">{h.label}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.length
            ? data.map((d) => {
                const isDebit = d["type"].toLowerCase() === "debit";
                return (
                  <tr
                    className="table-row c-pointer"
                    key={d["id"]}
                    onClick={() => navigate(`/transactions/${d["id"]}`)}
                  >
                    <td>{moment(d["datetime"]).format("DD MMM YYYY")}</td>
                    <td>{d["merchant"]["name"]}</td>
                    <td style={{ color: isDebit ? "red" : "green" }}>{`${
                      isDebit ? "-" : ""
                    }${d["amount"].toFixed(2)}`}</td>
                    <td>
                      <span
                        className="rounded-pill"
                        style={{
                          backgroundColor:
                            d["status"].toLowerCase() === "completed"
                              ? "green"
                              : "red",
                        }}
                      >
                        {d["status"]}
                      </span>
                    </td>
                    <td
                      onClick={stopPropagation}
                    >
                      <Image
                        icon="edit-icon"
                        altIcon="edit"
                        onClick={() =>
                          actionItem({ type: "edit", id: d["id"], rowData: d })
                        }
                      />
                      <Image
                        icon="delete-icon"
                        altIcon="delete"
                        onClick={() =>
                          actionItem({ type: "delete", id: d["id"] })
                        }
                      />
                    </td>
                  </tr>
                );
              })
            : tablePlaceholder.map((d) => {
                return (
                  <tr key={d}>
                    {tablePlaceholder.map(() => (
                      <td>
                        <Skeleton size={4} />
                      </td>
                    ))}
                  </tr>
                );
              })}
        </tbody>
      </Table>
      <Outlet />
    </>
  );
};

export default TableContainer;
