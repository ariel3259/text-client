import React from "react";
import "../styles/Header.css";
const Header = props => {

    return (
        <header>
            <h1>{props.title}</h1>
            {props.children}
        </header>
    )
}

export default Header;