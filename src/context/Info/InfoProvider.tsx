import React, { useContext, useState } from "react";

//* Types
export type InfoProps = { message: string; error?: boolean };
export type SetInfo = React.Dispatch<React.SetStateAction<InfoProps>>;

//* Definitions
export const defaultProps = {
  error: false,
  message: "Hello",
};

//* Context
export const InfoContext = React.createContext<InfoProps>(defaultProps);
export const SetInfoContext = React.createContext<SetInfo>(() => {});

//* Use
export const useInfo = () => useContext(InfoContext);
export const useSetInfo = () => useContext(SetInfoContext);

//* Provider
export default function InfoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [infoState, setInfo] = useState<InfoProps>(defaultProps);

  return (
    <InfoContext.Provider value={infoState}>
      <SetInfoContext.Provider value={setInfo}>
        {children}
      </SetInfoContext.Provider>
    </InfoContext.Provider>
  );
}
