import app from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: YOUR_AUTH_DOMAIN,
//   databaseURL: "nam5",
  projectId: process.env.REACT_APP_PROJECT_ID,
};

class Firebase{
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
    }

    createNewUser = (email, password)=>
        this.auth.createUserWithEmailAndPassword(email, password);

    signInUser = (email, password)=>
        this.auth.signInWithEmailAndPassword(email, password)
    
    resetPassword = email =>
        this.auth.sendPasswordResetEmail(email)

    signOut = ()=>
        this.auth.signOut();

    udatePassword = newPassword =>
        this.auth.updatePassword(newPassword)
}

export default Firebase;