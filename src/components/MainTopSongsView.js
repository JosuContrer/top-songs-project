// Main Application Container
import React, {Component} from "react";
import SongsContainer from "./SongsContainer";

import "../styles/MainTopSongsView.scss";
import {SavedSongCounter} from "./SavedSongCounter";
import axios from "axios";

class MainTopSongsView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loadedSongs: new Map(),
            savedSongs: [],
            savedCount: 0,

            cachedMaxAge: Number.POSITIVE_INFINITY,
        }

        this.loadSongs = this.loadSongs.bind(this);
        this.handleSavedDisplay = this.handleSavedDisplay.bind(this);
    }

    componentDidMount() {
        this.loadSongs();
    }

    loadSongs(){
        axios
            .get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then( response => {
                if(response.status === 200){ // handle request status
                    let tempAge = response.headers['cache-control'].match(/(\d+)/); // maximum amount of time a resource is considered fresh

                    let tempSongs = [];
                    // response.data.feed.entry.map(value => tempSongs[value.title.label] = value);
                    this.setState({
                        loadedSongs: response.data.feed.entry,
                        cachedMaxAge: tempAge[0],
                        lastUpdated: response.data.feed.updated.label,
                    })
                    // console.log(this.state.loadedSongs);
                    // console.log(this.state.cachedMaxAge);
                    // console.log(this.state.lastUpdated);
                }else{
                    console.error('Server error ' + response.status + ' status code');
                }
            })
            .catch(error => console.error('Request Error => ' + error))
    }

    handleSavedDisplay(){
        console.log("Hey");
    }

    render() {
        return(
            <div className="root-wrapper">
                <h1 className="main-title">Top 100 Songs</h1>
                <SavedSongCounter songCount={12} onClick={this.handleSavedDisplay}/>
                {/*<SongsContainer/>*/}
                {this.state.loadedSongs.forEach(e => console.log(e.title.label))}
            </div>
        )
    }
}

export default MainTopSongsView;