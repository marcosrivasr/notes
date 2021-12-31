import { mutator } from "satcheljs";
import { addNote, selectNode } from "../actions/notes";
import getStore from "../store/store";

mutator(addNote, (actionMessage) => {
  getStore().noteItems.unshift({
    id: Math.random().toString(),
    title: actionMessage.title,
    content: actionMessage.content,
    createdAt: Date.now(),
  });
});

mutator(selectNode, (actionMessage) => {
  const note = getStore().noteItems[actionMessage.index];

  getStore().selected = { ...note };
});
