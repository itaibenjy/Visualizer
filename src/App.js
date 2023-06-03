import React from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"

// pages and components
import NavBar from "./components/NavBar"

// pages
import Sudoku from "./pages/Sudoku"
import Sorting from "./pages/Sorting"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div >
          <NavBar /> 
          <Routes>
            <Route path="/Visualiser" element={<h1>Home</h1> } />
            <Route path="/Visualiser/sudoku" element={<Sudoku />} />
            <Route path="/Visualiser/sorting" element={<Sorting />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
