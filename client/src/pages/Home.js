import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
//js et scss
import './../styles/Home.scss'

// images

import Compteur from './../images/Compteur.png';
import LogoHerve from './../images/Logo-Herve.png';
import Thread from '../components/Thread';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../components/Utils';
import Card from '../components/Post/Card';
import { getPosts } from '../actions/post.action';
import { getUsers } from '../actions/users.actions'; 









const Home = () => {

    const [loadPost, setLoadPost] = useState(true)
   
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.postReducer)

   


    useEffect (() =>{
        if(loadPost){
            dispatch(getPosts())
            setLoadPost(false)
   
        }
       
    }, [loadPost, dispatch])


    return (
        <div>
            <main>
            <section className='All-section1'>
                <div className='section1-1'>
                    <div className='Mot-fonda'>
                        <h1>Le mot du fondateur</h1>
                        <p>" En day trading : oubliez vos indicateurs classiques (des centaines) car ils ont le même point commun : <br/><span>ils indiquent tous le passé ! </span>"</p>
                        <div className='button-s1'>
                        <NavLink to='/abonnement'>Essai gratuit</NavLink></div>
                        
                    </div>
                </div>
                <div className='section1-2'>
                    <div className='card-titre'><h1>Retour sur inverstissement quotidien</h1><i className="fa-solid fa-arrow-trend-up"></i></div>
                    <div className='bloc-bac-compteur'>
                        <div className='compteur'>
                            <img src={Compteur}></img>
                            <p>+ 1.03 %</p>
                        </div>
                        <div className='date'>  
                                <p>12/12/22</p>
                                
                            </div>
                        <div className='retour'>
                            <p>Retour sur inverstissement sur 7 jours</p><div className='chevron'><i className="fa-solid fa-chevron-right"></i></div>
                        </div>
                    </div>
                </div>
            </section>
            <section className='All-section2'>
                <div className='bloc-img-text'>
                <div className='bloc-etoile-text'> 
                    <div className='bloc-img'> 
                        <img src={LogoHerve}></img>
                    </div>

                        <div className='bloc-text'> 
                            <h1>Entrez en Day Trading sur impulsion Efficient Trading et gagnez selon sa « méthode » !</h1>
                            <p className='text-1'>Il s’agit de l’application systématique de l’indicateur créé par Efficient Trading qui est la détection du bon instrument, dans la bonne direction, au bon moment. Mais ce n’est pas suffisant : pour assurer la performance du trader,<br/> <span>cela implique obligatoirement l’utilisation systématique d’un ordre intelligent : ordre qui intègre dans son déclenchement des objectifs multiples et un stop, dont le setup vous sera donné par nos traders. </span></p>
                            <br/>
                            <div className='bloc-text2-btn'>
                            <div  className='text-2'>
                            <p>Il s’agit de l’application systématique de l’indicateur créé par Efficient Trading qui est la détection du bon instrument, dans la bonne direction, au bon moment. Mais ce n’est pas suffisant : pour assurer la performance du trader.</p>
                            </div>
                            <div className='bouton-s2'><NavLink to='/abonnement'>Essai gratuit</NavLink></div>
                            </div>
                        </div>
                    </div>
                    
                    <h1>Hervé Lambert, fondateur du site.</h1>
                    <div className='text-3'> 
                        <div className='CV1'>
                            <p>Hervé Lambert, diplômé de NEOMA et d’Anglais des Affaires, a démarré sa carrière en tant que Broker sur les marchés aux techniques complexes (CEE/URSS)chez Montenay SA, alors principal Broker européen de matières premières agricole physiques. Il occupe ensuite plusieurs postes de manager à Paris et à Genève, toujours dans le domaine du Front ou Middle-Office boursier pour les salles de marchés. </p>
                        </div>
                        <div className='CV2'>
                            <p>En 2010, il quitte son poste de Directeur Général France de WHSelfinvest, leader Européen des Brokers-on-line de produits dérivés pour mettre ses 25 ans d’expertise au service des traders intraday particuliers et professionnels. Il fonde vega-traders.com, maintenant efficient-trading.com, unique fournisseur européen, non robotisé de positions de trading en temps réel sur indices et Forex, avec de telles performances quotidiennes.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className='All-section3'>
                <div className='bloc-temoin'> 
                    
                    <h2>Témoignages</h2>
                    <p>Efficient Trading utilise une méthode éprouvée et approuvée par ses utilisateurs. Depuis plus de 15 ans, cette méthode permet aux traders de rentabiliser leur investissement jour après jour, avec un taux de retour de plus d’1% par jour en moyenne. Rejoignez-les et vous serez convaincus vous aussi !</p>
                </div>
                <div>
                <ul>
                    {!isEmpty(posts[0]) &&
                        posts.slice(0,6).map((post) => {
                        return <Card post={post} key={post._id} />;
                        })}
                    </ul>
                </div>
                <div className='bouton-s3'><NavLink to='/temoignages'>Voir plus de témoignages...</NavLink></div>
            </section>

        </main>
        </div>
    );
};

export default Home;