import React, { useState } from "react";
import type { Note } from "./types";
import { observer } from "mobx-react";
import getStore from "./store/store";

export default observer(function App() {
  const notes: Note[] = [
    {
      id: "0",
      title: "Hola a todosasdas",
      content: "Holis desde la nota",
      createdAt: Date.now(),
    },
    {
      id: "1",
      title: "Nota 2",
      content: "Esta es la nota 2",
      createdAt: Date.now(),
    },
  ];

  const [selected, setSelected] = useState<Note | null>(null);

  function handleSelect(index: number) {
    setSelected(notes[index]);
  }

  return (
    <div className="App">
      {getStore().map((note, index) => (
        <div key={note.id} onClick={() => handleSelect(index)}>
          {note.title}
        </div>
      ))}
      <div>{selected ? selected.content : null}</div>
    </div>
  );
});
