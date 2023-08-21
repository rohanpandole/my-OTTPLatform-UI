import axios from '../Utility/axios';
import { useNavigate} from "react-router-dom";
import { useContext, useState, useRef } from "react";
import AuthContext from "../context/AuthProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Navbar, Form, FormControl, Button } from 'react-bootstrap';

const SerachTvShow = () => {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [serachTvShows, setSerachTvShows] = useState('');
    const [serachTvShowsData, setSerachTvShowsdata] = useState('');
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
    const linkpage = async () => {
        navigate('/linkpage');
    }
    const GetTVshow_URL = '/User/GetTvShowByName';
    const searchTVShow = async (e) => {
        e.preventDefault();

        let token = "Bearer " + JSON.parse(localStorage.getItem('userToken'));
        const config = {
            headers: { Authorization: token },
            params: { tvShowName : serachTvShows } 
        };

        try{
            
        const response = await axios.get(
            GetTVshow_URL,
            config
        );

        setSerachTvShowsdata(response?.data);
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
        setSerachTvShows(e.target.value);

    }

    const handleClose  = () =>{
        setClosePopup(false);
    }

    return (
        <>

        <Navbar bg="dark" expand="lg" variant="dark">
                <Navbar.Brand><button onClick={linkpage}>linkpage</button></Navbar.Brand>
                <Navbar.Brand><button onClick={navHome}>Home</button></Navbar.Brand>
                <div class="container">

                <Form className="d-flex" onSubmit={searchTVShow} autoComplete="off">
                        <FormControl
                            type="search"
                            placeholder="TV Show Search"
                            className="me-2"
                            aria-label="search"
                            name="tvShowName"
                            value={serachTvShows} onChange={changeHandler}></FormControl>
                        <Button variant="secondary" type="submit">Search TV show</Button>
                    </Form>
                </div>
                <Navbar.Brand >
                <button onClick={AddTvShow}>AddTvShow</button>
                </Navbar.Brand>
                <Navbar.Brand >
                <button onClick={logout}>Sign Out</button>
                </Navbar.Brand>
                
        </Navbar>

        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

        {serachTvShowsData &&
         (
         <div>
            <Modal show={closePopup} onClick={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body> 
                <img className="card-img-top" style={{ width: '14rem' }} src={serachTvShowsData.tvShowImage} />
                <h3>{serachTvShowsData.Title}</h3>
                <p>{serachTvShowsData.Description}</p>
             </Modal.Body>
            <Modal.Footer>
                 <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
        </Modal>
         </div>
         )}
        </>
    )
}

export default SerachTvShow
