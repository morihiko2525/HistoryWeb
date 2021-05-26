import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Modal_CreateEvent from './Modal_CreateEvent';
import Modal_EditEvent from './Modal_EditEvent';
import Modal_AddImg from './Modal_AddImg';
import EditModal from './Modal_CreateEvent';
import { Modal } from 'react-bootstrap';
import { GetEventsData } from './api/Api';

class History_Edit extends React.Component {

    constructor(props,context){
        super(props,context)
        this.state = {
            events : [],
            _events: [],
            previous_year: "",
            historydata:[],
            showEditModal: false,
            showImgModal: false,
            isOnceChanged: false,
            selectEvent: [],
            showTitleEdit: false,
        }
        //this.setShowEditModal = this.setShowEditModal.bind(this);
        this.getEventsData = this.getEventsData.bind(this); //これがないとsetStateがundefinedになる

    }

    
    componentDidMount() {
        let id = this.props.historydata.id;
        //console.log(id);
        axios
        .get('/api/event/'+ id)
        .then(response => {
            console.log("通信に成功しました")
            this.setState({events: response.data.events});
            console.log(response.data.events);
            //console.log(events)
        })
        .catch(err => {
            console.log(err);
            console.log('通信に失敗しました');
        });
    }

    //OnClickでは関数しか呼べないため、stateを変更するための関数を作成した
    setShowEditModal(b){
        this.setState({showEditModal: b});
        console.log("state is :" + this.state.showEditModal);
        console.log(this.state.selectEvent);
    }

    setShowImgModal(b){
        this.setState({showImgModal: b});
        console.log("state is :" + this.state.showImgModal);
    }

    //イベントを再取得する処理
    getEventsData(){
        let id = this.props.historydata.id;
        //console.log(id);
        axios
        .get('/api/event/'+ id)
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

    render(){
        return(
            
            
            <div className="container">
                {this.state.showTitleEdit?
            (
                <div>
                    <div className="input-group input-group-lg col-md-6 center-block">
                        <input
                        type="text"
                        className="form-control"
                        defaultValue={this.props.historydata.name}            
                        ></input>
                        <div className="input-group-append">
                            <button
                            className="btn btn-outline-secondary"
                            type="button"
                            id="button-addon2"
                            onClick={()=>this.setState({showTitleEdit:false})}
                            >決定</button>
                        </div>
                    </div>
                </div>
            ):
            (
                <div>
                <a href = "#" onClick={()=>{
                        this.setState({showTitleEdit:true})
                        }}>
                            <h1>「{this.props.historydata.name}」</h1></a>                    
                </div>
            )}

                <p>{this.props.historydata.description}</p>
                <Modal_EditEvent 
                showEditModal = {this.state.showEditModal}
                setFalse={() => this.setShowEditModal(false)}
                getEventsData={this.getEventsData}
                selectEventID={this.state.selectEvent.id}
                eventName={this.state.selectEvent.name}
                eventDesc={this.state.selectEvent.description}
                eventYear={this.state.selectEvent.year}
                eventMonth={this.state.selectEvent.month}
                eventDay={this.state.selectEvent.day}
                />


                <Modal_CreateEvent
                    history_id={this.props.historydata.id}
                    getEventsData={this.getEventsData}
                />

                <Modal_AddImg
                setFalse={() => this.setShowImgModal(false)}
                showImgModal = {this.state.showImgModal}
                />
                

                <React.Fragment>
                    
                    {this.state.isOnceChanged ?
                    (                  
                        //一度getEventsDataで取得した後の処理
                        //state._eventsを使用する
                        this.state._events.map(event =>
                            <React.Fragment>
                            <div className = "year-column">{event.year}年</div>
    
                            <div className = "event clearfix">                   
                                <p className = "event-date">{event.month}月{event.day}日</p>
            
                                <div className = "event-image" onClick={()=>{
                                    console.log("img clicked!");
                                }}></div>
            
                                <div className = "event-content">
                                    <a href = "#" onClick = { ()=>{
                                        this.setState({selectEvent:event});
                                        this.setShowEditModal(true);
                                    }
                                        
                                        }><h3 className = "event-title">「{event.name}」</h3></a>
                                    <p className = "event-desc">{event.description}</p>
                                </div>
                            </div>
                            </React.Fragment>                        
                        )
                    
                        ):(
                            //一度も変更していないとき(一覧画面から遷移したとき)の処理
                            //App.jsから流れてくるprops.eventsを使用する。
                            //memo: App.jsで再取得すればよい？ロード画面の有り無しを指定できれば問題なくそれでできるかも。そっちのほうがスマート。
                            this.props.events.map(event =>
                                <React.Fragment>
                                
                                <div className = "year-column">{event.year}年</div>
        
                                <div className = "event clearfix">                   
                                    <p className = "event-date">{event.month}月{event.day}日</p>
                
                                    <div className = "event-image" onClick={()=>{
                                        console.log("img clicked!");
                                        this.setState({selectEvent:event})
                                        this.setShowImgModal(true);
                                        }}></div>
                
                                    <div className = "event-content">
                                        <a href = "#" onClick = { ()=>{
                                            this.setState({selectEvent:event})
                                            this.setShowEditModal(true);
                                        }
                                            
                                            }><h3 className = "event-title">「{event.name}」</h3></a>
                                        <p className = "event-desc">{event.description}</p>
                                    </div>
                                </div>
                                </React.Fragment>                        
                            ))         
                    }

                </React.Fragment>
            </div>
        )
    }

}

export default History_Edit;