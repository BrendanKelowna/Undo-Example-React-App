import React from "react";
import { useInfo } from "../../context/Info/InfoProvider";

export type InfoDisplayProps = {};

//* Types

//* Definitions

//* Styling

//* Helpers

export default function InfoDisplay({ ...props }: InfoDisplayProps) {
  //* Context
  const { message, error } = useInfo();

  //* State

  //* Effects

  //* Handlers

  //* Renders

  return <div color={error ? "darkred" : "initail"}>{message}</div>;
}
