import './App.css';
import Navbar from './components/Navbar'
import MealList from './components/MealList'
import Footer from './components/Footer'
import AddMeal from './components/AddMeal'
import ViewMeal from './components/ViewMeal'
import { React } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import UpdateMeal from './components/UpdateMeal';

const App = () => {
    firebase.initializeApp({
      apiKey: "AIzaSyAQc5ygKpeEpWskqaOgd_vWnBHxhmZ1pCk",
      authDomain: "meal-right.firebaseapp.com",
      projectId: "meal-right",
      storageBucket: "meal-right.appspot.com",
      messagingSenderId: "761646894494",
      appId: "1:761646894494:web:c7d94a285962a5a0409a8f",
      measurementId: "G-ELNV6KVPLS"
    })
    
    const auth = firebase.auth();
    const [user] = useAuthState(auth);

    return (

      <div className="App">
        {user ? 
        <BrowserRouter>
          <Navbar userName={auth.currentUser.displayName} />
          <Routes >
            <Route index element={<MealList/>} />
            <Route path="/" element={<MealList />}></Route>
            <Route path="/mealList" element={<MealList />}/>
            <Route path="/addMeal" element={<AddMeal />}/>
            <Route path="/viewMeal/:id" element={<ViewMeal />} />
            <Route path="/updateMeal/:id" element={<UpdateMeal />} />
          </Routes>
          <Footer />
        </BrowserRouter> : <SignIn/>}
      </div> 
    );

  
  function SignIn() {
    console.log("Sign In")
    const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    }
  
    return (
      <>
        <div className="h-screen w-full">
        <Navbar userName="" photoUrl=""/>
        <button onClick={() => signInWithGoogle()} className="bg-lime-500  shadow-sm w-1/6 mx-auto my-2 text-white rounded-2xl">Sign in with Google</button>
        <Footer/>
      </div>
      </>
      
    )
  
  }
}

export default App;
