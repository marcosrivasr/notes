import React from "react";
import { observer } from "mobx-react-lite";
import getStore from "../store/store";
import { assignEditorStateFn } from "../actions/notes";
import {
  ContentState,
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";

import styles from "./editorView.module.scss";
import { Note } from "../types";

interface EditorViewProps {
  title: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEditor: (e: EditorState) => void;
}

const EditorView = (props: EditorViewProps) => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  assignEditorStateFn(setEditorState);

  function _onBoldClick() {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  }
  function _onBulletClick() {
    setEditorState(
      RichUtils.toggleBlockType(editorState, "unordered-list-item")
    );
  }
  return (
    <>
      <input
        onChange={props.onChangeTitle}
        value={props.title ?? ""}
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
      <div className={styles.editor}>
        <Editor
          editorState={editorState}
          onChange={props.onChangeEditor}
          tabIndex={0}
        />
      </div>
    </>
  );
};

export default observer(EditorView);
