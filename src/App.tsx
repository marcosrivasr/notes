import React, { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import getStore from "./store/store";
import { addNote, selectNode } from "./actions/notes";

import { ContentState, Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";

import styles from "./App.module.css";
import ListItem from "./components/listItem";

export default observer(function App() {
  const contentDiv = useRef(null);
  const noteSelected = getStore().selected;

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (getStore().noteItems.length === 0) {
      createNote();
    }
  }, []);

  function createNote() {
    addNote("", "");
    selectNode(0);
    const contentState = ContentState.createFromText("Hola a todos");
    setEditorState(EditorState.createWithContent(contentState));
    (contentDiv.current! as HTMLDivElement).focus();
  }

  function handleNoteClick(index: number) {
    console.log(index);
    selectNode(index);
  }

  function _onBoldClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  }
  function _onBulletClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UL"));
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
              handleNoteClick(index);
            }}
          />
        ))}
      </div>

      <div className={styles.main}>
        <button onClick={_onBoldClick}>Bold</button>
        <button onClick={_onBulletClick}>Bullet</button>
        <div ref={contentDiv} className={styles.editor}>
          {noteSelected ? noteSelected.content : null}
          <Editor editorState={editorState} onChange={setEditorState} />
        </div>
      </div>
    </div>
  );
});
