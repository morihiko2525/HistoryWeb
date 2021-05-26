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

  
  
class Modal_AddImg extends React.Component {
      
    constructor(props,context){
        super(props,context)
        this.state = {
            selectEventID:"",
            isOpen: false,
            showImgModal: false,
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
 
    closeModal(){
        this.setState({isOpen: false});
        this.props.setFalse();
        console.log("Modal close");
        console.log(this.state.isOpen);
    }
    
    postForm(){
        this.checkChange()
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

    checkChange()
    {
        if(!this.props.u_eventDesc){
            this.setState({u_eventDesc: this.props.eventDesc})
            console.log("this props : "+ this.props.eventDesc);
            console.log("desc is " + this.state.u_eventDesc);
        }
    }

    render(){
    return this.props.showImgModal?
    (
        <Modal
          isOpen={this.props.showImgModal}
          //onAfterOpen={afterOpenModal}
          onRequestClose={ ()=>this.closeModal()}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2>画像を追加する</h2>
          <form>

          <p>現在調整中</p>


          <Button variant="success" className="mr-2" onClick={ ()=>this.closeModal()}>close</Button>
          <Button className= "btn-success" onClick={ ()=> this.postForm()}>完了</Button>
          </form>
        </Modal>
    ):(
        <div>
        
        </div>
    );
    }
}
 
export default Modal_AddImg;