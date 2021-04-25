// Main Application Container
import React, {Component} from "react";
import {SongCard} from "./SongCard";
import Accordion from "react-bootstrap/cjs/Accordion";

import "../styles/SongsContainer.scss";
import {Card} from "react-bootstrap";

class SongsContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
        }

        this.saveSong = this.saveSong.bind(this);
    }

    // Lifecycle methods

    saveSong = (song, clicked) =>{
        if(clicked){
            this.props.saveSong(song, clicked);
        }else{
            this.props.saveSong(song, clicked);
        }
    }

    render() {
        return(
            <div className="songs-wrapper">
                {this.props.songList.map((e, i) => <SongCard key={e.id.attributes['im:id']} song={e} saveSong={this.saveSong} index={i}/>)}
            </div>
        )
    }
}

export default SongsContainer;