import { render } from "@testing-library/react";
import { observer } from "mobx-react-lite";

import { Note } from "../types";

import styles from "../App.module.css";

interface ListItemProps {
  note: Note;
  selected: boolean;
  onClickItem: () => void;
}

export default observer(function ListItem({
  note,
  selected,
  onClickItem,
}: ListItemProps) {
  return (
    <div onClick={onClickItem} className={selected ? styles.selected : ""}>
      {note.title == "" ? "Nota sin título" : note.title}
    </div>
  );
});
