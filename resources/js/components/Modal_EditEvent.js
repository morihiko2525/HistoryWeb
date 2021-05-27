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

  
  
class Modal_EditEvent extends React.Component {
      
    constructor(props,context){
        super(props,context)
        this.state = {
            selectEventID:"",
            eventName: "",
            eventDesc: "",
            eventYear: "",
            eventMonth: "",
            eventDay: "",
            history_id: "",
            isOpen: false,
            showEditModal: false,
            u_eventName: "",
            u_eventDesc: "",
            u_eventYear: "",
            u_eventMonth: "",
            u_eventDay: "",
        }
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({eventName: this.props.selectEvent.name});
        this.setState({isOpen: true});
        console.log("Modal open");
        console.log(this.state.isOpen);
        console.log(this.props.selectEvent);
    }
 
 
    afterOpenModal() {        
        //subtitle.style.color = '#3ab60b';
    }
 
    closeModal(){
        this.setState({isOpen: false});
        this.props.setFalse();
        console.log("Modal close");
        console.log(this.state.isOpen);
    }
    
    postForm(){
        this.clearForm();
        axios.post('/api/event/update', { 
            'id': this.props.selectEventID,
            'name': this.state.u_eventName,
            'description': this.state.u_eventDesc,
            'year': this.state.u_eventYear,
            'month': this.state.u_eventMonth,
            'day': this.state.u_eventDay,
        
        })
            .then(res => {
                console.log(res);
      })
      this.closeModal()
      this.props.getEventsData(); //再描画処理
    }

    deleteEvent(){
        this.checkChange()
        axios.post('/api/event/delete', { 
            'id': this.props.selectEventID,
            //本来ここにtokenを含めるべき。後々実装。       
        })
            .then(res => {
                console.log(res);
      })
      this.closeModal()
      this.props.getEventsData(); //再描画処理
    }

    checkChange()
    {
        if(!this.props.u_eventDesc){
            this.setState({u_eventDesc: this.props.eventDesc})
            console.log("this props : "+ this.props.eventDesc);
            console.log("desc is " + this.state.u_eventDesc);
        }
    }

    clearForm(){
        this.setState({eventName: ""});
        this.setState({eventDesc: ""});
        this.setState({eventYear: ""});
        this.setState({eventMonth: ""});
        this.setState({eventDay: ""});
        this.setState({u_eventName: ""});
        this.setState({u_eventDesc: ""});
        this.setState({u_eventYear: ""});
        this.setState({u_eventMonth: ""});
        this.setState({u_eventDay: ""});
      }

      
    render(){
    return this.props.showEditModal?
    (
        <Modal
          isOpen={this.props.showEditModal}
          //onAfterOpen={afterOpenModal}
          onRequestClose={ ()=>this.closeModal()}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>イベントを編集</h2>
          <form>

          <label>イベント名<span className = "need"> *</span></label>
          <input
          type = "text"
          id = "name"
          className = "form-control"
          defaultValue={this.props.eventName}
          onChange={e=>this.setState({u_eventName: e.target.value})}
          ></input>
          
          <label>説明<span className = "need"> *</span></label>
          <textarea
          rows="3"
          type = "text"
          id = "description"
          className = "form-control"
          defaultValue={this.props.eventDesc}
          onChange={e=>this.setState({u_eventDesc: e.target.value})}
          ></textarea>

          <label>年<span className = "need"> *</span></label>
          <input
          type = "text"
          id = "year"
          className = "form-control"
          defaultValue={this.props.eventYear}
          onChange={e=>this.setState({u_eventYear: e.target.value})}
          ></input>
          
          <label>月</label>
          <input
          type = "text"
          id = "month"
          className = "form-control"
          defaultValue={this.props.eventMonth}
          onChange={e=>this.setState({u_eventMonth: e.target.value})}
          ></input>
          
          <label>日</label>
          <input
          type = "text"
          id = "day"
          className = "form-control"
          defaultValue={this.props.eventDay}
          onChange={e=>this.setState({u_eventDay: e.target.value})}
          ></input>


          <div className = "btn-group">
            <Button variant="success" onClick={ ()=>this.closeModal()}>close</Button>
            <Button className= "btn-success" onClick={ ()=> this.postForm()}>完了</Button>
            <Button className= "btn-danger" onClick={ ()=> this.deleteEvent()}>削除</Button>
          </div>
          </form>
        </Modal>
    ):(
        <div>
        
        </div>
    );
    }
}
 
export default Modal_EditEvent;