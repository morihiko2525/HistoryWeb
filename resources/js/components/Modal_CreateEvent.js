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

  
  
  class Modal_CreateEvent extends React.Component {
      
    constructor(props,context){
        super(props,context)
        this.state = {
            eventName: "",
            eventDesc: "",
            eventYear: "",
            eventMonth: "",
            eventDay: "",
            history_id: "",
            isOpen: false,
        }
        //this.setShowEditModal = this.setShowEditModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }

    openModal() {
        this.setState({isOpen: true});
        console.log("Modal open");
        console.log(this.state.isOpen);
    }
 
    afterOpenModal() {        
        //subtitle.style.color = '#3ab60b';
    }
 
    closeModal(){
        this.setState({isOpen: false});
        console.log("Modal close");
        console.log(this.state.isOpen);
    }

    postForm(){
        axios.post('/api/event/add', { 'name': this.state.eventName, 'description': this.state.eventDesc, 'year': this.state.eventYear, 'month': this.state.eventMonth, 'day': this.state.eventDay, 'history_id': this.props.history_id})
            .then(res => {
                console.log(res);
      })
      this.closeModal();
      this.props.getEventsData();
    }

    render(){
        return this.state.isOpen?
        ( 
        
        <div>
        <Button variant="success" className="mr-2" onClick={ ()=> this.openModal()}>イベントを追加</Button>
        <Modal
          isOpen={this.state.isOpen}
          //onAfterOpen={ ()=> afterOpenModal()}
          onRequestClose={ ()=> this.closeModal()}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>イベントを追加</h2>
          <form>

          <label>イベント名</label>
          <input
          type = "text"
          id = "name"
          className = "form-control"
          value={this.state.eventName}
          onChange={e=>this.setState({eventName: e.target.value})}
          ></input>
          
          <label>説明</label>
          <input
          type = "text"
          id = "description"
          className = "form-control"
          value={this.state.eventDesc}
          onChange={e=>this.setState({eventDesc: e.target.value})}
          ></input>

          <label>年</label>
          <input
          type = "text"
          id = "year"
          className = "form-control"
          value={this.state.eventYear}
          onChange={e=>this.setState({eventYear: e.target.value})}
          ></input>
          
          <label>月</label>
          <input
          type = "text"
          id = "month"
          className = "form-control"
          value={this.state.eventMonth}
          onChange={e=>this.setState({eventMonth: e.target.value})}
          ></input>
          
          <label>日</label>
          <input
          type = "text"
          id = "day"
          className = "form-control"
          value={this.state.eventDay}
          onChange={e=>this.setState({eventDay: e.target.value})}
          ></input>


          <Button variant="success" className="mr-2" onClick={ ()=>this.closeModal()}>close</Button>
          <Button className= "btn-success" onClick={ ()=>this.postForm()}>完了</Button>
          </form>
        </Modal>
      </div>
    ):(
        <div>
            <Button variant="success" className="mr-2" onClick={ ()=> this.openModal()}>イベントを追加</Button>
        </div>
    );
    }
}
 
export default Modal_CreateEvent;