import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "./App.scss";

export default function Ticket(props) {
  // const [ticketLength, setTicketLength] = useState(props.ticketListLength);
  // console.log(ticketLength)
  const [content, setContent] = useState(
    props.ticket.content.slice(0, 200) + "..."
  );

  function hideTicket(e) {
    e.currentTarget.parentElement.style.display = "none";
    e.currentTarget.parentElement.parentElement.classList.remove("ticket");
    // setTicketLength(ticket=> {
    //   ticket = ticket - 1;
    // })
  }
  function showAllText(e) {
    setContent(props.ticket.content);
    e.currentTarget.style.display = "none";
  }

  // function showAllText(e) {
  //   setContent(props.ticket.content);
  //   e.currentTarget.style.display = "none";
  // }

  return (
    <div className="card body ticket ">
      <button
        className="card hideTicketButton"
        type="button"
        onClick={(e) => {
          hideTicket(e);
          props.onHide(e);
        }}
      >
        x
      </button>
      <h5 className="card title">{props.ticket.title}</h5>

      <p className=" card-text">{content}</p>
      <div>
        <div className="card-text" onClick={showAllText} id="container">
          <button className="learn-more">
            <span className="circle" aria-hidden="true">
              <span className="icon arrow"></span>
            </span>
            <span className="button-text">Show more</span>
          </button>
        </div>
      </div>
      <div>
        <span>By </span>
        <span className="email">{props.ticket.userEmail} | </span>
        <span className="card">
          {new Date(props.ticket.creationTime).toDateString()}
        </span>
      </div>
      <div>
        {props.ticket.labels &&
          props.ticket.labels.map((label, i) => {
            if (i === 0) {
              return (
                <span key={i} className="label">
                  {label}
                </span>
              );
            } else {
              return (
                <span key={i} className="label">
                {label}
                </span>
              );
            }
          })}
      </div>
    </div>
  );
}
