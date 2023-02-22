import React from 'react';
import Thread from '../components/Thread';


// js est scss
import './../styles/temoignages.scss'
const Temoignages = () => {
    return (
        <div className="titre-page">
            <h1>Témoignages</h1>
            <div> 
                <Thread />
            </div>
        </div>
        
    );
};

export default Temoignages;