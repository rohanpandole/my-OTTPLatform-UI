import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from '../Utility/axios';
import {useState } from "react";
import TVShowImages from '../components/TVShowImages'
import SearchTvShow from '../components/SearchTvShow';
import 'bootstrap/dist/css/bootstrap.min.css';

const OTTPlatform_URL = '/User/GetAllTvShow';

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tvShows, setTvShows] = useState([]);
    const [isGotTVList, setIsGotTVList] = useState(false);

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
        setIsGotTVList(true);
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
                        isGotTVList
                            ?(<h2 style={{ color: 'antiquewhite' }}>Sorry !! No Movies Found</h2>)
                            :(<h2 style={{ color: 'antiquewhite' }}>Click Refresh to get new TV show list</h2>)
                    )}                    
            </div>
        
        </>
    )
}

export default Home
