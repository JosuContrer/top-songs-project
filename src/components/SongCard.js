import React, {useEffect, useState} from 'react';
import {Row, Col, Card, Accordion, useAccordionToggle} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as solidHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart as emptyHeart} from "@fortawesome/free-regular-svg-icons";

/*
* Song Card to display song information (based on ITunes API JSON)
*   Functionality:
*       - Shows extra information as an accordion
*       - Heart icon can be clicked and parent component handles click
*/
export const SongCard = props => {
    const [clicked, setClicked] = useState(false); // Heart icon toggle
    const [eventKey, setEventKey] = useState('0'); // Event Key for accordion

    // This acts similar to a life cycle method
    useEffect(() => {
        // console.log("This rendered as " + clicked);
    })

    // Handler for when "heart" icon is clicked on this Song Card
    const handleClick = () => {
        setClicked(!clicked);
        props.saveSong(props.song, !clicked);
    }

    return(
        <Accordion key={props.song.id.attributes['im:id']} defaultActiveKey>
            <Card className="song-card" >
                <Card.Header eventKey={eventKey}>
                    <Row>
                        <CustomToggle eventKey={eventKey} props={props}/>
                        <Col className="song-card-col-heart">
                            <span onClick={() => {handleClick()}}>
                                {clicked ? <FontAwesomeIcon className="heart solid-heart-icon" icon={solidHeart}/>
                                    : <FontAwesomeIcon className="heart empty-heart-icon" icon={emptyHeart}/>
                                }
                            </span>
                        </Col>
                    </Row>
                </Card.Header>
                <Accordion.Collapse eventKey={eventKey}>
                    <Card.Body>
                        Price: {props.song["im:price"].label}<br/>
                        Release Date: {props.song["im:releaseDate"].attributes.label}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    )
}

/*
* Custom Bootstrap Toggle component for card
*/
function CustomToggle({ children, eventKey, props }) {

    const decoratedOnClick = useAccordionToggle(eventKey);

    return (
        <>
            <Col className="song-card-col-img" onClick={decoratedOnClick}>
                <img src={props.song['im:image'][1].label} alt="song image"/>
            </Col>
            <Col className="song-card-col-right" onClick={decoratedOnClick}>
                <Card.Title className="song-title">{props.song['im:name'].label}</Card.Title>
                <Card.Subtitle className="artist-name">Artist: {props.song['im:artist'].label}</Card.Subtitle>
            </Col>
            {children}
        </>
    );
}
