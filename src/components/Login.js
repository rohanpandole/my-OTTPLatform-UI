import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

import axios from '../Utility/axios';
const LOGIN_URL = '/Auth/VerifyUserGenerateTocken';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();

    const userRef = useRef();
    const errRef = useRef();

    const [userName, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [userName, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ userName, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            localStorage.setItem("userToken", JSON.stringify(response.data.AccessToken));
            localStorage.setItem("UserID", JSON.stringify(response.data.UserID));

            const accessToken = response?.data?.AccessToken;

            setAuth({ userName, password, accessToken });
            setUser('');
            setPwd('');
            navigate("/");
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <div className="App">
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1 style={{ color: 'antiquewhite' }}>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label style={{ color: 'antiquewhite' }} htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={userName}
                        required
                    />

                    <label style={{ color: 'antiquewhite' }} htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={password}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p style={{ color: 'antiquewhite' }}>
                    Need an Account?<br />
                    <span className="line">
                        <Link to="/register">Sign Up</Link>
                    </span>
                </p>
            </section>
        </div>
    )
}

export default Login
