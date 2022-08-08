import { React, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import MealService from '../services/MealService';

const ViewMeal = () => {

  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true);
  const id = useLocation().pathname.split("/")[2]
  const [item, setItem] = useState(id)

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
            <h4 class="text-2xl">Likes: {meal.likes}</h4>
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
          </div>
        </div>
      </div>
      
      )
    }
      
    </>
  )
}

export default ViewMeal