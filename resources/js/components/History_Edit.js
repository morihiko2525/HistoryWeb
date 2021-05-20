import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Modal_CreateEvent from './Modal_CreateEvent';
import Modal_EditEvent from './Modal_EditEvent';
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
            isOnceChanged: false,
        }
        //this.setShowEditModal = this.setShowEditModal.bind(this);

    }

    setShowEditModal(b){
        this.state.showEditModal = b;
        console.log("state is :" + this.state.showEditModal);
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

    getEventsData(){
        this.state.isOnceChanged = true;
        let id = this.props.historydata.id;
        //console.log(id);
        axios
            .get('/api/event/'+ id)
            .then(response => {
                console.log("通信に成功しました")
                this.setState({_events: response.data.events});
                console.log(response.data.events);
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
                <Modal_CreateEvent history_id={this.props.historydata.id}/>
                <Modal_EditEvent showEditModal = {this.state.showEditModal}/>
                <p>年表タイトル: {this.props.historydata.name}</p>
                <p>historyID : {this.props.historydata.id}</p>
                <p>ユーザーID：{this.props.user_id}</p>
                <React.Fragment>
                    {this.state.isOnceChanged ?
                    (                  
                        this.state._events.map(event =>
                            <React.Fragment>
                            
                            <div className = "year-column">{event.year}年</div>
    
                            <div className = "event clearfix">                   
                                <p className = "event-date">{event.month}月{event.day}日</p>
            
                                <div className = "event-image"></div>
            
                                <div className = "event-content">
                                    <a href = "#" onClick = { ()=>this.setShowEditModal(true)}><h3 className = "event-title">「{event.name}」</h3></a>
                                    <p className = "event-desc">{event.description}</p>
                                </div>
                            </div>
                            </React.Fragment>                        
                        )
                    
                        ):(
                            this.props.events.map(event =>
                                <React.Fragment>
                                
                                <div className = "year-column">{event.year}年</div>
        
                                <div className = "event clearfix">                   
                                    <p className = "event-date">{event.month}月{event.day}日</p>
                
                                    <div className = "event-image"></div>
                
                                    <div className = "event-content">
                                        <a href = "#" onClick = { ()=>this.setShowEditModal(true)}><h3 className = "event-title">「{event.name}」</h3></a>
                                        <p className = "event-desc">{event.description}</p>
                                    </div>
                                </div>
                                </React.Fragment>                        
                            ))         
                    }

                </React.Fragment>
                <a onClick = {()=>this.getEventsData()}>取得</a>
            </div>
        )
    }

}

export default History_Edit;