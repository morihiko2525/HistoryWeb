import React, {useEffect, useState} from 'react';
import axios from 'axios';

class Header extends React.Component {

    componentDidMount() {
        axios
            .get('/api/fetch_userdata')
            .then(response => {
                console.log("ユーザーデータを取得")
                //this.setState({events: response.data.events});
                console.log(response.data);
                //console.log(events)
            })
            .catch(err => {
                console.log(err);
                console.log('通信に失敗しました');
            });
    }
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