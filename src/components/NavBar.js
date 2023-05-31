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
    <MDBNavbar expand='sm' >
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Brand</MDBNavbarBrand>

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
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle className='nav-link' tag='a' role='button'>
                  CSP
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <Link to="/sudoku" ><MDBDropdownItem link >Sudoku</MDBDropdownItem></Link>
                  <MDBDropdownItem link>Queens Puzzle</MDBDropdownItem>
                  <MDBDropdownItem link>Map Coloring</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            <MDBNavbarItem >
              <MDBContainer className='d-flex align-items-center justify-content-start m-0 mt-2 p-0'>
                <MDBIcon fas icon="sun" className="mx-2" /><MDBSwitch checked={switchValue} onChange={handleSwitch} /><MDBIcon fas icon="moon" />
              </MDBContainer>
            </MDBNavbarItem>

          </MDBNavbarNav>

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}



