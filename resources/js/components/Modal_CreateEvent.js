import React from 'react';
import Modal from 'react-modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
 
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };  
 
const Modal_CreateEvent = () => {
    var subtitle;
    const [modalIsOpen,setIsOpen] = React.useState(false);
    function openModal() {
        setIsOpen(true);
    }
 
    function afterOpenModal() {        
        subtitle.style.color = '#3ab60b';
    }
 
    function closeModal(){
        setIsOpen(false);
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
          <label>イベント名</label>
          <input
          type = "text"
          id = "name"
          className = "form-control"
          ></input>

          <label>説明</label>
          <input
          type = "text"
          id = "description"
          className = "form-control"
          ></input>

          <label>年</label>
          <input
          type = "text"
          id = "year"
          className = "form-control"
          ></input>
          
          <label>月</label>
          <input
          type = "text"
          id = "month"
          className = "form-control"
          ></input>
          
          <label>日</label>
          <input
          type = "text"
          id = "day"
          className = "form-control"
          ></input>


          <Button variant="success" className="mr-2" onClick={closeModal}>close</Button>
          <Button className= "btn-success">完了</Button>
        </Modal>
      </div>
    );
}
 
export default Modal_CreateEvent;