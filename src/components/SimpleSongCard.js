import React from 'react';

/*
* Simplified view of a Song Card
*/
export const SimpleSongCard = props => {
    return(
        <div className="simple-card-container">
            {console.log(props.s)}
            <img src={props.s['im:image'][1].label} alt="song image"/>
            <h1>{props.s.title.label}</h1>
        </div>
    );
}