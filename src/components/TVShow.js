import axios from '../Utility/axios';
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import TVShowImages from '../components/TVShowImages'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';

const OTTPlatform_URL = '/User/GetAllTvShow';
const GetTVshow_URL = '/User/GetTvShowByName';

const Lounge = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [TvShows, setTvShows] = useState([]);
    const [flag, setFlag] = useState(false);
    const [tvShowName, setTvShowName] = useState('');

    const logout = async () => {
        setAuth({});
        navigate('/linkpage');
    }

    const searchTVShow = async (e) => {
        e.preventDefault();

        let token3 = "Bearer " + JSON.parse(localStorage.getItem('userToken'));
        const config = {
            headers: { Authorization: token3 }

        };

        const response = await axios.get(GetTVshow_URL, { params: { "tvShowName": tvShowName } },
            config
        );
        console.log(response?.data);
        setTvShows(response?.data);

    }



    const getTVShowList = async (e) => {
        e.preventDefault();
        setFlag(true);

        let token2 = "Bearer " + JSON.parse(localStorage.getItem('userToken'));

        const config = {
            headers: { Authorization: token2 }
        };
        const bodyParameters = {
            key: "value"
        };

        const response = await axios.get(OTTPlatform_URL,
            config
        );
        console.log(response?.data);
        setTvShows(response?.data);
    }

    const changeHandler = (e) => {
        setTvShowName(e.target.value);
    }

    return (

        <>
            <Navbar bg="dark" expand="lg" variant="dark">
                <Container fluid>
                    <Navbar.Brand href="/linkpage">linkpage</Navbar.Brand>
                    <Navbar.Brand href="/">Home </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

                    <Navbar.Collapse id="nabarScroll">
                        <Nav className="me-auto my-2 my-lg-3" style={{ maxHeight: '100px' }} navbarScroll></Nav>
                        <Form className="d-flex" onSubmit={searchTVShow} autoComplete="off">
                            <FormControl
                                type="search"
                                placeholder="Movie Search"
                                className="me-2"
                                aria-label="search"
                                name="tvShowName"
                                value={tvShowName} onChange={changeHandler}></FormControl>
                            <Button variant="secondary" type="submit">Search TV show</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div style={{ justifyContent: 'end' }}>

                <button onClick={getTVShowList}>TV shows</button>
                <Link to="/">Go To Home</Link>
                <button onClick={logout}>Sign Out</button>
            </div>

            <div >
                {TvShows.length > 0 ?
                    (
                        <div className='grid'>
                            {TvShows.map((tv) =>
                                <TVShowImages key={tv.id} {...tv} />)}
                        </div>)
                    : (
                        <h2 style={{ backgroundColor: "GrayText" }}>Sorry !! No Movies Found</h2>
                    )}
            </div>

        </>
    )
}

export default Lounge;
