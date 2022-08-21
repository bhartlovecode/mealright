import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MealService from "../services/MealService";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';
import { data } from "autoprefixer";

const UpdateMeal = () => {
    const [meal, setMeal] = useState({
        name: "",
        description: "",
        tagOne: "",
        tagTwo: "",
        tagThree: "",
        recipe: "",
        poster: "",
        likes: [],
        tags: [],
        uid: ""
      });
    const [loading, setLoading] = useState(true);
    const id = useLocation().pathname.split("/")[2]
    const [item, setItem] = useState(id)
    var auth = firebase.auth();

    const navigate = useNavigate();

    const handleChange = (e) => {
        const value = e.target.value;
        setMeal({ ...meal, [e.target.id]: value });
    };

    const isEmpty = (tagElem) => {
        return tagElem !== "";
    }

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await MealService.getMeal(item);
            data = response.data
            var t1 = "";
            var t2 = "";
            var t3 = "";
            if(data.tags.length >= 1){
                t1 = data.tags[0]
            }

            if(response.data.tags.length >= 2){
                t2 = data.tags[1]
            }

            if(response.data.tags.length === 3){
                t3 = data.tags[2]
            }

            var tmpMeal = {
                name: data.name,
                description: data.description,
                tagOne: t1,
                tagTwo: t2,
                tagThree: t3,
                recipe: data.recipe,
                poster: data.poster,
                likes: data.likes,
                tags: data.tags,
                uid: data.uid
            }

            setMeal(tmpMeal);
        
          } catch (error) {
            console.log(error);
          }
          setLoading(false);
        };
        fetchData();
      }, []);

      const saveMeal = (e) => {
        e.preventDefault()
        MealService.updateMeal(item, meal)
          .then((response) => {
            navigate(`/viewMeal/${id}`)
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const submitMeal = (e) => {
        meal.tags = [meal.tagOne, meal.tagTwo, meal.tagThree]
        meal.tags = meal.tags.filter(isEmpty);
        saveMeal(e)
      }

    return (
        <>
        {! loading && (
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative w-2/3 o my-6 mx-auto">
             <div className="border-2 border-lime-500 rounded-lg shadow-lg w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Update Meal</h3>
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
                    onChange={(e) => handleChange(e)} value={meal.name}/>
                    <label className="block text-black text-md font-bold mb-1 m-2">
                      Meal Description *
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" id="description" required
                    onChange={(e) => handleChange(e)} value={meal.description}/>
                    <label className="block text-black text-md font-bold mb-1 m-2">
                      Tags
                    </label>
                    <input className="shadow appearance-none border rounded w-1/4 py-2 px-1 text-black mx-2" id="tagOne" 
                    onChange={(e) => handleChange(e)} value={meal.tagOne}/>
                    <input className="shadow appearance-none border rounded w-1/4 py-2 px-1 text-black mx-2" id="tagTwo"
                    onChange={(e) => handleChange(e)} value={meal.tagTwo}/>
                    <input className="shadow appearance-none border rounded w-1/4 py-2 px-1 text-black mx-2" id="tagThree" 
                    onChange={(e) => handleChange(e)} value={meal.tagThree}/>
                    <label className="block text-black text-md font-bold mb-1 m-2">
                      Recipe *
                    </label>
                    <textarea rows="5" className="shadow appearance-none border rounded w-full py-2 px-1 text-black"  id="recipe" required
                    onChange={(e) => handleChange(e)} value={meal.recipe}/>
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
        ) 

        }
          
      </>
    );
}

export default UpdateMeal