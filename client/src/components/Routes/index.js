import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import socketIO from 'socket.io-client';



// import js scss
import SignInForm from '../../Log/SignInForm';
import SignUpForm from '../../Log/SignUpForm';
import Contact from '../../pages/Contact';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import Temoignages from '../../pages/Temoignages';
import Faq from '../../pages/Faq';
import Footer from '../Footer';
import Navbar from '../Navbar';
import ChoixSalle from '../../pages/Salles/index.js';
import Indice from '../../pages/Salles/Indices.js'
import Forex from '../../pages/Salles/Salles'
import Abonnement from '../../pages/Abonnement';
import CVG from '../../pages/Mentions/CVG';
import Admin from '../../pages/Admin/Admin';
import ListUsers from '../../pages/Admin/ListUsers';

const index = () => {
  
  return (
    
      <Router>
        <Navbar />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path='/login' exact component={SignInForm}/>
            <Route path='/register' exact component={SignUpForm}/>
            <Route path="/profil" exact component={Profil} />
            <Route path="/choix-de-la-salle" exact component={ChoixSalle} />
            <Route path="/Salle-Indice" exact component={Indice} />
            <Route path="/Salle-Forex" exact component={Forex} />
            <Route path="/temoignages" exact component={Temoignages} />
            <Route path='/faq'exact component={Faq} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/abonnement" exact component={Abonnement} />
            <Route path="/mentions-légales" exact component={CVG}/>
            <Route path="/admin" exact component={Admin}/>
            <Route path="/List-Users" exact component={ListUsers}/>
        </Switch>
        <Footer/>
      </Router>
    
  );
};

export default index;