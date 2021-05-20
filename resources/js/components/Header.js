import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Header extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            userdata : [],
        }
    }
/*
    componentDidMount() {
        axios
            .get('/api/fetch_userdata')
            .then(response => {
                console.log("ユーザーデータを取得")
                this.setState({userdata: response.data.user});
                console.log(this.state.userdata);
                //console.log(events)
            })
            .catch(err => {
                console.log(err);
                console.log('通信に失敗しました');
            });
    }*/

    getUserName(){

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
                
                    <li className="nav-item dropdown">
                        <a href = "#" className="nav-link dropdown-toggle" data-toggle="dropdown">{this.props.userdata.name}</a>
                        <ul className="dropdown-menu dropdown-menu-right">

                            <Link to = "/userpage"><li className="dropdown-item"><a href ="#">プロフィール</a></li></Link>
                            <li className="dropdown-divider"></li>

                            <li className="dropdown-item"><a href="{{Route('userpage.index')}}">ログアウト</a></li>
                        </ul>
                    </li>


                </div>
            </nav>
            </div>
            </div>
        )
    }
}

export default Header;