import axios from '../Utility/axios';
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthProvider";
import TVShowImages from '../components/TVShowImages'
import SerachTvShow from '../components/SerachTvShow';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';

const OTTPlatform_URL = '/User/GetAllTvShow';
const GetTVshow_URL = '/User/GetTvShowByName';
const saveImage_URL = '/Admin/UploadImage'

const Lounge = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tvShows, setTvShows] = useState([]);
    const [serachTvShows, setSerachTvShows] = useState('');
    //const [searchTvShowName, setSearchTvShowName] = useState('');

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

    const searchTVShow = async (e) => {
        e.preventDefault();

        let token = "Bearer " + JSON.parse(localStorage.getItem('userToken'));
        const config = {
            headers: { Authorization: token },
            params: { tvShowName : serachTvShows } 
        };

        const response = await axios.get(
            GetTVshow_URL,
            config
        );
        console.log(response?.data);
        setSerachTvShows(response?.data);

    }

    const getTVShowList = async (e) => {
        e.preventDefault();

        let token = "Bearer " + JSON.parse(localStorage.getItem('userToken'));

        const config = {
            headers: { Authorization: token }
        };

        const response = await axios.get(
            OTTPlatform_URL,
            config
        );
        console.log(response?.data);
        setTvShows(response?.data);
    }

    const changeHandler = (e) => {
        setSerachTvShows(e.target.value);
    }

    const handleImage = async (e) =>{
        e.preventDefault();

        var fileData = e.target.files[0];
        const data = new FormData();
        data.append('img',fileData);

        console.log(fileData);
        console.log(data);

        let token = "Bearer " + JSON.parse(localStorage.getItem('userToken'));
        const config = {
            headers: { Authorization: token, 'Content-Type': 'multipart/form-data' }
        };

        const response = await axios.post(
            saveImage_URL,
            data,
            config
        );
    }

    return (

        <>

            <SerachTvShow />


            <div style={{ justifyContent: 'end' }}>
                <button onClick={getTVShowList}>Refresh TV shows</button>
            </div>
            <br></br>
            <div >
                {tvShows.length > 0 ?
                    (
                        <div className='grid'>
                            {tvShows.map((tv) =>
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
