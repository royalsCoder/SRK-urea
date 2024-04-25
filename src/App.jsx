import { useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import logo from "../public/logo/logo.png";
import { useReactToPrint } from "react-to-print";
import Table from "./components/Table";

function App() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

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
          address: "",
          date: "",
          number: "",
          cnumber: "",
          rate: "",
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

  let grandTotal = Number(formData?.rate) * Number(formData?.quantity); // Example value
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
      address: "",
      date: "",
      number: "",
      cnumber: "",
      rate: "",
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
                    Address:
                  </label>

                  <select
                    name="address"
                    value={formData.address}
                    onChange={onchangeData}
                    class="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Please select</option>
                    <option value="NEW MADINA HOTEL, SITAPUR ROAD LUCKNOW">
                      NEW MADINA HOTEL, SITAPUR ROAD LUCKNOW
                    </option>
                    <option value="baba dhaba">baba dhaba</option>
                  </select>
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="selectDepot" className="form-label">
                    Mobile Number:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="number"
                    value={formData.number}
                    onChange={onchangeData}
                    placeholder="Enter Name"
                    required
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="selectDepot" className="form-label">
                    Customer Name:
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
                    Customer Mobile NO.:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="cnumber"
                    value={formData.cnumber}
                    onChange={onchangeData}
                    placeholder="Enter Name"
                    required
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label htmlFor="selectDepot" className="form-label">
                    Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formData.date}
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
                    Rate:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="rate"
                    value={formData.rate}
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
                  <h5 className="m-0 mainheading">A.S.K Def Filling Station</h5>
                  <p className="m-0">{formData?.address}</p>
                  <p className="mb-3">
                    Phone No : {formData?.number} E-mail : defdke@gmail.com
                  </p>
                </div>
                <div className="col-2"></div>
              </div>
              <div className="row m-0 py-2 rowpadding invoice-border-bottom">
                <p className="m-0">
                  <strong>GSTIN:</strong>
                </p>
              </div>
              <div className="row padding-y m-0 invoice-border-bottom">
                <div className="col p-0">
                  <p className=" ps-2">
                    <strong> Cusomer Name : {formData?.name}</strong>
                  </p>
                  <p className="m-0 ps-2">
                    <strong>Cusomer Number : {formData?.cnumber} </strong>
                  </p>
                </div>
                <div className="col p-0">
                  <p className="m-0">
                    Invoice Date: <strong>{formData?.date} </strong>
                  </p>
                  <p className="m-0">
                    KM: <strong>{formData?.vehivleKm}</strong>{" "}
                  </p>

                  <p className="m-0">
                    Vehical No: <strong>{formData?.vehicleNo}</strong>{" "}
                  </p>
                </div>
              </div>

              <div className="row m-0 invoice-border-bottom tablebg">
                <div
                  style={{ width: "3rem" }}
                  className="col-1 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>S no.</strong>
                </div>
                <div className="col p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center">
                  <strong>Item</strong>
                </div>
                <div
                  style={{ width: "6rem" }}
                  className="col-1 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>HSN/SAL</strong>
                </div>
                <div
                  style={{ width: "3rem" }}
                  className="col-1 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>Unit</strong>
                </div>
                <div
                  style={{ width: "3rem" }}
                  className="col-1 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>Qyt.</strong>
                </div>
                <div
                  style={{ width: "4rem" }}
                  className="col-1 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>Rate</strong>
                </div>
                <div
                  style={{ width: "6rem" }}
                  className="col-1 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>Amount</strong>
                </div>
                <div
                  style={{ width: "4rem" }}
                  className="col-1 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>Disc.</strong>
                </div>

                <div
                  style={{ width: "6rem" }}
                  className="col-1 p-0  ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  <strong>Net Amt</strong>
                </div>
              </div>

              <div className="row m-0  ">
                <div
                  style={{ width: "3rem" }}
                  className="col-2 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  1
                </div>
                <div className="col p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center">
                  {formData?.itemName}
                </div>
                <div
                  style={{ width: "6rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
                <div
                  style={{ width: "3rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  ltr
                </div>
                <div
                  style={{ width: "3rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  {formData?.quantity}
                </div>
                <div
                  style={{ width: "4rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  Rs {formData?.rate}
                </div>
                <div
                  style={{ width: "6rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  {" "}
                  Rs {Number(formData?.rate) * Number(formData?.quantity)}
                </div>
                <div
                  style={{ width: "4rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>

                <div
                  style={{ width: "6rem" }}
                  className="col-3 p-0  ps-2 py-2 d-flex justify-content-start align-items-center"
                >
                  Rs {Number(formData?.rate) * Number(formData?.quantity)}
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
                  style={{ width: "3rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
                <div
                  style={{ width: "3rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
                <div
                  style={{ width: "4rem" }}
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
                  style={{ width: "5rem" }}
                  className="col-3 p-0 invoice-border-right ps-2 py-2 d-flex justify-content-start align-items-center"
                ></div>
                <div
                  style={{ width: "4rem" }}
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
                  <strong>Rs. (In Words) : </strong> {amountWord}
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
                  <strong>
                    Rs {Number(formData?.rate) * Number(formData?.quantity)}
                  </strong>
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
                    <strong></strong>
                  </p>
                  <p className="m-0">
                    <strong></strong>
                  </p>
                  <p className="">
                    <strong></strong>
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
