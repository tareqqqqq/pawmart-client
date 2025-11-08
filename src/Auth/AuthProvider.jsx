
import React, { useEffect, useState } from 'react';

import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';


import { auth } from '../firebase/firebase.config';
import { AuthContext } from './AuthContext';



const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = () =>{
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUserProfile = (displayName, photoURL) => {
            return updateProfile(auth.currentUser, {displayName, photoURL})
    }

    const signOutUser = () =>{
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            // console.log(currentUser)
            setLoading(false);
        })

        return () => {
            unsubscribe()
        }
    }, [])

    const authInfo = {
        createUser,
        updateUserProfile,
        signInUser,
        signInWithGoogle,
        signOutUser,
        user,
        loading
    }


    // eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0NTEzMjA5OWFkNmJmNjEzODJiNmI0Y2RlOWEyZGZlZDhjYjMwZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vbW9kZWxzLTU2NjcxIiwiYXVkIjoibW9kZWxzLTU2NjcxIiwiYXV0aF90aW1lIjoxNzYyNTA1ODg3LCJ1c2VyX2lkIjoiUlVWNmY1S3k0dFJteXJNcHFYdjZtTEJ6NU8wMiIsInN1YiI6IlJVVjZmNUt5NHRSbXlyTXBxWHY2bUxCejVPMDIiLCJpYXQiOjE3NjI1MDU4ODcsImV4cCI6MTc2MjUwOTQ4NywiZW1haWwiOiJ0YXJlcW1haG11ZGtoYW4xODdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInRhcmVxbWFobXVka2hhbjE4N0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.QRAOg22141vVPVtqaUuvwrMBa1LVijNt_oB6FkF4Y-MpqNAS3xG2UZdUg68GuQ2fRu4reVwElIoRp9QG_J_pneYxWmP_GiPpslxzBCojL3WDAWM7Yg-jzQOLfdvQ3Z2HnzTBzT68KfB5AICgDsXlp8HzIF9_8AnLWQwU6D6-pYNE3mADq5vJpL_tz7f1PYj3BqPv3A_3Ewcz76nTdgEyYl27_K3ST5qv4dZgWYwcJrEOynN9tExHjSyPxM0A-zLXBNykAeJd4NfBnVVETR-Ud5vXzRaCs_pihHqAe06nMQCsDzZCW0FjbhM8IRw7ZIF3Vz6NWTarj_jntQHYI-HhcA
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;