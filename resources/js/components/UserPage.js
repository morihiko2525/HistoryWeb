import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class UserPage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            userdata : [],
            histories : [],
        }
    }

    componentDidMount() {
        let id = this.props.userdata.id;
        axios
            .get('/api/getMyHistories/' + id)
            .then(response => {
                console.log("通信に成功しました");
                this.setState({histories: response.data.histories});
                console.log(response.data);
                console.log(this.state.histories)
            })
            .catch(err => {
                console.log(err);
                console.log('通信に失敗しました');
            });

        axios
            .get('/api/getMyHistories/' + id)
            .then(response => {
                console.log("通信に成功しました");
                this.setState({histories: response.data.histories});
                console.log(response.data);
                console.log(this.state.histories)
            })
            .catch(err => {
                console.log(err);
                console.log('通信に失敗しました');
            });
    }

    render(){
        return(
            <div>
                <h1>ユーザーページ</h1>

                <h2>自分の年表一覧</h2>
                {this.state.histories.map(history =>
                    <h1><a href = "#" >{history.name}</a></h1>
                    )}
               
                          

            </div>
        )
    }

}

export default UserPage;