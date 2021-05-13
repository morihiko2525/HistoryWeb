import React, {useEffect, useState} from 'react';
import axios from 'axios';
import classes from "./Test.module.css";

const EventList = () =>{
    const [events, setEvents] = useState([]);

    useEffect(()=>{
        getEvents()
    },[])

    const getEvents = async () => {
        const responce = await axios.get('/api/event');
        setEvents(responce.data.events);
    }


return (
    <div>
        <h1>Events一覧</h1>
        <ul>
            {events.map((event) => <li key={event.id}>{event.name}</li>)}
        </ul>
    </div>
);
}


export default EventList;