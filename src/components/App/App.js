import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import crypto from 'crypto'

// Not currently being called on this page
// import Footer from '../Footer/Footer';
// import Input from '../Input/Input';

// FROM THE REPO
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';

// MY COMPONENTS NEEDED FOR THIS PAGE
import Home from '../Home/Home';
import Make from '../Make/Make';
import Poll from '../Poll/Poll';
import Header from '../Header/Header'
// import DebugBar from '../DebugBar/DebugBar';
import FAQ from '../FAQ/FAQ'
class App extends Component {

    // Check to see if they have an ID in local storage, if not, give them one.
    componentDidMount() {
        if (localStorage.id) {
            // Store their ID in redux state
            this.props.dispatch({ type: "SET_ID", payload: localStorage.id })
            localStorage.setItem('firstTime',false)
        } else {
            // Create an random id, put it in localStorage.id
            const id = crypto.randomBytes(20).toString('hex')
            localStorage.setItem('id', id)
            localStorage.setItem('firstTime',true)
            // Store their ID in redux state
            this.props.dispatch({ type: "SET_ID", payload: localStorage.id })
        }
    }

    render() {
        return (
            <>
            <div className="centered">
                <Router>
                    {/* <DebugBar /> */}
                    <Header />
                    <Switch>
                        {/* Visiting localhost:3000 will redirect to localhost:3000/make */}
                        {/* <Redirect exact from="/" to="/make" /> */}

                        <Route
                            path="/"
                            exact
                            component={Home}
                        />
                        <Route
                            path="/make"
                            exact
                            component={Make}
                        />
                        <Route
                            exact
                            path="/FAQ"
                            component={FAQ}
                        />

                        {/* FROM THE REPO */}
                        {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
                        <Route
                            exact
                            path="/about"
                            component={AboutPage}
                        />
                        {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
                        <ProtectedRoute
                            exact
                            path="/home"
                            component={UserPage}
                        />
                        {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
                        <ProtectedRoute
                            exact
                            path="/info"
                            component={InfoPage}
                        />

                        <Route path="/:route" component={Poll} />

                        {/* If none of the other routes matched, we will show a 404. */}
                        <Route render={() => <h1>404</h1>} />
                    </Switch>
                </Router>
                </div>
                {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
            </>
        );
    }
}
const mapReduxStateToProps = (reduxState) => {
    return reduxState
}
export default connect(mapReduxStateToProps)(App);

