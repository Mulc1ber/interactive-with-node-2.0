const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.green.inverse("Note was added"));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function printNotes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) =>
    console.log(chalk.green(note.id), chalk.blue(note.title))
  );
}

async function removeNote(id) {
  const notes = await getNotes();

  const newNotes = notes.filter((note) => note.id !== id);

  await fs.writeFile(notesPath, JSON.stringify(newNotes));
  console.log(chalk.green.inverse("Note was removed"));
}

async function editNote(id, title) {
  const notes = await getNotes();

  const note = notes.find((note) => note.id === id);
  note.title = title;

  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(
    chalk.green.inverse(`Note with id="${id}" has been edit on "${title}"`)
  );
}

module.exports = { addNote, removeNote, editNote, printNotes };
