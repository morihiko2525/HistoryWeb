import React, {useState} from 'react';
import Modal from 'react-modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import axios from 'axios';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width: '700px',
    }
  };  

  
  
  const Modal_CreateEvent = (props) => {
      
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);

    const [eventName, setEventName] = useState("");
    const [eventDesc, setEventDesc] = useState("");
    const [eventYear, setEventYear] = useState(0);
    const [eventMonth, setEventMonth] = useState(0);
    const [eventDay, setEventDay] = useState(0);

    function openModal() {
        setIsOpen(true);
    }
 
    function afterOpenModal() {        
        subtitle.style.color = '#3ab60b';
    }
 
    function closeModal(){
        setIsOpen(false);
    }

    function postForm(){
        axios.post('/api/event/add', { 'name': eventName, 'description': eventDesc, 'year': eventYear, 'month': eventMonth, 'day': eventDay, 'history_id': props.history_id})
            .then(res => {
                console.log(res);
      })
      closeModal()
    }

    return (    
        <div>
        <Button variant="success" className="mr-2" onClick={openModal}>イベントを追加</Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}>イベントを追加</h2>
          <form>

          <label>イベント名</label>
          <input
          type = "text"
          id = "name"
          className = "form-control"
          value={eventName}
          onChange={e=>setEventName(e.target.value)}
          ></input>
          
          <label>説明</label>
          <input
          type = "text"
          id = "description"
          className = "form-control"
          value={eventDesc}
          onChange={e=>setEventDesc(e.target.value)}
          ></input>

          <label>年</label>
          <input
          type = "text"
          id = "year"
          className = "form-control"
          value={eventYear}
          onChange={e=>setEventYear(e.target.value)}
          ></input>
          
          <label>月</label>
          <input
          type = "text"
          id = "month"
          className = "form-control"
          value={eventMonth}
          onChange={e=>setEventMonth(e.target.value)}
          ></input>
          
          <label>日</label>
          <input
          type = "text"
          id = "day"
          className = "form-control"
          value={eventDay}
          onChange={e=>setEventDay(e.target.value)}
          ></input>


          <Button variant="success" className="mr-2" onClick={closeModal}>close</Button>
          <Button className= "btn-success" onClick={postForm}>完了</Button>
          </form>
        </Modal>
      </div>
    );
}
 
export default Modal_CreateEvent;