import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Modal_CreateEvent from './Modal_CreateEvent';
import EditModal from './Modal_CreateEvent';
class History_Edit extends React.Component {

    constructor(props,context){
        super(props,context)
        this.state = {
            events : [],
            previous_year: "",
            user_id: "",
            historydata:[],
        }
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


    render(){
        return(
            <div>
                <Modal_CreateEvent history_id={this.props.historydata.id}/>
                <p>年表タイトル: {this.props.historydata.name}</p>
                <p>historyID : {this.props.historydata.id}</p>
                <p>ユーザーID：{this.props.user_id}</p>
                <React.Fragment>
                    {this.state.events.map(event =>
                        <React.Fragment>
                        
                        <div className = "year-column">{event.year}年</div>

                        <div className = "event clearfix">                   
                            <p className = "event-date">{event.month}月{event.day}日</p>
        
                            <div className = "event-image"></div>
        
                            <div className = "event-content">
                                <a href = "#"><h3 className = "event-title">「{event.name}」</h3></a>
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

export default History_Edit;