import React from 'react'

const ViewMeal = ({ mealImg, name, description, tags, rating, poster, id }) => {
  return (
    <>
    <div className="mx-auto my-16 rounded-md border-2 shadow-xl w-10/12 hover:shadow-2xl hover:border-lime-500 h-fit hover:cursor-pointer">
        <img src="/placeholder.jpg" alt="meal pic"/>
        <p>
            Meal Name: {name}<br></br>
            Posted By: {poster}<br></br>
            Tags: {tags}<br></br>
            Rating: {rating}<br></br>
            description: {description}<br></br>
        </p>
    </div>
    </>
  )
}

export default ViewMeal