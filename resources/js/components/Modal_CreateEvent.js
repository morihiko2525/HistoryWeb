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
        <Button variant="success" className="mr-2" onClick={openModal}>モーダル表示</Button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={_subtitle => (subtitle = _subtitle)}>Mebee</h2>
          <Button variant="success" className="mr-2" onClick={closeModal}>close</Button>
          <div>テキストテキスト</div>          
        </Modal>
      </div>
    );
}
 
export default Modal_CreateEvent;