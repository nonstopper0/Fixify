import React from 'react';
import { Link } from 'react-router-dom';
import navstyle from './css/navstyle.css';

function MechanicHeader() {
    const IdOfUser = `/user/${'test'}` /*this.props.user.id*/
    return (
        <nav style={navstyle}>
             <Link to ="/problems">HOME</Link>
             <Link to ={IdOfUser}>PROFILE</Link>
             <Link to="/logout">LOGOUT</Link>
        </nav>
    )
}

export default MechanicHeader;