import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import TVshown from './components/TVShow';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import AddTvShow from './components/AddTvShow';
import { Routes, Route } from 'react-router-dom';
import SearchTvShow from './components/SearchTvShow';

const ROLES = {
  'User': 1,
  'Editor': 3,
  'Admin': 1
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        </Route> */}
        <Route path="addTvShow" element={<AddTvShow />} />
        <Route element ={<RequireAuth />}>
        <Route path="/" element={<Home />} />
        <Route path="TVshown" element={<TVshown />} />
        <Route path="searchTVShow" element={<SearchTvShow />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;