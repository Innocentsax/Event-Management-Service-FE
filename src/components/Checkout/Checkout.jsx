import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import PaymentModal from "../PaymentModal/PaymentModal";
import "./checkout.css";

function Checkout() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(false);
  const [paymentType, setPaymentType] = useState("");

  const ticketSalesDto = {
    name: "David",
    email: "davidodewusi@gmail.com",
    paymentType: paymentType,
    tickets: [
      {
        ticketType: "VVIP",
        quantity: 10,
        cost: 50000,
      },
      {
        ticketType: "VIP",
        quantity: 2,
        cost: 6000,
      },
      {
        ticketType: "Regular",
        quantity: 1,
        cost: 500,
      },
    ],
  };

  const handleInput = (e) => setPaymentType(e.target.value);

  const handleSubmit = function (e) {
    e.preventDefault();
    setLoading(true);
    fetch("http://localhost:8099/api/v1/transaction/initializeTransaction", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(ticketSalesDto),
    })
      .then((res) => res.json())
      .then((data) => {
        setResponse(data);
        console.log(data);
        console.log(response);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
    console.log(response);
  };

  return (
    <>
      {response.status ? (
        <div className="ticket-card ">
          <div className="card-head">
            <h2>Ticket Summary</h2>
          </div>
          <div className="card-item">
            <h6>Attendee</h6>
            <p>1X Attendee</p>
          </div>
          <div className="card-item">
            <h6>Date/Time</h6>
            <p>
              <span>20th January 2022</span>
              <span>04:00 pm</span>
            </p>
          </div>
          <div className="card-item">
            <h6>Type</h6>
            <p>Regular</p>
          </div>
          <div className="card-total">
            <h2>Total</h2>
            <h2>N5000</h2>
          </div>
          <button
            className="btn btn-lg btn-proceed"
            onClick={() => {
              document.querySelector(".checkout-page").style.display = "none";
              document.querySelector(".payment-message").style.display =
                "block";

              setTimeout(() => {
                document.querySelector(".checkout-page").style.display =
                  "block";
              }, 5000);
            }}
          >
            <a href={response.data.authorization_url}>Proceed</a>
          </button>
        </div>
      ) : (
        <div className="checkout-page">
          <div className="checkout">
            <div className="header">
              <button>&larr; Go back</button>
              <h1>ERF Reunion Party</h1>
            </div>
            <div className="checkout-main">
              <div className="main-heading">
                <h1>Checkout</h1>
                <p>Time left: 5:11</p>
              </div>
              <div className="ticket-card">
                <div className="card-head">
                  <h2>Ticket Summary</h2>
                </div>
                <div className="card-item">
                  <h6>Attendee</h6>
                  <p>600X Attendee</p>
                </div>
                <div className="card-item card-date-time">
                  <h6>Date/Time</h6>
                  <p>
                    <span>12th October 2023</span>
                    <span>04:00 pm</span>
                  </p>
                </div>
                <div className="card-item">
                  <h6>Type</h6>
                  {/* <p>VVIP: 500</p>
                  <p>VIP: 200</p> */}
                  <p>Regular:<span>&#8358;</span> 5000</p>
                </div>
                <div className="card-total">
                  <h2>Total</h2>
                  <h2><span>&#8358;</span>5000</h2>
                </div>
                <button
                  className="btn btn-lg checkout-btn"
                  onClick={() => setIsOpen(true)}
                >
                  Buy Ticket
                </button>
              </div>
            </div>
            <PaymentModal
              display={isOpen ? "block" : "none"}
              onClose={handleClose}
              onSubmit={handleSubmit}
              onChange={handleInput}
              paymentType={paymentType}
              isLoading={loading}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Checkout;
