import { useNavigate} from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import axios from '../Utility/axios';
import {useState, useEffect } from "react";
import TVShowImages from '../components/TVShowImages'
import SearchTvShow from '../components/SearchTvShow';
import 'bootstrap/dist/css/bootstrap.min.css';
import WatchedList from '../components/WatchedList'
			
const GetWatchedList_URL = '/User/GetMyAllWatchedEpisods';
const OTTPlatform_URL = '/User/GetAllTvShow';

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tvShows, setTvShows] = useState([]);
    const [isGotTVList, setIsGotTVList] = useState(false);
    const [watchedTVShow, setWatchedTVShow] = useState([]);

    useEffect(() => {
        HandleTvShowList();
      }, []);

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
        setTvShows(response?.data.Tvshows);
        setWatchedTVShow('');
        setIsGotTVList(true);
    }

    const getWatchedTVShowList = async (e) => {
        e.preventDefault();

        let token = "Bearer " + JSON.parse(localStorage.getItem('userToken'));
        let UserID = JSON.parse(localStorage.getItem('UserID'));

        const config = {
            headers: { Authorization: token },
            params: { "UserID":UserID }
        };

        const response = await axios.get(
            GetWatchedList_URL,
            config
        );
        setWatchedTVShow(response?.data.Tvshows);
        setTvShows('');
		}
        
        const handleSerachData = (e) =>{
            setTvShows(e);
        }

        const HandleTvShowList = async () =>{
            let token = "Bearer " + JSON.parse(localStorage.getItem('userToken'));

        const config = {
            headers: { Authorization: token }
        };

        const response = await axios.get(
            OTTPlatform_URL,
            config
        );
        setTvShows(response?.data.Tvshows);
        setWatchedTVShow('');
        setIsGotTVList(true);
        }

    return (
        <>
            <SearchTvShow handleMySerachData ={handleSerachData}/>
            <div class="row g-0">
                <div class="col-sm-6 col-md-8"><div style={{ justifyContent: 'end'}}>                
                <button onClick={getWatchedTVShowList}>My Watched list</button>
            </div>
            </div>
            </div>
            <br></br>
            <div >
                {tvShows.length > 0 ?
                    (
                        <div className='grid'>
                            {tvShows.map((tv) =>
                                <TVShowImages key={tv.id} {...tv} HandleTvShowList={HandleTvShowList} />)}
                        </div>)
                    : (
                        isGotTVList
                            ?(<h2 style={{ color: 'antiquewhite' }}>Sorry !! No Movies Found</h2>)
                            :(<h2 style={{ color: 'antiquewhite' }}>Click Refresh to get new TV show list</h2>)
                    )}                    
            </div>            
        
            <div>
            {watchedTVShow.length > 0 && 
                    (
                    <div className='grid'>
                    {watchedTVShow.map((tv) =>
                        <WatchedList key={tv.id} {...tv} />)}
                </div>)}
            </div>
            
        </>
    )
}

export default Home
