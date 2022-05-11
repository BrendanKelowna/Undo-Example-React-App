import React from "react";
import { UndoState } from "../Undo/UndoState";

//* Types
export type UndoInfoProps = { undoState: UndoState };

//* Definitions

//* Styling

//* Helpers

export default function UndoInfo({ undoState, ...props }: UndoInfoProps) {
  //* Context

  //* State

  //* Effects

  //* Handlers

  //* Renders
  return (
    <div>
      Undos: {undoState.index}/{undoState.total}
    </div>
  );
}
