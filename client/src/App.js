import React, { useEffect, useState } from 'react';
import Ticket from './Ticket';
import Search from './Search';
import './App.css';

const axios = require('axios');

function App() {
  const [ticketList, setTicketList] = useState([]);
  const [hiddenTicketList, setHiddenTicket] = useState([]);
  // const [hiddenTicketText, setHiddenTicketText] = useState(true);

  useEffect(() => {
    (async function ticketListMaker() {
      const { data } = await axios.get('/api/tickets');
      // console.log(data);
      setTicketList(data);
    }());
  }, []);

  async function restore() {
    hiddenTicketList.forEach((ticket) => {
      ticket.style.display = 'block';
      ticket.classList.add('ticket');
    });
    setHiddenTicket([])
  }

  function hideMe(e) {
    const hiddenList = hiddenTicketList.map((ticket) => ticket);
    hiddenList.push(e.currentTarget.parentElement);
    setHiddenTicket(hiddenList);
  }
  async function filteredList(e) {
    const { data } = await axios.get('/api/tickets', {
      params: { searchText: e.currentTarget.value },
    });
    setTicketList(data);
  }

  return (
    <main>
      <span className="results">
        Showing 
        {ticketList.length}
        {'   '}
        results
      </span>
      <span className="results">
        {hiddenTicketList.length > 0 && (
          <span>
            
            <span id="hideTicketsCounter">{hiddenTicketList.length}</span>
            {' '}
            hidden ticket
            {
              (hiddenTicketList.length > 1 && 's',
              (
                <button
                // style={{display: hiddenTicketList.length > 0 ? "block" : "none"}}
                  type="button"
                  className="restoreTicketButton"
                  id="restoreHideTickets"
                  onClick={restore}
                >
                  restore
                </button>
              ))
            }
            
          </span>
        )}
      </span>
      <div className="container">
        <div>
          <div>
            <Search onChange={filteredList} />
          </div>
          {ticketList.map((ticket, i) => (
            <Ticket
              ticketListLength={ticketList.length}
              key={i}
              ticket={ticket}
              onHide={hideMe}
            />
          ))}

        </div>
      </div>
    </main>
  );
}

export default App;
