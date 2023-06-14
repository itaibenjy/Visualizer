import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBSwitch
} from 'mdb-react-ui-kit';
import logo from '../assets/images/logo.png';
import logoDark from '../assets/images/logo-dark.png';

import { Link } from 'react-router-dom';

import { useThemeContext } from '../hooks/useThemeContext';

export default function App() {
  const [showBasic, setShowBasic] = useState(false);

  const { theme, setTheme } = useThemeContext()
  
  const [switchValue, setSwitchValue] = useState(false);


  function handleSwitch(event) {
    setSwitchValue(event.target.checked)
    if (switchValue) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  const navStyle = {
    color: 'var(--mdb-secondary)',
  }

  return (
    <MDBNavbar expand='sm' sticky className='semi-transparent'>
      <MDBContainer fluid>

        <Link to="/" >
        <MDBNavbarBrand tag="div">
            <img
              src={theme==="light" ? logo : logoDark}
              height='30'
              alt=''
              loading='lazy'
            />
        </MDBNavbarBrand>
        </Link>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-sm-0'>


            {/* Path finding */}
            <MDBNavbarItem>
              <Link to="/pathfinding" >
                <MDBNavbarLink tag="div" style={navStyle}>
                  Path Finding
                </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>

            {/* Sorting */}
            <MDBNavbarItem>
              <Link to="/sorting" >
                <MDBNavbarLink tag="div" style={navStyle}>
                  Sorting
                </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>

            {/* Miscellaneous */}
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='div' className='nav-link' role='button' style={navStyle}>
                  Miscellaneous
                </MDBDropdownToggle>
                <MDBDropdownMenu>

                  {/* Sudoku */}
                  <Link to="/sudoku" >
                    <MDBDropdownItem className='dropdown-item' style={navStyle} tag="div">
                          Sudoku
                    </MDBDropdownItem>
                  </Link>

                  {/* Tic Tac Toe Minimax*/}
                  <Link to="/tictactoe" >
                    <MDBDropdownItem className='dropdown-item' style={navStyle} tag="div">
                          Tic Tac Toe (Minimax)
                    </MDBDropdownItem>
                  </Link>

                  {/* Fractal Trees */}
                  <Link to="/fractaltree" >
                    <MDBDropdownItem className='dropdown-item' style={navStyle} tag="div">
                          Fractal Trees
                    </MDBDropdownItem>
                  </Link>

                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>


            <MDBNavbarItem className='ms-auto'>
              <MDBContainer className='d-flex align-items-center justify-content-start ms-auto mt-2 p-0'>
                <MDBIcon fas icon="sun" className="mx-2" />
                <MDBSwitch checked={switchValue} onChange={handleSwitch} />
                <MDBIcon fas icon="moon" />
              </MDBContainer>
            </MDBNavbarItem>

          </MDBNavbarNav>

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}



