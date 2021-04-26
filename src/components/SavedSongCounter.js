/*
* Saved Songs Button Functional Component
*   This functional component allows users to visualize
*   the number of songs saved. When clicked it displays
*   the props list of songs passed by its parent.
*/
export const SavedSongCounter = props => {

    // Handler to toggle boostrap collapse component
    const handleClick = () =>{ document.getElementById("saved-songs-collapse").classList.toggle('show');}

    return(
        <div className="saved-songs-container">
            <div className="collapse" id="saved-songs-collapse">
                <div className="card">
                    <ul className="list-group list-group-flush">
                        {props.songList.map((s, i) =>
                            <li className="list-group-item" key={s.id.attributes['im:id']}>{s.title['label']}</li>
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