import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import Profiles from './components/profiles/Profiles';
import Members from './components/profiles/Members';
import Following from './components/profiles/Following';
import Followers from './components/profiles/Followers';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import PostsByUser from './components/posts/PostsByUser';
import PostForm from './components/posts/PostForm';
import Post from './components/post/Post';
import AddHaves from './components/profile-forms/AddHaves';
import AddWants from './components/profile-forms/AddWants';
import AddProfileLocation from './components/profile-forms/AddProfileLocation';
import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/Login';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  },[]);
  return (
  <Provider store={store}>
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={ Landing } />
      <section className="container">
        <Alert />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/members" component={Members} />
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/following" component={Following} />
          <PrivateRoute exact path="/followers" component={Followers} />
          <PrivateRoute exact path="/profiles" component={Profiles} />
          <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/add-haves" component={AddHaves} />
          <PrivateRoute exact path="/add-wants" component={AddWants} />
          <PrivateRoute exact path="/add-location" component={AddProfileLocation} />
          <PrivateRoute exact path="/create-post" component={PostForm} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/userposts/:id" component={PostsByUser} />
          <PrivateRoute exact path="/posts/:id" component={Post} />
        </Switch>
      </section>
    </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
