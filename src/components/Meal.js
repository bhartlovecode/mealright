import React from 'react'

const Meal = ({ imgsrc, mealName }) => {
  return (
    <div className="mx-auto my-16 rounded-md border-2 shadow-xl w-10/12 hover:shadow-2xl hover:border-lime-500 h-fit">
      <div className="m-8">
        <img src={imgsrc} alt="PBJ sandwich"/><br/><br/>
        <p className="m-8">{mealName}</p>
      </div>
    </div>
  )
}

export default Meal