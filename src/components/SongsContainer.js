// Main Application Container
import React, {Component} from "react";
import axios from 'axios';

import "../styles/SongsContainer.scss";

class SongsContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return(
            <div className="songs-wrapper">

            </div>
        )
    }
}

export default SongsContainer;