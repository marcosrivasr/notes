import { action } from "satcheljs";
import { Note } from "../types";

export let addNote = action("addNote", (title: string, content: string) => ({
  title,
  content,
}));

export let selectNode = action("selectNote", (index: number) => ({ index }));

export let countNotes = action("countNotes", () => ({}));
