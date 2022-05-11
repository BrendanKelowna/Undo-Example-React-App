import React from "react";
import { useData, useSetData } from "../../context/Data/DataProvider";
import { useSetInfo } from "../../context/Info/InfoProvider";
import { add } from "../../services/services";
import { UndoState } from "../Undo/UndoState";

export type InputProps = {
  undoState: UndoState;
};

//* Types

//* Definitions

//* Styling

//* Helpers

export default function Input({ undoState, ...props }: InputProps) {
  //* Context
  const setInfo = useSetInfo();
  const data = useData();
  const setData = useSetData();

  //* State
  const [name, setName] = React.useState("");

  //* Effects

  //* Handlers
  const handleAdd = () =>
    add(name, data, setData)
      .then((undoObj) => {
        undoState.add(undoObj);
        setName("");
        setInfo?.({ message: undoObj.message });
      })
      .catch((error) => setInfo?.({ error: true, message: error.message }));

  //* Renders

  return (
    <div className="row">
      <input
        value={name}
        onChange={(event) => {
          setName(event.currentTarget.value);
        }}
      />
      <button onClick={handleAdd} disabled={!name}>
        Add
      </button>
    </div>
  );
}
