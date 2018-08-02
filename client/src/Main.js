import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import routes from './routes.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
  //withRouter
} from 'react-router-dom'

//import Base from './components/Base.jsx';
import HomePage from './containers/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import LogoutFunction from './containers/LogoutFunction.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import Auth from './modules/Auth';
import ProfilePage from './containers/ProfilePage.jsx';
import Search from './containers/Search.jsx';
import Footer from './components/davidcomponents/Footer'

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}
      />
    )
  )}/>
)

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props} {...rest} />
    )
  )}/>
)

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )}/>
)

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  };

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus()
  }

  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }

  render() {
    return (
      <div>
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>  
          <div>
            <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
              <Link className="navbar-brand" to="/"><i className="fas fa-laptop"></i> Rate That Dev</Link>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                {this.state.authenticated ? (
                  <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link" to="/"><i className="fas fa-home"></i> Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about"><i className="far fa-question-circle"></i> About</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile"><i className="fas fa-user"></i> Profile</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/search"><i className="fas fa-users"></i> Search</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/logout"><i className="fas fa-sign-out-alt"></i> Log out</Link>
                    </li>
                  </ul>
                ) : (
                  <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link" to="/"><i className="fas fa-home"></i> Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about"><i className="far fa-question-circle"></i> About</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login"><i className="fas fa-sign-in-alt"></i> Log in</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/search"><i className="fas fa-users"></i> Search</Link>
                    </li>
                  </ul>
                )}  
              </div>
            </nav>
                
            
              <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
              <PrivateRoute path="/dashboard" component={DashboardPage}/>
              <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
              <LoggedOutRoute path="/signup" component={SignUpPage}/>
              <Route path="/logout" component={LogoutFunction}/>
              <Route path="/search" component={Search}/>
              <PrivateRoute path="/profile" component={ProfilePage}/>
             

          </div>
          
        </Router> 
      </MuiThemeProvider>
      <Footer />
      </div> 
    );
  }
}

export default Main;
