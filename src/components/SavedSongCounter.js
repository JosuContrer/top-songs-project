export const SavedSongCounter = props => {
    return(
        <div className="saved-songs-container">
            <div className="song-count">{props.songCount}</div>
            <button className="saved-songs-button" onClick={props.onClick}>Saved <br/>Songs</button>
        </div>
    )
}