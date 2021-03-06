import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

class Firebase{
    constructor(){
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }

    createNewUser = (email, password)=>
        this.auth.createUserWithEmailAndPassword(email, password);

    signInUser = (email, password)=>
        this.auth.signInWithEmailAndPassword(email, password)

    resetPassword = email =>
        this.auth.sendPasswordResetEmail(email)

    signOut = ()=>
        this.auth.signOut();

    updatePassword = newPassword =>
        this.auth.currentUser.updatePassword(newPassword)

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    bills = uid => this.db.ref(`Bills/${uid}`);

    budget = uid => this.db.ref(`Budget/${uid}`);

    category = () => this.db.ref(`Category`);

    userCategory = uid => this.db.ref(`Category/${uid}`);

    idCount = () => this.db.ref(`ID-Count`);

    personalFinance = uid => this.db.ref(`PersonalFinance/${uid}`);

    purchases = uid => this.db.ref(`Purchase/${uid}`);

    purchaseSum = uid => this.db.ref(`PurchaseSum/${uid}`);

    rate = () => this.db.ref(`RATE`);

}

export default Firebase;