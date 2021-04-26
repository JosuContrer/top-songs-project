// Main Application Container
import React, {Component} from "react";
import SongsContainer from "./SongsContainer";
import {SavedSongCounter} from "./SavedSongCounter";
import Container from "react-bootstrap/cjs/Container";
import Navbar from "react-bootstrap/cjs/Navbar";
import Form from "react-bootstrap/cjs/Form";
import FormControl from "react-bootstrap/cjs/FormControl";
import Button from "react-bootstrap/cjs/Button";
import {SimpleSongCard} from "./SimpleSongCard";
// import Nav from "react-bootstrap/cjs/Nav";
import Fuse from 'fuse.js';
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/MainTopSongsView.scss";

class MainTopSongsView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loadedSongs: [],
            savedSongs: [],
            searchSongs: [],
            savedSongsNum: 0,

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
    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(this.state.savedSongs);
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
                        cachedMaxAgeSec: +tempAge[0] * +1000, // convert form sec to microsec
                        lastUpdated: response.data.feed.updated.label,
                    })
                    // console.log(this.state.loadedSongs);
                    // console.log(this.state.cachedMaxAgeSec);
                    // console.log(this.state.lastUpdated);
                    setInterval(this.loadSongs, this.state.cachedMaxAgeSec);
                }else{
                    console.error('Server error ' + response.status + ' status code');
                }
            })
            .catch(error => console.error('Request Error => ' + error))
    }

    saveSong(song, clicked){
        let tempSave = [];
        if(clicked) {
            tempSave = [...this.state.savedSongs, song];
        }else{
            this.state.savedSongs.map((s, i) => {
                if(s.id.attributes["im:id"] === song.id.attributes["im:id"]){
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
                    <SongsContainer songList={this.state.loadedSongs} saveSong={this.saveSong}/>
                </Container>
            </div>
        )
    }
}

export default MainTopSongsView;