import React, { useState } from "react";
import "./payment-modal.css";

function PaymentModal(props) {
  return (
    <div
      className="overlay"
      style={{ display: props.display }}
      onClick={props.onClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="close" onClick={props.onClose}>
          <ion-icon name="close-outline"></ion-icon>
        </div>
        <div className="modal-head mb-3">
          <h2>Payment Type</h2>
          <p>Select from the options your preferred payment option</p>
        </div>
        <form action="#" className="modal-form" onSubmit={props.onSubmit}>
          <p className="mb-1">Payment Type</p>
          <label htmlFor="payment-type" className="mb-3">
            <select
              id="payment-type"
              className="payment-input"
              // defaultValue={"PAYSTACK"}
              value={props.paymentType}
              onChange={props.onChange}
            >
              {/* <option disabled selected>
                ---Select a Payment Type---
              </option> */}
              <option value="PAYSTACK">Paystack</option>
              <option value="FLUTTERWAVE">Flutterwave</option>
              <option value="BANK TRANSFER">Bank Transfer</option>
              <option value="ONLINE PAYMENT">Online Payment</option>
            </select>
          </label>
          <button className="btn btn-lg">
            {props.isLoading ? "Processing..." : "Pay"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentModal;
