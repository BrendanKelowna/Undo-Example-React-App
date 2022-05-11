import React, { useContext, useState } from "react";

//* Types
export type DataObj = { name: string; dateModified: Date; deleted?: Date };
export type SetData = React.Dispatch<React.SetStateAction<DataObj[]>>;
export type Data = DataObj[];

//* Definitions
export const defaultProps: Data = [
  { name: "Apple", dateModified: new Date() },
  { name: "Banana", dateModified: new Date() },
  { name: "Cherry", dateModified: new Date() },
  { name: "Strawberry", dateModified: new Date(), deleted: new Date() },
];

//* Context
export const DataContext = React.createContext<DataObj[]>(defaultProps);
export const SetDataContext = React.createContext<SetData>(() => {});

//* Use
export const useData = () => useContext(DataContext);
export const useSetData = () => useContext(SetDataContext);

//* Provider
export default function DataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [dataState, setData] = useState<DataObj[]>(defaultProps);

  return (
    <DataContext.Provider value={dataState}>
      <SetDataContext.Provider value={setData}>
        {children}
      </SetDataContext.Provider>
    </DataContext.Provider>
  );
}
