import React from "react";
import {AlbumCard} from "./AlbumCard";
import Button from "react-bootstrap/cjs/Button";
import Spinner from "react-bootstrap/cjs/Spinner";

import "../styles/AlbumsContainer.scss";

/*
* Song List Container
*   Contains all songs provided by parent list
*/
export const AlbumContainer = props => {

    /*
       Passes song to parent component from child to
        save song. Note: can also use context for
        reactJS if component tree would scale more.
    */
    const saveSong = (song, clicked) => {
        if(clicked){
            props.saveSong(song, clicked);
        }else{
            props.saveSong(song, clicked);
        }
    }

    return(
        <div className="songs-wrapper">
            {props.isLoading ? <div className="loading-component">
                <Button variant="primary" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                />
                Loading...
                </Button></div> : <></>}
            {props.songList.map((e, i) => <AlbumCard key={e.id.attributes['im:id']} song={e} saveSong={saveSong} index={i}/>)}
        </div>
    )
}