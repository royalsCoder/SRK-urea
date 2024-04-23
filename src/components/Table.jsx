import React from "react";

const Table = () => {
  return (
    <div>
      <div className="row m-0 ">
        <div
          style={{ width: "3rem" }}
          className="col-2 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
        ></div>
        <div className="col p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"></div>
        <div
          style={{ width: "6rem" }}
          className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
        ></div>
        <div
          style={{ width: "6rem" }}
          className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
        ></div>
        <div
          style={{ width: "6rem" }}
          className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
        ></div>
        <div
          style={{ width: "6rem" }}
          className="col-3 p-0  ps-2 py-2 d-flex justify-content-start align-items-center"
        ></div>
      </div>
    </div>
  );
};

export default Table;
