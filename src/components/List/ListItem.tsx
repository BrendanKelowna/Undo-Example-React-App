import React from "react";
import { DataObj, useData, useSetData } from "../../context/Data/DataProvider";
import { useSetInfo } from "../../context/Info/InfoProvider";
import { del, rename, restore } from "../../services/services";
import { SelectedState } from "../Selected/SelectedState";
import { UndoState } from "../Undo/UndoState";

export type ListItemProps = {
  index: number;
  item: DataObj;
  undoState: UndoState;
  selectedState: SelectedState;
};

//* Types

//* Definitions

//* Styling

//* Helpers

export default function ListItem({
  index,
  item,
  undoState,
  selectedState,
  ...props
}: ListItemProps) {
  const { name, deleted, dateModified } = item;

  //* Context
  const setInfo = useSetInfo();
  const data = useData();
  const setData = useSetData();

  //* State
  const [edit, setEdit] = React.useState(false);
  const [newName, setNewName] = React.useState(name);

  //* Effects

  //* Handlers
  const toggleEdit = () => {
    setNewName(name);
    setEdit((state) => !state);
  };

  const handleDelete = () =>
    del(name, setData)
      .then((undoObj) => {
        undoState.add(undoObj);
        setInfo?.({ message: undoObj.message });
        setEdit(false);
      })
      .catch((error) => setInfo?.({ error: true, message: error.message }));

  const handleRestore = () =>
    restore(name, setData)
      .then((undoObj) => {
        undoState.add(undoObj);
        setInfo?.({ message: undoObj.message });
        setEdit(false);
      })
      .catch((error) => setInfo?.({ error: true, message: error.message }));

  const handleRename = () =>
    rename(name, newName, setData)
      .then((undoObj) => {
        undoState.add(undoObj);
        setInfo?.({ message: undoObj.message });
        setEdit(false);
      })
      .catch((error) => setInfo?.({ error: true, message: error.message }));

  //* Renders

  return (
    <li className="row">
      <label>
        <input
          type="checkbox"
          checked={selectedState.isSelected(name)}
          onChange={(event) =>
            selectedState.select(name, event.currentTarget.checked)
          }
        />
        <span>Select</span>
      </label>
      {!item.deleted && (
        <span>
          <button onClick={handleDelete}>Delete</button>
        </span>
      )}
      {item.deleted && (
        <span>
          <button onClick={handleRestore}>Restore</button>
        </span>
      )}
      <span>
        <button onClick={toggleEdit}>{edit ? "Cancel" : "Rename"}</button>
      </span>
      {edit && (
        <input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
      )}
      {edit && (
        <button onClick={handleRename} disabled={newName === name}>
          Save
        </button>
      )}
      {!edit && (
        <span style={{ textDecoration: deleted ? "line-through" : "initial" }}>
          {name}
        </span>
      )}
      <span>{dateModified.toTimeString()}</span>
    </li>
  );
}
