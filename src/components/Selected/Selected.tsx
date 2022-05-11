import React from "react";
import { useData, useSetData } from "../../context/Data/DataProvider";
import { useSetInfo } from "../../context/Info/InfoProvider";
import { delSome, restoreSome } from "../../services";
import { UndoState } from "../Undo/UndoState";
import { SelectedState } from "./SelectedState";

//* Types
export type SelectedProps = {
  state: SelectedState;
  undoState: UndoState;
};

//* Definitions

//* Styling

//* Helpers

export default function Selected({
  state,
  undoState,
  ...props
}: SelectedProps) {
  const { length, selected, clear, selectAll } = state;
  //* Context
  const setInfo = useSetInfo();
  const data = useData();
  const setData = useSetData();

  //* State

  //* Effects

  //* Handlers
  const handleDelete = async () =>
    delSome(selected, data, setData)
      .then((undoObj) => {
        undoState.add(undoObj);
        setInfo?.({ message: undoObj.message });
      })
      .catch((error) => setInfo?.({ error: true, message: error.message }));

  const handleRestore = () =>
    restoreSome(selected, data, setData)
      .then((undoObj) => {
        undoState.add(undoObj);
        setInfo?.({ message: undoObj.message });
      })
      .catch((error) => setInfo?.({ error: true, message: error.message }));

  //* Renders
  return (
    <div className="row">
      <span>{length} Selected</span>
      <button onClick={handleDelete} disabled={!length}>
        Delete Selected
      </button>
      <button onClick={handleRestore} disabled={!length}>
        Restore Selected
      </button>
      <button onClick={selectAll}>Select All</button>
      <button onClick={() => clear()} disabled={!length}>
        Clear
      </button>
    </div>
  );
}
