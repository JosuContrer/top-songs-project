import Navbar from "react-bootstrap/cjs/Navbar";
import React, {useState} from "react";

/*
* NavBar functional component 
*/
export const SearchNavBar = props => {

    return(
        <Navbar className="nav-bar" expand="lg">
            <Navbar.Brand>Top Songs</Navbar.Brand>
        </Navbar>
    );
}