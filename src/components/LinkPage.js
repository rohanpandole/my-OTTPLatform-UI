import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        
        <div className="App">
            <section >
            <h1 style={{color: 'aquamarine',fontsize:'xx-large'}}>All Available Links</h1>
            <br />
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/TVshown">TV shows</Link>
            <Link to="/">Home</Link>
        </section>
        </div>
    )
}

export default LinkPage
