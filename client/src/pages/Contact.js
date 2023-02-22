import React from 'react';


// scss
import './../styles/Contact.scss'
const Contact = () => {
    return (
        <div className="All-contact">
            <div > 
                <h1>Informations</h1>
                <p>Merci de saisir une adresse email valide. Dans le cas contraire, nous ne pourrons pas vous répondre.
                Nous faisons tout notre possible pour traiter vos questions sous 24 heures.</p>
                <p className="desc2">Il ne sera pas répondu aux mails discourtois.</p>
            </div>
            <form action="mailto:vigierjeremy@laposte.net" method="post" enctype="text/plain">
                <h1>Votre message</h1>
                <div className='input'>
                <label for="email">E-mail:</label>
                <input type="email" id="email" name="email" required/>
                </div>
                <br/>
                <div className='input'> 
                    <label for="sujet">Sujet</label>
                    <select id="sujet" required>
                        <option value="Discussion d'ordre général">Discussion d'ordre général</option>
                        <option value='Problème technique'>Problème technique</option>
                        <option value='Suggestions'>Suggestions</option>
                        <option value='Autre'>Autre</option>
                        {/*Les témoignages seront gerer autrement dans la pages prévu a cet effait <Temoignages.js>*/}
                    </select>
                </div>
                <div className='input'> 
                <label for="message">Message:</label>
                <textarea id="message" name="message" rows="5" required></textarea><br/>
                </div>
                <div className='btn-contact'>
                    <input  id='submit'type="submit" value="Envoyer"/>
                    {/*<input type="reset" id='reset' value="Effacer"></input>*/}
                </div>

            </form>
        </div>
    );
};

export default Contact;