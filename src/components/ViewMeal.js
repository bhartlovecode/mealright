import { React, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MealService from '../services/MealService';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';

const ViewMeal = () => {

  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true);
  const id = useLocation().pathname.split("/")[2]
  const [item, setItem] = useState(id)
  const [liked, setLiked] = useState(null)
  const [likes, setLikes] = useState(0);
  const [owner, setOwner] = useState(false);

  var auth = firebase.auth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await MealService.getMeal(item);
        setMeal(response.data);
        console.log(response.data.likes)
        if(response.data.likes.includes(auth.currentUser.uid)){
          setLiked(true);
        }

        else{
          setLiked(false);
        }
        setLikes(response.data.likes.length);

        if(response.data.uid === auth.currentUser.uid){
          setOwner(true);
        }

      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  

  function updateMealLikes(id, uid){
    const fetchData = async (id, uid) => {
      try {
        const response = await MealService.updateLikes(id, uid);
        console.log(response.data)
        if(response.data.includes(auth.currentUser.uid)){
          setLiked(true);
        }

        else{
          setLiked(false);
        }
        setLikes(response.data.length);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(id, uid);
  }

  const delMeal = () => {
    var result = window.confirm("Are you sure you want to delete this meal?");
    if(result === true){
      MealService.deleteMeal(meal.id)
      .then((response) => {
        navigate("/mealList")
      })
      .catch((error) => {
        console.log(error);
      });
    }
    
  };

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
        <div className="grid-cols-3 grid">
        <div className="  col-span-2">
          <div className="  inline-block">
            <div className="  mt-4 mb-4 w-9/12 float-right mr-16">
              <img src={meal.photo} alt="Meal"/>
            </div>
          </div>
          <div className="relative">
            <div className="  inline-block w-full">
              <h4 className="text-3xl font-bold float-left ml-64">Description</h4>
            </div>
            <div className="  inline-block w-full">
              <p className="text-lg float-left ml-64">{meal.description}</p>
            </div>
            <div className="  inline-block w-full">
              <h4 className="text-3xl font-bold float-left ml-64">Recipe</h4>
            </div>
            <div className="  inline-block w-full">
              <p className="text-lg float-left ml-64 text-left">{meal.recipe}</p>
            </div>
            </div>
        </div>
        <div className="  ">
          <div className="inline-block w-full mt-4">
            <h4 className="text-4xl font-bold">{meal.name}</h4>
          </div>
          <div className="  inline-block w-full mt-4">
            <h4 className="text-2xl">Poster: {meal.poster}</h4>
          </div>
          <div className="inline-block w-full mt-4">
            <h4 className="text-2xl">Likes: {likes}</h4>
          </div>
          <div className="  inline-block w-full mt-4">
            <h4 className="text-2xl">Tags:</h4>
          </div>
          <div className="inline-block w-full mt-4">
          {meal.tags.map((tag) => (
          <div className="bg-lime-500  shadow-sm w-1/6 mx-auto my-2 text-white rounded-2xl inline-block">
            {tag}
          </div>
          ))}
          {
            !liked && (
              <div className="inline-block w-full mt-4">
              <button onClick={() => updateMealLikes(meal.id, auth.currentUser.uid)} 
              className="bg-white border-2 border-gray-500 shadow-sm w-1/6 mx-auto
              hover:shadow-2xl hover:shadow-black my-2 text-black rounded-2xl text-2xl">Like</button>
            </div>
            )
          }

          {
            liked && (
              <div className="inline-block w-full mt-4">
              <button onClick={() => updateMealLikes(meal.id, auth.currentUser.uid)} 
              className="bg-lime-500 border-2 border-gray-500 shadow-sm w-1/6 mx-auto
              hover:shadow-2xl hover:shadow-black my-2 text-black rounded-2xl text-2xl">Liked</button>
              </div>
            )
          }
          {
              owner && (
                <div className="inline-block w-full mt-4">
                  <button onClick={() => navigate(`/updateMeal/${id}`)} 
                  className="bg-black border-2 border-gray-500 shadow-sm w-1/6 mx-auto my-2
                  hover:shadow-2xl hover:shadow-black text-white rounded-2xl text-2xl mr-4">Update</button>
                  <button onClick={() => delMeal()} 
                  className="bg-red-500 border-2 border-gray-500 shadow-sm w-1/6 mx-auto my-2
                   text-white rounded-2xl text-2xl hover:shadow-2xl hover:shadow-black">Delete</button>
              </div>
              )
            }
          </div>
        </div>
      </div>
      
      )
    }
      
    </>
  )
}

export default ViewMeal