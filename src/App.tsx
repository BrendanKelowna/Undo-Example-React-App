import React from "react";
import "./App.css";
import InfoDisplay from "./components/InfoDisplay";
import Input from "./components/Input";
import List from "./components/List";
import Message from "./components/Message";
import Selected from "./components/Selected";
import useSelectedState from "./components/Selected/SelectedState";
import Undo from "./components/Undo";
import useUndoState from "./components/Undo/UndoState";
import UndoInfo from "./components/UndoInfo";
import { useSetInfo } from "./context/Info/InfoProvider";
import { errors, lag } from "./General";

//* Types

//* Styles

function App() {
  //* Context
  const setInfo = useSetInfo();
  //* State
  //selected state
  const selectedState = useSelectedState();
  //undo state
  const undoState = useUndoState({
    successCallback: (message) => setInfo?.({ message }),
    errorCallback: (error: any) =>
      setInfo?.({ error: true, message: error.message }),
  });

  //* Renders
  return (
    <div className="page">
      <Message />
      <div>
        Errors {errors ? "On" : "Off"}
        <br />
        Lag {lag ? "On" : "Off"}
      </div>
      <InfoDisplay />
      <Input undoState={undoState} />
      <Undo state={undoState} />
      <UndoInfo undoState={undoState} />
      <Selected state={selectedState} undoState={undoState} />
      <List selectedState={selectedState} undoState={undoState} />
    </div>
  );
}

export default App;
