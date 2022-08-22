import { React, useState, useEffect } from 'react';
import Meal from './Meal'
import { useNavigate } from "react-router-dom";
import MealService from "../services/MealService";

const MealList = () => {

  const navigate = useNavigate();
  const [meals, setMeals] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await MealService.getMeals();
        setMeals(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
    {!loading && (
    <div className="grid grid-cols-2 gap-1">
        {meals.map((meal) => (
          <Meal
            id={meal.id}
            name={meal.name}
            description={meal.description}
            tags={meal.tags}
            likes={meal.likes.length}
            poster={meal.poster}
            imgsrc={meal.photo}
            ></Meal>
        ))}      
    </div>
    )}
    <input type="image" onClick={() => {navigate("/addMeal")}} src="plus.png" alt="Add a meal" className="fixed bottom-8 w-20 right-8"></input>
    </>
  )
}

export default MealList