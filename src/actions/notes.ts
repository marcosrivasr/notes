import { action } from "satcheljs";
import { Note } from "../types";

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
