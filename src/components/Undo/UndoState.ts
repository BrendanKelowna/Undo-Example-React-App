import { useState } from "react";
import { UndoObj } from "./Undo";

//* Types
export type UndoState = ReturnType<typeof useUndoState>;

export type useUndoStateProps = {
  errorCallback?: (error: Error) => void;
  successCallback?: (message: string) => void;
};

//* Definitions

//* Styling

//* Helpers

//* Main
export default function useUndoState({
  errorCallback,
  successCallback,
}: useUndoStateProps = {}) {
  //* Context

  //* State
  const [undoList, setUndoList] = useState<UndoObj[]>([]);
  const [index, setIndex] = useState(-1);

  const nextUndoIndex = index;
  const nextRedoIndex = index + 1;

  const undoDiscription = undoList[nextUndoIndex]?.undoDescription;
  const redoDiscription = undoList[nextRedoIndex]?.redoDescription;

  //* Effects

  //* Handlers
  function add(item: UndoObj) {
    const newList =
      index >= 0 ? [...undoList.slice(0, index + 1), item] : [item];
    setUndoList(newList);
    setIndex((state) => state + 1);
  }

  function undo() {
    if (index < 0) throw new Error("No more undo");
    if (undoList.length < 0) throw new Error("No undo's in history");
    const undo = undoList[index];
    undo
      .undo()
      .then((undoObj) => successCallback?.(undoObj.message))
      .catch((error) => errorCallback?.(error));
    setIndex(index - 1);
  }

  function redo() {
    const i = nextRedoIndex;
    if (i > undoList.length - 1) throw new Error("No more redo");
    const redo = undoList[i];
    redo
      .redo()
      .then((undoObj) => successCallback?.(undoObj.message))
      .catch((error) => errorCallback?.(error));
    setIndex(i);
  }

  //* Renders
  return {
    undoList,
    index: index + 1,
    setIndex,
    setUndoList,
    add,
    undo,
    redo,
    total: undoList.length,
    undoDiscription,
    redoDiscription,
  };
}
