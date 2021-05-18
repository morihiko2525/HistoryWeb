import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class UserPage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            userdata : [],
            histories : "",
        }
    }

    componentDidMount() {
        let id = this.props.userdata.name;
        /*axios
            .get('/api/user/')
            .then(response => {
                console.log("通信に成功しました")
                this.setState({events: response.data.events});
                console.log(response.data.events);
                //console.log(events)
            })
            .catch(err => {
                console.log(err);
                console.log('通信に失敗しました');
            });*/
    }

    render(){
        return(
            <div>
                <h1>ユーザーページ</h1>
                {this.props.userdata.name}
                <h2>自分の年表一覧</h2>

                <React.Fragment>
                          

                </React.Fragment>
            </div>
        )
    }

}

export default UserPage;