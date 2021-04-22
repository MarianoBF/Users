import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {useState} from "react";

function App() {
  const [selected, setSelected] = useState("home");

  const menuSelect = selection => {
    setSelected(selection);
  };

  return (
    <div>
      <Navbar menuSelect={selection => menuSelect(selection)} />
      <Home selection={selected} />
    </div>
  );
}

export default App;
