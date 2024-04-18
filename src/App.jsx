import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

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

  return (
    <>
      {status ? (
        <>
          <div className="container mt-4 w-50 mx-auto">
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
              </div>
            </form>
                
          </div>
        </>
      ) : (
        <div>
          <h1>{formData?.name}</h1>
          <h1>{formData?.number}</h1>
          <h5>
            {" "}
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
