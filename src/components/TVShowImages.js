import a1 from '../Images/a1.jpg';
import a2 from '../Images/a2.jpg';
import a3 from '../Images/a3.jpg';
import a4 from '../Images/a4.jpg';
import a5 from '../Images/a5.jpg';
import a6 from '../Images/a6.jpg';
import a7 from '../Images/a7.jpg';
import React, {useState} from 'react';
import { Modal,Button} from 'react-bootstrap';


const TVShowImages =({Title, Description, imagePath}) =>{

    const [show, setShow]=useState(false);

    const handleShow=()=>setShow(true);
    const handleClose=()=>setShow(false);

    let result ='';
    imagePath === "a1" 
    ? result= a1 : imagePath === 'a2'
    ? result=a2 : imagePath === 'a3' 
    ? result=a3 : imagePath === 'a4' 
    ? result=a4 : imagePath === 'a5' 
    ? result=a5 : imagePath === 'a6' 
    ? result=a6 : imagePath === 'a7'
    ? result=a7:'';

    return(

<>
<div className="card text-center bg-secondary mb-3">
<div className="card-body">
  <img className="card-img-top" src={result} />
  <div className="card-body">
      <button type="button" className="btn btn-dark" onClick={handleShow} >View More</button>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <img className="card-img-top" style={{width:'14rem'}}src={result} />
          <h3>{Title}</h3>
          <p>{Description}</p>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
      </Modal>
  </div>
</div>
</div>
</>
       
    )
}

export default TVShowImages;