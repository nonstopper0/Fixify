import React from 'react';
import { Link } from 'react-router-dom';
import navstyle from './css/navstyle.css';


function UserHeader() {
    return (
        <nav style={navstyle}>
             <Link to ="/problems">HOME</Link>
             <Link to ="/mechanic">PROFILE</Link>
             <Link to="/logout">LOGOUT</Link>
        </nav>
    )
}

export default UserHeader