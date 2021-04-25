// Functional Component
import {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as solidHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart as emptyHeart} from "@fortawesome/free-regular-svg-icons";

export const SongCard = props => {
    // Hearted icon click
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        console.log("This rendered as " + clicked);
    })

    function handleClick(){
        setClicked(!clicked);
        props.saveSong(props.song, !clicked);
    }

    return(
        <div key={props.song.id.attributes['im:id']} className="song-card">
            <img src={props.song['im:image'][1].label} alt="song image"/>
            <h1 className="song-title">{props.song['im:name'].label}</h1>
            <h2 className="artist-name">Artist: {props.song['im:artist'].label}</h2>
            <span onClick={() => {handleClick()}}>
                {clicked ? <FontAwesomeIcon className="solid-heart-icon" icon={solidHeart}/>
                    : <FontAwesomeIcon className="empty-heart-icon" icon={emptyHeart}/>
                }
            </span>
        </div>
    )
}
