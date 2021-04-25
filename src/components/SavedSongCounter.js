export const SavedSongCounter = props => {

    function handleClick(){
        document.getElementById("saved-songs-collapse").classList.toggle('show');
    }

    return(
        <div className="saved-songs-container">
            <div className="collapse" id="saved-songs-collapse">
                <div className="card">
                    <ul className="list-group list-group-flush">
                        {props.songList.map((s, i) =>
                            <li className="list-group-item">{s.title['label']}</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="button-container">
                <div className="song-count">{props.songCount}</div>
                <button className="btn btn-primary saved-songs-button" type="button" onClick={handleClick}>Saved <br/>Songs</button>
            </div>
        </div>
    )
}