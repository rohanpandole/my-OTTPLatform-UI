import axios from '../Utility/axios';
import { useNavigate} from "react-router-dom";
import { useContext, useState, useRef } from "react";
import AuthContext from "../context/AuthProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Navbar, Form, FormControl, Button } from 'react-bootstrap';

const SearchTvShow = () => {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    let UserID = JSON.parse(localStorage.getItem('UserID'));
    const markTvShow_URL = '/User/MarkTvShowById';

    const [searchTvShows, setSearchTvShows] = useState('');
    const [searchTvShowsData, setSearchTvShowsData] = useState('');
    const [closePopup, setClosePopup] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    
    const logout = async () => {
        setAuth({});
        navigate('/login');
    }
    const AddTvShow = async () => {
        navigate('/addTvShow');
    }
    const navHome = async () => {
        navigate('/');
    }
    const [isReplay, setReplay]=useState(false);   

    const GetTVshow_URL = '/User/GetTvShowByName';
    const searchTVShow = async (e) => {
        e.preventDefault();

        let token = "Bearer " + JSON.parse(localStorage.getItem('userToken'));
        const config = {
            headers: { Authorization: token },
            params: { tvShowName : searchTvShows } 
        };

        try{
            
        const response = await axios.get(
            GetTVshow_URL,
            config
        );

        setSearchTvShowsData(response?.data);
        setClosePopup(true);

    } catch (err) {
        if (!err?.response) {
            setErrMsg('No Server Response');
        }else {
            setErrMsg('TV Show Not Found');
        }
        errRef.current.focus();
    }
    }
    const changeHandler = (e) => {
        setSearchTvShows(e.target.value);

    }

    const handleClose  = () =>{
        setClosePopup(false);
    }

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
                "showId": searchTvShowsData.ShowId, 
                "UserID":UserID
            }),
            config
        );
        setReplay(true);
    }

    return (
        <>

        <Navbar bg="dark" expand="lg" variant="dark">
                {UserID == 2 &&( <Navbar.Brand><button onClick={navHome}>Home</button></Navbar.Brand> )}
                <div class="container">

                <Form className="d-flex" onSubmit={searchTVShow} autoComplete="off">
                        <FormControl
                            type="search"
                            placeholder="TV Show Search"
                            className="me-2"
                            aria-label="search"
                            name="tvShowName"
                            value={searchTvShows} onChange={changeHandler}></FormControl>
                        <Button variant="secondary" type="submit">Search TV show</Button>
                    </Form>
                </div>
                <Navbar.Brand >
                {UserID == 2 &&( <button onClick={AddTvShow}>AddTvShow</button> )}
                </Navbar.Brand>
                <Navbar.Brand >
                <button onClick={logout}>Sign Out</button>
                </Navbar.Brand>
                
        </Navbar>

        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

        {searchTvShowsData &&
         (
         <div>
            <Modal show={closePopup} onClick={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <img className="card-img-top" style={{ width: '14rem' }} src={searchTvShowsData.tvShowImage} />
                <h3>{searchTvShowsData.Title}</h3>
                <p>{searchTvShowsData.Description}</p>
             </Modal.Body>
            <Modal.Footer>
            {isReplay 
                ? (<Button variant="secondary">Replay</Button>) 
                :(<Button variant="secondary" onClick={playTVShow}>Play</Button>)
            }
                 <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
         </div>
         )}
        </>
    )
}

export default SearchTvShow
