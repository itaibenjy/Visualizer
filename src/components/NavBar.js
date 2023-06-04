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
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBSwitch
} from 'mdb-react-ui-kit';
import logo from '../assets/images/logo.png';

import { Link } from 'react-router-dom';

import { useThemeContext } from '../hooks/useThemeContext';

export default function App() {
  const [showBasic, setShowBasic] = useState(false);

  const { setTheme } = useThemeContext()
  
  const [switchValue, setSwitchValue] = useState(false);


  function handleSwitch(event) {
    setSwitchValue(event.target.checked)
    if (switchValue) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return (
    <MDBNavbar expand='sm' sticky>
      <MDBContainer fluid>

        <Link to="/Visualizer" >
        <MDBNavbarBrand href='#'>
            <img
              src={logo}
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

            {/* Sudoku */}
            <MDBNavbarItem>
              <Link to="/Visualizer/sudoku" >
                <MDBNavbarLink href='#' style={{color:"var(--mdb-secondary"}}>
                  Sudoku
                </MDBNavbarLink>
              </Link>
            </MDBNavbarItem>


            {/* Sorting */}
            <MDBNavbarItem>
              <Link to="/Visualizer/sorting" >
                <MDBNavbarLink href='#' style={{color:"var(--mdb-secondary"}}>
                  Sorting
                </MDBNavbarLink>
              </Link>
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



