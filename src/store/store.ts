import { createStore } from "satcheljs";
import { Notes } from "../types";

export default createStore<Notes>("notes", []);
