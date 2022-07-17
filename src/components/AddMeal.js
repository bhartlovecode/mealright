import React, { useState } from "react";
import MealService from "../services/MealService";

const AddMeal = () => {
  const [showModal, setShowModal] = useState(false);

  const [meal, setMeal] = useState({
    mealName: "",
    mealDesc: "",
    tagOne: "",
    tagTwo: "",
    tagThree: "",
    recipe: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setMeal({ ...meal, [e.target.id]: value });
  };

  const saveMeal = () => {
    //e.preventDefault();
    MealService.addMeal(meal)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitMeal = () => {
    saveMeal()
    setShowModal(false)
  }

  return (
      <>
      <input type="image" onClick={() => {setShowModal(true)}} src="plus.png" alt="Add a meal" className="fixed bottom-8 w-20 right-8"></input>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-2/3 o my-6 mx-auto">
              <div className="border-2 border-lime-500 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Add Meal</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl py-0">
                      X
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full" id="add-meal-form" onSubmit={() => submitMeal}>
                    <label className="block text-black text-md font-bold mb-1 m-2">
                      Meal Name *
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                    type="text"
                    id="mealName" required 
                    onChange={(e) => handleChange(e)}/>
                    <label className="block text-black text-md font-bold mb-1 m-2">
                      Meal Description *
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" id="mealDesc" required
                    onChange={(e) => handleChange(e)}/>
                    <label className="block text-black text-md font-bold mb-1 m-2">
                      Tags
                    </label>
                    <input className="shadow appearance-none border rounded w-1/4 py-2 px-1 text-black mx-2" id="tagOne" 
                    onChange={(e) => handleChange(e)}/>
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
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default AddMeal;