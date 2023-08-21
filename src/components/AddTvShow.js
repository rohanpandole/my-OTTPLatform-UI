import { useRef, useState, useEffect } from "react";
import axios from '../Utility/axios';

const REGISTER_URL = '/Admin/AddTvShow';

const AddTvShow = () => {
    const userRef = useRef();
    const errRef = useRef();


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [episodeTimeDuration, setEpisodeTimeDuration] = useState('');
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    let ImageData;
    let fileData = new FormData();
    const handleImage = async (e) =>
    {
        e.preventDefault();
        ImageData = e.target.files[0];
        fileData.append('img',ImageData);
        fileData.append('Title',title);
        fileData.append('Description',description);
        fileData.append('episodes',[episodeTimeDuration]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            let token = "Bearer " + JSON.parse(localStorage.getItem('userToken'));

            const response = await axios.post(REGISTER_URL,
                fileData,
                {
                    headers: { Authorization: token, 'Content-Type': 'multipart/form-data'
                },
                    withCredentials: true
                }
            );                

            setSuccess(true);
            setTitle('');
            setDescription('');
            setEpisodeTimeDuration('')
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success 
            ? (
                <section>
                    <h1 style={{ color: 'chartreuse' }}>Successfully added tv show</h1>
                    <p>
                        <a href="/">Home</a>
                    </p>
                </section>
            ) 
            : (  
                <div className="App">
                    <section>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <h1 style={{ color: 'antiquewhite' }}>Add new show</h1>
                            <form onSubmit={handleSubmit}>
                                <label style={{ color: 'antiquewhite' }}>Title:</label>
                                <input
                                    type="text"
                                    ref={userRef}
                                    autoComplete="off"
                                     onChange={(e) => setTitle(e.target.value)}
                                    value={title}
                                />

                                <label style={{ color: 'antiquewhite' }}>Description:</label>
                                <input
                                    type="text"
                                    autoComplete="off"
                                    onChange={(e) => setDescription(e.target.value)}
                                    value={description}
                                />

                                <label style={{ color: 'antiquewhite' }}>Episode Time Duration:</label>
                                <input
                                    type="text"
                                    id="Duration"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setEpisodeTimeDuration(e.target.value)}
                                    value={episodeTimeDuration}
                                />

                                <label style={{ color: 'antiquewhite' }}>Select image:</label>
                                <span>
                                    <input style={{ color: 'antiquewhite' }} type='file' onChange={(e) => handleImage(e)}/>
                                </span>
                                <br></br>

                                <button disabled={!episodeTimeDuration || !description || !title ? true : false}>Add Show</button>
                            </form>

                    </section>
                </div>
                )
            }
    
      </>
    )
    
}


export default AddTvShow
