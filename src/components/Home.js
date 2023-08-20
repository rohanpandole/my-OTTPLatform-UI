import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        navigate('/login');
    }
    const addTvShow = async () => {
        navigate('/addTvShow');
    }
    const navigateTo = async () => {
        navigate('/linkpage');
    }
    const tvShows = async () => {
        navigate('/tvShown');
    }

    const serachTvShow = async () =>{
        navigate('/serachTvShow');
    }

    return (
        <>

            <div class="container">
                <div class="row align-items-start">
                    <div class="col-sm">
                        <h1 style={{ color: 'antiquewhite' }}>Home   </h1>
                    </div>
                    <div class="col-sm">
                        <button onClick={tvShows}>TV shows   </button>
                    </div>
                    <div class="col-sm">
                        <button onClick={navigateTo}>Navigate link</button>
                    </div>
                    <div class="col-sm">
                        <button onClick={addTvShow}>Add Tv Show</button>
                    </div>
                    <div class="col-sm">
                        <button onClick={logout}>Sign Out</button>
                    </div>
                    <div class="col-sm">
                        <button onClick={serachTvShow}>Serach Tv Show's</button>
                    </div>
                </div>
            </div>

            <br />
            <p style={{ color: 'chartreuse' }}>You are logged in!</p>
        
        </>
    )
}

export default Home
