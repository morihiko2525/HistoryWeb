import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import PropTypes from 'prop-types';
import { GetEventsData } from './api/Api';

class UserPage extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            userdata : [],
            histories : [], //年表のデータが入った配列
            history_id : "",
        };
        this.tryToGetEventsData = this.tryToGetEventsData.bind(this);
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
    }

    tryToGetEventsData(){
        GetEventsData(this.state.history_id, this.props.setEventsData, this.props.setIsLoading);
    }

    render(){

        return(
            <div>
                <h1>ユーザーページ</h1>

                <h2>自分の年表一覧</h2>
                {this.state.histories.map(history =>
                    
                    //<Link to = {{pathname: "/eventlist" , state: {historydata: this.state.histories}}}><h1><a href = "#" >{history.name}</a></h1></Link>
                    //<h1 onClick={this.props.history.push({pathname: "/eventlist", state: {historydata: this.state.histories}})}><a href = "#" >{history.name}</a></h1>
                    

                    <Link to = {{pathname: "/eventlist" , state: {historydata: this.state.histories}}}><h1 onClick = {() => 
                        {
                            this.state.history_id = history.id; //選んだhistoryのIDを代入
                            this.props.setHistory(history);  //App.jsにhistoryテーブルのデータをまるごと格納
                            this.tryToGetEventsData(); //データ取得処理
                            this.props.setIsInPageAccess(true);
                        }
                    }><a href = "#" >{history.name}</a></h1></Link>

                    
                    )}
               
            </div>
        )
    }

}

export default UserPage;