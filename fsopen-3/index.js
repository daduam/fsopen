require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const Entry = require('./models/entry');

// eslint-disable-next-line no-unused-vars
morgan.token('post-content', (req, res) => JSON.stringify(req.body));

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

// morgan request logging - adds req method for post requests
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-content', {
  // eslint-disable-next-line no-unused-vars
  skip: (req, res) => req.method !== 'POST',
}));

app.use(morgan('tiny', {
  // eslint-disable-next-line no-unused-vars
  skip: (req, res) => req.method === 'POST',
}));

app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>');
});

// api info
app.get('/info', (req, res, next) => {
  Entry
    .estimatedDocumentCount()
    .then((count) => {
      res.send(`
        <p>Phonebook has info for ${count} people</p>
        <p>${Date()}</p>
      `);
    })
    .catch((error) => next(error));
});

// phonebook api stuff
app.get('/api/persons', (req, res, next) => {
  Entry
    .find({})
    .then((entries) => {
      res.json(entries);
    })
    .catch((error) => next(error));
});

// add a new entry using post
// eslint-disable-next-line consistent-return
app.post('/api/persons', (req, res, next) => {
  const { body } = req;

  // error checking
  if (!body.name) {
    return res.status(400).json({
      error: 'name missing',
    });
  }
  if (!body.number) {
    return res.status(400).json({
      error: 'number missing',
    });
  }

  const entry = new Entry({
    name: body.name,
    number: body.number,
  });

  entry
    .save()
    .then((savedEntry) => {
      res.json(savedEntry);
    })
    .catch((error) => next(error));
});

// displaying information of a single phonebook entry
app.get('/api/persons/:id', (req, res, next) => {
  Entry
    .findById(req.params.id)
    .then((entry) => {
      if (entry) {
        res.json(entry);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

// update entry
app.put('/api/persons/:id', (req, res, next) => {
  const { body } = req;

  const entry = {
    name: body.name,
    number: body.number,
  };

  const opts = {
    new: true,
    runValidators: true,
    context: 'query',
  };

  Entry
    .findByIdAndUpdate(req.params.id, entry, opts)
    .then((updatedEntry) => {
      res.json(updatedEntry);
    })
    .catch((error) => next(error));
});

// delete a single phonebook entry
app.delete('/api/persons/:id', (req, res, next) => {
  Entry
    .findByIdAndRemove(req.params.id)
    // eslint-disable-next-line no-unused-vars
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// error handler middleware
// eslint-disable-next-line consistent-return
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};
app.use(errorHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
