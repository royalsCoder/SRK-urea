import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import logo from "../public/logo/logo.png";
import { useReactToPrint } from "react-to-print";
import Table from "./components/Table";

function App() {
  const [count, setCount] = useState(0);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   number: "",
  // });

  const [status, setStatus] = useState(true);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("formData");
    return savedData
      ? JSON.parse(savedData)
      : {
          name: "",
          vehicleNo: "",
          vehivleKm: "",
          itemName: "",
          quantity: "",
          amount: "",
        };
  });

  // Update local storage whenever form data changes
  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const onchangeData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const convertNumberToWords = (number) => {
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const tens = [
      "",
      "Ten",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];
    const crore = "Crore";
    const lakh = "Lakh";
    const arab = "Arab";
    const currency = "Rupees";
    const paisa = "Paisa";

    if (number === 0) {
      return "Zero " + currency;
    }

    let words = "";

    if (number >= 1000000000) {
      words +=
        convertNumberToWords(Math.floor(number / 1000000000)) +
        " " +
        arab +
        " ";
      number %= 1000000000;
    }
    if (number >= 10000000) {
      words +=
        convertNumberToWords(Math.floor(number / 10000000)) + " " + crore + " ";
      number %= 10000000;
    }

    if (number >= 100000) {
      words +=
        convertNumberToWords(Math.floor(number / 100000)) + " " + lakh + " ";
      number %= 100000;
    }

    if (number >= 1000) {
      words += convertNumberToWords(Math.floor(number / 1000)) + " Thousand ";
      number %= 1000;
    }

    if (number >= 100) {
      words += convertNumberToWords(Math.floor(number / 100)) + " Hundred ";
      number %= 100;
    }

    if (number >= 20) {
      words += tens[Math.floor(number / 10)] + " ";
      number %= 10;
    } else if (number >= 10) {
      console.log(number);
      words += teens[number - 10] + " ";
      number = 0;
      console.log(words);
    }

    if (number > 0) {
      words += units[number] + " ";
    }
    const decimalPart = Math.round((number % 1) * 100);
    console.log(decimalPart);
    if (decimalPart > 0) {
      words += "and" + decimalPart + " " + paisa + "only ";
    }

    console.log(words);
    return words.trim() + " ";
  };

  let grandTotal = formData?.number; // Example value
  let amountWord = convertNumberToWords(grandTotal);
  console.log(amountWord);
  // const toword = toWords(formData?.number);

  const add = (e) => {
    e.preventDefault();
    setStatus(false);
    console.log("add form");
  };

  const deleteData = () => {
    localStorage.removeItem("formData");
    setFormData({
      name: "",
      vehicleNo: "",
      vehivleKm: "",
      itemName: "",
      quantity: "",
      amount: "",
    });
  };

  return (
    <>
      {status ? (
        <>
          <div className="container mt-4 ">
            <h2 style={{ textAlign: "center" }}>Fill User Data</h2>
            <form onSubmit={add}>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label htmlFor="selectDepot" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={onchangeData}
                    placeholder="Enter Name"
                    required
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="selectDepot" className="form-label">
                    VEHICLE NO:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehicleNo"
                    value={formData.vehicleNo}
                    onChange={onchangeData}
                    placeholder="Enter Vehicle No"
                    required
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="selectDepot" className="form-label">
                    VEHICLE K.M.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="vehivleKm"
                    value={formData.vehivleKm}
                    onChange={onchangeData}
                    placeholder="Enter K.M."
                    required
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="selectDepot" className="form-label">
                    ITEM NAME:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="itemName"
                    value={formData.itemName}
                    onChange={onchangeData}
                    placeholder="Enter Item"
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="selectDepot" className="form-label">
                    QUANTITY:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="quantity"
                    value={formData.quantity}
                    onChange={onchangeData}
                    placeholder="Enter Quantity"
                    required
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="selectDepot" className="form-label">
                    AMOUNT:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="amount"
                    value={formData.amount}
                    onChange={onchangeData}
                    placeholder="Enter Amt"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12" style={{ textAlign: "center" }}>
                <button type="submit" className="btn btn-success">
                  PRINT
                </button>
                <button onClick={deleteData} className="btn btn-success mx-3">
                  clear Data
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <div>
          <button onClick={handlePrint} className="btn btn-primary">
            print
          </button>
          <div ref={componentRef} style={{ width: "90%", margin: "2rem auto" }}>
            <div className=" w-100 m-auto invoice ">
              <div className="row m-0 d-flex invoice-border-bottom">
                <div className="col-2 p-0">
                  <img className="w-100 ps-2" src={logo} alt="logo" />
                </div>
                <div className="col p-0 text-center">
                  <h5 className="m-0 mainheading">DIVOL PETRO CHEM</h5>
                  <p className="m-0">
                    11, KASHIPUR DHANPALPUR, KHUSHIPUR SADAR,AH 1 BHADWAR <br />
                    VARANASI ,UTTAR PRADESH -226021
                  </p>
                  <p className="mb-3">
                    Phone No : 9569853060 E-mail : defdke@gmail.com
                  </p>
                </div>
                <div className="col-2"></div>
              </div>
              <div className="row m-0 py-2 rowpadding invoice-border-bottom">
                <p className="m-0">
                  <strong>GSTIN:</strong> 09FHGRVR2342{" "}
                </p>
              </div>
              <div className="row padding-y m-0 invoice-border-bottom">
                <div className="col p-0">
                  <p className=" ps-2">
                    <strong>DEV NATRAY</strong>
                  </p>
                  <p className="m-0 ps-2">
                    <strong>GSTIN : </strong>
                  </p>
                  <p className="m-0 ps-2">
                    <strong>UID NO : </strong>
                  </p>
                </div>
                <div className="col p-0">
                  <p className="m-0">
                    Invoice No: <strong>23-24/b371</strong>{" "}
                  </p>
                  <p className="m-0">
                    Book No: <strong>8 </strong>{" "}
                  </p>
                  <p className="m-0">
                    Invoice Date: <strong>23/03/2024 </strong>
                  </p>
                  <p className="m-0">Destination: </p>
                  <p className="m-0">Dispatched Through: </p>
                  <p className="m-0">
                    Vehical No: <strong>nl 01 ag 7545</strong>{" "}
                  </p>
                </div>
              </div>

              <div className="row m-0 invoice-border-bottom tablebg">
                <div
                  style={{ width: "3rem" }}
                  className="col-2 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>S no.</strong>
                </div>
                <div className="col p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center">
                  <strong>Item</strong>
                </div>
                <div
                  style={{ width: "6rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>HSN/SAL</strong>
                </div>
                <div
                  style={{ width: "4rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>Unit</strong>
                </div>
                <div
                  style={{ width: "4rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>Qyt.</strong>
                </div>
                <div
                  style={{ width: "5rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>Rate</strong>
                </div>
                <div
                  style={{ width: "6rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>Amount</strong>
                </div>
                <div
                  style={{ width: "4rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>Disc.</strong>
                </div>
                <div
                  style={{ width: "7rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>Taxable Amt</strong>
                </div>
                <div
                  style={{ width: "6rem" }}
                  className="col-3 p-0  ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>Net Amt</strong>
                </div>
              </div>

              <Table />
              <Table />
              <Table />
              <Table />

              <Table />
              <Table />
              <Table />
              <Table />

              <div className="row m-0 invoice-border-bottom ">
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
                  style={{ width: "4rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
                <div
                  style={{ width: "4rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
                <div
                  style={{ width: "5rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
                <div
                  style={{ width: "6rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
                <div
                  style={{ width: "4rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
                <div
                  style={{ width: "7rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
                <div
                  style={{ width: "6rem" }}
                  className="col-3 p-0  ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
              </div>
              <div className="row m-0 invoice-border-bottom ">
                <div
                  style={{ width: "3rem" }}
                  className="col-2 p-0  ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  {" "}
                  <strong>Total:</strong>{" "}
                </div>
                <div className="col p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"></div>
                <div
                  style={{ width: "6rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
                <div
                  style={{ width: "4rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
                <div
                  style={{ width: "7rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
                <div
                  style={{ width: "6rem" }}
                  className="col-3 p-0  ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
              </div>

              <div className="row m-0 invoice-border-bottom ">
                <div className="col p-0  ps-2 py-2 d-flex justify-content-start align-items-center">
                  {" "}
                  <strong>Rs. (In Words):</strong>
                  {amountWord}
                </div>
                <div className="col-2 p-0  ps-2 py-2 d-flex justify-content-start align-items-center"></div>
                <div
                  style={{ width: "6rem" }}
                  className="col-3 p-0  ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
                <div
                  style={{ width: "6rem" }}
                  className="col-3 p-0  ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  {" "}
                </div>
                <div
                  style={{ width: "8rem" }}
                  className="col-4 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  {" "}
                  <strong>Grand Total</strong>
                </div>
                <div
                  style={{ width: "6rem" }}
                  className="col-3 p-0  ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  {" "}
                  <strong>10000</strong>
                </div>
              </div>

              <div className="row m-0  invoice-border-bottom">
                <div className="col-8 invoice-border-right">
                  <p className="m-0">
                    <strong>Terms & Conditions</strong>
                  </p>
                  <p className="m-0">
                    1. OUR RISKS AND RESPONSIBILTY CEASES AS SOON
                  </p>
                  <p className="m-0">
                    2. OUR RISKS AND RESPONSIBILTY CEASES AS SOON
                  </p>
                  <p className="m-0">
                    3. OUR RISKS AND RESPONSIBILTY CEASES AS SOON
                  </p>
                  <p className="">
                    4. OUR RISKS AND RESPONSIBILTY CEASES AS SOON
                  </p>
                </div>
                <div className="col">
                  <p className="m-0">
                    <strong>BANK NAME:</strong>
                    HDFC BANK
                  </p>
                  <p className="m-0">
                    <strong>A/C NO:</strong>
                    45456545654645
                  </p>
                  <p className="">
                    <strong>IFSC CODE:</strong>
                    HDFC345345435
                  </p>
                </div>
              </div>

              <div className="row m-0  invoice-border-bottom">
                <div className="col-9">
                  {" "}
                  <p className="m-0">
                    <strong>DECLARATION:</strong>
                  </p>
                  <p className="mb-4">
                    SDFDSJFHSD SDHFK SDFHSDK JFHSKD SDHGKSDG FSDKFJDGSL FKJG
                    FDSLKGJSLDFJSG SKDJGDSSDJGF SDKFJGSD
                  </p>
                  <p className="mb-5">
                    <strong>Authorised signatory</strong>
                  </p>
                </div>
                <div className="col"></div>
              </div>
            </div>
                  
          </div>
          <h5>
            <strong>In words:</strong> {amountWord}
            <button
              onClick={() => {
                setStatus(true);
              }}
              className="btn btn-primary"
            >
              back
            </button>
          </h5>
        </div>
      )}
    </>
  );
}

export default App;
