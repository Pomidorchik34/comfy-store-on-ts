import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/details" element={<Details />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
