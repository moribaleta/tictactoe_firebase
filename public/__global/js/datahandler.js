/** super class that contains object for firebase implementation */
class DataHandlerType {
    /** firebase functions */
    func

    /** firebase firestore */
    firestore
    /** firebase storage */
    storage

    /** firebase database*/
    database

    /** app config */
    config

    ///firebase representation from the cdn
    _firebase

    ///user signed in
    user

    static base_url = 'https://ievacuate-laguna-cdn.000webhostapp.com/'

    static api_host = DataHandlerType.base_url + "api/"
    static cdn_host = DataHandlerType.api_host + "uploads"

    /** configures firebase functionality */
    configure(firebase) {

        if (firebase.apps.length > 0) {
            this.config = firebase.app()
        } else {
            var firebaseConfig = {
                apiKey: "AIzaSyB8UTi7ERSPJYzDskzKu985mJN4S0JyWsE",
                authDomain: "tictactoa-d4ebd.firebaseapp.com",
                projectId: "tictactoa-d4ebd",
                storageBucket: "tictactoa-d4ebd.appspot.com",
                messagingSenderId: "1004777399658",
                appId: "1:1004777399658:web:80e28d593c198ba1b03113",
                measurementId: "G-J7M7LE1SYK"
            };

            // Initialize Firebase
            this.config = firebase.initializeApp(firebaseConfig);
        }

        console.log("%o", firebase)

        this.storage    = this.config.storage()
        this.database   = this.config.database()
        this.firestore  = firebase.firestore(this.config)
        this._firebase  = firebase
        this.func       = firebase.functions()

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              this.user = user.uid;
              // ...
            } else {
              // User is signed out
              // ...
            }
        });
          
    } //configure

} //DataHandlerType


class TableHandler extends DataHandlerType {

    static tables = {

    }

    /**
     * signin user using firebase auth
     * @param {*} email  - email of the user
     * @param {*} password - password of the user
     * @returns 
     */
    signInUser(email, password) {
        return new Promise((resolve, reject) => {
            this._firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                let message     = new Message()
                message.data    = user
                resolve(message)
            })
            .catch((error) => {
                reject(error)
            });
        })
    }//signInUser

    /**
     * signup new user using firebase auth
     * @param {*} email  - email of the user
     * @param {*} password - password of the user
     * @returns 
     */
    signUpUser(email, password) {
        return new Promise((resolve, reject) => {
            this._firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                var user = userCredential.user;
                let message     = new Message()
                message.data    = user
                resolve(message)
            })
            .catch((error) => {
                reject(error)
            });
        })
    }//signUpUser
    

}



const Datahandler = new TableHandler()