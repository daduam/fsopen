const express = require('express');

const app = express();


let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>');
})

// api info
app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>
  `);
});

// phonebook api stuff
app.get('/api/persons', (req, res) => {
  res.json(persons);
})

// displaying information of a single phonebook entry
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const entry = persons.find(entry => entry.id === id);

  if (entry) {
    res.json(entry);
  }
  else {
    res.status(404).end();
  }
});

// delete a single phonebook entry
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(entry => entry.id !== id);

  res.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
