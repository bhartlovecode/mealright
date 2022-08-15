import { React, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MealService from '../services/MealService';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

const ViewMeal = () => {

  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true);
  const id = useLocation().pathname.split("/")[2]
  const [item, setItem] = useState(id)

  var auth = firebase.auth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await MealService.getMeal(item);
        setMeal(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  

  function updateMealLikes(id, uid){
    const fetchData = async (id, uid) => {
      setLoading(true);
      try {
        const response = await MealService.updateLikes(id, uid);
        //setMeal(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData(id, uid);
  }

  //name
  //description
  //tags
  //likes
  //poster
  //imgsrc

  return (
    <>
    
    {
      !loading && (
        <div class="grid-cols-3 grid">
        <div class="  col-span-2">
          <div class="  inline-block">
            <div class="  mt-4 mb-4 w-9/12 float-right mr-16">
              <img src="/placeholder.jpg" alt="Meal"/>
            </div>
          </div>
          <div class="relative">
            <div class="  inline-block w-full">
              <h4 class="text-3xl font-bold float-left ml-64">Description</h4>
            </div>
            <div class="  inline-block w-full">
              <p class="text-lg float-left ml-64">{meal.description}</p>
            </div>
            <div class="  inline-block w-full">
              <h4 class="text-3xl font-bold float-left ml-64">Recipe</h4>
            </div>
            <div class="  inline-block w-full">
              <p class="text-lg float-left ml-64 text-left">{meal.recipe}</p>
            </div>
            </div>
        </div>
        <div class="  ">
          <div class="  inline-block w-full mt-4">
            <h4 class="text-4xl font-bold">{meal.name}</h4>
          </div>
          <div class="  inline-block w-full mt-4">
            <h4 class="text-2xl">Poster: {meal.poster}</h4>
          </div>
          <div class="  inline-block w-full mt-4">
            <h4 class="text-2xl">Likes: 5</h4>
          </div>
          <div class="  inline-block w-full mt-4">
            <h4 class="text-2xl">Tags:</h4>
          </div>
          <div class="  inline-block w-full mt-4">
          {meal.tags.map((tag) => (
          <div className="bg-lime-500  shadow-sm w-1/6 mx-auto my-2 text-white rounded-2xl inline-block">
            {tag}
          </div>
          ))}
          <div class="  inline-block w-full mt-4">
            <button onClick={() => updateMealLikes(meal.id, auth.currentUser.uid)} 
            className="bg-white border-2 border-gray-500 shadow-sm w-1/6 mx-auto my-2 text-black rounded-2xl text-2xl">Like</button>
          </div>
          </div>
        </div>
      </div>
      
      )
    }
      
    </>
  )
}

export default ViewMeal