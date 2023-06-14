import React from "react"
import { BrowserRouter, Routes, Route} from "react-router-dom"

// pages and components
import NavBar from "./components/NavBar"
import Fotter from "./components/Fotter"

// pages
import Sudoku from "./pages/Sudoku"
import TicTacToe from "./pages/TicTacToe"
import Sorting from "./pages/Sorting"
import Home from "./pages/Home"
import Pathfinding from "./pages/Pathfinding"
import FractalTree from "./pages/FractalTree"

function App() {
  return (
    <div className="App" >
      <BrowserRouter>
        <div >
          <NavBar /> 
          <Routes>
            <Route path="/Visualizer" element={<Home />} />
            <Route path="/Visualizer/sudoku" element={<Sudoku />} />
            <Route path="/Visualizer/sorting" element={<Sorting />} />
            <Route path="/Visualizer/pathfinding" element={<Pathfinding />} />
            <Route path="/Visualizer/tictactoe" element={<TicTacToe />} />
            <Route path="/Visualizer/fractaltree" element={<FractalTree />} />
          </Routes>
          <Fotter />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
