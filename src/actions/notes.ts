import { action } from "satcheljs";
import React from "react";
import { EditorState } from "draft-js";

export let addNote = action("addNote", (title: string, content: string) => ({
  title,
  content,
}));

export let selectNode = action("selectNote", (id: string | number) => ({ id }));

export let countNotes = action("countNotes", () => ({}));

export let updateContent = action(
  "updateContent",
  (content: Draft.DraftModel.Encoding.RawDraftContentState) => ({ content })
);

export let updateTitle = action("udpdateTitle", (title: string) => ({ title }));

export let assignEditorStateFn = action(
  "assignEditorStateFn",
  (fn: React.Dispatch<React.SetStateAction<EditorState>>) => ({ fn })
);
