import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./Firebase.config";

export const initializeFirebaseAppFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}

export const newUserCreateWithEmailPassword = (newUser) => {
    return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((userCredential) => {
            console.log(newUser, userCredential);
            userCredential.user.updateProfile({
                displayName: newUser.fullname
            }).then(() => {

            }).catch((error) => {

            });
            return userCredential.user;
        })
        .catch((error) => {
            console.log(error.errorCode, error.errorMessage);
            return error;
        });
}


export const userSignInWithEmailAndPassword = (registeredUser) => {
    return firebase.auth().signInWithEmailAndPassword(registeredUser.email, registeredUser.password)
        .then((userCredential) => {
            console.log(userCredential.user.displayName)
            return userCredential.user;
        })
        .catch((error) => {
            console.log(error.code, error.message);
            return error;
        });
}