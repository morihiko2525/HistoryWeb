import React, {useEffect, useState} from 'react';
import axios from 'axios';

class EventList extends React.Component {

    constructor(props,context){
        super(props,context)
        this.state = {
            events : [],
            previous_year: "",
            
        }
    }

    componentDidMount() {
        axios
            .get('/api/event/2')
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

    renderTest(){
        this.setState({previous_year: event.year});
        return(
            <p>rendertest</p>
        );      
    }

    render(){
        let test = "testaaaaaa";
        return(
            <div>

                <p>テスト</p>
                
                <React.Fragment>
                    {this.state.viewTest}
                    {this.state.events.map(event =>
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