import React, { useState } from "react";
import { useData } from "../../context/Data/DataProvider";

//* Types
export type SelectedStateProps = {};

export type SelectedState = ReturnType<typeof useSelectedState>;

//* Definitions

//* Styling

//* Helpers

export default function useSelectedState({}: SelectedStateProps = {}) {
  //* Context
  const data = useData();

  //* State
  const [selected, setSelected] = useState<string[]>([]);

  //* Effects

  //* Handlers
  const isSelected = (id: string) => selected.includes(id);

  const select = (id: string, selected?: boolean) =>
    setSelected((state) => {
      if (selected === undefined) {
        return state.includes(id)
          ? state.filter((s) => s !== id)
          : [...state, id];
      } else {
        return selected ? [...state, id] : state.filter((s) => s !== id);
      }
    });

  const selectAll = () => setSelected(data.map((item) => item.name));

  //* Renders
  return {
    selected,
    length: selected.length,
    isSelected,
    select,
    clear: () => setSelected([]),
    selectAll,
  };
}
