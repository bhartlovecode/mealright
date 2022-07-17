import { React, useEffect, useState } from 'react';
import Meal from './Meal'
import MealService from '../services/MealService';

const MealList = () => {
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState(null);

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
            mealName={meal.name}
            description={meal.description}
            tags={meal.tags}
            rating={meal.rating}
            poster={meal.poster}
            imgsrc="placeholder.jpg"
            ></Meal>
        ))}      
    </div>
    )}
    </>
  )
}

export default MealList