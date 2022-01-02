import { mutator } from "satcheljs";
import {
  addNote,
  assignEditorStateFn,
  selectNode,
  updateContent,
  updateTitle,
} from "../actions/notes";
import getStore from "../store/store";
import { v4 as uuidv4, v4 } from "uuid";

mutator(addNote, (actionMessage) => {
  getStore().noteItems.unshift({
    id: v4(),
    title: actionMessage.title,
    content: undefined,
    createdAt: Date.now(),
  });
});

mutator(selectNode, (actionMessage) => {
  let note;
  if (typeof actionMessage.id === "number") {
    note = getStore().noteItems[actionMessage.id];
  } else {
    note = getStore().noteItems.find((item) => item.id === actionMessage.id);
  }
  if (note) {
    getStore().selected = note;
  }
});

mutator(updateContent, (actionMessage) => {
  const selectedNote = getStore().selected!;
  const id = selectedNote.id;

  let item = getStore().noteItems.find((item) => item.id === id);
  item!.content = { ...actionMessage.content };

  getStore().selected = item!;
});

mutator(updateTitle, (actionMessage) => {
  getStore().selected!.title = actionMessage.title;
});

mutator(assignEditorStateFn, (actionMessage) => {
  getStore().editorStateFn = actionMessage.fn;
});
