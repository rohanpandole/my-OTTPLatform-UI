import axios from '../Utility/axios';
import {useState } from "react";
import TVShowImages from '../components/TVShowImages'
import SearchTvShow from '../components/SearchTvShow';
import 'bootstrap/dist/css/bootstrap.min.css';

const OTTPlatform_URL = '/User/GetAllTvShow';

const TVshown = () => {

    const [tvShows, setTvShows] = useState([]);

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
        setTvShows(response?.data);
    }
    return (

        <>
            <SearchTvShow />


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

export default TVshown;
