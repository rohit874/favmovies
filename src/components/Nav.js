import '../styles/nav.css';
import { NavLink } from 'react-router-dom';
import Search from './Search';

function Nav() {
    return (
        <nav>
            <NavLink to="/"><h2>FavMovies</h2></NavLink>
            <Search />
            <NavLink to="/watchlist"><h4>WatchList</h4></NavLink>
        </nav>
    )
}

export default Nav
