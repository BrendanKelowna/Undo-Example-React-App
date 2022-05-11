import React from "react";
import DataProvider from "../Data/DataProvider";
import InfoProvider from "../Info/InfoProvider";

export type ContextWraperProps = { children: React.ReactNode };

export default function ContextWraper({ children }: ContextWraperProps) {
  return (
    <DataProvider>
      <InfoProvider>{children}</InfoProvider>
    </DataProvider>
  );
}
