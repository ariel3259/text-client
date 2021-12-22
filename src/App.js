import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Register from "./pages/Register";
import TextNotePage from "./pages/TextNotePage";
import BlockNote from "./pages/BlockNote";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      
      <Route
       path = "/"
       element = {<MainPage />}
      />

      <Route 
        path = "/register"
        element = {<Register />}
      />

      <Route 
        path = "/text_note" 
        element = {<TextNotePage />}
      />

      <Route 
        path = "/block_note"
        element = {<BlockNote />}
      />
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
