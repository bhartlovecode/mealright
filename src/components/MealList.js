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
            imgsrc="placeholder.jpg"
            ></Meal>
        ))}      
    </div>
    )}
    </>
  )
  /*
  return (
    <div className="grid grid-cols-2 gap-1">
      <Meal imgsrc="placeholder.jpg" mealName="Peanut Butter Jelly Sandwich"/>
      <Meal imgsrc="placeholder.jpg" mealName="Spaghetti and Meatballs"/>
      <Meal imgsrc="placeholder.jpg" mealName="Healthy Tacos"/>
      <Meal imgsrc="placeholder.jpg" mealName="Beans and rice"/>
    </div>
  )*/
}

export default MealList