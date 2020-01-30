import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// Pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={home} />
            <Route path="/login" component={login} />
            <Route path="/signup" component={signup} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App

// 4:28:28
