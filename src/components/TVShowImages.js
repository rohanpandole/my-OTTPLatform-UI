import React, {useState} from 'react';
import { Modal,Button} from 'react-bootstrap';
import axios from '../Utility/axios';
import {useNavigate} from 'react-router-dom';

const TVShowImages =({ShowId, Title, Description, TvShowImage, HandleTvShowList}) =>{
    const removeTvShow_URL = '/Admin/DeleteTvShowById';
    const markTvShow_URL = '/User/MarkTvShowById';
    const [showPopup, setShowPopup]=useState(false);
    const handleShow=()=>setShowPopup(true);
    const navigate = useNavigate();
    const handleClose=()=>{
        HandleTvShowList();
        setRecordDeleted('');
        setShowPopup(false);
    }
    const [recordDeleted, setRecordDeleted]=useState('');    
    const [isReplay, setReplay]=useState(false);   
    let UserID = JSON.parse(localStorage.getItem('UserID'));

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
    const playTVShow = async(e) =>
    {
        e.preventDefault();
        let token = "Bearer " + JSON.parse(localStorage.getItem('userToken'));
        let UserID = JSON.parse(localStorage.getItem('UserID'));
        const config = {
            headers: { Authorization: token , 'Content-Type': 'application/json'},
        };        
        const response = await axios.post(
            markTvShow_URL,
            JSON.stringify({
                "showId": ShowId, 
                "UserID":UserID
            }),
            config
        );
        setReplay(true);
    }
    return(

<>
<div className="card text-center bg-secondary mb-3">
<div className="card-body">
  <img className="card-img-top" src={TvShowImage} />
  <div className="card-body">
      <button type="button" className="btn btn-dark" onClick={handleShow} >View More</button>
      <Modal show={showPopup} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <img className="card-img-top" style={{width:'14rem'}}src={TvShowImage} />
          <h3>{Title}</h3>
          <p>{Description}</p>
          </Modal.Body>
          {recordDeleted && ( <h1>{recordDeleted}</h1>)}
          <Modal.Footer>
          {isReplay 
          ? (<Button variant="secondary">Replay</Button>) 
          :(<Button variant="secondary" onClick={playTVShow}>Play</Button>)}
          {!recordDeleted && (UserID == 2 &&( <Button variant="secondary" onClick={removeTVShow}>Remove Show</Button> ))}
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