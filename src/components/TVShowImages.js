import React, {useState} from 'react';
import { Modal,Button} from 'react-bootstrap';
import axios from '../Utility/axios';
import {useNavigate} from 'react-router-dom';

const TVShowImages =({ShowId, Title, Description, tvShowImage}) =>{
    const removeTvShow_URL = '/Admin/DeleteTvShowById';
    const [show, setShow]=useState(false);
    const handleShow=()=>setShow(true);
    const navigate = useNavigate();
    const handleClose=()=>{
        setRecordDeleted('');
        setShow(false);
        navigate("/TVshown");
    }
    const [recordDeleted, setRecordDeleted]=useState('');    
    const removeTVShow = async (e) =>{
        e.preventDefault();
        let token = "Bearer " + JSON.parse(localStorage.getItem('userToken'));
        const config = {
            headers: { Authorization: token },
            params: { "showId": ShowId }
        };
        
        const response = await axios.delete(
            removeTvShow_URL,
            config
        );
        setRecordDeleted(response?.data);
    };
    return(

<>
<div className="card text-center bg-secondary mb-3">
<div className="card-body">
  <img className="card-img-top" src={tvShowImage} />
  <div className="card-body">
      <button type="button" className="btn btn-dark" onClick={handleShow} >View More</button>
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <img className="card-img-top" style={{width:'14rem'}}src={tvShowImage} />
          <h3>{Title}</h3>
          <p>{Description}</p>
          </Modal.Body>
          {recordDeleted && ( <h1>{recordDeleted}</h1>)}
          <Modal.Footer>
              <Button variant="secondary" onClick={removeTVShow}>Remove Show</Button>
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