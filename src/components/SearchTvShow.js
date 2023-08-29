import axios from '../Utility/axios';
import { useNavigate} from "react-router-dom";
import React,{ useContext, useState, useRef } from "react";
import AuthContext from "../context/AuthProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Navbar, Form, FormControl, Button } from 'react-bootstrap';

const SearchTvShow = (props) => {

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

    const SearchTVshow_URL = '/User/SearchTvShowByName';
    const searchTVShow = async (e) => {
        e.preventDefault();       

        let token = "Bearer " + JSON.parse(localStorage.getItem('userToken'));
        const config = {
            headers: { Authorization: token },
            params: { tvShowName : searchTvShows } 
        };

    try{
            const response = await axios.get(
            SearchTVshow_URL,
            config
        );

       console.log(response?.data);
       props.handleMySerachData(response.data.Tvshows);
       
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
                {UserID == 2 &&( <Navbar.Brand><button className="btn btn-primary" onClick={navHome}>Home</button></Navbar.Brand> )}
                <div className="container">

                <Form className="d-flex" onSubmit={searchTVShow} autoComplete="off">
                        <FormControl
                            type="search"
                            placeholder="TV Show Search"
                            className="me-2"
                            aria-label="search"
                            name="tvShowName"
                            value={searchTvShows} onChange={changeHandler}></FormControl>
                        <Button className="btn btn-primary mt-2" variant="secondary" type="submit">Search TV show</Button>
                    </Form>
                </div>
                <Navbar.Brand >
                {UserID == 2 &&( <button className="btn btn-primary" onClick={AddTvShow}>AddTvShow</button> )}
                </Navbar.Brand>
                <Navbar.Brand >
                <button className="btn btn-primary" onClick={logout}>Sign Out</button>
                </Navbar.Brand>
                
        </Navbar>

        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

        </>
    )
}

export default SearchTvShow;
