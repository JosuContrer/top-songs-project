// Main Application Container
import React, {Component} from "react";
import axios from 'axios';

class RootContainer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            savedSongs: [],
        }

        this.loadSongs = this.loadSongs.bind(this);
    }

    componentDidMount() {
        this.loadSongs();
    }

    loadSongs(){
        axios
            .get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then( response => {
                console.log(response);
            })
            .catch(error => console.error('There was an error with loading the songs: ${error}'))
    }

    render() {
        return(
            <div className="root-container">
                <h1 className="main-title">Top 100 Songs</h1>
            </div>
        )
    }
}

export default RootContainer;