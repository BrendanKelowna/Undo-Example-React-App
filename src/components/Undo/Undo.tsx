import React from "react";
import { UndoState } from "./UndoState";

//* Types
export type UndoProps = {
  state: UndoState;
};
export type UndoObj = {
  message: string;
  undoDescription?: string;
  redoDescription?: string;
  undo: () => Promise<UndoObj>;
  redo: () => Promise<UndoObj>;
};

//* Definitions

//* Styling

//* Helpers

//* Main
export default function Undo({ state, ...props }: UndoProps) {
  //* Context

  //* State
  const { undoList, index, undo, redo, undoDiscription, redoDiscription } =
    state;

  //* Effects

  //* Handlers

  //* Renders
  return (
    <div className="row">
      <button
        //iconName="undo"
        title={undoDiscription ? undoDiscription : "Undo"}
        onClick={undo}
        disabled={index <= 0}
        {...props}
      >
        Undo
      </button>

      <button
        //iconName="redo"
        title={redoDiscription ? redoDiscription : "Redo"}
        onClick={redo}
        disabled={index >= undoList.length}
        {...props}
      >
        Redo
      </button>
    </div>
  );
}
