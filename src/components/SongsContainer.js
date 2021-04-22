// Main Application Container
import React, {Component} from "react";
import {SongCard} from "./SongCard";

import "../styles/SongsContainer.scss";

class SongsContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tempNum: 0, //TODO: this is only temporary do it with the size of the array of songs

        }

        this.saveSong = this.saveSong.bind(this);
    }

    saveSong = () =>{
        this.state.tempNum++;
        this.props.savedSongsNum(this.state.tempNum);
    }

    render() {
        return(
            <div className="songs-wrapper">
                {this.props.songList.map(e => <SongCard key={e.id.attributes['im:id']} song={e} saveSong={this.saveSong}/>)}
            </div>
        )
    }
}

export default SongsContainer;