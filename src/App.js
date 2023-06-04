import React from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"

// pages and components
import NavBar from "./components/NavBar"
import Fotter from "./components/Fotter"

// pages
import Sudoku from "./pages/Sudoku"
import Sorting from "./pages/Sorting"
import Home from "./pages/Home"

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <div >
          <NavBar /> 
          <Routes>
            <Route path="/Visualiser" element={<Home />} />
            <Route path="/Visualiser/sudoku" element={<Sudoku />} />
            <Route path="/Visualiser/sorting" element={<Sorting />} />
          </Routes>
          <Fotter />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
