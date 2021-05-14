import React, {useEffect, useState} from 'react';
import axios from 'axios';

const EventList = () =>{
    const [events, setEvents] = useState([]);

    useEffect(()=>{
        getEvents()
    },[])

    const getEvents = async () => {
        const responce = await axios.get('/api/event');
        setEvents(responce.data.events);
    }

    let pre_y;

return (
    <div>
        <h1 className="test">Events一覧</h1>
            <button>編集する</button>

            {events.map((event) => 
            <React.Fragment>
                <div class = "year-column">{event.year}年</div>

                <div class = "event clearfix">                   
                    <p className = "event-date">{event.month}月{event.day}日</p>

                    <div className = "event-image"></div>

                    <div className = "event-content">
                        <h3 className = "event-title">「{event.name}」</h3>
                        <p className = "event-desc">{event.description}</p>
                    </div>
                </div>
            </React.Fragment>
            )}
        
    </div>
);
}


export default EventList;