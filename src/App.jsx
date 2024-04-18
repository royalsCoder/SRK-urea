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
      : { name: "", email: "", number: "" };
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
        <div className="w-50 m-auto">
          <form onSubmit={add} class="row g-3">
            <div class="col-md-6">
              <label for="inputEmail4" class="form-label">
                Email
              </label>
              <input
                type="email"
                class="form-control"
                id="inputEmail4"
                name="email"
                value={formData.email}
                onChange={onchangeData}
                required
              />
            </div>
            <div class="col-md-6">
              <label for="inputPassword4" class="form-label">
                number
              </label>
              <input
                type="number"
                class="form-control"
                id="inputPassword4"
                name="number"
                value={formData.number}
                onChange={onchangeData}
                required
              />
            </div>
            <div class="col-12">
              <label for="inputAddress" class="form-label">
                name
              </label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                name="name"
                value={formData.name}
                onChange={onchangeData}
                placeholder="1234 Main St"
                required
              />
            </div>

            <div class="col-12">
              <button type="submit" class="btn btn-primary">
                Sign in
              </button>
            </div>
          </form>
        </div>
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
