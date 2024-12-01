const yargs = require("yargs");
const {
  addNote,
  removeNote,
  editNote,
  printNotes,
} = require("./notes.controller");

yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "list",
  describe: "Print all note",
  async handler() {
    printNotes();
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",
  builder: {
    id: {
      describe: "Note id",
      demandOption: true,
      type: "string",
    },
  },
  async handler({ id }) {
    removeNote(id);
  },
});

yargs.command({
  command: "edit",
  describe: "Edit note by id",
  builder: {
    id: {
      describe: "Note id",
      demandOption: true,
      type: "string",
    },
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  async handler({ id, title }) {
    editNote(id, title);
  },
});

yargs.parse();
