import React, { useState } from "react";
import "./bookTicket.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";

export const BookTicket = () => {
  const navigation =  useNavigate();
  const [vvipTickets, setVvipTickets] = useState(0);
  const [vipTickets, setVipTickets] = useState(0);
  const [normalTickets, setNormalTickets] = useState(0);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const ticketPrices = {
    vvip: 50000,
    vip: 10000,
    normal: 5000,
  };

  const totalAvailableTickets = {
    vvip: 100,
    vip: 200,
    normal: 300,
  };

  const handleTicketChange = (type, quantity) => {
    switch (type) {
      case "vvip":
        setVvipTickets(quantity);
        break;
      case "vip":
        setVipTickets(quantity);
        break;
      case "normal":
        setNormalTickets(quantity);
        break;
      default:
        break;
    }
  };

  const handleCheckout = () => {
    const eventId = window.location.href.split("=")[1];
    let target = "/event/checkout?="+eventId
    navigation(target)
    // console.log("Handle checkout function called");
    // console.log("Continue to checkout successfully");
    // setCheckoutSuccess(true);
  };

  return (
    <>
      <div>
        <div className="bannerCont">
          <img />
        </div>
        <div className="event-details-cont">
          <div className="event-booking-headlines">
            <div className="hint">
              <span>Fill in the details as required</span>
            </div>
            <div className="map-btn">
              <button className="btn-secondary">View Map</button>
            </div>
          </div>
          <div className="user-info">
            <div className="info-sec">
              <fieldset>
                <legend>First Name</legend>
                <input
                  type="text"
                  className="booking-text-input"
                  placeholder=""
                />
              </fieldset>
            </div>
            <div className="info-sec ml-3">
              <fieldset>
                <legend>Email</legend>
                <input
                  type="text"
                  className="booking-text-input"
                  placeholder=""
                />
              </fieldset>
            </div>
          </div>
          <div className="tickets-section mt-4 mb-3">
            <span className="ticket-sect-text">Tickets</span>

            <div className="tiket-card mt-3">
              <div className="ticket-right-align">
                <div className="item-one">
                  <button
                    className="booking-up-btn"
                    onClick={() =>
                      handleTicketChange("vvip", Math.max(0, vvipTickets - 1))
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="booking-up-input"
                    placeholder="0"
                    value={vvipTickets}
                    onChange={(e) =>
                      handleTicketChange(
                        "vvip",
                        Math.max(0, parseInt(e.target.value))
                      )
                    }
                  />
                  <button
                    className="booking-up-btn"
                    onClick={() => handleTicketChange("vvip", vvipTickets + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-text">
                  <span className="ticket-info-quant">
                    available: {totalAvailableTickets.vvip - vvipTickets}
                  </span>
                </div>
              </div>
              <div className="ticket-right-align">
                <span className="ticket-info-text">
                  VVIP ticket for Lekki all night festival
                </span>
              </div>
              <div className="ticket-left-align">
                <span>&#8358;</span>
                <span>{ticketPrices.vvip}</span>
              </div>
            </div>

            <div className="tiket-card tk-margin-top">
              <div className="ticket-right-align">
                <div className="item-one">
                  <button
                    className="booking-up-btn"
                    onClick={() =>
                      handleTicketChange("vip", Math.max(0, vipTickets - 1))
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="booking-up-input"
                    placeholder="0"
                    value={vipTickets}
                    onChange={(e) =>
                      handleTicketChange(
                        "vip",
                        Math.max(0, parseInt(e.target.value))
                      )
                    }
                  />
                  <button
                    className="booking-up-btn"
                    onClick={() => handleTicketChange("vip", vipTickets + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-text">
                  <span className="ticket-info-quant">
                    available: {totalAvailableTickets.vip - vipTickets}
                  </span>
                </div>
              </div>
              <div className="ticket-right-align">
                <span className="ticket-info-text">
                  VIP ticket for Lekki all night festival
                </span>
              </div>
              <div className="ticket-left-align">
                <span>&#8358;</span>
                <span>{ticketPrices.vip}</span>
              </div>
            </div>

            <div className="tiket-card tk-margin-top">
              <div className="ticket-right-align">
                <div className="item-one">
                  <button
                    className="booking-up-btn"
                    onClick={() =>
                      handleTicketChange(
                        "normal",
                        Math.max(0, normalTickets - 1)
                      )
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    className="booking-up-input"
                    placeholder="0"
                    value={normalTickets}
                    onChange={(e) =>
                      handleTicketChange(
                        "normal",
                        Math.max(0, parseInt(e.target.value))
                      )
                    }
                  />
                  <button
                    className="booking-up-btn"
                    onClick={() =>
                      handleTicketChange("normal", normalTickets + 1)
                    }
                  >
                    +
                  </button>
                </div>
                <div className="item-text">
                  <span className="ticket-info-quant">
                    available: {totalAvailableTickets.normal - normalTickets}
                  </span>
                </div>
              </div>
              <div className="ticket-right-align">
                <span className="ticket-info-text">
                  Normal ticket for Lekki all night festival
                </span>
              </div>
              <div className="ticket-left-align">
                <span>&#8358;</span>
                <span>{ticketPrices.normal}</span>
              </div>
            </div>
            <div className="ticket-left-align"></div>

            {checkoutSuccess ? (
              <div className="checkout-success-message">
                Continue to checkout successfully!
              </div>
            ) : (
              <div className="tiket-card tk-margin-top btn-book-event-cont">
                <button className="btn-primary" onClick={handleCheckout}>
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookTicket;
