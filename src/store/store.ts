import { createStore } from "satcheljs";
import { Notes } from "../types";
import React from "react";
import { EditorState } from "draft-js";

import "../mutators/addNote";

export default createStore<Notes>("notes", {
  noteItems: [],
  selected: null,
  editorStateFn: undefined,
});
