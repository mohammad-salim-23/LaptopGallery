import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/Firebase.config";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

export const AuthProvider = ({ children }) => {

  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // const axiosPublic = useAxiosPublic();

  // create user
  const createUser = (name, email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth,name, email, password)
  }

  // signIn With Email Password
  const signIn = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }


  // google Login
  const singWithGoogle = () => {
    return signInWithPopup(auth, googleProvider)
  }


  // logOut

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }


  // Update Profile
  const updateUserProfile = (name) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
    })
  }


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      // console.log("test user ", currentUser)
      setLoading(false)
    });
    return () => {
      unSubscribe()
    }
  }, [])


  const authInfo = {

    user,
    loading,
    signIn,
    createUser,
    logOut,
    singWithGoogle,
    updateUserProfile


  }


  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;