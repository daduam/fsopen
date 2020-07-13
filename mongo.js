const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Provide arguments in the format: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2].trim();

const url = `mongodb+srv://phonebook:${password}@cluster0.46b1m.mongodb.net/phonebookdb?retryWrites=true&w=majority`;

// todo: handle failed connection
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

// define schema and model for phonebook entries
const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Entry = mongoose.model('Entry', entrySchema);

if (process.argv.length === 5) {
  const entry = new Entry({
    name: process.argv[3].trim(),
    number: process.argv[4].trim(),
  });

  entry.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Entry
    .find({})
    .then(result => {
      console.log('phonebook:');
      result.forEach(entry => {
        console.log(`${entry.name} ${entry.number}`);
      })

      mongoose.connection.close();
    });
}

