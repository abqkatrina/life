import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Welcome from './Components/Welcome';
import Grid from './Components/Grid';
import Footer from './Components/Footer';
import './css/App.css';
import './css/material.min.css';

function App() {

  return (
    <div className='main'>
      <Router>
        <Switch>

          <Route exact path='/' component={Welcome} />
        
          <Route path='/game' component={Grid} />
        
        </Switch>
      </Router>
      <Footer />
      
    </div>
  );
}

export default App;
