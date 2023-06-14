import React from "react"
import { HashRouter, Routes, Route} from "react-router-dom"

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
      <HashRouter>
        <div >
          <NavBar /> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sudoku" element={<Sudoku />} />
            <Route path="/sorting" element={<Sorting />} />
            <Route path="/pathfinding" element={<Pathfinding />} />
            <Route path="/tictactoe" element={<TicTacToe />} />
            <Route path="/fractaltree" element={<FractalTree />} />
          </Routes>
          <Fotter />
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
