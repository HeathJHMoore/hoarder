import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import './App.scss';
import firebase from 'firebase/app';
import 'firebase/auth';

import Auth from '../components/Auth/Auth';
import Home from '../components/Home/Home';
import NewStuff from '../components/NewStuff/NewStuff';
import MyStuff from '../components/MyStuff/MyStuff';
import EditStuff from '../components/EditStuff/EditStuff';
import SingleStuff from '../components/SingleStuff/SingleStuff';
import MyNavbar from '../components/Mynavbar/Mynavbar';

import fbConnection from '../helpers/data/connection';
fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest}) => {
  const routeChecker = props => ( authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location }}}/>)
  );
  return <Route {...rest} render={props => routeChecker(props)}/>
};

const PrivateRoute = ({ component: Component, authed, ...rest}) => {
  const routeChecker = props => ( authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location }}}/>)
  );
  return <Route {...rest} render={props => routeChecker(props)}/>
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({authed: true});
      } else {
        this.setState({authed: false})
      }
    })
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed}/>
            <div className="container">
              <div className="row">
                <Switch>
                  <PublicRoute path='/auth' component={Auth} authed={authed}/>
                  <PrivateRoute path='/home' component={Home} authed={authed}/>

                  <PrivateRoute path='/newStuff' component={NewStuff} authed={authed}/>
                  <PrivateRoute path='/myStuff' component={MyStuff} authed={authed}/>
                  <PrivateRoute path='/edit/:id' component={EditStuff} authed={authed}/>
                  <PrivateRoute path='/stuff/:id' component={SingleStuff} authed={authed}/>
                  <Redirect from="*" to="/auth"/>
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

