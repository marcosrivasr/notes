import React, {
  ChangeEventHandler,
  EventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { observer } from "mobx-react";
import getStore from "./store/store";
import {
  addNote,
  selectNode,
  updateContent,
  updateTitle,
} from "./actions/notes";

import {
  ContentState,
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

import styles from "./App.module.css";
import ListItem from "./components/listItem";

export default observer(function App() {
  const contentDiv = useRef(null);
  let noteSelected = getStore().selected;

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (getStore().noteItems.length === 0) {
      createNote();
    }
  }, []);

  /*  useEffect(() => {
    if (noteSelected && noteSelected.content) {
      console.log("as");
      const contentState = convertFromRaw(noteSelected!.content);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState);
    }
  }, [noteSelected]); */

  function createNote() {
    addNote("", "");
    selectNewNote(0);
  }

  function selectNewNote(id: string | number) {
    selectNode(id);
    setEditorState(EditorState.createEmpty());

    noteSelected = getStore().selected;

    if (noteSelected && noteSelected.content) {
      if (!noteSelected.content) {
        setEditorState(EditorState.createEmpty());
      } else {
        setEditorState(EditorState.createEmpty());
        const contentState = convertFromRaw(noteSelected!.content);
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(editorState);
      }
    }
  }

  function handleNoteClick(id: string) {
    selectNewNote(id);
  }

  function _onBoldClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  }
  function _onBulletClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UL"));
  }

  function onChangeEditor(e: EditorState) {
    updateContent(convertToRaw(e.getCurrentContent()));
    setEditorState(e);
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
        <input
          onChange={onChangeTitle}
          value={noteSelected?.title}
          className={styles.title}
          tabIndex={0}
          placeholder="Nota sin título"
        />

        <div>
          <button onClick={_onBoldClick} tabIndex={2}>
            Bold
          </button>
          <button onClick={_onBulletClick} tabIndex={3}>
            Bullet
          </button>
        </div>
        <div ref={contentDiv} className={styles.editor}>
          <Editor
            editorState={editorState}
            onChange={onChangeEditor}
            tabIndex={0}
          />
        </div>
      </div>
    </div>
  );
});
