import { action } from "satcheljs";
import { Note } from "../types";

export let addNote = action("addNote", (note: Note) => ({ note }));
