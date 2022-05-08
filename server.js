const fs = require('fs');
const express = require('express');
const path = require('path');
const noteDB = require('./db/db.json');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded( {extended: true}));



app.get('/api/notes', (req, res) => res.json(noteDB));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.post('/api/notes', (req, res) => {
  res.json(`${req.method} request received`);
  const addNote = req.body;
  addNote.id = uuidv4();
  noteDB.push(addNote);
  let stringed = JSON.stringify(noteDB);
  fs.writeFile('./db/db.json', stringed, function(err) {
    if (err) {
      return console.error(err);
    } else {
      console.log('Note added successfully!');
    }
  });
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
