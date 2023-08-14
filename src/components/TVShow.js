import axios from '../Utility/axios';
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const OTTPlatform_URL = '/OTTPlatform/GetTvShow'; 

const Lounge = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        setAuth({});
        navigate('/linkpage');
    }

    const getTVShowList = async (e) => {
        e.preventDefault();
    
    let token2 ="Bearer "+JSON.parse(localStorage.getItem('userToken'));

    const config = {
        headers: { Authorization: token2}
    };
    const bodyParameters = {
       key: "value"
    };

    const response = await axios.get(OTTPlatform_URL,
        config
      ).then(console.log).catch(console.log);
    }
    return (
        <section>
            <h1>The TV show List</h1>
            <br />
            <p>Click to get TV show List.</p>

            <button onClick={getTVShowList}>TV shows</button>
            
        <div className="flexGrow" >
            <Link to="/">Go To Home</Link>
            
            <div style={{ marginLeft: '50px' }}>
            <button onClick={logout}>Sign Out</button>
            </div>
            
        </div>
        </section>
    )
}

export default Lounge
