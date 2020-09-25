import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';
import User from './components/users/User';

const App = () => {
  const [alert, setAlert] = useState(null);

  //Alert message
  const showAlert = ( msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 2000)
  }

  return (
      <GithubState>
      <Router>
      <div className="App">
        <Navbar tittle="Github-finder" icon='fab fa-github' />
        <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search 
                    setAlert={showAlert}/>
                  <Users />
                </Fragment>
              )} />

              <Route  exact path='/about' component={About} />
              <Route exact path='/user/:login' component={User} />
                
            </Switch>
        </div>
      </div>
      </Router>
      </GithubState>
    );
  
}

export default App;
