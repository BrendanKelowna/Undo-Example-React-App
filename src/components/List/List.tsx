import React from "react";
import { useData, useSetData } from "../../context/Data/DataProvider";
import { useSetInfo } from "../../context/Info/InfoProvider";
import { SelectedState } from "../Selected/SelectedState";
import { UndoState } from "../Undo/UndoState";
import ListItem from "./ListItem";

//* Types
export type ListProps = {
  undoState: UndoState;
  selectedState: SelectedState;
};

//* Definitions

//* Styling

//* Helpers

export default function List({
  undoState,
  selectedState,
  ...props
}: ListProps) {
  //* Context
  const setInfo = useSetInfo();
  const data = useData();
  const setData = useSetData();

  //* State

  //* Effects

  //* Handlers

  //* Renders
  const listItems = data.map((item, index) => (
    <ListItem
      key={index}
      selectedState={selectedState}
      undoState={undoState}
      index={index}
      item={item}
    />
  ));

  return (
    <>
      <div>{listItems}</div>
    </>
  );
}
