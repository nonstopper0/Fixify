import React from 'react';
import { Link } from 'react-router-dom';
import navstyle from './css/navstyle.css';


function UserHeader() {
    return (
        <nav style={navstyle}>
             <Link to ="/user">HOME</Link>
             <Link to="/logout">LOGOUT</Link>
        </nav>
    )
}

export default UserHeader