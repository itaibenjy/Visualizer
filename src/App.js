import React from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"

// pages and components
import NavBar from "./components/NavBar"

// pages
import Sudoku from "./pages/Sudoku"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div >
          <NavBar /> 
          <Routes>
            <Route path="/" element={<h1>Home</h1> } />
            <Route path="/sudoku" element={<Sudoku />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
