import { BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import './styles/App.css';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import Nav from './components/Nav';
import Details from './components/Details';
import WatchList from './components/WatchList';

function App() {
  const [watchList, setWatchList] = useState([]);
  //checking localstorage and update watchlist
  useEffect(()=>{
    if (localStorage.hasOwnProperty('watchList')) {
      let wlist = JSON.parse(localStorage.getItem('watchList'));
      setWatchList(wlist);
  }
  },[])
  //handling watchList adding and removing items
  const watchListHandler = (data) =>{
    let id = data.id;
    let idx = watchList.findIndex(wl => wl.id === id);
    if(idx>=0){
      watchList.splice(idx,1);
      setWatchList([...watchList]);
      localStorage.setItem('watchList',JSON.stringify([...watchList]));
    }
    else{
      setWatchList([data,...watchList]);
      localStorage.setItem('watchList',JSON.stringify([data,...watchList]));
    }
}


  return (
    <>
    <Router>
      <Nav/>
      <Switch>
        <Route path="/" exact>
          <Home  watchList={watchList} watchListHandler={watchListHandler} />
        </Route>
        <Route path="/movie/:id" exact>
          <Details  watchList={watchList} watchListHandler={watchListHandler} />
        </Route>
        <Route path="/watchlist" exact>
          <WatchList
           watchListHandler={watchListHandler}
           watchList={watchList} />
        </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
