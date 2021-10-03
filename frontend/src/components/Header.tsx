import React from 'react';
import './Header.scss';


function Header(props: {name: string}){
return (
    <div className="Header">
        <div className="wrapper">
            <div className="left title">{props.name}</div>
            <div className="right">
                <button className="addButton">Add</button>
            </div>
        </div>
    </div>
    );
}

export default Header;