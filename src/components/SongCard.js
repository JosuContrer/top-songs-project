// Functional Component
import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as solidHeart} from "@fortawesome/free-solid-svg-icons";
import {faHeart as emptyHeart} from "@fortawesome/free-regular-svg-icons";
import {Row, Col, Card, Accordion, useAccordionToggle} from "react-bootstrap";

export const SongCard = props => {
    // Hearted icon click
    const [clicked, setClicked] = useState(false);
    const [eventKey, setEventKey] = useState('0');

    useEffect(() => {
        // console.log("This rendered as " + clicked);
    })

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
