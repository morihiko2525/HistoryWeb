import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams,Link} from 'react-router-dom';

class EventList extends React.Component {

    constructor(props,context){
        super(props,context)
        this.state = {
            events : [],
            previous_year: "",
            historydata:[],
            events: [],
            user_id: "",
        }
    }
    
    render(){

        return(
            <div>
                <Link to="/history_edit"><a href ="#">編集する</a></Link>
                <p>年表タイトル: {this.props.historydata.name}</p>
                <p>historyID : {this.props.historydata.id}</p>
                <React.Fragment>
                    {this.props.events.map(event =>
                        <React.Fragment>                    
                        <div className = "year-column">{event.year}年</div>

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