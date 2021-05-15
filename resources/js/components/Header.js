import React, {useEffect, useState} from 'react';
import axios from 'axios';

class Header extends React.Component {

    render(){
        
        return(
            <div>

            <div className="mb-4">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">

                <a className="navbar-brand" href="/">Webで年表</a>

                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#nav-bar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="nav-bar">
                    <ul className="navbar-nav mr-auto"></ul>
                    <ul className="navbar-nav"></ul>

                </div>
                </nav>
                </div>
            </div>
        )
    }
}

export default Header;