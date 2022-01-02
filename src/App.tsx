import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import getStore from "./store/store";
import {
  addNote,
  selectNode,
  updateContent,
  updateTitle,
} from "./actions/notes";

import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";

import styles from "./App.module.css";
import ListItem from "./components/listItem";
import EditorView from "./components/EditorView";

export default observer(function App() {
  let noteSelected = getStore().selected;
  const editorRef = useRef<any>();

  useEffect(() => {
    if (getStore().noteItems.length === 0) {
      createNote();
    }
  }, []);

  function createNote() {
    addNote("", "");
    selectNewNote(0);
  }

  function selectNewNote(id: string | number) {
    selectNode(id);

    getStore().editorStateFn(EditorState.createEmpty());
    noteSelected = getStore().selected;

    if (noteSelected && noteSelected.content) {
      if (!noteSelected.content) {
        getStore().editorStateFn(EditorState.createEmpty());
      } else {
        const contentState = convertFromRaw(noteSelected!.content);
        const editorState = EditorState.createWithContent(contentState);

        getStore().editorStateFn(editorState);
      }
    }
  }

  function handleNoteClick(id: string) {
    selectNewNote(id);
  }

  function onChangeEditor(e: EditorState) {
    console.log("a");
    updateContent(convertToRaw(e.getCurrentContent()));
    getStore().editorStateFn(e);
    //setEditorState(e);
    //editorRef.current.updateEditorState(e);
  }

  function onChangeTitle(e: React.ChangeEvent<HTMLInputElement>) {
    updateTitle(e.target.value);
  }

  return (
    <div className={styles.App}>
      <div className={styles.sidebar}>
        <button onClick={() => createNote()}>Add</button>
        {getStore().noteItems.map((note, index) => (
          <ListItem
            key={note.id}
            note={note}
            selected={note.id === noteSelected?.id}
            onClickItem={() => {
              handleNoteClick(note.id);
            }}
          />
        ))}
      </div>

      <div className={styles.main}>
        <EditorView
          title={noteSelected ? noteSelected.title : ""}
          onChangeTitle={onChangeTitle}
          onChangeEditor={onChangeEditor}
        />
      </div>
    </div>
  );
});
