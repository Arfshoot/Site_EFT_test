import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFaq } from "../actions/faq.action";

// import js  et scss
import "../styles/Faq.scss";

const FaqList = () => {

  return (
   <div className="faq-container">
    <h1 className="faq-title">Questions fréquentes</h1>
   
  <div className="faq-placement" > 
    
    <div className="card"> 
      <h2 className="faq-sous-titre">Pourquoi avoir choisi Vega ?</h2>
      <p className="faq-text">Ce titre est devenu une évidence pour la combinaison des 3 raisons suivantes : Vue de la Terre, Vega est l'une des 5 étoiles les plus brillantes.Vega est une des fusées européennes les plus puissantes.En mathématique financière, les lettres grecques ont beaucoup d'importance, le Vega mesure la sensibilité d'une option à la volatilité implicite de son sous-jacent, nous l'utilisons souvent.</p>
    </div>
    <div className="card"> 
      <h2 className="faq-sous-titre">Puis-je me connecter d'une adresse IP fixe ou mobile?</h2>
      <p className="faq-text">Oui, dès que vous êtes membre. Pour les périodes d'essai, nous n'autorisons que l'IP fixe qui correspond exactement à l'adresse de l'utilisateur.</p>
      
    </div>
    <div className="card"> 
      <h2 className="faq-sous-titre">Comment puis-je faire pour passer mes ordres au plus près des niveaux que vous indiquez ?</h2>
      <p className="faq-text">Choisissez un broker, aux meilleurs spreads, qui vous permet de passer des ordres au marché instantanément par simple clic. Ainsi, vous pourrez entrer en position au plus près du niveau donné par le trader pilote.Pour prendre vos bénéfices, il est indispensable de préparer, dès l'entrée en position, une prise de bénéfices rapide pour partie de votre position de départ. Les ordres intelligents incluant les objectifs fractionnés sont fortement recommandés.Exemple : Je prends 10 mini contrats FX (soit un contrat standard) et je sors 4 ou 6 sur objectifs pré inclus.</p>
      
    </div>
    <div className="card"> 
      <h2 className="faq-sous-titre">Pourquoi certaines de vos positions sont courtes et d'autres peuvent durer relativement longtemps ?</h2>
      <p className="faq-text">C'est le marché qui le veut. Si le trader pilote a des indicateurs le mettant en garde, il actionnera systématiquement THINK PROFIT ou Exit. Cela peut être rapide même si ce n'est pas le but, ce dernier étant de réaliser le plus possible de trades largement gagnants. Note : N'oubliez pas que vous ne prendrez que rarement la totalité d'un mouvement.</p>
      
    </div>
    <div className="card"> 
      <h2 className="faq-sous-titre">Combien de trades (aller/retour) réalisez-vous par jour, en moyenne ?</h2>
      <p className="faq-text">C'est très variable et cela dépend des configurations de marché, c'est impossible à prédire. À vous de réaliser des statistiques.</p>
      
    </div>
    <div className="card"> 
      <h2 className="faq-sous-titre">Au cours d'un mois vos résultats sont inégaux ; est-ce dû à des variations de performances ?</h2>
      <p className="faq-text">Rassurez-vous ; cela est généralement dû à des variations de volatilité de marchés ; nous ne pouvons performer dans un marché immobile ; nos performances restent fidèles à ce que nous annonçons sur la page d'accueil, sur une durée d'un mois.</p>
      
    </div>
    <div className="card"> 
      <h2 className="faq-sous-titre">Y a-t-il des moments de la journée plus propices aux prises de position ?</h2>
      <p className="faq-text">En principe non, mais on s'aperçoit que 60% des trades sont réalisés le matin, en particulier sur le Forex ; les périodes d'ouverture des principaux marchés sont importantes.        Notez que les sessions de l'après-midi peuvent s'avérer plus difficiles.</p>
      
    </div>
    <div className="card"> 
      <h2 className="faq-sous-titre">Comment  calculez-vous vos performances quotidiennes en € ?</h2>
      <p className="faq-text">De manière totalement transparente:nous affichons les extrêmes du mouvement pour un lot Forex ou 10€ DAX, arbitrairement, car 2 Traders n'ont pas le même engagement monétaire et que la seule performance qui compte est le % de signaux gagnants, selon son engagement personnel. Mais, pour mettre un terme définitif à une éventuelle polémique sur ces calculs de performances en euros, nous les affichons dorénavant dans notre abonnement Premium. Celui-ci inclut le sens de la majorité des Trades à venir et les sorties exactes des positions ainsi que leur taille pour les Golden Trades.        Chaque trader gagne selon son engagement ; mais grâce à Vega-Traders, il obtient l'instrument, le sens et le timing pour des mouvements très souvent conséquents; c'est le plus important....</p>
      
    </div>
    <div className="card"> 
      <h2 className="faq-sous-titre">Vous vous exprimez en anglais sur les salles, je comprends mal cette langue</h2>
      <p className="faq-text">L'anglais est la langue la plus commune d'Europe. Mais ne vous inquiétez pas, les traders utilisent toujours les mêmes expressions et nous avons mis un lexique anglais/français à votre disposition</p>
      
    </div>
    <div className="card"> 
      <h2 className="faq-sous-titre">Quelles sont les spécifications techniques requises pour pouvoir utiliser les salles de marchés de Vega-Traders ?</h2>
      <p className="faq-text">Les salles de marchés et plus généralement le site Vega-Traders nécessitent certaines spécifications afin de fonctionner de manière optimale. En voici la liste: - Navigateurs Web : Internet Explorer 7 & 8, Mozilla Firefox. La compatibilité avec d’autres navigateurs plus anciens ou moins courants n’est pas exclue mais n’est pas garantie.- Plugin Flash : Plus de 95% des internautes disposent de ce plugin. S’il n’est pas installé, vous ne pourrez pas entendre les sons des signaux de trading.- Acceptation des cookies et des javascript : Les navigateurs Web sont par défaut configurés pour les accepter. Le refus des cookies vous empêchera de vous connecter. Le refus des javascript bloquera complètement les salles de marchés. - Connexion Internet Haut Débit disponible : Les salles de marchés diffusent des signaux en temps réel. Afin de les recevoir sans délai, l’équipe Vega-Traders vous déconseille de télécharger des données ou d’utiliser les services de télévision par ADSL pendant l’utilisation des salles de marchés. L’équipe attire votre attention sur le fait que les connexions par Wifi ou clé 3G+ sont d’une fiabilité relative et peuvent entrainer des ralentissements.</p>
      
    </div>
    </div>
    
  </div>
  );
};

export default FaqList;