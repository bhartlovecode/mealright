import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MealService from "../services/MealService";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AddMeal = () => {

  var auth = firebase.auth();
  const [meal, setMeal] = useState({
    name: "",
    description: "",
    tagOne: "",
    tagTwo: "",
    tagThree: "",
    recipe: "",
    poster: auth.currentUser.displayName,
    likes: [],
    tags: [],
    uid: auth.currentUser.uid,
    photo: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setMeal({ ...meal, [e.target.id]: value });
  };

  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }

  const saveMeal = (e) => {
    e.preventDefault()
    const storage = getStorage();
    const uid = uuidv4()
    const storageRef = ref(storage, uid);
    
    // Create file metadata including the content type
    /** @type {any} */
    const metadata = {
      contentType: 'image/jpeg',
    };
    
    const uploader = document.getElementById("photo");
    console.log(uploader.files[0]);

    uploadBytes(storageRef, uploader.files[0], metadata).then((snapshot) => {
      var pic = document.getElementById("photo")
      getDownloadURL(ref(storage, uid))
      .then((url) => {
        meal.photo = url
        MealService.addMeal(meal)
          .then((response) => {
            navigate("/mealList");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        // Handle any errors
      });
    });
    
        
  };

  const isEmpty = (tagElem) => {
    return tagElem !== "";
  }

  const submitMeal = (e) => {
    meal.tags = [meal.tagOne, meal.tagTwo, meal.tagThree]
    meal.tags = meal.tags.filter(isEmpty);
    saveMeal(e)
  }

  return (
      <>
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="relative w-2/3 o my-6 mx-auto">
           <div className="border-2 border-lime-500 rounded-lg shadow-lg w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">Add Meal</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => navigate("/mealList")}
                >
                  <span className="text-black opacity-7 h-6 w-6 text-xl py-0">
                    X
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">
                <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full" id="add-meal-label" onSubmit={(e) => submitMeal(e)}>
                  <label className="block text-black text-md font-bold mb-1 m-2">
                    Meal Name *
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                  type="text"
                  id="name" required 
                  onChange={(e) => handleChange(e)}/>
                  <label className="block text-black text-md font-bold mb-1 m-2">
                    Meal Description *
                  </label>
                  <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" id="description" required
                  onChange={(e) => handleChange(e)}/>
                  <label className="block text-black text-md font-bold mb-1 m-2">
                    Tags
                  </label>
                  <input className="shadow appearance-none border rounded w-1/4 py-2 px-1 text-black mx-2" id="tagOne" 
                  onChange={(e) => handleChange(e)} value={meal.tagOne}/>
                  <input className="shadow appearance-none border rounded w-1/4 py-2 px-1 text-black mx-2" id="tagTwo"
                  value={meal.tagTwo}
                  onChange={(e) => handleChange(e)}/>
                  <input className="shadow appearance-none border rounded w-1/4 py-2 px-1 text-black mx-2" id="tagThree" 
                  value={meal.tagThree}
                  onChange={(e) => handleChange(e)}/>
                  <label className="block text-black text-md font-bold mb-1 m-2">
                    Recipe *
                  </label>
                  <textarea rows="5" className="shadow appearance-none border rounded w-full py-2 px-1 text-black"  id="recipe" required
                  onChange={(e) => handleChange(e)}/>
                  <div className="items-center justify-center">
                    <label className=" text-black text-md font-bold mb-1 m-2 float-left">Choose a meal picture:</label>
                    <input id="photo" className="w-full py-2 m-2" required type="file" accept="image/jpeg"/>
                  </div>
                  <input
                  className="text-white bg-lime-700 active:bg-lime-400 my-2 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                  type="submit"
                  value="Submit"
                  > 
                </input>
                </form>
              </div>
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => navigate("/mealList")}
                >
                  Close
                </button>
                
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default AddMeal;