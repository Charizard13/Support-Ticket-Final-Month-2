const express = require('express');

const app = express();
const fs = require('fs').promises;

app.get('/api/tickets', async (req, res) => {
  const content = await fs.readFile('./data.json');
  const json = JSON.parse(content);
  if (req.query.searchText) {
    const filteredTickets = json.filter(
      (ticket) => ticket.title.toUpperCase().includes(req.query.searchText.toUpperCase()),
    );
    res.send(filteredTickets);
  } else {
    res.send(json);
  }
});

app.post('/api/tickets/:ticketId/done', async (req, res) => {
  const content = await fs.readFile('./data.json');
  const json = JSON.parse(content);
  json.forEach((ticket) => {
    if (ticket.id === req.params.ticketId) {
      ticket.done = true;
    }
  });
  await fs.writeFile('./data.json', JSON.stringify(json));
  res.send({ updated: true });
});

app.post('/api/tickets/:ticketId/undone', async (req, res) => {
  const content = await fs.readFile('./data.json');
  const json = JSON.parse(content);
  json.forEach((ticket) => {
    if (ticket.id === req.params.ticketId) {
      ticket.done = false;
    }
  });
  await fs.writeFile('./data.json', JSON.stringify(json));
  res.send({ updated: true });
});

module.exports = app;
