
import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {Modal,Button} from 'react-bootstrap'


export const Modals = (props) => {
    const [show, setShow] = useState(props.flag);
    
    console.log("Inside Modal",show)

  const handleClose = () => setShow(false);

    return (
        <>
        
        

      <Modal centered
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Signup Success </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        Congrats!
          Your account has been successfully created.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Link to="/sign-in">
          	<Button variant="primary">Login</Button>
          </Link>
        </Modal.Footer>
      </Modal>
      </>
      );
}

