import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';

import HomeScreen from './screens/HomeScreen';
import ProjectDetail from './screens/ProjectDetail';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import ProjectListScreen from './screens/ProjectListScreen';
import ProjectEditScreen from './screens/ProjectEditScreen';
import UserEditScreen from './screens/UserEditScreen';
import LandingScreen from './screens/LandingScreen';
import Dashboard from './screens/Dashboard';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegisterScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/project/:id" component={ProjectDetail} />

        <Route path="/admin/userlist" component={UserListScreen} />
        <Route path="/admin/user/:id/edit" component={UserEditScreen} />

        <Route path="/admin/projectlist" component={ProjectListScreen} />
        <Route path="/admin/project/:id/edit" component={ProjectEditScreen} />

        <Route path="/" component={HomeScreen} exact />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default App;
