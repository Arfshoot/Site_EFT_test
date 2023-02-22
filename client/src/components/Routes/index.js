import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import js scss
import SignInForm from '../../Log/SignInForm';
import SignUpForm from '../../Log/SignUpForm';
import Contact from '../../pages/Contact';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Temoignages from '../../pages/Temoignages';
import Footer from '../Footer';
import Navbar from '../Navbar';


const index = () => {
  return (
    
      <Router>
        <Navbar />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path='/login' exact component={SignInForm}/>
            <Route path='/register' exact component={SignUpForm}/>
            <Route path="/profil" exact component={Profil} />
            <Route path="/temoignages" exact component={Temoignages} />
            <Route path="/contact" exact component={Contact} />
        </Switch>
        <Footer/>
        
      </Router>
    
  );
};

export default index;