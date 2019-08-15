import React from "react";
import "./App.css";
// import SimpleDiagram from "./components/SimpleDiagram/";
// import SerializeDeserialize from "./components/SerializeDeserialize";
// import DiagramFromJson from "./components/DiagramFromJson";
// import ProgramaticallyModify from "./components/ProgramaticallyModify";
// import AutoLayoutDagre from "./components/AutoLayoutDagre";
import DiagramFromD3Json from "./components/DiagramFromD3Json";

function App() {
  return (
    <div className="App">
      <DiagramFromD3Json />
    </div>
  );
}

export default App;
