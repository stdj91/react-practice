import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component {
  state = {
    users: [],
    user: {},
    loading: false,
    alert: null
  }

 

  searchUsers = async text => {
    this.setState({ loading: true })

    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&cliend_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ users: res.data.items, loading: false })
  }

  //singleUser
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&cliend_secret${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

    this.setState({ user: res.data, loading: false })
  }

  //Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false });

  //Alert message
  setAlert = ( msg, type) => {
    this.setState({ alert: {msg, type } })
   

    setTimeout(() => this.setState({ alert: null}), 2000)
  }

  render() {
    const { user } = this.state
    
    return (
      <Router>
      <div className="App">
        <Navbar tittle="Github-finder" icon='fab fa-github' />
        <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers}
                    showClear={this.state.users.length > 0 ? true : false}
                    setAlert={this.setAlert}/>
                  <Users loading={this.state.loading} users={this.state.users} />
                </Fragment>
              )} />

              <Route  exact path='/about' component={About} />
              <Route exact path='/user/:login' render={props => (
                <User { ...props } getUser={this.getUser} user={user} />
              )} />
            </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
