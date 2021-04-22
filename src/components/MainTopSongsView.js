// Main Application Container
import React, {Component} from "react";
import SongsContainer from "./SongsContainer";
import {SavedSongCounter} from "./SavedSongCounter";
import Container from "react-bootstrap/cjs/Container";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/MainTopSongsView.scss";

class MainTopSongsView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loadedSongs: [],
            savedSongs: [],
            savedSongsNum: 0,

            lastUpdated: '',
            cachedMaxAge: Number.POSITIVE_INFINITY,
        }

        this.loadSongs = this.loadSongs.bind(this);
        this.handleSavedDisplay = this.handleSavedDisplay.bind(this);
        this.savedSongsNum = this.savedSongsNum.bind(this);
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
                    console.log(this.state.loadedSongs);
                    // console.log(this.state.cachedMaxAge);
                    console.log(this.state.lastUpdated);
                }else{
                    console.error('Server error ' + response.status + ' status code');
                }
            })
            .catch(error => console.error('Request Error => ' + error))
    }

    handleSavedDisplay(){
        console.log("Hey");
    }

    savedSongsNum(num){
        this.setState({
            savedSongsNum: num,
        })
    }

    render() {
        return(
            <div className="root-wrapper">
                <SavedSongCounter songCount={this.state.savedSongsNum} onClick={this.handleSavedDisplay}/>
                <Container>
                    <h1 className="main-title">Top 100 Songs</h1>
                    {this.state.lastUpdated !== '' ?
                        <h2 className="updated-title">Last Updated: {this.state.lastUpdated}</h2>
                        : <div/>
                    }
                    <SongsContainer songList={this.state.loadedSongs} savedSongsNum={this.savedSongsNum}/>
                </Container>
            </div>
        )
    }
}

export default MainTopSongsView;