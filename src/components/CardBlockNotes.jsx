import React from "react";
import "../styles/card-title.css";



const CardBlockNotes = props => {

    const OnCliclCard = () => {
        localStorage.title = props.title;
        localStorage.description = props.description;
        localStorage.id = props.id;
        window.location.href = "/block_note";
    }

    return (
        <div className="card-text" onClick = {OnCliclCard}>
            <div className="text-title">{props.title}</div>
        </div>
    );
}

export default CardBlockNotes;