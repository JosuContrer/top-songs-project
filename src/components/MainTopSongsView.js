import React, {Component} from "react";
import Container from "react-bootstrap/cjs/Container";
import Navbar from "react-bootstrap/cjs/Navbar";
import axios from "axios";
import Form from "react-bootstrap/cjs/Form";
import FormControl from "react-bootstrap/cjs/FormControl";
import Button from "react-bootstrap/cjs/Button";
import Fuse from 'fuse.js';

import {SongsContainer} from "./SongsContainer";
import {SavedSongCounter} from "./SavedSongCounter";
import {SimpleSongCard} from "./SimpleSongCard";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/MainTopSongsView.scss";

/*
* Top Class Component
*   Contains the 'Top 100 Songs' list
*/
class MainTopSongsView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loadedSongs: [],
            savedSongs: [],
            searchSongs: [],
            savedSongsNum: 0,
            isLoading: false,

            lastUpdated: '',
            cachedMaxAge: Number.POSITIVE_INFINITY,
        }

        this.loadSongs = this.loadSongs.bind(this);
        this.saveSong = this.saveSong.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    // Lifecycle methods
    componentDidMount() {
        this.loadSongs();
    }

    // ITunes API request to Top 100 Songs
    loadSongs(){
        this.setState({
            isLoading: true,
        })
        axios
            .get('https://itunes.apple.com/us/rss/topalbums/limit=100/json')
            .then( response => {
                if(response.status === 200){ // handle request status
                    // Maximum amount of time a resource is considered fresh (max-age cache-control directive)
                    let tempAge = response.headers['cache-control'].match(/(\d+)/);

                    this.setState({
                        loadedSongs: response.data.feed.entry,
                        cachedMaxAgeSec: +tempAge[0] * +1000, // convert form sec to microsec
                        lastUpdated: response.data.feed.updated.label,
                    })

                    this.setState({
                        isLoading: false,
                    })

                    // Set interval to request Top 100 Songs to API after max-age cache-control directive
                    setInterval(this.loadSongs, this.state.cachedMaxAgeSec);
                }else{
                    console.error('Server error ' + response.status + ' status code');
                }
            })
            .catch(error => console.error('Request Error => ' + error))
    }

    // Handler function to save song to favorite list
    saveSong(song, clicked){
        let tempSave = [];
        if(clicked) {
            tempSave = [...this.state.savedSongs, song];
        }else{
            this.state.savedSongs.map((s, i) => {
                if(s.id.attributes["im:id"] === song.id.attributes["im:id"]){
                    // Left this because deleted could also be cached for an undo button
                    // console.log("DELETED SUCCESS " + i);
                }else{
                    tempSave.push(s);
                }
            })
        }

        this.setState({
            savedSongs: tempSave,
            savedSongsNum: tempSave.length,
        })
    }

    // Handler function to perform fuse search on song list based on user input
    handleSearch(e){
        console.log(e.element);
        // var fuse = new Fuse(this.state.loadedSongs, {
        //     keys: [
        //         {name: 'title.label',weight: 0.2}
        //     ]
        // });
        // const results = fuse.search('soul');
        // console.log(results);
        // this.setState({
        //     searchSongs: results,
        // })
    }

    render() {
        return(
            <div className="root-wrapper">
                <Navbar className="nav-bar" expand="lg">
                    <Navbar.Brand>Top Songs</Navbar.Brand>
                    {/*<Navbar.Toggle aria-controls="responsive-navbar-nav" />*/}
                    {/*<Navbar.Collapse id="basic-navbar-nav">*/}
                    {/*    <Form className="justify-content-end" onSubmit={this.handleSearch} inline>*/}
                    {/*        <Form.Control type="text" placeholder="Search" className="justify-content-end"/>*/}
                    {/*        {this.state.searchSongs.map((e) =>*/}
                    {/*            <SimpleSongCard s={e.item}/>*/}
                    {/*        )}*/}
                    {/*        <Button variant="outline-info" type="submit">Search</Button>*/}
                    {/*    </Form>*/}
                    {/*</Navbar.Collapse>*/}
                </Navbar>
                <SavedSongCounter songCount={this.state.savedSongsNum} songList={this.state.savedSongs}/>
                <Container>
                    <h1 className="main-title">Top 100 Songs</h1>
                    {this.state.lastUpdated !== '' ?
                        <h2 className="updated-title">Last Updated: {this.state.lastUpdated}</h2>
                        : <div/>
                    }
                    <SongsContainer songList={this.state.loadedSongs} isLoading={this.state.isLoading} saveSong={this.saveSong}/>
                </Container>
            </div>
        )
    }
}

export default MainTopSongsView;