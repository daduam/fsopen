require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Entry = require('./models/entry');

morgan.token('post-content', (req, res) => {
  return JSON.stringify(req.body);
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

// morgan request logging - adds req method for post requests
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-content', {
  skip: (req, res) => { return req.method !== 'POST'; }
}));

app.use(morgan('tiny', {
  skip: (req, res) => { return req.method === 'POST'; }
}));

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
];

app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>');
});

// api info
app.get('/info', (req, res) => {
  Entry
    .estimatedDocumentCount()
    .then(count => {
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${Date()}</p>
      `);
    })
    .catch(error => next(error));
});

// phonebook api stuff
app.get('/api/persons', (req, res, next) => {
  Entry
    .find({})
    .then(entries => {
      res.json(entries);
    })
    .catch(error => next(error));
});

// generates id for new entries
const generateId = () => {
  const min = persons.length > 0
    ? Math.max(...persons.map(entry => entry.id))
    : 0;
  
  const max = min + 10;
  
  const id = Math.floor(Math.random() * (max - min)) + min + 1;

  return id;
}

// add a new entry using post
app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  // error checking
  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    });
  }

  const entry = new Entry({
    name: body.name,
    number: body.number,
  });

  entry
    .save()
    .then(savedNote => {
      res.json(entry);
    })
    .catch(error => next(error));
});

// displaying information of a single phonebook entry
app.get('/api/persons/:id', (req, res, next) => {
  Entry
    .findById(req.params.id)
    .then(entry => {
      if (entry) {
        res.json(entry);
      }
      else {
        res.status(404).end();
      }
    })
    .catch(error => next(error));
});

// update entry
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;

  const entry = {
    name: body.name,
    number: body.number,
  };

  Entry
    .findByIdAndUpdate(req.params.id, entry, { new: true })
    .then(updatedEntry => {
      res.json(updatedEntry);
    })
    .catch(error => next(error));
});

// delete a single phonebook entry
app.delete('/api/persons/:id', (req, res, next) => {
  Entry
    .findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end();
    })
    .catch(error => next(error));
});

// error handler middleware
const errorHandler = (error, req, res, next) => {
  console.error(error.message);
  
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
