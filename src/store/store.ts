import { createStore } from "satcheljs";
import { Notes } from "../types";

import "../mutators/addNote";

export default createStore<Notes>("notes", {
  noteItems: [],
  selected: null,
});
