// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTSFu4ZeRvRKWocEWqAzKVvPqYIhsk0LY",
  authDomain: "dn3-streams-e-commerce-a79b2.firebaseapp.com",
  projectId: "dn3-streams-e-commerce-a79b2",
  storageBucket: "dn3-streams-e-commerce-a79b2.appspot.com",
  messagingSenderId: "78157205029",
  appId: "1:78157205029:web:817fda57cbbaa920c9b9cc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)    //access authentication module from app

const AuthContext = createContext(null);        //use context to return the value provided by custom hook, to make it available throughout the app

const AuthProvider = ({children})=> {
    // All the child items nested in this provider, they will have access to this auth object returned by our custom hook
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}> {children} </AuthContext.Provider>
};

export const useAuth = ()=>useContext(AuthContext);        // access context using this custom hook

function useProvideAuth(){    // exposing functionality's through a custom hook
    const [user, setUser] = useState();

    const signUp = (email, password, displayName) => createUserWithEmailAndPassword(auth, email, password).then((user)=>{
        updateProfile(user, {displayName});
        setUser(user);    //state method
        return user;
    });

    const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password).then((user)=> {
        setUser(user);
        return user;
    });

    const signOutUser = () => signOut(auth).then(()=> setUser(null));

    useEffect(()=>{
        //when user gets re-authenticated 
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            user ? setUser(user) : setUser(null);
        })

        return ()=> unsubscribe();
    });

    return { signUp, signIn, signOut : signOutUser, user };

}

export default AuthProvider;