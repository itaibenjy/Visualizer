import React, {useState} from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

export default function Select({disabled, children, selected, setSelected}) {
  return (
    <MDBDropdown>
      <MDBDropdownToggle disabled={disabled}>{selected}</MDBDropdownToggle>
      <MDBDropdownMenu>
        {children.map((child, index) => {
            return <MDBDropdownItem key={index} onClick={(e) => {e.preventDefault(); setSelected(index)}} link>{child}</MDBDropdownItem>
            })
        }
      </MDBDropdownMenu>
    </MDBDropdown>
  );
}