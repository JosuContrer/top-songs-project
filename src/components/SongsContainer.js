import React from "react";
import {SongCard} from "./SongCard";

import "../styles/SongsContainer.scss";

/*
* Song List Container
*   Contains all songs provided by parent list
*/
export const SongsContainer = props => {

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
            {props.songList.map((e, i) => <SongCard key={e.id.attributes['im:id']} song={e} saveSong={saveSong} index={i}/>)}
        </div>
    )
}