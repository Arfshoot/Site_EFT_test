const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')
// model user champ par champ pour inscription et page user + enregistrement dans la bd
const userSchema = new mongoose.Schema(
    {

        // Nom user
        lastName: {
            type: String,
            required: true,
            minlength:3,
            maxLength:25,
            trimp: true

        },

        // prénom user
        firstName: {
            type: String,
            required: true,
            minlength:3,
            maxLength:25,
            trimp: true

        },
        // deuxieme prénom user
        secondName: {
            type: String,
            minlength:3,
            maxLength:25,
            trimp: true

        },
        //email user
        email: {
            type: String,
            required: true,
            unique:true,
            validate: [isEmail],
            lowercase:true,
            trimp:true,
        },

        // mot de passe user
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength:6,
        },
        
        // adresse user 
        adress: {
            type: String,
            required: true,
            max: 1024,
            minlength:3
        },

        // complèment d'adresse
        complmtAdress:{
            type:String,
            max: 1024,
            minlength:3
        },

        //Ville user

        ville : {
            type:String,
            required: true,
            max: 1024,
            minlength:3
        },

        // Code postal user 
        codePostal : {
            type:String,
            required: true,
            max: 10,
            minlength:3,
        },

        // Etat-Province user

        etatProv:{
            type:String,
            max: 1024,
            minlength:3
        },

        // Pays user
        pays:{
            type:String,
            required: true,
            max: 1024,
            minlength:3
        },

        // Telephone user

        phone:{
            type:String,
            max:20,
            minlength:3
        },

        // Age user

        age:{
            type:String,
            max:20,
            minlength:3
        },

        // CatégorieSocio Pro user

        categorieSP:{
            type:String,
            max:20,
            minlength:3,
        },

        // Satut user
        statut:{
            type:String,
            required:true,
            max:20,
            minlength:3
        },

        // Raison social user

        raisonS:{
            type:String,
            max:30,
            minlength:2
        },

        // Comment vous nous avez connu USER
        connu:{
            type:String,
            required:true,
            max:30,
            minlength:3
        },

        // Votre Broker
        broker : {
            type:String,
            required:true,
            max:30,
            minlength:3
        },
        pseudo : {
            type:String,
            required:true,
            unique:true,
            max:30,
            minlength:3
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user'
        },

      
        // recupération de l'ip et doit etre unique 
        userIp : {
            type:String,
            unique:true,

        },


    },
    // recupération de la date et heure de la creation du compte user
    {
        timestamps: true, 
    }
)

// fonction d'attente pour cripté le pwd  on lui dit qu'avant de save tu attend le cryptage sur password et tu passe au next
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})
// on va chercher le mail de user et on va comparer le mot de passe de la bd 
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email})
    if (user){
        const auth = await bcrypt.compare(password, user.password)
        if (auth){
            return user
        }
        throw Error ('mot de passe incorrect')
    }
    throw Error('email incorrect')
}

const UserModel = mongoose.model('user', userSchema)
module.exports=UserModel