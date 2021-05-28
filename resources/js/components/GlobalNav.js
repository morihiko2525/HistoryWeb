import React from 'react';
import {Link} from 'react-router-dom';

const GlobalNav = () => {
    return(
        <nav>
            <ul>
                <Link to="/">
                    <li>Top</li>
                </Link>
                <Link to="/about">
                    <li>About</li>
                </Link>
                <Link to ="/eventlist">
                    <li>EventList</li>
                </Link>
                <Link to ="/login">
                    <li>Login</li>
                </Link>
                <Link to ="/signup">
                    <li>Signup</li>
                </Link>
            </ul>
        </nav>
    )
}

export default GlobalNav;