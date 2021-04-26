import Navbar from "react-bootstrap/cjs/Navbar";
import Form from "react-bootstrap/cjs/Form";
import Button from "react-bootstrap/cjs/Button";
import React, {useState} from "react";
import Fuse from "fuse.js";
import {SimpleSongCard} from "./SimpleSongCard";

export const SearchNavBar = props => {

    const[searchResults, setSearchResults] = useState([]);

    // Handler function to perform fuse search on song list based on user input
    const handleSearch = e => {
        console.log(e.element);
        var fuse = new Fuse(props.loadedSongs, {
            keys: [
                {name: 'title.label',weight: 0.2}
            ]
        });
        const results = fuse.search('soul');
        console.log(results);
        setSearchResults(results);
    }

    return(
        <Navbar className="nav-bar" expand="lg">
            <Navbar.Brand>Top Songs</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form className="justify-content-end" onSubmit={handleSearch} inline>
                    <Form.Control type="text" placeholder="Search" className="justify-content-end"/>
                    {searchResults.map((e) =>
                        <SimpleSongCard s={e.item}/>
                    )}
                    <Button variant="outline-info" type="submit">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}