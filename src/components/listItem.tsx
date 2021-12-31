import classNames from "classnames";
import { observer } from "mobx-react-lite";

import { Note } from "../types";

import styles from "./listItem.module.scss";

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
    <div
      onClick={onClickItem}
      className={classNames(styles.listItem, selected ? styles.selected : "")}
    >
      {note.title == "" ? "Nota sin título" : note.title}
    </div>
  );
});
