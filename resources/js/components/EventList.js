import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams,Link, useHistory} from 'react-router-dom';
import YearColumn from './YearColumn';

class EventList extends React.Component {

    constructor(props,context){
        super(props,context)
        this.state = {
            events : [],
            previous_year: "",
            historydata:[],
            _historydata:[],
            events: [],
            _events: [],
            user_id: "",
            isInPageAccess: "",
            isOnceChanged: "",
        }

        this.setPreviousYear = this.setPreviousYear.bind(this);
    }
    componentDidMount() {
        if(this.props.isInPageAccess){
            history.pushState(null, null, '/history_view/' + this.props.historydata.id);
        }else{        
            let urlParamStr = window.location.pathname;
            console.log("url is " + urlParamStr);
            let data = urlParamStr.split('/');
            let id = data[2];
            console.log(id); //これがIDになる
            this.getHistoryData(id);
            this.getEventsData(id); //再描画処理
        }
    }

    //イベントを再取得する処理
    getEventsData(_id){
        axios
        .get('/api/event/'+ _id)
        .then(response => {
            console.log("通信に成功しました")
            this.setState({_events: response.data.events});
            console.log(response.data.events);
            //console.log(events)
            console.log("再取得完了");
            this.setState({isOnceChanged: true});
            })
            .catch(err => {
                console.log(err);
                console.log('通信に失敗しました');
            });
    }

    //年表データを再取得する処理
    getHistoryData(_id){
        axios
        .get('/api/getHistoryData/'+ _id)
        .then(response => {
            console.log("通信に成功しました")
            console.log(response.data);
            this.setState({_historydata: response.data.historydata});
            console.log("年表データの再取得完了");
            this.props.setHistory(this.state._historydata);
            })
            .catch(err => {
                console.log(err);
                console.log('通信に失敗しました');
            });
    }
    
    setPreviousYear(year){
        //this.setState({previous_year: year});
    }

    render(){
        return !this.state.isOnceChanged?(
            <div className="container">
                <Link to="/history_edit"><a href ="#">編集する</a></Link>
                <h1>「{this.props.historydata.name}」</h1>

                <React.Fragment>
                    {this.props.events.map(event =>
                        <React.Fragment>                    
                        <YearColumn
                            setPreviousYear = {this.setPreviousYear.bind(this)}
                            previous_year = {this.state.previous_year}
                            current_year = {event.year}
                        />

                        <div className = "event clearfix">                   
                            <p className = "event-date">{event.month}月{event.day}日</p>
        
                            <div className = "event-image"></div>
        
                            <div className = "event-content">
                                <h3 className = "event-title">「{event.name}」</h3>
                                <p className = "event-desc">{event.description}</p>
                            </div>
                        </div>
                        </React.Fragment>
                       
                    )}

                </React.Fragment>
            </div>
        ):(
            //URLダイレクト接続の処理
            <div className="container">
                <Link to="/history_edit"><a href ="#">編集する</a></Link>
                <h1>「{this.state._historydata.name}」</h1>

                <React.Fragment>
                    {this.state._events.map(event =>
                        <React.Fragment>                    
                        <YearColumn
                            setPreviousYear = {this.setPreviousYear.bind(this)}
                            previous_year = {this.state.previous_year}
                            current_year = {event.year}
                        />

                        <div className = "event clearfix">                   
                            <p className = "event-date">{event.month}月{event.day}日</p>
        
                            <div className = "event-image"></div>
        
                            <div className = "event-content">
                                <h3 className = "event-title">「{event.name}」</h3>
                                <p className = "event-desc">{event.description}</p>
                            </div>
                        </div>
                        </React.Fragment>
                       
                    )}

                </React.Fragment>
            </div>
        )
    }
}

export default EventList;