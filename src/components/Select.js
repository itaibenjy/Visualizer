import React, {useState} from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';

/**
 * A dropdown select component that displays a list of options and allows the user to select one.
 * @param {boolean} disabled - Whether the select is disabled or not.
 * @param {Array} children - An array of options to display in the select.
 * @param {string} selected - The currently selected option.
 * @param {function} setSelected - A function to call when an option is selected.
 * @returns {JSX.Element} - A dropdown select component.
 */
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